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
