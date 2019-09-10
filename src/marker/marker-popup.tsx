import { Point, PointLike, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import { useMap } from "../map/map-context";


/**
 * A popup component for a Marker.
 */
const Popup: React.FC<Props> = ({ children, className, closeButton, offset, ...props }) => {
  // Non-public props created in the Marker when this component is cloned.
  const { setMapboxglPopup } = props as any;

  const ref = useRef<HTMLDivElement | null>(null);
  const popupObj = useRef<PopupGL | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const popup = new PopupGL({
      closeButton,
      offset
    }).setDOMContent(ref.current);

    popupObj.current = popup;
    setMapboxglPopup(popup);

    return () => {
      popupObj.current = null;
    };
  }, [closeButton, map, offset, setMapboxglPopup]);

  return <div className={className} ref={ref}>{children}</div>;
};

Popup.defaultProps = {
  closeButton: true
};

export default Popup;


export interface Props {
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
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
