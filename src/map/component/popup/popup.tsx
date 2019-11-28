import React, { forwardRef, useEffect, useRef } from "react";
import { Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../../map-context";
import { InternalPopupProps, PopupProps } from "./popup-types";

export default forwardRef<HTMLDivElement, PopupProps>(function Popup(
  { anchor, children, closeButton = true, offset, ...props },
  forwardedRef
): JSX.Element {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const popup = useRef<PopupGL | null>(null);
  const map = useMap();

  const { location, marker } = props as InternalPopupProps;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const popupNext = new PopupGL({
      anchor,
      closeButton,
      offset
    }).setDOMContent(ref.current);

    if (marker) {
      (marker as MarkerGL).setPopup(popupNext);
    } else {
      popupNext.addTo(map);
      location && popupNext.setLngLat([0, 0]);
    }

    popup.current = popupNext;

    return () => {
      !marker ? popupNext.remove() : marker.setPopup();
      popup.current = null;
    };
  }, [anchor, closeButton, location, map, marker, offset, ref]);

  useEffect(() => {
    if (!marker && location && popup.current) {
      popup.current.setLngLat(location);
    }
  }, [location, marker]);

  return (
    <div
      ref={div => {
        ref.current = div;
        forwardedRef &&
          ((forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = div);
      }}
    >
      {children}
    </div>
  );
});
