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
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { PopupProps } from "./popup-types";
import { copyDefinedProperties } from "../../../util/props/props";

export default function Popup({
  anchor,
  children,
  closeButton = true,
  location,
  offset
}: PopupProps): JSX.Element | null {
  const map = useMap();
  const popup = useRef<PopupGL | null>(null);
  const popupPortal = useRef<React.ReactPortal | null>(null);

  useEffect(
    () => () => {
      popup.current && popup.current.remove();
      popup.current = null;
      popupPortal.current = null;
    },
    []
  );

  if (map && !popup.current) {
    popup.current = new PopupGL(
      copyDefinedProperties({ anchor, closeButton, offset })
    );

    const container = document.createElement("div");
    popup.current.setDOMContent(container);
    popupPortal.current = ReactDOM.createPortal(children, container);

    popup.current.addTo(map);

    location && popup.current.setLngLat(location);
  }

  return <>{popupPortal.current}</>;
}
