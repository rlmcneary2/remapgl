import React, { useEffect, useRef, useState } from "react";
import { Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps, MarkerPropsInternal } from "./marker-types";
import useMarkerState from "./useMarkerState";

/**
 * Creates a marker component.
 */
export default function MarkerCustom(props: MarkerPropsInternal): JSX.Element {
  const {
    as = "div",
    children,
    className,
    location,
    popup: popupGetter,
    togglePopup,
    uid,
    ...eventListeners
  } = props;
  const map = useMap();
  const markerElement = useRef<HTMLElement | null>(null);
  const [marker, markerRelease] = useMarkerState({
    createMarker: element =>
      createMapboxGLMarker(map, eventListeners as MarkerProps, element),
    eventListeners,
    markerElement: markerElement.current,
    props
  });
  const [, setComponentCreated] = useState(false);
  const [popup, setPopup] = useState<PopupGL>();
  const popupDisplayed = useRef(false);

  useEffect(() => {
    setComponentCreated(true);
    return () => {
      console.warn(`MarkerCustom[${uid}]: removed.`);
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
  // const popupComponent = popupGetter && popupGetter();

  return (
    <>
      {React.createElement(
        as,
        {
          className,
          key: uid,
          ref: markerElement
        },
        children
      )}
      {/*popupComponent &&
        React.cloneElement(popupComponent, {
          onPopupGLChange: setPopup
        } as any)*/}
    </>
  );
}
