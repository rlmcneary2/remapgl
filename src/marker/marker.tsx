import { LngLatLike, Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import { Props as PopupProps } from "./marker-popup";


/**
 * Creates a marker component.
 */
const Marker: React.FC<Props> = ({ children, className, location, popup, showPopup }) => {
  const ref = useRef<HTMLDivElement>(null);
  const markerObj = useRef<MarkerGL | null>(null);
  const [popupObj, setPopupObj] = useState<PopupGL | null>(null);
  const map = useMap();

  useEffect(() => {
    if (markerObj.current) {
      return;
    }

    const hasChildren = 0 < React.Children.count(children);

    // If there are children then the React element attached to ref has to exist
    // before the Marker can be created.
    let args: HTMLDivElement | undefined;
    if (hasChildren) {
      if (!ref.current) {
        return;
      } else {
        args = ref.current;
      }
    }

    // Create a marker but provide a dummy location. Don't use the location prop
    // because that means it will be wanted as a dependency of useEffect, but we
    // don't want the Marker removed and recreated just because it moved. A
    // location is needed because if there is no location when the Marker is
    // added to the map an error will be thrown.
    const marker = new MarkerGL(args)
      .setLngLat([0, 0])
      .addTo(map);

    markerObj.current = marker;

    return () => {
        marker.remove();
        markerObj.current = null;
      };
    }, [map]);

  // Update the marker location.
  useEffect(() => {
    if (markerObj.current) {
      markerObj.current.setLngLat(location);
    }
  }, [location]);

  useEffect(() => {
    const { current: marker } = markerObj;
    if (marker && popupObj) {
      marker.setPopup(popupObj);
    }

    // tslint:disable-next-line no-unused-expression
    return () => { marker && marker.setPopup(); };
  }, [popupObj]);

  function handleClick() {
    if (showPopup === "hover" && markerObj.current) {
      markerObj.current.togglePopup();
    }
  }

  function handleMouseChange() {
    if (showPopup === "hover" && markerObj.current) {
      markerObj.current.togglePopup();
    }
  }

  const popupComponent = popup && popup();

  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseChange}
      onMouseLeave={handleMouseChange}
      ref={ref}
    >
      {children}
      {popupComponent && React.cloneElement(popupComponent, { setMapboxglPopup: setPopupObj } as any)}
    </div>
  );
};

Marker.defaultProps = {
  popup: null
};

export default Marker;


export interface Props {
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * Set the marker's geographical position and move it.
   */
  location: LngLatLike;
  /**
   * A Popup component with content for this marker.
   */
  popup?: (() => React.ReactElement<PopupProps> | null) | null;
  /**
   * Displays a provided popup when the provided value is met.
   * - "hover" When the mouse is over the marker the popup will appear.
   * - "click" Clicking the marker will display the popup.
   */
  showPopup?: "click" | "hover";
}
