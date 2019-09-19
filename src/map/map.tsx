import React, { useEffect, useState } from "react";
import MapContainer, { Props as MapContainerProps } from "./map-container";


const MAPBOXGL_CSS = "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css";


/**
 * Add a map to an HTML document.
 */
const Map: React.FC<Props> = ({
  children,
  cssFile = MAPBOXGL_CSS,
  ...props
}): JSX.Element | null => {
  const [cssAdded, setCssAdded] = useState(false);

  // Add the MapboxGL CSS to the document.
  useEffect(() => {
    if (cssAdded) {
      return;
    }

    const links = document.getElementsByTagName("link");
    let link: HTMLLinkElement;
    for (let i = 0; i < links.length; i++) {
      link = links[i];
      if (link.href.endsWith("mapbox-gl.css")) {
        setCssAdded(true);
        return;
      }
    }

    function handleLoad() {
      setCssAdded(true);
    }

    const cssLink = document.createElement("link");
    cssLink.href = cssFile;
    cssLink.rel = "stylesheet";
    cssLink.addEventListener("load", handleLoad);
    cssLink.addEventListener("error", handleLoad);

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(cssLink);

    return () => {
      cssLink.removeEventListener("load", handleLoad);
      cssLink.removeEventListener("error", handleLoad);
    };
  }, [cssAdded, setCssAdded]);

  return cssAdded
    ? (<MapContainer {...props}>{children}</MapContainer>)
    : null;
};

export default Map;


export interface Props extends MapContainerProps {
  /**
   * The MapboxGL CSS file to use; defaults to
   * "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css".
   */
  cssFile?: string;
}
