import { useEffect, useRef, useState, useCallback } from "react";
import { Marker as MarkerGL } from "mapbox-gl";
import { MarkerProps } from "./marker-types";

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
}: HookOptions): [MarkerGL | null, MarkerRelease] {
  const [markerState, setMarkerState] = useState<MarkerState>(
    MarkerState.initial
  );
  console.log(`useMarkerState[${markerState}]: enter.`);
  const [releaseEventHandlers, setRelaseEventHandlers] = useState();
  const marker = useRef<MarkerGL>(null) as React.MutableRefObject<MarkerGL>;
  const release = useRef<MarkerRelease>(null) as React.MutableRefObject<
    MarkerRelease
  >;

  /* The MarkerGL instance has been created. */
  useEffect(() => {
    if (markerState !== MarkerState.initial) {
      return;
    }
    console.log(`useMarkerState[${markerState}]: create.`);

    const markerElement =
      "markerElement" in options ? options.markerElement : false;

    [marker.current, release.current] = !markerElement
      ? createMarker()
      : createMarker(markerElement);

    setMarkerState(MarkerState.created);
  }, [createMarker, marker, release, markerState, options]);

  /* Once the MarkerGL instance has been created. */
  useEffect(() => {
    if (markerState !== MarkerState.created) {
      return;
    }
    console.log(`useMarkerState[${markerState}]: connect.`);

    const release = connectMarkerEventListeners(marker.current, props);
    setRelaseEventHandlers(() => release);
    setMarkerState(MarkerState.connected);
  }, [marker, markerState, props]);

  const markerRelease = useCallback(() => {
    console.log("useMarkerState: release.");
    releaseEventHandlers && releaseEventHandlers();
    release.current && release.current();
    setRelaseEventHandlers(null);
    setMarkerState(MarkerState.released);
    (release.current as any) = null;
  }, [release, releaseEventHandlers]);

  console.log(
    `useMarkerState[${markerState}]: return; marker.current=${!!marker.current}`
  );
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
    // console.log(`Listening for ${name}.`);
    marker.on(name, func);
    remove.push(() => {
      // console.log(`Removing listener for ${name}.`);
      marker.off(name, func);
    });
  }

  return () => remove.forEach(func => func());
}
