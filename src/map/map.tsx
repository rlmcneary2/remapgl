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
import React, { useMemo, useState, useRef, useEffect } from "react";
import { debug } from "../util/logger/logger";
import mapboxgl, {
  Map as MapMbx,
  MapboxOptions as MapboxOptionsMbx,
  version as versionMbx
} from "mapbox-gl";
import { copyDefinedProperties } from "../util/props/props";
import MapContextProvider from "./map-context";
import useUpdateMap from "./use-update-map";
import { MapProps } from "./map-props";

const DEFAULT_CENTER: [number, number] = [-68.2954881, 44.3420759];
const DEFAULT_MAPBOX_STYLE = "mapbox://styles/mapbox/outdoors-v11";
const DEFAULT_ZOOM = 9.5;
const MAPBOXGL_CSS = "//api.tiles.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css";

/**
 * Add a map to an HTML document.
 */
export default function Map({
  accessToken,
  animationOptions,
  as = "div",
  bounds,
  center = DEFAULT_CENTER,
  children,
  className,
  cssFile = MAPBOXGL_CSS,
  ease,
  fadeDuration,
  fly,
  jump,
  maxBounds,
  maxZoom,
  minZoom,
  styleMbx = DEFAULT_MAPBOX_STYLE,
  style,
  zoom = DEFAULT_ZOOM,
  ...eventListenerProps
}: React.PropsWithChildren<MapProps>): JSX.Element | null {
  const [cssAdded, setCssAdded] = useState(false);
  const cssStatus = useRef("");
  const [map, setMap] = useState<MapMbx | null>(null);
  const mapContainer = useRef<HTMLElement | null>(null);
  const mapStatus = useRef("");
  const versionLogged = useRef(false);
  const orderedChildren = useMemo(() => orderLayers(children), [children]);
  useUpdateMap(map, {
    bounds,
    ease,
    fly,
    jump,
    maxBounds,
    maxZoom,
    minZoom,
    styleMbx,
    ...eventListenerProps
  });

  /* Cleanup map when this component is unmounted. */
  useEffect(
    () => () => {
      setMap(null);
    },
    []
  );

  /* For debugging purposes log the mapboxgl module version. */
  if (!versionLogged.current) {
    versionLogged.current = true;
    debug("Map", () => `MapboxGL library version "${versionMbx}"`);
  }

  /* Add the CSS file for the current mapboxgl module version. There is no need
  to wait for it to be loaded before creating the map - though the map might be
  displayed first with unstyled controls until the CSS loads... */
  if (!cssAdded && !cssStatus.current) {
    cssStatus.current = "wip";
    createCssLink(cssFile)
      .then(() => {
        cssStatus.current = "yes";
        setCssAdded(true);
      })
      .catch(() => {
        cssStatus.current = "err";
        setCssAdded(true);
      });
  }

  /* Once the map container element has been created the Mapbox Map instance can
  be created. */
  if (!map && !mapStatus.current && mapContainer.current) {
    mapStatus.current = "wip";

    // Only set one time for the life of the APPLICATION.
    mapboxgl.accessToken = mapboxgl.accessToken || accessToken;

    const createStyle =
      typeof styleMbx === "object" && "style" in styleMbx
        ? styleMbx.style
        : styleMbx;

    createMap({
      bounds,
      center,
      container: mapContainer.current,
      fadeDuration,
      style: createStyle,
      maxBounds,
      maxZoom,
      minZoom,
      zoom
    }).then(map => {
      mapStatus.current = "yes";
      setMap(map);
    });
  }

  return React.createElement(
    as,
    {
      className,
      ref: mapContainer,
      style
    },
    map ? (
      <MapContextProvider map={map}>{orderedChildren}</MapContextProvider>
    ) : null
  );
}

async function createCssLink(cssFile: string) {
  return new Promise((resolve, reject) => {
    function handleError() {
      cssLink.removeEventListener("load", handleLoad);
      cssLink.removeEventListener("error", handleError);
      reject();
    }

    function handleLoad() {
      cssLink.removeEventListener("load", handleLoad);
      cssLink.removeEventListener("error", handleError);
      resolve();
    }

    const cssLink = document.createElement("link");
    cssLink.href = cssFile;
    cssLink.rel = "stylesheet";
    cssLink.addEventListener("load", handleLoad);
    cssLink.addEventListener("error", handleError);
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(cssLink);
  });
}

async function createMap(options: MapboxOptionsMbx): Promise<MapMbx> {
  const map = new MapMbx(copyDefinedProperties<MapboxOptionsMbx>(options));

  // Wait until the map has loaded and styledata is available. Trying to change
  // the map before these have completed will cause errors.
  return Promise.all([
    new Promise(resolve => {
      function handleLoad() {
        map.off("load", handleLoad);
        resolve();
      }

      map.on("load", handleLoad);
    }),
    new Promise(resolve => {
      function handleStyleLoad() {
        map.off("styledata", handleStyleLoad);
        resolve();
      }

      map.on("styledata", handleStyleLoad);
    })
  ]).then(() => {
    return map;
  });
}

function orderLayers(children: React.ReactNode) {
  // This code is part of the synchronization of the order of the layers in the
  // map-container component with the layers in the mapboxgl map. It iterates
  // over all the children and determines the layers' order, it passes a
  // "beforeId" prop to each layer clone so the clone knows where it belongs in
  // the map object and can update its position if needed.
  const clones = React.Children.toArray(children).map((child, i, arr) => {
    if ("isRemapGLLayer" in (child as any).type) {
      const beforeId = orderLayersBeforeId(i, arr);
      return React.cloneElement(child as any, { beforeId });
    }

    return child;
  });

  return <>{clones}</>;
}

/**
 * Find the ID of the layer that is before the current one.
 * @param currentIndex Index of the current layer
 * @param children All the children of this component.
 */
function orderLayersBeforeId(currentIndex: number, children: any[]) {
  for (let i = currentIndex + 1; i < children.length; i++) {
    if ("isRemapGLLayer" in (children[i] as any).type) {
      return children[i].props.id;
    }
  }

  return "";
}
