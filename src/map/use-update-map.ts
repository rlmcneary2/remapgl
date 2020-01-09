/* Copyright (c) 2020 Richard L. McNeary II
 *
 * MIT License Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
