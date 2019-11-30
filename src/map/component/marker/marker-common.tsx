import React, { useEffect, useRef, useState } from "react";
import { Popup as PopupGL } from "mapbox-gl";
import { MarkerProps } from "./marker-types";
import useMarkerState from "./useMarkerState";

/**
 * Both Custom and Default use this to create a marker on the map.
 */
export default function MarkerCommon(props: MarkerCommonProps): JSX.Element {
  const {
    as,
    className,
    createElement,
    createMarker,
    location,
    popup,
    togglePopup,
    ...eventListeners
  } = props;
  const [popupGL, setPopupGL] = useState<PopupGL>();
  const popupDisplayed = useRef(false);

  const [marker, markerRelease] = useMarkerState({
    createMarker,
    eventListeners,
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
