import React, { useEffect, useState } from "react";
import isDev from "../util/is-dev/is-dev";
import MapContainer, { MapContainerProps } from "./map-container";

const MAPBOXGL_CSS = "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css";

/**
 * Add a map to an HTML document.
 */
export default function Map({
  children,
  cssFile = MAPBOXGL_CSS,
  ...props
}: React.PropsWithChildren<MapProps>): JSX.Element | null {
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
        if (isDev) {
          // tslint:disable-next-line: no-console
          console.warn("The cssFile can not be changed once it has been set.");
        }
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
  }, [cssAdded, cssFile, setCssAdded]);

  return cssAdded ? <MapContainer {...props}>{children}</MapContainer> : null;
}

export interface MapProps extends MapContainerProps {
  /**
   * The MapboxGL CSS file to use; defaults to
   * "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css".
   */
  cssFile?: string;
}
