import React, { useEffect, useState, useCallback } from "react";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps } from "./marker-types";
import MarkerCommon from "./marker-common";

/**
 * Marker component with custom content.
 */
export default function MarkerCustom({
  map,
  ...props
}: MarkerCustomProps): JSX.Element {
  const [element, setElement] = useState<HTMLElement>();
  const [createMarker, setCreateMarker] = useState();

  const createElement = useCallback(
    // Do NOT remove these wrapping div tags! They allow the mapbox-gl code to
    // take ownership of the custom Marker DOM elements that were created by
    // React.
    () => (
      <div>
        {React.createElement(
          props.as || "div",
          {
            className: props.className,
            key: props.uid,
            ref: elem => setElement(elem as any)
          },
          props.children
        )}
      </div>
    ),
    [props.as, props.children, props.className, props.uid]
  );

  useEffect(() => {
    if (!element) {
      return;
    }

    setCreateMarker(() => () =>
      createMapboxGLMarker(
        map,
        {
          anchor: props.anchor,
          color: props.color,
          draggable: props.draggable,
          offset: props.offset
        },
        element
      )
    );
  }, [element, map, props.anchor, props.color, props.draggable, props.offset]);

  return (
    <MarkerCommon
      {...props}
      createElement={createElement}
      createMarker={createMarker}
    />
  );
}

export interface MarkerCustomProps extends MarkerProps {
  map: mapboxgl.Map;
  uid: string;
}
