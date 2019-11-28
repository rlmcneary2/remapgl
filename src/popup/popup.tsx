import React, { forwardRef, useEffect, useRef } from "react";
import { Point, Popup as PopupGL } from "mapbox-gl";
import { useMap } from "../map/map-context";
import { LngLat } from "../types/location";
import { AnchorType } from "../types/ui";

export default forwardRef<HTMLDivElement, PopupProps | MarkerPopupProps>(
  function Popup(
    { anchor, children, closeButton = true, offset, ...popupProps },
    popupElement
  ): JSX.Element {
    console.log("Popup: enter.");
    // const popupElement = useRef<HTMLDivElement>(null);
    const popup = useRef<PopupGL | null>(null);
    const map = useMap();

    const { className, location, onPopupGLChange } = popupProps as any;

    useEffect(() => {
      if (
        !popupElement ||
        !(popupElement as React.MutableRefObject<HTMLDivElement>).current
      ) {
        return;
      }

      const popupNext = new PopupGL({
        anchor,
        closeButton,
        offset
      })
        // .setDOMContent(
        //   (popupElement as React.MutableRefObject<HTMLDivElement>).current
        // )
        .addTo(map);

      location && popupNext.setLngLat([0, 0]); // tslint:disable-line no-unused-expression

      popup.current = popupNext;
      onPopupGLChange && onPopupGLChange(popupNext); // tslint:disable-line no-unused-expression

      return () => {
        popupNext.remove();
        popup.current = null;
      };
    }, [
      anchor,
      closeButton,
      location,
      map,
      offset,
      onPopupGLChange,
      popupElement
    ]);

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
);

// function Popup({
//   anchor,
//   children,
//   closeButton = true,
//   offset,
//   ...popupProps
// }: PopupProps | MarkerPopupProps): JSX.Element {
//   console.log("Popup: enter.");
//   const popupElement = useRef<HTMLDivElement>(null);
//   const popup = useRef<PopupGL | null>(null);
//   const map = useMap();

//   const { className, location, onPopupGLChange } = popupProps as any;

//   useEffect(() => {
//     if (!popupElement.current) {
//       return;
//     }

//     const popupNext = new PopupGL({
//       anchor,
//       closeButton,
//       offset
//     })
//       .setDOMContent(popupElement.current)
//       .addTo(map);

//     location && popupNext.setLngLat([0, 0]); // tslint:disable-line no-unused-expression

//     popup.current = popupNext;
//     onPopupGLChange && onPopupGLChange(popupNext); // tslint:disable-line no-unused-expression

//     return () => {
//       popupNext.remove();
//       popup.current = null;
//     };
//   }, [anchor, closeButton, location, map, offset, onPopupGLChange]);

//   useEffect(() => {
//     if (location && popup.current) {
//       popup.current.setLngLat(location);
//     }
//   }, [location]);

//   // TODO: this should be a clone with additional props.
//   return (
//     <div className={className} ref={popupElement}>
//       {children}
//     </div>
//   );
// }

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
  offset?: number | Point;
}

export interface PopupProps extends MarkerPopupProps {
  /**
   * Sets the geographical location of the popup's anchor, and moves the popup to it.
   */
  location: LngLat;
}
