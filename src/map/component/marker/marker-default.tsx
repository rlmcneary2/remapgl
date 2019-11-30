import React, { useCallback } from "react";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps } from "./marker-types";
import MarkerCommon from "./marker-common";

/**
 * Marker component with the default mapboxgl appearance.
 */
export default function MarkerDefault({
  map,
  ...props
}: MarkerDefaultProps): JSX.Element {
  console.log(`MarkerDefault[${props.uid}]: enter.`);

  const createElement = useCallback(
    () =>
      React.createElement(React.Fragment, {
        key: props.uid
      }),
    [props.uid]
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
