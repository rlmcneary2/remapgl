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
import { Map as MapMbx } from "mapbox-gl";
import React, { useContext, useMemo } from "react";
import {
  MapContextProps,
  UseCreateMapOptions,
  UseUpdateMapOptions
} from "./map-types";
import useCreateMap from "./use-create-map";
import useUpdateMap from "./use-update-map";

const mapContext = React.createContext<MapContextValue>({} as any);

export default function MapContextProvider({
  animationOptions,
  accessToken,
  bounds,
  center,
  children,
  container,
  fadeDuration,
  mapboxStyle,
  maxBounds,
  maxZoom,
  minZoom,
  motionType,
  zoom,
  ...eventListenerProps
}: React.PropsWithChildren<MapContextProps>): React.ReactElement {
  const createMapOptions = useMemo<UseCreateMapOptions>(
    () => ({
      accessToken,
      bounds,
      center,
      container,
      fadeDuration,
      mapboxStyle,
      maxBounds,
      maxZoom,
      minZoom,
      zoom
    }),
    [
      accessToken,
      bounds,
      center,
      container,
      fadeDuration,
      mapboxStyle,
      maxBounds,
      maxZoom,
      minZoom,
      zoom
    ]
  );

  const updateMapOptions = useMemo<UseUpdateMapOptions>(
    () => ({
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
    }),
    [
      animationOptions,
      bounds,
      center,
      eventListenerProps,
      mapboxStyle,
      maxBounds,
      maxZoom,
      minZoom,
      motionType,
      zoom
    ]
  );

  const { map } = useCreateMap(createMapOptions);
  useUpdateMap(map, updateMapOptions);

  return <mapContext.Provider value={{ map }}>{children}</mapContext.Provider>;
}

export function useMap() {
  const { map } = useContext(mapContext);
  return map;
}

interface MapContextValue {
  map: MapMbx | null;
}
