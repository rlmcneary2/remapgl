import { Marker as MarkerGL, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import { PopupProps } from "../popup/popup";
import { LngLat } from "../types/location";


/**
 * Creates a marker component.
 */
const Marker: React.FC<Props> = ({
  as = "div",
  children,
  className,
  location,
  popup: popupGetter,
  showPopup = ["click"]
}): JSX.Element => {
  const markerElement = useRef<HTMLElement | null>(null);
  const [ marker, setMarker ] = useState<MarkerGL | null>(null);
  const [ popup, setPopup ] = useState<PopupGL>();
  const map = useMap();

  const hasChildren = 0 < React.Children.count(children);

  useEffect(() => {
    if (marker) {
      return;
    }

    // If there are children then the React element attached to ref has to exist
    // before the Marker can be created.
    let args: HTMLElement | null = null;
    if (hasChildren) {
      if (!markerElement.current) {
        return;
      } else {
        args = markerElement.current;
      }
    }

    // Create a marker but provide a dummy location. Don't use the location prop
    // because that means it will be wanted as a dependency of useEffect, but we
    // don't want the Marker removed and recreated just because it moved. A
    // location is needed because if there is no location when the Marker is
    // added to the map an error will be thrown.
    const nextMarker = new MarkerGL(args as any)
      .setLngLat([0, 0])
      .addTo(map);

    setMarker(nextMarker);

    return () => {
        nextMarker.remove();
        setMarker(null);
      };
  }, [map]);

  // Connect event handlers to the Marker element.
  useEffect(() => {
    if (!marker) {
      return;
    }

    const elem = marker.getElement();
    elem.removeEventListener("click", handleClick);
    elem.removeEventListener("mouseenter", handleMouseChange);
    elem.removeEventListener("mouseleave", handleMouseChange);

    elem.addEventListener("click", handleClick);
    elem.addEventListener("mouseenter", handleMouseChange);
    elem.addEventListener("mouseleave", handleMouseChange);

    return () => {
      elem.removeEventListener("click", handleClick);
      elem.removeEventListener("mouseenter", handleMouseChange);
      elem.removeEventListener("mouseleave", handleMouseChange);
    };
  }, [ marker ]);

  // Update the marker location.
  useEffect(() => {
    if (marker) {
      marker.setLngLat(location);
    }
  }, [location, marker]);

  // Setup the Marker's popup (if it exists).
  useEffect(() => {
    if (marker && popup) {
      marker.setPopup(popup);
      marker.togglePopup();
    }

    // tslint:disable-next-line no-unused-expression
    return () => { marker && marker.setPopup(); };
  }, [marker, popup]);

  function handleClick(evt: any) {
    if (showPopup.includes("click") && marker) {
      marker.togglePopup();
    }

    // Always stop propagation so that the default marker and children markers
    // have the same behavior on clicks. The default marker always responds to
    // clicks but we want to ignore clicks if a showPopup value other than
    // "click" is specified.
    (evt as Event).stopPropagation();
  }

  function handleMouseChange() {
    if (showPopup.includes("hover") && marker) {
      marker.togglePopup();
    }
  }

  // TODO: this must be an instance of a <Popup /> component. How to type this
  // properly with TypeScript?
  const popupComponent = popupGetter && popupGetter();

  return (
    <>
      {hasChildren && React.createElement(
        as,
        {
          className,
          ref: markerElement
        },
        children
      )}
      {popupComponent && React.cloneElement(popupComponent, { setMapboxglPopup: setPopup } as any)}
    </>
  );
};

export default Marker;


type showPopupOn = "click" | "hover";

export interface Props {
  /**
   * The type of HTML element that wraps provided children; defaults to DIV.
   * Ignored if there are no children.
   */
  as?: string;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * Set the marker's geographical position and move it.
   */
  location: LngLat;
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
