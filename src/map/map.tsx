import React, { useState, useRef } from "react";
import MapContainer from "./map-container";
import { MapContainerProps } from "./map-types";
import { debug } from "../util/logger/logger";
import { version as versionMbx } from "mapbox-gl";

const MAPBOXGL_CSS = "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css";
const STATE_CSS_IN_PROGRESS = "css-in-progress";
const STATE_CSS_COMPLETED = "css-completed";

/**
 * Add a map to an HTML document.
 */
export default function Map({
  children,
  cssFile = MAPBOXGL_CSS,
  ...props
}: React.PropsWithChildren<MapProps>): JSX.Element | null {
  const statesHookResult = useState<string[]>([]);
  const versionLogged = useRef(false);

  if (!versionLogged.current) {
    versionLogged.current = true;
    debug("Map", () => `MapboxGL llibrary version "${versionMbx}"`);
  }

  updateCss(statesHookResult, cssFile);

  return statesHookResult[0].includes(STATE_CSS_COMPLETED) ? (
    <MapContainer {...props}>{children}</MapContainer>
  ) : null;
}

function updateCss(
  [states, setStates]: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ],
  cssFile: string
) {
  if (
    states.includes(STATE_CSS_COMPLETED) ||
    states.includes(STATE_CSS_IN_PROGRESS)
  ) {
    return;
  }

  setStates(current => [...current, STATE_CSS_IN_PROGRESS]);

  let set = false;
  function handleLoad(evt: Event, error = false) {
    if (set) {
      return;
    }

    set = true;
    setStates(current => [...current, STATE_CSS_COMPLETED]);
    cssLink.removeEventListener("load", handleLoad);
    cssLink.removeEventListener("error", handleLoad);
  }

  const cssLink = document.createElement("link");
  cssLink.href = cssFile;
  cssLink.rel = "stylesheet";
  cssLink.addEventListener("load", handleLoad);
  cssLink.addEventListener("error", evt => handleLoad(evt, true));
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(cssLink);
}

export interface MapProps extends MapContainerProps {
  /**
   * The MapboxGL CSS file to use; defaults to
   * "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css".
   */
  cssFile?: string;
}
