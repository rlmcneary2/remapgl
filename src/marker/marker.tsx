import { LngLatLike, Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import { PopupProps } from "../popup/popup";


/**
 * Creates a marker component.
 */
const Marker: React.FC<Props> = ({
  children,
  className,
  location,
  popup,
  showPopup = ["click"]
}): JSX.Element => {
  const ref = useRef<HTMLElement | null>(null);
  const markerObj = useRef<MarkerGL | null>(null);
  const [popupObj, setPopupObj] = useState<PopupGL>();
  const map = useMap();

  const hasChildren = 0 < React.Children.count(children);

  useEffect(() => {
    if (markerObj.current) {
      return;
    }

    // If there are children then the React element attached to ref has to exist
    // before the Marker can be created.
    let args: HTMLElement | undefined;
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

  // Connect event handlers to the default Marker element if no children are
  // provided.
  useEffect(() => {
    if (hasChildren) {
      return;
    }

    let elem: HTMLElement;
    if (markerObj.current && !ref.current) {
      elem = markerObj.current.getElement();
      ref.current = elem;

      elem.addEventListener("click", handleClick);
      elem.addEventListener("mouseenter", handleMouseChange);
      elem.addEventListener("mouseleave", handleMouseChange);
    }

    return () => {
      if (!elem) {
        return;
      }

      elem.removeEventListener("click", handleClick);
      elem.removeEventListener("mouseenter", handleMouseChange);
      elem.removeEventListener("mouseleave", handleMouseChange);
      ref.current = null;
    };
  }, [ hasChildren ]);

  // Update the marker location.
  useEffect(() => {
    if (markerObj.current) {
      markerObj.current.setLngLat(location);
    }
  }, [location]);

  // Setup the Marker's popup (if it exists).
  useEffect(() => {
    const { current: marker } = markerObj;
    if (marker && popupObj) {
      marker.setPopup(popupObj);
      marker.togglePopup();
    }

    // tslint:disable-next-line no-unused-expression
    return () => { marker && marker.setPopup(); };
  }, [popupObj]);

  function handleClick(evt: any) {
    if (showPopup.includes("click") && markerObj.current) {
      markerObj.current.togglePopup();
    }

    // Always stop propagation so that the default marker and children markers
    // have the same behavior on clicks. The default marker always responds to
    // clicks but we want to ignore clicks if a showPopup value other than
    // "click" is specified.
    (evt as Event).stopPropagation();
  }

  function handleMouseChange() {
    if (showPopup.includes("hover") && markerObj.current) {
      markerObj.current.togglePopup();
    }
  }

  // TODO: this must be an instance of a <Popup /> component. How to type this
  // properly with TypeScript?
  const popupComponent = popup && popup();

  // TODO: clone children with additional props rather than creating a div element.
  return (
    <>
      {hasChildren &&
        <div
          className={className}
          onClick={handleClick}
          onMouseEnter={handleMouseChange}
          onMouseLeave={handleMouseChange}
          ref={ref as any}
        >
          {children}
        </div>
      }
      {popupComponent && React.cloneElement(popupComponent, { setMapboxglPopup: setPopupObj } as any)}
    </>
  );
};

export default Marker;


type showPopupOn = "click" | "hover";

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
  popup?: () => React.ReactElement<PopupProps>;
  /**
   * Displays a popup when one of the provided states occurs.
   * - "hover" When the mouse is over the marker the popup will appear.
   * - "click" Clicking the marker will toggle the display of the popup.
   */
  showPopup?: showPopupOn[];
}
