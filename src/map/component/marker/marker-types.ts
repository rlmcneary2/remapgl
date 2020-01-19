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
import { PointLike, PopupOptions } from "mapbox-gl";
import { LngLat } from "../../../types/location";
import { AnchorType } from "../../../types/ui";

type DragHandler = (data: LngLat) => void;

type EventHandler = (event: any) => void;

export interface MarkerProps {
  /**
   * A string indicating the part of the Marker that should be positioned
   * closest to the coordinate set by location. Can't be changed once set.
   */
  anchor?: AnchorType;
  /**
   * Defines the appearance of a marker. If not provided the default pin marker
   * will be displayed
   */
  children?: React.ReactNode;
  /**
   * The color to use for the default marker if children are not provided. The
   * default is light blue. Can't be changed once set.
   */
  color?: string;
  /**
   * Indicates if a marker can be dragged to a new location on the map.
   */
  draggable?: boolean;
  /**
   * Set the marker's geographical position and move it.
   */
  location?: LngLat;
  /**
   * The offset in pixels to apply relative to the element's center. Negative
   * values indicate left and up.
   */
  offset?: PointLike;
  /**
   * Fired when the marker is clicked.
   */
  onClick?: EventHandler;
  /**
   * Fired while dragging.
   */
  onDrag?: EventHandler;
  /**
   * Fired when the marker is finished being dragged.
   */
  onDragend?: DragHandler;
  /**
   * Fired when dragging starts.
   */
  onDragstart?: DragHandler;
  /**
   * Fired when the mouse enters the marker.
   */
  onMouseenter?: EventHandler;
  /**
   * Fired when the mouse exits the marker.
   */
  onMouseleave?: EventHandler;
  /**
   * A Popup component with content for this marker.
   */
  popup?: MarkerPopup;
  /**
   * If true the popup will be shown.
   */
  togglePopup?: boolean;
}

export interface MarkerPopup {
  content: React.ReactNode;
  options: Omit<PopupOptions, "location">;
}

export interface MarkerOptions extends mapboxgl.MarkerOptions {
  location?: LngLat;
}
