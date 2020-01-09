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
import { Map as MapGL, Marker as MarkerGL, Point as PointGL } from "mapbox-gl";
import { Point } from "../../../types/location";
import { AnchorType } from "../../../types/ui";

export function createMapboxGLMarker(
  map: MapGL,
  { anchor, color, draggable, offset }: Options,
  markerElement?: HTMLElement
): [MarkerGL, () => void] {
  const options: mapboxgl.MarkerOptions = {
    anchor,
    color,
    element: markerElement,
    draggable
  };

  if (offset) {
    options.offset = new PointGL(offset.x, offset.y);
  }

  // Create a marker but provide a dummy location. Don't use the location prop
  // because that means it will be wanted as a dependency of useEffect, but we
  // don't want the Marker removed and recreated just because it moved. A
  // location is needed because if there is no location when the Marker is
  // added to the map an error will be thrown.
  const marker = new MarkerGL(options).setLngLat([0, 0]).addTo(map);
  return [marker, () => marker.remove()];
}

export interface Options {
  anchor?: AnchorType;
  color?: string;
  draggable?: boolean;
  offset?: Point;
}
