import { CameraOptions } from "mapbox-gl";
import { SimplePoint, GeoPoint } from "./data";

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

/**
 * Options common to map movement methods that involve animation.
 */
export interface AnimationOptions {
  /**
   * The animation's duration, measured in milliseconds.
   */
  duration?: number;
  /**
   * A function taking a time in the range 0..1 and returning a number where 0 is the initial state and 1 is the final state.
   */
  easing?: (input: number) => number;
}

export interface BoundsOptions extends FitBoundsOptions {
  /**
   * Center these bounds in the viewport and use the highest zoom level up to
   * and including maxZoom that fits them in the viewport.
   */
  bounds: LngLatBounds;
  /**
   * Additional properties to be added to event objects of events triggered by a
   * change.
   */
  eventData?: { [key: string]: any };
}

export interface CenterOptions {
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change.
   */
  center: LngLat;
  /**
   * Additional properties to be added to event objects of events triggered by a
   * change.
   */
  eventData?: { [key: string]: any };
}

/**
 * Control how bounds are displayed.
 */
export interface FitBoundsOptions extends AnimationOptions, CameraOptions {
  /**
   * If true, the map transitions using Map.easeTo(). If false, the map
   * transitions using Map.flyTo(). See those functions and AnimationOptions for
   * information about options available.
   */
  linear?: boolean;
  /**
   * The maximum zoom level to allow when the map view transitions to the
   * specified bounds.
   */
  maxZoom?: number;
  /**
   * The center of the given bounds relative to the map's center, measured in
   * pixels.
   */
  offset?: SimplePoint;
  /**
   * Options for setting padding in pixels. All properties of this object must
   * be non-negative integers.
   */
  padding?: number | PaddingOptions;
}

/**
 * Represents a geographic location on the map. When using the tuple (array)
 * signature the first element is the longitude and the second element is the
 * latitude.
 */
export type LngLat = GeoPoint | SimplePoint;

/**
 * Represents a geographic rectangle on a map. A tuple; the first element is the
 * south west corner, the second element is the north east corner.
 */
export type LngLatBounds = [LngLat, LngLat];

/**
 * Type of motion the camera should use when transitioning from one location to
 * another.
 */
export type MotionType = "ease" | "fly" | "jump";

/**
 * Options for setting padding in pixels. All properties of this object must
 * be non-negative integers.
 */
interface PaddingOptions {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface Point {
  x: number;
  y: number;
}

export type PointLike = Point | [number, number];

/**
 * Zoom from one level to another.
 */
export interface ZoomOptions {
  /**
   * Additional properties to be added to event objects of events triggered by a
   * change.
   */
  eventData?: { [key: string]: any };
  /**
   * The zoom level of the map.
   */
  zoom: number;
}
