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
import { Marker as MarkerGL } from "mapbox-gl";
import { MarkerProps } from "./marker-types";
import { useMap } from "../../map-context";
import { connectEventListeners, createMarker, setPopup } from "./util";

/**
 * Creates a marker component.
 */
export default function Marker({
  anchor,
  children,
  color,
  draggable,
  location,
  offset,
  popup,
  ...props
}: MarkerProps): JSX.Element | null {
  const map = useMap();
  const marker = useRef<MarkerGL | null>(null);
  const markerPortal = useRef<React.ReactNode | null>(null);
  const removeEvent = useRef<(() => void) | null>(null);
  const popupPortal = useRef<React.ReactNode | null>(null);

  useEffect(
    () => () => {
      removeEvent.current && removeEvent.current();
      marker.current && marker.current.remove();
      removeEvent.current = null;
      marker.current = null;
      markerPortal.current = null;
    },
    []
  );

  useEffect(() => {
    if (!map || !marker.current || typeof draggable !== "boolean") {
      return;
    }

    marker.current.setDraggable(draggable);
  }, [draggable, map]);

  useEffect(() => {
    if (!map || !marker.current || !location) {
      return;
    }

    marker.current.setLngLat(location);
  }, [location, map]);

  useEffect(() => {
    if (!map || !marker.current || !offset) {
      return;
    }

    marker.current.setOffset(offset);
  }, [map, offset]);

  useEffect(() => {
    if (!map || !marker.current || !popup) {
      return;
    }

    popupPortal.current = setPopup(marker.current, popup);
  }, [map, popup]);

  if (map) {
    if (!marker.current) {
      // Optionally create the contents of a custom marker.
      let element: HTMLElement | undefined = undefined;
      if (0 < React.Children.count(children)) {
        element = document.createElement("div");
        markerPortal.current = ReactDOM.createPortal(children, element);
      }

      // Create the MapboxGL marker instance.
      marker.current = createMarker(map, {
        anchor,
        color,
        draggable,
        element,
        location,
        offset
      });

      removeEvent.current = connectEventListeners(marker.current, props);

      if (popup) {
        popupPortal.current = setPopup(marker.current, popup);
      }
    }
  }

  // The portals for a custom marker and custom popup have to be rendered so
  // that React will construct the contents of the portals.
  return (
    <>
      {markerPortal.current}
      {popupPortal.current}
    </>
  );
}
