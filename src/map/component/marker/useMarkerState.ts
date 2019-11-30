import { useEffect, useRef, useState, useCallback } from "react";
import { Marker as MarkerGL } from "mapbox-gl";
import { MarkerProps } from "./marker-types";

/** A function that returns a mapbox-gl Marker instance, optionally using a
 * provided Marker element (a ref to a React component's DOM element). */
export type MarkerCreator = (element?: HTMLElement) => MarkerCreatorResult;
export type MarkerCreatorResult = [MarkerGL, MarkerRelease];
export type MarkerRelease = () => void;
export enum MarkerState {
  initial = "INITIAL",
  created = "CREATED",
  connected = "CONNECTED",
  released = "RELEASED"
}

interface HookOptions {
  createMarker?: MarkerCreator;
  eventListeners: any;
  props: MarkerProps;
  markerElement?: HTMLElement | null;
}

/**
 * Manages the lifecycle of a mapbox-gl Marker object for React components.
 */
export default function useMarkerState({
  createMarker,
  eventListeners,
  props,
  ...options
}: HookOptions): [MarkerGL | null, MarkerRelease] {
  const [markerState, setMarkerState] = useState<MarkerState>(
    MarkerState.initial
  );
  const [releaseEventHandlers, setRelaseEventHandlers] = useState();
  const marker = useRef<MarkerGL>(null) as React.MutableRefObject<MarkerGL>;
  const release = useRef<MarkerRelease>(null) as React.MutableRefObject<
    MarkerRelease
  >;

  useEffect(() => {
    if (markerState !== MarkerState.initial || !createMarker) {
      return;
    }

    // The MarkerGL instance does not exist yet, create it.
    const markerElement =
      "markerElement" in options ? options.markerElement : false;

    [marker.current, release.current] = !markerElement
      ? createMarker()
      : createMarker(markerElement);

    setMarkerState(MarkerState.created);
  }, [createMarker, marker, release, markerState, options]);

  useEffect(() => {
    if (markerState !== MarkerState.created) {
      return;
    }

    // The MarkerGL instance has been created; set the event listeners.
    const release = connectMarkerEventListeners(marker.current, props);
    setRelaseEventHandlers(() => release);
    setMarkerState(MarkerState.connected);
  }, [marker, markerState, props]);

  // The client must invoke this callback when the marker is removed from the
  // map to release the MarkerGL event listeners.
  const markerRelease = useCallback(() => {
    releaseEventHandlers && releaseEventHandlers();
    release.current && release.current();
    setRelaseEventHandlers(null);
    setMarkerState(MarkerState.released);
    (release.current as any) = null;
  }, [release, releaseEventHandlers]);

  return [
    markerState !== MarkerState.released ? marker.current : null,
    markerRelease
  ];
}

function connectMarkerEventListeners(marker: MarkerGL, props: MarkerProps) {
  const remove: (() => void)[] = [];
  for (const key in props) {
    if (!key.startsWith("on") || typeof props[key] !== "function") {
      continue;
    }

    const name = key.substring(2).toLowerCase();
    const func = props[key];
    marker.on(name, func);
    remove.push(() => {
      marker.off(name, func);
    });
  }

  return () => remove.forEach(func => func());
}
