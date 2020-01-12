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
import { useEffect, useRef } from "react";
import { GeolocateControl } from "mapbox-gl";
import { FitBoundsOptions } from "../../../types/location";
import { useMap } from "../../map-context";
import { copyDefinedProperties } from "../../../util/props/props";
import { ControlPosition } from "../../../types/ui";

export default function Geolocate({ position, ...props }: Props): null {
  const geolocateControl = useRef<GeolocateControl | null>(null);
  const map = useMap();

  useEffect(() => {
    // Only create the scale control once. The same ScaleControl instance is
    // maintained for the lifetime of the Scale component.
    if (!map || geolocateControl.current) {
      return;
    }

    geolocateControl.current = new GeolocateControl(
      copyDefinedProperties(props)
    );

    const args: [mapboxgl.Control, ControlPosition?] = [
      geolocateControl.current as mapboxgl.Control
    ];

    if (position) {
      args.push(position);
    }

    map.addControl(...args);
  }, [map, position, props]);

  useEffect(
    () => () => {
      if (geolocateControl.current) {
        map && map.removeControl(geolocateControl.current);
        geolocateControl.current = null;
      }
    },
    [map]
  );

  return null;
}

interface Props {
  /**
   * A fitBounds options object to use when the map is panned and zoomed to the
   * user's location. The default is to use a maxZoom of 15 to limit how far the
   * map will zoom in for very accurate locations.
   */
  fitBoundsOptions?: FitBoundsOptions;
  /**
   * Position on the map to which the control will be added.
   */
  position?: ControlPosition;
  /**
   * A Geolocation API PositionOptions object.
   */
  positionOptions?: PositionOptions;
  /**
   * By default a dot will be shown on the map at the user's location. Set to
   * false to disable.
   */
  showUserLocation?: boolean;
  /**
   * If true the Geolocate Control becomes a toggle button and when active the
   * map will receive updates to the user's location as it changes.
   */
  trackUserLocation?: boolean;
}
