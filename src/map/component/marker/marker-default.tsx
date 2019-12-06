import React, { useCallback } from "react";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps } from "./marker-types";
import MarkerCommon from "./marker-common";

/**
 * Marker component with the default mapboxgl appearance.
 */
export default function MarkerDefault({
  as: createAs,
  map,
  ...props
}: MarkerDefaultProps): JSX.Element {
  const createElement = useCallback(
    () =>
      React.createElement(createAs || React.Fragment, {
        key: props.uid
      }),
    [createAs, props.uid]
  );

  const createMarker = useCallback(
    () =>
      createMapboxGLMarker(map, {
        anchor: props.anchor,
        color: props.color,
        draggable: props.draggable,
        offset: props.offset
      }),
    [map, props.anchor, props.color, props.draggable, props.offset]
  );

  return (
    <MarkerCommon
      {...props}
      createElement={createElement}
      createMarker={createMarker}
    />
  );
}

export interface MarkerDefaultProps extends MarkerProps {
  map: mapboxgl.Map;
  uid: string;
}
