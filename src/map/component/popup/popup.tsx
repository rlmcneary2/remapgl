import React, { forwardRef, useEffect, useRef } from "react";
import { Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { PopupProps } from "./popup-types";

export default forwardRef<HTMLDivElement, PopupProps>(function Popup(
  { anchor, children, closeButton = true, offset, ...props },
  forwardedRef
): JSX.Element {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const popup = useRef<PopupGL | null>(null);
  const map = useMap();

  const { location, marker, onPopupAttached } = props as any;
  console.log(`Popup: marker=${!!marker}`);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const popupNext = new PopupGL({
      anchor,
      closeButton,
      offset
    }).setDOMContent(ref.current);

    if (onPopupAttached) {
      console.log("Popup: onPopupAttached.");
      onPopupAttached(popupNext);
      return;
    }

    if (marker) {
      console.log("Popup: set popup on marker.");
      (marker as MarkerGL).setPopup(popupNext);
    } else {
      console.log("Popup: add popup to map.");
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
});
