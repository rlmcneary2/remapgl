import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapMbx } from "mapbox-gl";
import { useMapView } from "../hook/useMapView/useMapView";
import {
  BoundsOptions,
  CenterOptions,
  LngLatBounds,
  ZoomOptions
} from "../types/location";
import {
  extractBounds,
  extractCenter,
  extractZoom
} from "../util/extractors/extractors";
import MapContextProvider from "./map-context";
import MapContent from "./map-content";
import { MapContainerProps } from "./map-types";
import { debug } from "../util/logger/logger";

const STATE_MAP_CREATE_IN_PROGRESS = "map-create-in-progress";
const STATE_MAP_CREATED = "map-created";

/**
 * Creates the HTML object for the map and a MaboxGL Map object.
 */
export default function MapContainer({
  as = "div",
  center = { center: [-68.2954881, 44.3420759] },
  children,
  zoom = { zoom: 9.5 },
  ...props
}: React.PropsWithChildren<MapContainerProps>): JSX.Element {
  const statesHookResult = useState<string[]>([]);
  const [map, setMap] = useState<MapMbx>();
  const mapElement = useRef<HTMLElement>();
  useMapView(map, { ...props, center, zoom });

  debug("MapContainer", () => "MapContainer: enter.");

  useEffect(() => {
    // createMap is placed inside useEffect so it is invoked AFTER the initial
    // element is rendered to the DOM. While createMap will do the right thing
    // on its own (only create the Map once, etc.) it needs to be invoked after
    // initial render so that it creates state updates that cause MapContainer
    // to render as needed.
    createMap(map, mapElement.current, setMap, statesHookResult, {
      ...props,
      center,
      style: props.mapboxStyle,
      zoom
    });
  }, [center, map, props, statesHookResult, zoom]);

  /**
   * Update the map when props change.
   */
  useEffect(() => {
    if (map && props.maxBounds) {
      map.setMaxBounds(props.maxBounds);
    }
  }, [map, props.maxBounds]);

  useEffect(() => {
    if (map && typeof props.maxZoom === "number") {
      map.setMaxZoom(props.maxZoom);
    }
  }, [map, props.maxZoom]);

  useEffect(() => {
    if (map && typeof props.minZoom === "number") {
      map.setMinZoom(props.minZoom);
    }
  }, [map, props.minZoom]);

  useEffect(() => {
    if (map && props.mapboxStyle) {
      map.setStyle(props.mapboxStyle);
    }
  }, [map, props.mapboxStyle]);

  useEffect(() => {
    if (!map) {
      return;
    }

    function handlerFactory(type: string) {
      return (data: any) => eventHandler(type, props, data);
    }

    const listeners = {};
    for (const prop in props) {
      if (prop.startsWith("on")) {
        const type = prop.substr(2);
        listeners[type] = handlerFactory(type);
        map.on(type.toLowerCase(), listeners[type]);
      }
    }

    return () => {
      // tslint:disable-next-line: forin
      for (const type in listeners) {
        map.off(type.toLowerCase(), listeners[type]);
      }
    };
  }, [map, props]);

  debug(
    "MapContainer",
    () =>
      `MapContainer: calc; map=${!!map}, mapElement=${!!mapElement.current}.`
  );
  return React.createElement(
    as,
    {
      className: props.className,
      ref: mapElement,
      style: props.style
    },
    map && (
      <MapContextProvider map={map}>
        <MapContent>{children}</MapContent>
      </MapContextProvider>
    )
  );
}

async function createMap(
  map: MapMbx | undefined,
  mapElement: HTMLElement | undefined,
  setMap: React.Dispatch<React.SetStateAction<MapMbx | undefined>>,
  statesHookResult: [string[], React.Dispatch<React.SetStateAction<string[]>>],
  {
    accessToken,
    bounds,
    center,
    fadeDuration,
    maxBounds,
    maxZoom,
    minZoom,
    style = "mapbox://styles/mapbox/outdoors-v11",
    zoom
  }: {
    accessToken: string;
    bounds?: LngLatBounds | BoundsOptions;
    center: [number, number] | { lat: number; lng: number } | CenterOptions;
    fadeDuration?: number;
    maxBounds?: LngLatBounds;
    maxZoom?: number;
    minZoom?: number;
    style?: string;
    zoom: number | ZoomOptions;
  }
) {
  const [states, setStates] = statesHookResult;
  debug("MapContainer", () => ["MapContainer createMap: states=", [states]]);
  if (map || !mapElement || states.includes(STATE_MAP_CREATE_IN_PROGRESS)) {
    return;
  }

  debug("MapContainer", () => "MapContainer createMap: creating map.");

  // The remaining code in this function will only ever be called once in the
  // life of a MapContainer.
  setStates(current => [...current, STATE_MAP_CREATE_IN_PROGRESS]);

  // Only set one time for the life of the APPLICATION.
  mapboxgl.accessToken = mapboxgl.accessToken || accessToken;

  const { boundsExtracted, fitBoundsOptions } = bounds
    ? extractBounds(bounds)
    : ({} as any);
  const { center: centerExtracted } = extractCenter(center);
  const { zoom: zoomExtracted } = extractZoom(zoom);

  const mapOptions: mapboxgl.MapboxOptions = {
    attributionControl: false, // This is controlled by the Attribution component.
    bounds: boundsExtracted,
    center: centerExtracted,
    container: mapElement,
    fitBoundsOptions,
    maxBounds,
    maxZoom,
    minZoom,
    style,
    zoom: zoomExtracted
  };

  // This option must have a value to be set. If it is "undefined" and set it
  // will break the display of labels (like street names) on the map.
  if (fadeDuration) {
    mapOptions.fadeDuration = fadeDuration;
  }

  const nextMap = new MapMbx(mapOptions);

  await Promise.all([
    new Promise(resolve => {
      function handleLoad() {
        nextMap.off("load", handleLoad);
        resolve();
      }

      nextMap.on("load", handleLoad);
    }),
    new Promise(resolve => {
      function handleStyleLoad() {
        nextMap.off("styledata", handleStyleLoad);
        resolve();
      }

      nextMap.on("styledata", handleStyleLoad);
    })
  ]);

  setMap(nextMap);
  setStates(current => [...current, STATE_MAP_CREATED]);
}

function eventHandler(type: string, eventListeners: any, data: any) {
  eventListeners[`on${type}`](data);
}
