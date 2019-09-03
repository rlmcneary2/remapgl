import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBounds, Map as MapboxMap } from "mapbox-gl";
import MapContextProvider from "./map-context";


const Map: React.FC<Props> = ({
  accessToken,
  children,
  className,
  location,
  style,
  zoom: _zoom
}): JSX.Element | null => {
  const [center, setCenter] = useState(location);
  const [zoom, setZoom] = useState(_zoom);
  const elementRef = useRef<HTMLElement>();
  const [map, setMap] = useState();

  // Create the one and only MapboxGL map object.
  useEffect(() => {
    if (map || !elementRef.current) {
      return;
    }

    (mapboxgl.accessToken as any) = accessToken;

    console.log("creating map instance");
    const nextMap = new MapboxMap({
      center,
      container: elementRef.current,
      style,
      zoom
    });

    function loadHandler() {
      nextMap.off("styledata", loadHandler);
      setMap(nextMap);
    }

    nextMap.on("styledata", loadHandler);
  }, [accessToken, center, map, setMap, style, zoom]);

  console.log("render Map");
  return (
    <div className={className} ref={elementRef as any}>
      {map &&
        <MapContextProvider map={map}>
          {children}
        </MapContextProvider>
      }
    </div>
  );
};


Map.defaultProps = {
  location: [-68.2954881, 44.3420759],
  style: "mapbox://styles/mapbox/outdoors-v10",
  zoom: 9.5
}

export default Map;

export interface Props {
  accessToken: string;
  className?: string;
  location?: [number, number];
  style?: string;
  zoom?: number;
}
