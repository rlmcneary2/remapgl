import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import MapContextProvider from "./map-context";


/**
 * The Map object represents the map on your page.
 */
const Map: React.FC<Props> = ({
  accessToken,
  center: _center,
  children,
  className,
  style,
  zoom: _zoom
}): JSX.Element | null => {
  const defaultOptions = Object.freeze({
    attributionControl: false // This is controlled by the Attribution component.
  });

  const [center] = useState(_center);
  const [zoom] = useState(_zoom);
  const elementRef = useRef<HTMLElement>();
  const [map, setMap] = useState();

  // Create the one and only MapboxGL map object.
  useEffect(() => {
    if (map || !elementRef.current) {
      return;
    }

    (mapboxgl.accessToken as any) = accessToken;

    const nextMap = new MapboxMap({
      ...defaultOptions,
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
  }, [accessToken, center, defaultOptions, map, setMap, style, zoom]);

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
  center: [-68.2954881, 44.3420759],
  style: "mapbox://styles/mapbox/outdoors-v10",
  zoom: 9.5
};

export default Map;

export interface Props {
  /**
   * Sets the map's access token.
   */
  accessToken: string;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * The inital geographical centerpoint of the map.
   */
  center?: [number, number];
  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  style?: string;
  /**
   * The initial zoom level of the map.
   */
  zoom?: number;
}
