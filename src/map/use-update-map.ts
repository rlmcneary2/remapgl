import { useEffect } from "react";
import { CameraOptions, Map as MapMbx } from "mapbox-gl";
import { UseUpdateMapOptions } from "./map-types";
import {
  extractBounds,
  extractCenter,
  extractZoom
} from "../util/extractors/extractors";

export default function useUpdateMap(
  map: MapMbx | null,
  {
    animationOptions,
    bounds,
    center,
    mapboxStyle,
    maxBounds,
    maxZoom,
    minZoom,
    motionType,
    zoom,
    ...eventListenerProps
  }: UseUpdateMapOptions
) {
  /**
   * Update the map when props change.
   */
  useEffect(() => {
    if (map && maxBounds) {
      map.setMaxBounds(maxBounds);
    }
  }, [map, maxBounds]);

  useEffect(() => {
    if (map && typeof maxZoom === "number") {
      map.setMaxZoom(maxZoom);
    }
  }, [map, maxZoom]);

  useEffect(() => {
    if (map && typeof minZoom === "number") {
      map.setMinZoom(minZoom);
    }
  }, [map, minZoom]);

  useEffect(() => {
    if (map && mapboxStyle) {
      map.setStyle(mapboxStyle);
    }
  }, [map, mapboxStyle]);

  useEffect(() => {
    if (!map || !bounds) {
      return;
    }

    const { bounds: nextBounds, eventData } = extractBounds(bounds);

    map.fitBounds(
      nextBounds,
      animationOptions && motionType
        ? { ...animationOptions, linear: motionType === "ease" }
        : undefined,
      eventData
    );
  }, [animationOptions, bounds, map, motionType]);

  useEffect(() => {
    if (!map || !center) {
      return;
    }

    const { center: nextCenter, eventData: centerEventData } = extractCenter(
      center
    );
    const { zoom: nextZoom, eventData: zoomEventData } = extractZoom(zoom);

    const options: Partial<CameraOptions> = {};
    let eventData: any;
    if (zoom) {
      options.zoom = nextZoom;
      eventData = zoomEventData;
    }

    if (center) {
      options.center = nextCenter;
      eventData = { ...eventData, ...centerEventData };
    }

    map[`${motionType || "jump"}To`](options, eventData);
  }, [center, map, motionType, zoom]);

  useEffect(() => {
    if (!map) {
      return;
    }

    for (const prop in eventListenerProps) {
      updateMapEventListener(map, prop, eventListenerProps);
    }

    return () => {
      for (const prop in eventListenerProps) {
        updateMapEventListener(map, prop, eventListenerProps, false);
      }
    };
  }, [eventListenerProps, map]);
}

function updateMapEventListener(
  map: MapMbx,
  prop: string,
  eventListenerProps: { [key: string]: any },
  add = true
) {
  if (prop.startsWith("on") && typeof eventListenerProps[prop] === "function") {
    map[add ? "on" : "off"](
      prop.substr(2).toLowerCase(),
      eventListenerProps[prop]
    );
  }
}
