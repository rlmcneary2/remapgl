/*
 * Copyright (c) 2020 Richard L. McNeary II
 *
 * MIT License Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { useEffect, useState, useCallback } from "react";
import { createMapboxGLMarker } from "./marker-logic";
import { MarkerProps } from "./marker-types";
import MarkerCommon from "./marker-common";

/**
 * Marker component with custom content.
 */
export default function MarkerCustom({
  as: createAs = "div",
  children,
  className,
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
          createAs,
          {
            className,
            key: props.uid,
            ref: (elem: HTMLElement) => setElement(elem)
          },
          children
        )}
      </div>
    ),
    [children, className, createAs, props.uid]
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
