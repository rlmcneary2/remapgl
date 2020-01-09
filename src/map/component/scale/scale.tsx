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
import { ScaleControl } from "mapbox-gl";
import { useMap } from "../../map-context";
import { copyDefinedProperties } from "../../../util/props/props";
import { ControlPosition } from "../../../types/ui";

/**
 * Scale displays the ratio of a distance on the map to the corresponding
 * distance on the ground.
 */
export default function Scale({ maxWidth, position, unit }: Props): null {
  const scaleControl = useRef<ScaleControl | null>(null);
  const map = useMap();

  useEffect(() => {
    // Only create the scale control once. The same ScaleControl instance is
    // maintained for the lifetime of the Scale component.
    if (!map || scaleControl.current) {
      return;
    }

    scaleControl.current = new ScaleControl(
      copyDefinedProperties({ maxWidth, unit })
    );

    const args: [mapboxgl.Control, ControlPosition?] = [
      scaleControl.current as mapboxgl.Control
    ];

    if (position) {
      args.push(position);
    }

    map.addControl(...args);
  }, [map, maxWidth, position, unit]);

  useEffect(
    () => () => {
      if (scaleControl.current) {
        map && map.removeControl(scaleControl.current);
        scaleControl.current = null;
      }
    },
    [map]
  );

  useEffect(() => {
    unit && scaleControl.current && scaleControl.current.setUnit(unit);
  }, [unit]);

  return null;
}

interface Props {
  /**
   * The maximum length of the scale control in pixels. Can not be changed once set. Default 100.
   */
  maxWidth?: number;
  /**
   * Position on the map to which the control will be added.
   */
  position?: ControlPosition;
  /**
   * Unit of the distance. Default metric.
   */
  unit?: "metric" | "imperial" | "nautical";
}
