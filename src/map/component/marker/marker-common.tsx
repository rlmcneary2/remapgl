/*
 * Copyright (c) 2020 Richard L. McNeary II
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
import React, { useEffect, useRef, useState } from "react";
import { Popup as PopupGL } from "mapbox-gl";
import { MarkerProps } from "./marker-types";
import useMarkerState from "./useMarkerState";

/**
 * Both Custom and Default use this to create a marker on the map.
 */
export default function MarkerCommon(props: MarkerCommonProps): JSX.Element {
  const { createElement, createMarker, location, popup, togglePopup } = props;
  const [popupGL, setPopupGL] = useState<PopupGL>();
  const popupDisplayed = useRef(false);

  const [marker, markerRelease] = useMarkerState({
    createMarker,
    props
  });

  useEffect(() => {
    // Returns a function that will dispose of resources that are not managed by
    // React when a marker is removed. This hook must only run once when the
    // marker is first created.
    return () => markerRelease && markerRelease();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    location && marker && marker.setLngLat(location);
  }, [location, marker]);

  useEffect(() => {
    if (marker) {
      if (togglePopup && !popupDisplayed.current) {
        popupDisplayed.current = true;
        marker.togglePopup();
      }
      if (!togglePopup && popupDisplayed.current) {
        popupDisplayed.current = false;
        marker.togglePopup();
      }
    }
  }, [togglePopup, marker]);

  useEffect(() => {
    if (!marker || !popupGL) {
      return;
    }

    if (!marker.getPopup()) {
      marker.setPopup(popupGL);
    }
  });

  return (
    <>
      {createElement()}
      {/* Do NOT remove these wrapping div tags! They allow the mapbox-gl code to take ownership of the Popup DOM elements
      that were created by React. */}
      {!!popup && !popupGL && (
        <div>
          {React.cloneElement(popup, {
            onPopupAttached: !popupGL ? setPopupGL : null
          } as any)}
        </div>
      )}
    </>
  );
}

export interface MarkerCommonProps extends MarkerProps {
  createElement: () => JSX.Element;
  createMarker?: () => [mapboxgl.Marker, () => void];
  uid: string;
}
