import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMapView } from "../hook/useMapView/useMapView";
import { EventData } from "../types/event";
import { AnimationOptions, BoundsOptions, CenterOptions, FitBoundsOptions, LngLat, LngLatBounds, MotionType, ZoomOptions } from "../types/location";
import { extractBounds, extractCenter, extractZoom } from "../util/extractors/extractors";
import isDev from "../util/is-dev/is-dev";
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
  useMapView(
    map,
    animationOptions,
    motionType,
    _bounds,
    _center,
    _zoom
  );

  const defaultOptions = Object.freeze({
    attributionControl: false // This is controlled by the Attribution component.
  });

  // Create the one and only MapboxGL map object.
  useEffect(() => {
    // Once the map exists there is nothing else for this hook to do.
    if (map || !mapElement.current) {
      return;
    }

    if (!!(mapboxgl.accessToken as any)) {
      (mapboxgl.accessToken as any) = accessToken;
    } else if (isDev) {
      // tslint:disable-next-line: no-console
      console.warn("The accessToken has already been set.");
    }

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

  useEffect(() => {
    if (isDev && !!(mapboxgl.accessToken as any)) {
      // tslint:disable-next-line: no-console
      console.warn("The accessToken can not be changed once it has been set.");
    }
  }, [accessToken]);

  /**
   * Update the map when props change.
   */
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
  events?: string[];
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
  motionType?: MotionType;
  /**
   * Invoked when an event specified in "events" occurs.
   */
  onEvent?: (data: EventData) => void;
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
