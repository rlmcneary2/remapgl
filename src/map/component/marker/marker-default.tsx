import React, { useEffect, useRef, useState } from "react";
import { Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps, MarkerPropsInternal } from "./marker-types";
import useMarkerState from "./useMarkerState";

/**
 * Creates a marker component.
 */
export default function MarkerDefault(props: MarkerPropsInternal): JSX.Element {
  const {
    as,
    className,
    location,
    popup: popupGetter,
    togglePopup,
    uid,
    ...eventListeners
  } = props;
  const map = useMap();
  const [marker, markerRelease] = useMarkerState({
    createMarker: () =>
      createMapboxGLMarker(map, eventListeners as MarkerProps),
    eventListeners,
    props
  });
  const [, setComponentCreated] = useState(false);
  const [popup, setPopup] = useState<PopupGL>();
  const popupDisplayed = useRef(false);

  // After the component returns nothing will happen because the props do not change.
  useEffect(() => {
    setComponentCreated(true);
    return () => {
      console.warn(`MarkerDefault[${uid}]: removed.`);
      markerRelease();
    };
  }, [markerRelease, uid]);

  // Update the marker location.
  useEffect(() => {
    if (marker) {
      marker.setLngLat(location);
    }
  }, [location, marker]);

  // Setup the Marker's popup (if it exists).
  useEffect(() => {
    if (marker && popup) {
      marker.setPopup(popup);
      popupDisplayed.current = true;
    }

    return () => {
      marker && marker.setPopup();
    };
  }, [marker, popup]);

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

  // TODO: this must be an instance of a <Popup /> component. How to type this
  // properly with TypeScript?
  const popupComponent = popupGetter && popupGetter();

  return (
    <>
      {React.createElement(React.Fragment, {
        key: uid
      })}
      {popupComponent &&
        React.cloneElement(popupComponent, {
          setMapboxglPopup: setPopup
        } as any)}
    </>
  );
}
