import { Point, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import { useMap } from "../map/map-context";
import { LngLat } from "../types/location";
import { AnchorType } from "../types/ui";


export default function Popup(props: PopupProps | MarkerPopupProps): JSX.Element {
  const {
    anchor,
    children,
    closeButton = true,
    offset,
    ...popupProps
  } = props;
  const popupElement = useRef<HTMLDivElement>(null);
  const popup = useRef<PopupGL | null>(null);
  const map = useMap();

  const { className, location, setMapboxglPopup } = popupProps as any;

  useEffect(() => {
    if (!popupElement.current) {
      return;
    }

    const popupNext = new PopupGL({
      anchor,
      closeButton,
      offset
    })
      .setDOMContent(popupElement.current)
      .addTo(map);

    location && popupNext.setLngLat([0, 0]); // tslint:disable-line no-unused-expression

    popup.current = popupNext;
    setMapboxglPopup && setMapboxglPopup(popupNext); // tslint:disable-line no-unused-expression

    return () => {
      popupNext.remove();
      popup.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (location && popup.current) {
      popup.current.setLngLat(location);
    }
  }, [location]);

  // TODO: this should be a clone with additional props.
  return (
    <div className={className} ref={popupElement}>
      {children}
    </div>
  );
}


export interface MarkerPopupProps {
  /**
   * A string indicating the part of the Marker that should be positioned
   * closest to the coordinate set by location. Can't be changed once set.
   */
  anchor?: AnchorType;
  children: React.ReactNode;
  /**
   * If true, a close button will appear in the top right corner of the popup.
   */
  closeButton?: boolean;
  /**
   * The offset in pixels to apply relative to the element's center. Negative
   * values indicate left and up.
   */
  offset?: Point;
}

export interface PopupProps extends MarkerPopupProps {
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
   */
  location: LngLat;
}
