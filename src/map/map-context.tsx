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
