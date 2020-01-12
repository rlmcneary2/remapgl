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
import { useCallback, useState } from "react";
import mapboxgl, { Map as MapMbx } from "mapbox-gl";
import { UseCreateMapOptions } from "./map-types";
import { debug } from "../util/logger/logger";
import {
  extractBounds,
  extractCenter,
  extractZoom
} from "../util/extractors/extractors";
import { CenterOptions, ZoomOptions } from "../types/location";

const DEFAULT_CENTER: CenterOptions = { center: [-68.2954881, 44.3420759] };
const DEFAULT_MAPBOX_STYLE = "mapbox://styles/mapbox/outdoors-v11";
const DEFAULT_ZOOM: ZoomOptions = { zoom: 9.5 };

export default function useCreateMap({
  accessToken,
  bounds,
  center = DEFAULT_CENTER,
  container,
  fadeDuration,
  mapboxStyle: style = DEFAULT_MAPBOX_STYLE,
  maxBounds,
  maxZoom,
  minZoom,
  zoom = DEFAULT_ZOOM
}: UseCreateMapOptions): {
  map: MapMbx | null;
  removeMap: (() => void) | null;
} {
  const [inProgress, setInProgress] = useState(false);
  const [map, setMap] = useState<MapMbx | null>(null);

  const removeMap = useCallback(() => {
    map && map.remove();
    setMap(null);
  }, [map]);

  if (map) {
    return { map, removeMap };
  }

  if (!container) {
    debug("useCreateMap", () => "useCreateMap: returning null[!container].");
    return { map: null, removeMap: null };
  }

  if (inProgress) {
    debug("useCreateMap", () => "useCreateMap: returning null[inProgress].");
    return { map: null, removeMap: null };
  }

  debug("useCreateMap", () => "useCreateMap: creating map.");

  // The remaining code in this function will only ever be called once in the
  // life of a MapContainer.
  setInProgress(true);

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
    container: container,
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

  Promise.all([
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
  ]).then(() => {
    setMap(nextMap);
    setInProgress(false);
  });

  debug("useCreateMap", () => "useCreateMap: returning null[creating map].");
  return { map: null, removeMap: null };
}
