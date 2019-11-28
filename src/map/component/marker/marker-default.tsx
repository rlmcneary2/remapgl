import React, { useEffect, useRef, useState, useCallback } from "react";
import { Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps, MarkerPropsInternal } from "./marker-types";
import useMarkerState from "./useMarkerState";
import Popup from "../popup/popup";

/**
 * Creates a marker component.
 */
export default function MarkerDefault(props: MarkerPropsInternal): JSX.Element {
  const {
    as,
    className,
    location,
    popup,
    togglePopup,
    uid,
    ...eventListeners
  } = props;
  console.log(`MarkerDefault[${uid}]: enter.`);
  const map = useMap();
  const [popupObj, setPopupObj] = useState<PopupGL>();
  const popupDisplayed = useRef(false);

  const createMarker = useCallback(
    () => createMapboxGLMarker(map, eventListeners as MarkerProps),
    [eventListeners, map]
  );
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
    marker && marker.setLngLat(location);
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
    if (!marker || !popupObj) {
      return;
    }

    console.log(
      `MarkerDefault: marker.getPopup()=${!marker.getPopup()}, popupObj=${!!popupObj}`
    );
    if (!marker.getPopup()) {
      console.log("MarkerDefault: setting popup.");
      marker.setPopup(popupObj);
    }
  });

  const mountPopup = !!popup && !popupObj;

  const popupProps: any = {
    ...popup,
    onPopupAttached: !popupObj ? setPopupObj : null
  };

  console.log(
    `MarkerDefault: render; mountPopup=${mountPopup}, popup=${!!popup}, popupAttached=${!!popupObj}`
  );

  return (
    <>
      {React.createElement(React.Fragment, {
        key: uid
      })}
      {/* Do NOT remove these wrapping div tags! They allow the mapbox-gl code to take ownership of the Popup DOM elements
      that were created by React. */ mountPopup && (
        <div>
          <Popup {...popupProps}>Marker Popup!</Popup>
        </div>
      )}
    </>
  );
}
