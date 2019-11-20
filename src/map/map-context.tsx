import { Map } from "mapbox-gl";
import React, { useContext, useEffect, useState } from "react";

const mapContext = React.createContext<MapContextValue>({} as any);

const MapContextProvider: React.FC<ProviderProps> = ({
  children,
  map
}): React.ReactElement => {
  const [value, setValue] = useState<MapContextValue>({ map });

  useEffect(() => {
    if (value.map !== map) {
      setValue(current => ({ ...current, map }));
    }
  }, [map, setValue, value]);

  return <mapContext.Provider value={value}>{children}</mapContext.Provider>;
};

export default MapContextProvider;

export function useMap() {
  const { map } = useContext(mapContext);
  return map;
}

interface MapContextValue {
  map: Map;
}

interface ProviderProps {
  children: React.ReactNode;
  map: Map;
}
