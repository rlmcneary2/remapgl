import React, {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  RefObject
} from "react";
// import { Popup as PopupGL } from "mapbox-gl";
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
  const [marker, markerRelease] = useMarkerState({
    createMarker: () =>
      createMapboxGLMarker(map, eventListeners as MarkerProps),
    eventListeners,
    props
  });
  const [, setComponentCreated] = useState(false);
  const popupRef = useRef(null) as MutableRefObject<HTMLElement | null>;
  const [popupElement, setPopupElement] = useState();
  const popupDisplayed = useRef(false);

  // After the component returns nothing will happen because the props do not change.
  useEffect(() => {
    console.log("MarkerDefault: component created.");
    setComponentCreated(true);
    // return () => {
    //   console.warn(`MarkerDefault[${uid}]: removed.`);
    //   markerRelease();
    // };
  }, [markerRelease, uid]);

  useEffect(() => {
    console.log("MarkerDefault: run once.");
    return () => {
      console.log(`MarkerDefault[${uid}]: release.`);
      markerRelease();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the marker location.
  useEffect(() => {
    console.log("MarkerDefault: location.");
    if (marker) {
      marker.setLngLat(location);
    }
  }, [location, marker]);

  useEffect(() => {
    console.log("MarkerDefault: toggle popup.");
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
    console.log(
      `MarkerDefault: useEffect; popup=${!!popup}\r\npopupElement=${!!popupElement}\r\npopupRef.current=${!!popupRef.current}`
    );

    if (!popup || popupElement) {
      return;
    }

    if (popupRef.current) {
      setPopupElement(popupRef.current);
      popupRef.current = null;
    }
  }, [popup, popupElement, popupRef]);

  // useEffect(() => {
  //   console.log(
  //     `MarkerDefault: useEffect; popupElement=${!!popupElement}, marker=${!!marker}.`
  //   );
  //   if (!popupElement || !marker) {
  //     return;
  //   }

  //   console.log("MarkerDefault: useEffect; creating popup.");

  //   // const popupNext = new PopupGL().setDOMContent(popupElement).addTo(map);
  //   const popupNext = new PopupGL().setDOMContent(popupElement);
  //   marker.setPopup(popupNext);
  //   marker.togglePopup();

  //   // location && popupNext.setLngLat([0, 0]); // tslint:disable-line no-unused-expression

  //   // popup.current = popupNext;
  //   // onPopupGLChange && onPopupGLChange(popupNext); // tslint:disable-line no-unused-expression

  //   return () => {
  //     console.log("MarkerDefault: useEffect; removing popup.");
  //     marker.setPopup();
  //     popupRef.current = null;
  //   };
  // }, [location, map, marker, popupElement, popupRef]);

  // const mountPopup = popup && !popupElement;
  // const popupProps: any = {
  //   ...popup,
  //   ref: popupRef
  // };

  // console.log(
  //   `MarkerDefault: render; popupElement=${!!popupElement}, mountPopup=${mountPopup}`
  // );

  return (
    <>
      {React.createElement(React.Fragment, {
        key: uid
      })}
      {popup && (
        <Popup {...props} ref={popupRef as RefObject<HTMLDivElement>}>
          Marker Popup!
        </Popup>
      )}
    </>
  );
}
