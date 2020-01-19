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
import React from "react";
import ReactDOM from "react-dom";
import { Map as MapGL, Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import { MarkerOptions, MarkerPopup, MarkerProps } from "./marker-types";
import { copyDefinedProperties } from "../../../util/props/props";

const MARKER_EVENTS = Object.freeze(["drag", "dragend", "dragstart"]);

export function connectEventListeners(
  marker: MarkerGL,
  props: MarkerProps
): () => void {
  const remove: (() => void)[] = [];
  const markerElement = marker.getElement();
  for (const key in props) {
    if (!key.startsWith("on") || typeof props[key] !== "function") {
      continue;
    }

    const name = key.substring(2).toLowerCase();
    const func = props[key];
    if (MARKER_EVENTS.includes(name)) {
      marker.on(name, func);
      remove.push(() => {
        marker.off(name, func);
      });
    } else {
      markerElement.addEventListener(name, func);
      remove.push(() => {
        markerElement.removeEventListener(name, func);
      });
    }
  }

  return () => remove.forEach(func => func());
}

export function createMarker(
  map: MapGL,
  { location, ...options }: MarkerOptions
): MarkerGL {
  // Create a marker but provide a dummy location. Don't use the location prop
  // because that means it will be wanted as a dependency of useEffect, but we
  // don't want the Marker removed and recreated just because it moved. A
  // location is needed because if there is no location when the Marker is added
  // to the map an error will be thrown.
  const markerGl = new MarkerGL(copyDefinedProperties(options))
    .setLngLat([0, 0])
    .addTo(map);

  if (location) {
    markerGl.setLngLat(location);
  }

  return markerGl;
}

export function setPopup(
  marker: MarkerGL,
  { content, options }: MarkerPopup
): React.ReactPortal {
  const popupGl = new PopupGL(copyDefinedProperties(options));

  const container = document.createElement("div");
  popupGl.setDOMContent(container);
  const portal = ReactDOM.createPortal(content, container);

  marker.setPopup(popupGl);
  return portal;
}
