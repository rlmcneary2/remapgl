import { LngLatLike, Point, PointLike, Popup as PopupGL } from "mapbox-gl";
import React, { forwardRef, useEffect, useRef } from "react";
import { useMap } from "../map/map-context";


export const Popup: React.FC<PopupProps | MarkerPopupProps> = ({ children, closeButton = true, offset, ...popupProps }): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const popupObj = useRef<PopupGL | null>(null);
  const map = useMap();

  const { className, location, setMapboxglPopup, ...props } = popupProps as any;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const popup = new PopupGL({
      closeButton,
      offset
    })
      .setDOMContent(ref.current)
      .addTo(map);

    location && popup.setLngLat([0, 0]); // tslint:disable-line no-unused-expression

    popupObj.current = popup;
    setMapboxglPopup && setMapboxglPopup(popup); // tslint:disable-line no-unused-expression

    return () => {
      popup.remove();
      popupObj.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (location && popupObj.current) {
      popupObj.current.setLngLat(location);
    }
  }, [location]);

  // TODO: this should be a clone with additional props.
  return <div className={className} ref={ref}>{children}</div>;
};

export default Popup;


export interface MarkerPopupProps {
  children: React.ReactNode;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
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
  location: LngLatLike;
}
