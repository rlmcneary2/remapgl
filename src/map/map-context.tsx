import React, { useState, useContext, useEffect } from "react";
import { Map } from "mapbox-gl";


const MapContext = React.createContext<MapContextValue>({} as any);


const MapContextProvider: React.FC<Props> = ({ children, map }): JSX.Element => {
  const [ value, setValue ] = useState<MapContextValue>({ map });

  useEffect(() => {
    if (value.map !== map) {
      setValue(current => ({...current, map}));
    }
  }, [map, setValue, value]);

  console.log("value=", value);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export default MapContextProvider;


export function useMap() {
  const { map } = useContext(MapContext);
  return map;
}


interface MapContextValue {
  map: Map;
}

interface Props {
  children: React.ReactNode;
  map: Map;
}