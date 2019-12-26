import { useRef, useState, useCallback } from "react";
import { Marker as MarkerGL } from "mapbox-gl";
import { MarkerProps } from "./marker-types";
import { debug } from "../../../util/logger/logger";

/** A function that returns a mapbox-gl Marker instance, optionally using a
 * provided Marker element (a ref to a React component's DOM element). */
export type MarkerCreator = (element?: HTMLElement) => MarkerCreatorResult;
export type MarkerCreatorResult = [MarkerGL, MarkerRelease];
export type MarkerRelease = () => void;

interface HookOptions {
  createMarker?: MarkerCreator;
  props: MarkerProps;
  markerElement?: HTMLElement | null;
}

/**
 * Manages the lifecycle of a mapbox-gl Marker object for React components.
 */
export default function useMarkerState({
  createMarker,
  props,
  ...options
}: HookOptions): [MarkerGL | null, MarkerRelease] {
  const [releaseEventHandlers, setRelaseEventHandlers] = useState();
  const marker = useRef<MarkerGL>(null) as React.MutableRefObject<MarkerGL>;
  const release = useRef<MarkerRelease>(null) as React.MutableRefObject<
    MarkerRelease
  >;

  if (!marker.current && !release.current && createMarker) {
    const markerElement =
      "markerElement" in options ? options.markerElement : false;

    [marker.current, release.current] = !markerElement
      ? createMarker()
      : createMarker(markerElement);
  }

  if (!releaseEventHandlers && marker.current) {
    // The MarkerGL instance has been created; set the event listeners.
    const release = connectMarkerEventListeners(marker.current, props);
    setRelaseEventHandlers(() => release);
  }

  // The client must invoke this callback when the marker is removed from the
  // map to release the MarkerGL event listeners.
  const markerRelease = useCallback(() => {
    releaseEventHandlers && releaseEventHandlers();
    release.current && release.current();
    (release.current as any) = null;
    setRelaseEventHandlers(null);
  }, [release, releaseEventHandlers]);

  return [release.current ? marker.current : null, markerRelease];
}

const MARKER_EVENTS = Object.freeze(["drag", "dragend", "dragstart"]);

function connectMarkerEventListeners(marker: MarkerGL, props: MarkerProps) {
  const remove: (() => void)[] = [];
  const markerElement = marker.getElement();
  for (const key in props) {
    if (!key.startsWith("on") || typeof props[key] !== "function") {
      continue;
    }

    const name = key.substring(2).toLowerCase();
    const func = props[key];
    if (MARKER_EVENTS.includes(name)) {
      marker.on(name, func);
      remove.push(() => {
        marker.off(name, func);
      });
    } else {
      debug("useMarkerState", () => `useMarkerState: adding event '${name}'.`);
      markerElement.addEventListener(name, func);
      remove.push(() => {
        markerElement.removeEventListener(name, func);
      });
    }
  }

  return () => remove.forEach(func => func());
}
