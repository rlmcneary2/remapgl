import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import MapContextProvider from "./map-context";


/**
 * Creates the HTML object for the map and a MaboxGL Map object.
 */
const Map: React.FC<Props> = ({
  accessToken,
  as = "div",
  center: _center = [-68.2954881, 44.3420759],
  children,
  className,
  style = "mapbox://styles/mapbox/outdoors-v10",
  zoom: _zoom = 9.5
}): JSX.Element => {
  const defaultOptions = Object.freeze({
    attributionControl: false // This is controlled by the Attribution component.
  });

  const [center] = useState(_center);
  const [map, setMap] = useState();
  const mapElement = useRef<HTMLElement>();
  const [zoom] = useState(_zoom);

  // Create the one and only MapboxGL map object.
  useEffect(() => {
    if (map || !mapElement.current) {
      return;
    }

    (mapboxgl.accessToken as any) = accessToken;

    const nextMap = new MapboxMap({
      ...defaultOptions,
      center,
      container: mapElement.current,
      style,
      zoom
    });

    function loadHandler() {
      nextMap.off("styledata", loadHandler);
      setMap(nextMap);
    }

    nextMap.on("styledata", loadHandler);
  }, [accessToken, center, defaultOptions, map, setMap, style, zoom]);

  return React.createElement(
    as,
    {
      className,
      ref: mapElement
    },
    map && (
      <MapContextProvider map={map}>
        {children}
      </MapContextProvider>
    )
  );
};

export default Map;


export interface Props {
  /**
   * Sets the map's access token.
   */
  accessToken: string;
  /**
   * The type of HTML element that hosts the map; defaults to DIV.
   */
  as?: string;
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
