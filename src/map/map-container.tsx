/* Copyright (c) 2020 Richard L. McNeary II
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
import React, { useState, useEffect } from "react";
import MapContextProvider from "./map-context";
import MapContent from "./map-content";
import { MapContainerProps } from "./map-types";

/**
 * Creates the HTML object for the map and a MaboxGL Map object.
 */
export default function MapContainer({
  as = "div",
  children,
  className,
  style,
  ...props
}: React.PropsWithChildren<MapContainerProps>): JSX.Element {
  // mapElement is stored with useState so when the element is created the
  // MapContext will be updated with the container element for the map.
  const [mapElement, setMapElement] = useState<HTMLElement>();

  // Release the mapElement when this component is unmounted.
  useEffect(() => () => mapElement && setMapElement(undefined), [mapElement]);

  return React.createElement(
    as,
    {
      className,
      ref: (element: HTMLElement) => setMapElement(element),
      style
    },
    <MapContextProvider container={mapElement} {...props}>
      <MapContent>{children}</MapContent>
    </MapContextProvider>
  );
}
