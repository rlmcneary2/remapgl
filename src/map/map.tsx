import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBounds, Map as MapboxMap } from "mapbox-gl";


const Map: React.FC<Props> = ({
  accessToken,
  className,
  location,
  style,
  zoom: _zoom
}): JSX.Element => {
  const [center, setCenter] = useState(location);
  const [zoom, setZoom] = useState(_zoom);
  const elementRef = useRef<HTMLElement>();
  const mapboxMap = useRef<MapboxMap>();

  // Create the one and only leaflet map object.
  useEffect(() => {
    if (mapboxMap.current || !elementRef.current) {
      return;
    }

    (mapboxgl.accessToken as any) = accessToken;

    console.log("creating map instance");
    const map = new MapboxMap({
      center,
      container: elementRef.current,
      style,
      zoom
    });

    function loadHandler() {
      map.off("styledata", loadHandler);
      mapboxMap.current = map;
    }

    map.on("styledata", loadHandler);
  });

  return (
    <>
      <div className={className} ref={elementRef as any} />
    </>
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
