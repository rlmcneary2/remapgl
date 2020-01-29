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
import { Map as MapMbx } from "mapbox-gl";
import { MapInstanceProps, MapEventProps } from "./map-props";
import { copyDefinedProperties } from "../util/props/props";

export default function useUpdateMap(
  map: MapMbx | null,
  props: MapInstanceProps & MapEventProps
) {
  const {
    bounds,
    ease,
    fly,
    jump,
    maxBounds,
    maxZoom,
    minZoom,
    styleMbx,
    ...eventListenerProps
  } = copyDefinedProperties<MapInstanceProps & MapEventProps>(props);

  useEffect(() => {
    if (map && bounds) {
      const { bounds: nextBounds, eventData, options } = bounds;
      map.fitBounds(nextBounds, options, eventData);
    }
  }, [bounds, map]);

  useEffect(() => {
    if (map && ease) {
      const { eventData, options } = ease;
      map.easeTo(options, eventData);
    }
  }, [ease, map]);

  useEffect(() => {
    if (map && fly) {
      const { eventData, options } = fly;
      map.flyTo(options, eventData);
    }
  }, [fly, map]);

  useEffect(() => {
    if (map && jump) {
      const { eventData, options } = jump;
      map.jumpTo(options, eventData);
    }
  }, [jump, map]);

  /* Connect events when the map exists. */
  useEffect(() => {
    if (!map) {
      return;
    }

    for (const prop in eventListenerProps) {
      if (
        prop.startsWith("on") &&
        typeof eventListenerProps[prop] === "function"
      ) {
        map.on(prop.substr(2).toLowerCase(), eventListenerProps[prop]);
      }
    }

    return () => {
      if (!map) {
        return;
      }

      for (const prop in eventListenerProps) {
        if (
          prop.startsWith("on") &&
          typeof eventListenerProps[prop] === "function"
        ) {
          map.off(prop.substr(2).toLowerCase(), eventListenerProps[prop]);
        }
      }
    };
  }, [eventListenerProps, map]);

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
    if (map && styleMbx) {
      const nextStyle =
        typeof styleMbx === "object" && "style" in styleMbx
          ? styleMbx.style
          : styleMbx;

      map.setStyle(nextStyle);
    }
  }, [map, styleMbx]);
}
