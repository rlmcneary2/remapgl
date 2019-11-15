import { useEffect, useRef, useState } from "react";
import { Marker as MarkerGL } from "mapbox-gl";
// import {
//   useConnectEventListeners,
//   connectMarkerEventListeners
// } from "../../marker/marker-logic";
import { MarkerProps, ListenerProps } from "../../marker/marker-types";

export type MarkerCreator = (element?: HTMLElement) => MarkerCreatorResult;

export type MarkerCreatorResult = [MarkerGL, MarkerRemover];

export type MarkerRemover = () => void;

export enum MarkerState {
  initial = "INITIAL",
  created = "CREATED",
  connected = "CONNECTED"
}

interface HookOptions {
  createMarker: MarkerCreator;
  eventListeners: any;
  props: MarkerProps;
  markerElement?: HTMLElement | null;
}

export default function useMarkerState({
  createMarker,
  eventListeners,
  props,
  ...options
}: HookOptions): MarkerGL {
  const markerElement =
    "markerElement" in options ? options.markerElement : false;
  console.log(`useMarkerState: enter; markerElement=${markerElement}.`);
  const [markerState, setMarkerState] = useState<MarkerState>(
    MarkerState.initial
  );
  const marker = useRef<MarkerGL>(null) as React.MutableRefObject<MarkerGL>;
  const markerRemove = useRef<MarkerRemover>(null) as React.MutableRefObject<
    MarkerRemover
  >;

  useEffect(() => {
    if (markerElement !== false && !markerElement) {
      return;
    }

    let currentMarker: mapboxgl.Marker;
    if (markerState === MarkerState.initial) {
      console.log("useMarkerState: creating Marker.");
      [marker.current, markerRemove.current] = !markerElement
        ? createMarker()
        : createMarker(markerElement);

      currentMarker = marker.current;
      setMarkerState(MarkerState.created);
    }

    return () => {
      currentMarker &&
        console.warn("useMarkerState: SHOULD remove Marker but does NOTHING.");
      // markerRemove.current();
    };
  }, [createMarker, marker, markerElement, markerRemove, markerState]);

  useEffect(() => {
    if (markerElement !== false && !markerElement) {
      return;
    }

    let removeMarkerEventListeners: () => void;
    let removeEventListeners: () => void;
    if (markerState === MarkerState.created) {
      removeMarkerEventListeners = connectMarkerEventListeners(
        marker.current,
        props,
        eventListeners as MarkerProps
      );
      removeEventListeners = connectEventListeners(
        marker.current,
        props,
        eventListeners as ListenerProps
      );
      setMarkerState(MarkerState.connected);
    }

    return () => {
      removeMarkerEventListeners && removeMarkerEventListeners();
      removeEventListeners && removeEventListeners();
    };
  }, [eventListeners, marker, markerElement, markerState, props]);

  console.log(`useMarkerState: exit; marker=${!!marker.current}.`);
  return marker.current;
}

/**
 * Connect events that must be attached to the Marker's DOM element.
 */
function connectEventListeners(
  marker: MarkerGL,
  props: MarkerProps,
  eventListeners: ListenerProps
) {
  const { onDrag, onDragend, onDragstart, ..._eventListeners } = eventListeners;

  const markerElement = marker.getElement();

  const propsKeys = Object.keys(_eventListeners).filter(
    propKey =>
      propKey.startsWith("on") && typeof eventListeners[propKey] === "function"
  );

  function handlerFactory(propKey: string): (evt: Event) => void {
    return (evt: Event) => {
      console.log(`useMarkerState: handling ${propKey}.`);
      evt.stopPropagation();
      const eventListener = eventListeners[propKey];
      if (eventListener) {
        const { location, ...result } = props;
        // When the marker is dragged the props for this component don't
        // update, so provide the current location in the response.
        const data = { ...result, location: marker.getLngLat() };
        eventListener(data);
      }
    };
  }

  let handlers: { [key: string]: (evt: Event) => void } | null = {};
  for (const propKey of propsKeys) {
    const type = propKey.substr(2).toLowerCase();
    // const type = propKey;
    console.log(`useMarkerState: creating ${type} handler.`);
    handlers[type] = handlerFactory(propKey);
    // markerElement.addEventListener(type, handlers[type]);
    marker.on(propKey, handlers[type]);
  }

  return () => {
    // tslint:disable-next-line: forin
    for (const type in handlers) {
      // markerElement.removeEventListener(type, handlers[type]);
      marker.off(type, handlers[type]);
    }

    handlers = null;
  };
}

/**
 * Connect the drag events supported by the MapboxGL Marker object.
 */
export function connectMarkerEventListeners(
  marker: MarkerGL,
  props: MarkerProps,
  { onDrag, onDragend, onDragstart }: MarkerProps
) {
  console.log("connectMarkerEventListeners: enter");
  const disconnect: (() => void)[] = [];

  // Drag
  function handleDrag() {
    if (onDrag) {
      onDrag(props);
    }
  }
  marker.on("drag", handleDrag);
  disconnect.push(() => {
    marker.off("drag", handleDrag);
  });

  // Drag end
  function handleDragend() {
    console.log("useMarkerState: dragend");
    if (marker && onDragend) {
      onDragend(marker.getLngLat());
    }
  }
  console.log("useMarkerState: on dragend");
  marker.on("dragend", handleDragend);
  disconnect.push(() => {
    marker.off("dragend", handleDragend);
  });

  // Drag start
  function handleDragstart() {
    if (marker && onDragstart) {
      onDragstart(marker.getLngLat());
    }
  }
  marker.on("dragstart", handleDragstart);
  disconnect.push(() => {
    marker.off("dragstart", handleDragstart);
  });

  return () => disconnect.forEach(off => off());
}
