import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { EventData } from "../types/event";
import { BoundsOptions, CenterOptions, FitBoundsOptions, LngLat, LngLatBounds, ZoomOptions } from "../types/location";
import MapContextProvider from "./map-context";
import MapData from "./map-data";


/**
 * Creates the HTML object for the map and a MaboxGL Map object.
 */
const MapContainer: React.FC<MapContainerProps> = ({
  accessToken,
  animationOptions,
  as = "div",
  bounds: _bounds,
  center: _center = { center: [-68.2954881, 44.3420759] },
  children,
  className,
  events,
  fadeDuration,
  maxBounds,
  maxZoom,
  minZoom,
  motionType,
  onEvent,
  style = "mapbox://styles/mapbox/outdoors-v10",
  zoom: _zoom = { zoom: 9.5 }
}): JSX.Element => {
  const [map, setMap] = useState<MapboxMap>();
  const mapElement = useRef<HTMLElement>();

  const defaultOptions = Object.freeze({
    attributionControl: false // This is controlled by the Attribution component.
  });

  // Create the one and only MapboxGL map object.
  useEffect(() => {
    // Once the map exists there is nothing else for this hook to do.
    if (map || !mapElement.current) {
      return;
    }

    (mapboxgl.accessToken as any) = accessToken;

    const { bounds, fitBoundsOptions } = _bounds ? extractBounds(_bounds) : {} as any;
    const { center } = extractCenter(_center);
    const { zoom } = extractZoom(_zoom);

    const nextMap = new MapboxMap({
      ...defaultOptions,
      bounds,
      center,
      container: mapElement.current,
      fadeDuration,
      fitBoundsOptions,
      maxBounds,
      maxZoom,
      minZoom,
      style,
      zoom
    });

    function styleLoadHandler() {
      nextMap.off("styledata", styleLoadHandler);
      setMap(nextMap);
    }

    nextMap.on("styledata", styleLoadHandler);
  }, [
    accessToken,
    _bounds,
    _center,
    defaultOptions,
    fadeDuration,
    map,
    maxBounds,
    maxZoom,
    minZoom,
    setMap,
    style,
    _zoom
  ]);

  /**
   * Update the map when props change.
   */
  useEffect(() => {
    if (map && _bounds) {
      const { bounds, eventData } = extractBounds(_bounds);

      map.fitBounds(
        bounds,
        animationOptions && motionType
          ? { ...animationOptions, linear: motionType === "ease" }
          : undefined,
        eventData
      );
    }
  }, [_bounds]);

  useEffect(() => {
    if (map && _center) {
      const { center, eventData, motionType, options } = _center;
      if (motionType) {
        map[`${motionType}To`]({ ...options, center }, eventData);
      } else {
        map.setCenter(center, eventData);
      }
    }
  }, [_center]);

  useEffect(() => {
    if (map && events && onEvent) {
      for (let i = 0; i < events.length; i++) {
        map.on(events[0], onEvent);
      }
    }

    return () => {
      if (map && events && onEvent) {
        for (let i = 0; i < events.length; i++) {
          map.off(events[0], onEvent);
        }
      }
    };
  }, [event, onEvent]);

  useEffect(() => {
    if (map && maxBounds) {
      map.setMaxBounds(maxBounds);
    }
  }, [maxBounds]);

  useEffect(() => {
    if (map && typeof maxZoom === "number") {
      map.setMaxZoom(maxZoom);
    }
  }, [maxZoom]);

  useEffect(() => {
    if (map && typeof minZoom === "number") {
      map.setMinZoom(minZoom);
    }
  }, [minZoom]);

  useEffect(() => {
    if (map && style) {
      map.setStyle(style);
    }
  }, [style]);

  useEffect(() => {
    if (map && _zoom) {
      const { eventData, motionType, options, zoom } = _zoom;
      if (motionType) {
        map[`${motionType}To`]({ ...options, zoom }, eventData);
      } else {
        map.zoomTo(zoom, options, eventData);
      }
    }
  }, [_zoom]);

  return React.createElement(
    as,
    {
      className,
      ref: mapElement
    },
    map && (
      <MapContextProvider map={map}>
        <MapData>
          {children}
        </MapData>
      </MapContextProvider>
    )
  );
};

export default MapContainer;


function extractBounds(
  options: BoundsOptions | LngLatBounds
): {
  bounds: LngLatBounds;
  eventData: {[key: string]: any} | undefined;
  fitBoundsOptions: FitBoundsOptions | undefined
} {
  let bounds: LngLatBounds;
  let eventData: {[key: string]: any} | undefined;
  let fitBoundsOptions: FitBoundsOptions | undefined;
  if (isBoundsOptions(options)) {
    ({ bounds, eventData } = options);
    const { maxZoom: boundsMaxZoom, padding } = options;
    fitBoundsOptions = { maxZoom: boundsMaxZoom, padding };
  } else {
    bounds = options;
  }

  return {
    bounds,
    eventData,
    fitBoundsOptions
  };
}

function extractCenter(
  options: CenterOptions | LngLat
): { center: LngLat; eventData: {[key: string]: any} | undefined; } {
  let center: LngLat;
  let eventData: {[key: string]: any} | undefined;
  if (isCenterOptions(options)) {
    ({ center, eventData } = options);
  } else {
    center = options;
  }

  return {
    center,
    eventData
  };
}

function extractZoom(
  options: number | ZoomOptions | undefined
): { zoom: number | undefined; eventData: {[key: string]: any} | undefined; } {
  let zoom: number | undefined;
  let eventData: {[key: string]: any} | undefined;
  if (isZoomOptions(options)) {
    ({ eventData, zoom } = (options as ZoomOptions));
  } else if (options) {
    zoom = options;
  }

  return {
    eventData,
    zoom
  };

}

export interface MapContainerProps {
  /**
   * Sets the map's access token.
   */
  accessToken: string;
  /**
   * Options common to camera animation through bounds, center, or zoom
   */
  animationOptions?: AnimationOptions;
  /**
   * The name of an HTML element that hosts the map; defaults to div.
   */
  as?: string;
  /**
   * Pans and zooms the map to contain its visible area within the specified
   * geographical bounds. Changing this value will cause the map position/zoom
   * to change. The appearance of the transition can be controlled through
   * animationOptions and motionType.
   */
  bounds?: LngLatBounds | BoundsOptions;
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  center?: LngLat | CenterOptions;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * The map will listen for these events. If onEvent is provided it will be invoked when an event occurs.
   */
  events: string[];
  /**
   * Controls the duration of the fade-in/fade-out animation for label
   * collisions, in milliseconds.
   */
  fadeDuration?: number;
  /**
   * The map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBounds;
  /**
   * The maximum zoom level of the map (0-24).
   */
  maxZoom?: number;
  /**
   * The minimum zoom level of the map (0-24).
   */
  minZoom?: number;
  /**
   * How the camera moves when transitioning from one location to another through bounds, center, or zoom.
   */
  motionType?: "ease" | "fly" | "jump";
  /**
   * Invoked when an event specified in "events" occurs.
   */
  onEvent: (data: EventData) => void;
  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  style?: string;
  /**
   * The zoom level of the map. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  zoom?: number | ZoomOptions;
}

/**
 * Options common to map movement methods that involve animation.
 */
interface AnimationOptions {
  /**
   * The animation's duration, measured in milliseconds.
   */
  duration?: number;
  /**
   * A function taking a time in the range 0..1 and returning a number where 0 is the initial state and 1 is the final state.
   */
  easing?: (input: number) => number;
}

function isBoundsOptions(options: LngLatBounds | BoundsOptions | undefined): options is BoundsOptions {
  return !!options && "bounds" in options;
}

function isCenterOptions(options: LngLat | CenterOptions | undefined): options is CenterOptions {
  return !!options && "center" in options;
}

function isZoomOptions(options: number | ZoomOptions | undefined): options is ZoomOptions {
  return !!options && typeof options === "object";
}
