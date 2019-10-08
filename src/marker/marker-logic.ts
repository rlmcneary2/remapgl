import { Map as MapGL, Marker as MarkerGL, Point as PointGL } from "mapbox-gl";
import React, { useEffect } from "react";
import { ListenerProps, MarkerProps } from "./marker-types";


/**
 * Connect other events that must be attached to the Marker's DOM element.
 */
export function connectEventListeners(marker: MarkerGL | null, props: MarkerProps, eventListeners: ListenerProps) {
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
      markerElement.addEventListener(type, listeners[type]);
    }

    return () => {
      // tslint:disable-next-line: forin
      for (const type in listeners) {
        markerElement.removeEventListener(type, listeners[type]);
      }

      listeners = null;
    };
  }, [marker, eventListeners]);
}

/**
 * Connect the drag events supported by the MapboxGL Marker object.
 */
export function connectMarkerEventListeners(marker: MarkerGL | null, props: MarkerProps, { onDrag, onDragend, onDragstart }: MarkerProps) {
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

export function createMapboxGLMarker(map: MapGL, markerElement: HTMLElement | null, { anchor, children, color, draggable, offset }: MarkerProps): MarkerGL | void {
  const hasChildren = 0 < React.Children.count(children);
  const options: mapboxgl.MarkerOptions = {
    anchor,
    color,
    draggable
  };

  // If there are children then the React element attached to ref has to exist
  // before the Marker can be created.
  if (hasChildren) {
    if (!markerElement) {
      return;
    } else {
      options.element = markerElement;
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
  return new MarkerGL(options)
    .setLngLat([0, 0])
    .addTo(map);
}
