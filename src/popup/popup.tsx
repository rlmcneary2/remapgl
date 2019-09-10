import { LngLatLike, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import { useMap } from "../map/map-context";


export const PopupInternal: React.FC<PropsInternal> = ({ children, closeButton, location }): React.ReactElement | null => {
  const ref = useRef<HTMLDivElement>(null);
  const popupObj = useRef<PopupGL | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const popup = new PopupGL({
      closeButton
    })
      .setLngLat([0, 0])
      .setDOMContent(ref.current)
      .addTo(map);

    popupObj.current = popup;

    return () => {
      popup.remove();
      popupObj.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (popupObj.current) {
      popupObj.current.setLngLat(location);
    }
  }, [location]);

  return <div ref={ref}>{children}</div>;
};

PopupInternal.defaultProps = {
  closeButton: true
};


const Popup: React.FC<Props> = ({ children, closeButton }): React.ReactElement => {
  return <>{children}</>;
};

export default Popup;


export interface Props {
  closeButton?: boolean;
}

interface PropsInternal extends Props {
  children: React.ReactNode;
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
   */
  location: LngLatLike;
}