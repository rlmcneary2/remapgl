import { Marker as MarkerGL, Point as PointGL, Popup as PopupGL } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import { PopupProps } from "../popup/popup";
import { LngLat, Point } from "../types/location";


/**
 * Creates a marker component.
 */
const Marker: React.FC<MarkerProps> = (props): JSX.Element => {
  const {
    anchor,
    as = "div",
    children,
    className,
    color,
    draggable,
    location,
    offset,
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

    const options: mapboxgl.MarkerOptions = {
      anchor,
      color,
      draggable
    };

    // If there are children then the React element attached to ref has to exist
    // before the Marker can be created.
    if (hasChildren) {
      if (!markerElement.current) {
        return;
      } else {
        options.element = markerElement.current;
      }
    }

    if (offset) {
      options.offset = new PointGL(offset.x, offset.y);
    }

    // Create a marker but provide a dummy location. Don't use the location prop
    // because that means it will be wanted as a dependency of useEffect, but we
    // don't want the Marker removed and recreated just because it moved. A
    // location is needed because if there is no location when the Marker is
    // added to the map an error will be thrown.
    const nextMarker = new MarkerGL(options)
      .setLngLat([0, 0])
      .addTo(map);

    setMarker(nextMarker);

    return () => {
        nextMarker.remove();
        setMarker(null);
      };
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

/**
 * Connect the drag events supported by the MapboxGL Marker object.
 */
function connectMarkerEventListeners(marker: MarkerGL | null, props: MarkerProps, { onDrag, onDragend, onDragstart }: MarkerProps) {
  useEffect(() => {
    if (!marker || !onDrag) {
      return;
    }

    function handler() {
      if (onDrag) {
        onDrag(props);
      }
    }

    marker.on("drag", handler);
    return () => { marker.off("drag", handler); };
  }, [marker, onDrag, props]);

  useEffect(() => {
    if (!marker || !onDragend) {
      return;
    }

    console.log("connectMarkerEventListeners()");

    function handler() {
      if (marker && onDragend) {
        onDragend(marker.getLngLat());
      }
    }

    marker.on("dragend", handler);
    return () => { marker.off("dragend", handler); };
  }, [marker, onDragend]);

  useEffect(() => {
    if (!marker || !onDragstart) {
      return;
    }

    function handler() {
      if (marker && onDragstart) {
        onDragstart(marker.getLngLat());
      }
    }

    marker.on("dragstart", handler);
    return () => { marker.off("dragstart", handler); };
  }, [marker, onDragstart]);
}

/**
 * Connect other events that must be attached to the Marker's DOM element.
 */
function connectEventListeners(marker: MarkerGL | null, props: MarkerProps, eventListeners: ListenerProps) {
  useEffect(() => {
    if (!marker) {
      return;
    }

    const {onDrag, onDragend, onDragstart, ..._eventListeners} = eventListeners;

    const markerElement = marker.getElement();

    const propsKeys = Object.keys(_eventListeners)
      .filter(propKey => propKey.startsWith("on") && typeof eventListeners[propKey] === "function");

    function listenerFactory(propKey: string): (evt: Event) => void {
      return (evt: Event) => {
        evt.stopPropagation();
        const eventListener = eventListeners[propKey];
        if (marker && eventListener) {
          const { location, ...result } = props;
          // When the marker is dragged the props for this component don't
          // update, so provide the current location in the response.
          const data = {...result, location: marker.getLngLat()};
          eventListener(data);
        }
      };
    }

    let listeners: { [key: string]: (evt: Event) => void; } | null = {};
    for (const propKey of propsKeys) {
      const type = propKey.substr(2).toLowerCase();
      listeners[type] = listenerFactory(propKey);
      console.log(`marker listening for ${type}`);
      markerElement.addEventListener(type, listeners[type]);
    }

    return () => {
      // tslint:disable-next-line: forin
      for (const type in listeners) {
        console.log(`marker NOT listening for ${type}`);
        markerElement.removeEventListener(type, listeners[type]);
      }

      listeners = null;
    };
  }, [marker, eventListeners]);
}


type AnchorType = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

type DragHandler = (data: LngLat) => void;

type ListenerProp = (data: MarkerProps) => void;

interface ListenerProps {
  [key: string]: ListenerProp | undefined;
}

interface MarkerProps {
  /**
   * The type of HTML element that wraps provided children; defaults to DIV.
   * Ignored if there are no children.
   */
  as?: string;
  /**
   * A string indicating the part of the Marker that should be positioned
   * closest to the coordinate set ny location. Can't be changed once set.
   */
  anchor?: AnchorType;
  /**
   * Defines the appearance of a marker. If not provided the default pin marker
   * will be displayed
   */
  children?: JSX.Element;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * The color to use for the default marker if children are not provided. The
   * default is light blue. Can't be changed once set.
   */
  color?: string;
  /**
   * Indicates if a marker can be dragged to a new location on the map.
   */
  draggable?: boolean;
  /**
   * Set the marker's geographical position and move it.
   */
  location: LngLat;
  /**
   * The offset in pixels to apply relative to the element's center. Negative
   * values indicate left and up.
   */
  offset?: Point;
  /**
   * Fired when the marker is clicked.
   */
  onClick?: ListenerProp;
  /**
   * Fired while dragging.
   */
  onDrag?: ListenerProp;
  /**
   * Fired when the marker is finished being dragged.
   */
  onDragend?: DragHandler;
  /**
   * Fired when dragging starts.
   */
  onDragstart?: DragHandler;
  /**
   * Fired when the mouse enters the marker.
   */
  onMouseenter?: ListenerProp;
  /**
   * Fired when the mouse exits the marker.
   */
  onMouseleave?: ListenerProp;
  /**
   * A Popup component with content for this marker.
   */
  popup?: () => React.ReactElement<PopupProps>;
  /**
   * If true the popup will be shown.
   */
  togglePopup?: boolean;
}
