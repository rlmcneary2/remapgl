import { Marker as MarkerGL, Point as PointGL, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import { connectEventListeners, connectMarkerEventListeners, createMapboxGLMarker } from "./marker-logic";
import { ListenerProps, MarkerProps } from "./marker-types";


/**
 * Creates a marker component.
 */
const Marker: React.FC<MarkerProps> = (props): JSX.Element => {
  const {
    as = "div",
    children,
    className,
    location,
    popup: popupGetter,
    togglePopup,
    ...eventListeners
  } = props;
  const markerElement = useRef<HTMLElement | null>(null);
  const [ marker, setMarker ] = useState<MarkerGL | null>(null);
  const [ popup, setPopup ] = useState<PopupGL>();
  const popupDisplayed = useRef(false);
  const map = useMap();

  const hasChildren = 0 < React.Children.count(children);

  useEffect(() => {
    if (marker) {
      return;
    }

    const nextMarker = createMapboxGLMarker(map, markerElement.current, props);
    if (nextMarker) {
      setMarker(nextMarker);
      return () => {
        nextMarker.remove();
        setMarker(null);
      };
    }
  }, [map]);

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
      popupDisplayed.current = true;
    }

    // tslint:disable-next-line no-unused-expression
    return () => { marker && marker.setPopup(); };
  }, [marker, popup]);

  useEffect(() => {
    if (marker) {
      if (togglePopup && !popupDisplayed.current) {
        popupDisplayed.current = true;
        marker.togglePopup();
      }
      if (!togglePopup && popupDisplayed.current) {
        popupDisplayed.current = false;
        marker.togglePopup();
      }
    }
  }, [togglePopup, marker]);

  connectMarkerEventListeners(marker, props, eventListeners as MarkerProps);
  connectEventListeners(marker, props, eventListeners as ListenerProps);

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

// /**
//  * Connect the drag events supported by the MapboxGL Marker object.
//  */
// function connectMarkerEventListeners(marker: MarkerGL | null, props: MarkerProps, { onDrag, onDragend, onDragstart }: MarkerProps) {
//   useEffect(() => {
//     if (!marker || !onDrag) {
//       return;
//     }

//     function handler() {
//       if (onDrag) {
//         onDrag(props);
//       }
//     }

//     marker.on("drag", handler);
//     return () => { marker.off("drag", handler); };
//   }, [marker, onDrag, props]);

//   useEffect(() => {
//     if (!marker || !onDragend) {
//       return;
//     }

//     function handler() {
//       if (marker && onDragend) {
//         onDragend(marker.getLngLat());
//       }
//     }

//     marker.on("dragend", handler);
//     return () => { marker.off("dragend", handler); };
//   }, [marker, onDragend]);

//   useEffect(() => {
//     if (!marker || !onDragstart) {
//       return;
//     }

//     function handler() {
//       if (marker && onDragstart) {
//         onDragstart(marker.getLngLat());
//       }
//     }

//     marker.on("dragstart", handler);
//     return () => { marker.off("dragstart", handler); };
//   }, [marker, onDragstart]);
// }

// /**
//  * Connect other events that must be attached to the Marker's DOM element.
//  */
// function connectEventListeners(marker: MarkerGL | null, props: MarkerProps, eventListeners: ListenerProps) {
//   useEffect(() => {
//     if (!marker) {
//       return;
//     }

//     const {onDrag, onDragend, onDragstart, ..._eventListeners} = eventListeners;

//     const markerElement = marker.getElement();

//     const propsKeys = Object.keys(_eventListeners)
//       .filter(propKey => propKey.startsWith("on") && typeof eventListeners[propKey] === "function");

//     function listenerFactory(propKey: string): (evt: Event) => void {
//       return (evt: Event) => {
//         evt.stopPropagation();
//         const eventListener = eventListeners[propKey];
//         if (marker && eventListener) {
//           const { location, ...result } = props;
//           // When the marker is dragged the props for this component don't
//           // update, so provide the current location in the response.
//           const data = {...result, location: marker.getLngLat()};
//           eventListener(data);
//         }
//       };
//     }

//     let listeners: { [key: string]: (evt: Event) => void; } | null = {};
//     for (const propKey of propsKeys) {
//       const type = propKey.substr(2).toLowerCase();
//       listeners[type] = listenerFactory(propKey);
//       markerElement.addEventListener(type, listeners[type]);
//     }

//     return () => {
//       // tslint:disable-next-line: forin
//       for (const type in listeners) {
//         markerElement.removeEventListener(type, listeners[type]);
//       }

//       listeners = null;
//     };
//   }, [marker, eventListeners]);
// }
