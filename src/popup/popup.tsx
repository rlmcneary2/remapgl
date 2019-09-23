import { Point, PointLike, Popup as PopupGL } from "mapbox-gl";
import React, { forwardRef, useEffect, useRef } from "react";
import { useMap } from "../map/map-context";
import { LngLat } from "../types/location";


export const Popup: React.FC<PopupProps | MarkerPopupProps> = ({ children, closeButton = true, offset, ...popupProps }): JSX.Element => {
  const popupElement = useRef<HTMLDivElement>(null);
  const popup = useRef<PopupGL | null>(null);
  const map = useMap();

  const { className, location, setMapboxglPopup, ...props } = popupProps as any;

  useEffect(() => {
    if (!popupElement.current) {
      return;
    }

    const popupNext = new PopupGL({
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
  return <div className={className} ref={popupElement}>{children}</div>;
};

export default Popup;


export interface MarkerPopupProps {
  children: React.ReactNode;
  /**
   * If true, a close button will appear in the top right corner of the popup.
   */
  closeButton?: boolean;
  /**
   * A pixel offset applied to the popup's location.
   * - a single number specifying a distance from the popup's location
   * - a PointLike specifying a constant offset
   * - an object of Points specifing an offset for each anchor position Negative offsets indicate left and up.
   */
  offset?: number | PointLike | { [key: string]: Point };
}

export interface PopupProps extends MarkerPopupProps {
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
   */
  location: LngLat;
}
