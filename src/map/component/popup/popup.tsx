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
import { Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { PopupProps } from "./popup-types";

export default function Popup({
  anchor,
  children,
  closeButton = true,
  location,
  offset,
  ...props
}: PopupProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const popup = useRef<PopupGL | null>(null);
  const map = useMap();

  const { marker, onPopupAttached } = props as any;

  useEffect(() => {
    if (!ref.current || !map) {
      return;
    }

    const popupNext = new PopupGL({
      anchor,
      closeButton,
      offset
    }).setDOMContent(ref.current);

    if (onPopupAttached) {
      onPopupAttached(popupNext);
      return;
    }

    if (marker) {
      (marker as MarkerGL).setPopup(popupNext);
    } else {
      popupNext.addTo(map);
      location && popupNext.setLngLat([0, 0]);
    }

    popup.current = popupNext;

    onPopupAttached && onPopupAttached(true);

    return () => {
      !marker ? popupNext.remove() : marker.setPopup();
      popup.current = null;
      onPopupAttached && onPopupAttached(false);
    };
  }, [
    anchor,
    closeButton,
    location,
    map,
    marker,
    offset,
    onPopupAttached,
    ref
  ]);

  useEffect(() => {
    if (!marker && location && popup.current) {
      popup.current.setLngLat(location);
    }
  }, [location, marker]);

  return <div ref={ref}>{children}</div>;
}
