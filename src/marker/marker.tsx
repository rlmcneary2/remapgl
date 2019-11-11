import { Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import {
  connectEventListeners,
  connectMarkerEventListeners,
  createMapboxGLMarker
} from "./marker-logic";
import { ListenerProps, MarkerProps } from "./marker-types";

/**
 * Creates a marker component.
 */
function Marker(props: MarkerProps): JSX.Element {
  const {
    as = "div",
    children,
    className,
    location,
    popup: popupGetter,
    togglePopup,
    ...eventListeners
  } = props;
  const markerElement = useRef<HTMLElement | null>(null);
  const [marker, setMarker] = useState<MarkerGL | null>(null);
  const [popup, setPopup] = useState<PopupGL>();
  const popupDisplayed = useRef(false);
  const map = useMap();

  const hasChildren = 0 < React.Children.count(children);

  useEffect(() => {
    if (marker) {
      return;
    }

    const nextMarker = createMapboxGLMarker(map, markerElement.current, props);
    if (nextMarker) {
      setMarker(nextMarker);
      return () => {
        nextMarker.remove();
        setMarker(null);
      };
    }
  }, [map]);

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

    // tslint:disable-next-line no-unused-expression
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

  connectMarkerEventListeners(marker, props, eventListeners as MarkerProps);
  connectEventListeners(marker, props, eventListeners as ListenerProps);

  // TODO: this must be an instance of a <Popup /> component. How to type this
  // properly with TypeScript?
  const popupComponent = popupGetter && popupGetter();

  return (
    <>
      {hasChildren &&
        React.createElement(
          as,
          {
            className,
            ref: markerElement
          },
          children
        )}
      {popupComponent &&
        React.cloneElement(popupComponent, {
          setMapboxglPopup: setPopup
        } as any)}
    </>
  );
}

export default Marker;
