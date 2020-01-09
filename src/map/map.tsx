/* Copyright (c) 2020 Richard L. McNeary II
 *
 * MIT License Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { useMemo, useState, useRef } from "react";
import MapContainer from "./map-container";
import { MapContainerProps } from "./map-types";
import { debug } from "../util/logger/logger";
import { version as versionMbx } from "mapbox-gl";

const MAPBOXGL_CSS = "//api.tiles.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css";
const STATE_CSS_IN_PROGRESS = "css-in-progress";
const STATE_CSS_COMPLETED = "css-completed";

/**
 * Add a map to an HTML document.
 */
export default function Map({
  accessToken,
  animationOptions,
  as,
  bounds,
  center,
  children,
  className,
  cssFile = MAPBOXGL_CSS,
  fadeDuration,
  mapboxStyle,
  maxBounds,
  maxZoom,
  minZoom,
  motionType,
  style,
  zoom,
  ...eventListenerProps
}: React.PropsWithChildren<MapProps>): JSX.Element | null {
  const statesHookResult = useState<string[]>([]);
  const versionLogged = useRef(false);

  if (!versionLogged.current) {
    versionLogged.current = true;
    debug("Map", () => `MapboxGL library version "${versionMbx}"`);
  }

  updateCss(statesHookResult, cssFile);

  const mapContainerProps = useMemo(
    () => ({
      accessToken,
      animationOptions,
      as,
      bounds,
      center,
      className,
      fadeDuration,
      mapboxStyle,
      maxBounds,
      maxZoom,
      minZoom,
      motionType,
      style,
      zoom
    }),
    [
      accessToken,
      animationOptions,
      as,
      bounds,
      center,
      className,
      fadeDuration,
      mapboxStyle,
      maxBounds,
      maxZoom,
      minZoom,
      motionType,
      style,
      zoom
    ]
  );

  return statesHookResult[0].includes(STATE_CSS_COMPLETED) ? (
    <MapContainer {...mapContainerProps} {...eventListenerProps}>
      {children}
    </MapContainer>
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
