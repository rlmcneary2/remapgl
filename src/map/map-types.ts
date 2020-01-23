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
import {
  AnimationOptions,
  BoundsOptions,
  CenterOptions,
  LngLat,
  LngLatBounds,
  MotionType,
  ZoomOptions
} from "../types/location";
import { EventData } from "../types/event";
import { Map as MapMbx, LngLatBoundsLike, LngLatLike } from "mapbox-gl";

export interface MapContainerProps {
  /**
   * Sets the map's access token.
   */
  accessToken: string;
  /**
   * Options common to camera animation through bounds, center, or zoom
   */
  animationOptions?: AnimationOptions;
  /**
   * The name of an HTML element that hosts the map; defaults to div.
   */
  as?: string;
  /**
   * Pans and zooms the map to contain its visible area within the specified
   * geographical bounds. Changing this value will cause the map position/zoom
   * to change. The appearance of the transition can be controlled through
   * animationOptions and motionType.
   */
  bounds?: LngLatBounds | BoundsOptions;
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  center?: LngLat | CenterOptions;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * Controls the duration of the fade-in/fade-out animation for label
   * collisions, in milliseconds.
   */
  fadeDuration?: number;
  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  mapboxStyle?: string;
  /**
   * The map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBounds;
  /**
   * The maximum zoom level of the map (0-24).
   */
  maxZoom?: number;
  /**
   * The minimum zoom level of the map (0-24).
   */
  minZoom?: number;
  /**
   * How the camera moves when transitioning from one location to another
   * through bounds, center, or zoom.
   */
  motionType?: MotionType;
  /**
   * Fired when a "box zoom" interaction ends.
   */
  onBoxzoomcancel?: (data: mapboxgl.MapBoxZoomEvent) => void;
  /**
   * Fired when a "box zoom" interaction ends.
   */
  onBoxzoomend?: (data: mapboxgl.MapBoxZoomEvent) => void;
  /**
   * Fired when a "box zoom" interaction starts.
   */
  onBoxzoomstart?: (data: mapboxgl.MapBoxZoomEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released at
   * the same point on the map.
   */
  onClick?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key
   * is pressed within the map.
   */
  onContextmenu?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is clicked twice at the same
   * point on the map.
   */
  onDblclick?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when any map data loads or changes.
   */
  onData?: (data: mapboxgl.MapDataEvent) => void;
  /**
   * Fired when any map data (style, source, tile, etc) begins loading or
   * changing asynchronously. All dataloading events are followed by a data or
   * error event.
   */
  onDataloading?: (data: mapboxgl.MapDataEvent) => void;
  /**
   * Fired repeatedly during a "drag to pan" interaction..
   */
  onDrag?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a "drag to pan" interaction ends.
   */
  onDragend?: (data: EventData) => void;
  /**
   * Fired when a "drag to pan" interaction starts.
   */
  onDragstart?: (data: EventData) => void;
  /**
   * Fired when an error occurs. This is GL JS's primary error reporting
   * mechanism. We use an event instead of throw to better accommodate
   * asyncronous operations. If no listeners are bound to the error event, the
   * error will be printed to the console.
   */
  onError?: (data: { error: { message: string } }) => void;
  /**
   * Fired after the last frame rendered before the map enters an "idle" state:
   * no camera transitions are in progress, all currently requested tiles have
   * loaded, all fade/transition animations have completed.
   */
  onIdle?: () => void;
  /**
   * Fired immediately after all necessary resources have been downloaded and
   * the first visually complete rendering of the map has occurred.
   */
  onLoad?: () => void;
  /**
   * Fired when a pointing device (usually a mouse) is pressed within the map.
   */
  onMousedown?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the map.
   */
  onMousemove?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when a point device (usually a mouse) leaves the map's canvas.
   */
  onMouseout?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the map.
   */
  onMouseover?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is released within the map.
   */
  onMouseup?: (data: mapboxgl.MapMouseEvent) => void;
  /**
   * Fired repeatedly during an animated transition from one view to another, as
   * the result of either user interaction or a fly transition.
   */
  onMove?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * Fired just after the map completes a transition from one view to another,
   * as the result of either user interaction or a jump transition.
   */
  onMoveend?: (data: EventData) => void;
  /**
   * Fired just before the map begins a transition from one view to another, as
   * the result of either user interaction or a jump transition.
   */
  onMovestart?: (data: EventData) => void;
  /**
   * Fired whenever the map's pitch (tilt) changes as the result of either user
   * interaction or a fly transition.
   */
  onPitch?: (data: EventData) => void;
  /**
   * Fired whenever the map's pitch (tilt) finishes changing as the result of
   * either user interaction or a fly transition.
   */
  onPitchend?: (data: EventData) => void;
  /**
   * Fired whenever the map's pitch (tilt) begins a change as the result of
   * either user interaction or a fly transition.
   */
  onPitchstart?: (data: EventData) => void;
  /**
   * Fired immediately after the map has been removed.
   */
  onRemove?: () => void;
  /**
   * Fired whenever the map is drawn to the screen, as the result of: a change
   * to the map's position, zoom, pitch, or bearing; a change to the map's
   * style; a change to a GeoJSON source; the loading of a vector tile, GeoJSON
   * file, glyph, or sprite.
   */
  onRender?: () => void;
  /**
   * Fired immediately after the map has been resized.
   */
  onResize?: () => void;
  /**
   * Fired repeatedly during a "drag to rotate" interaction.
   */
  onRotate?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a "drag to rotate" interaction ends.
   */
  onRotateend?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a "drag to rotate" interaction starts.
   */
  onRotatestart?: (
    data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent
  ) => void;
  /**
   * Fired when one of the map's sources loads or changes, including if a tile
   * belonging to a source loads or changes.
   */
  onSourcedata?: (data: mapboxgl.MapDataEvent) => void;
  /**
   * Fired when one of the map's sources begins loading or changing
   * asynchronously. All sourcedataloading events are followed by a sourcedata
   * or error event.
   */
  onSourcedataloading?: (data: mapboxgl.MapDataEvent) => void;
  /**
   * Fired when the map's style loads or changes.
   */
  onStyledata?: (data: mapboxgl.MapDataEvent) => void;
  /**
   * Fired when the map's style begins loading or changing asynchronously. All
   * styledataloading events are followed by a styledata or error event.
   */
  onStyledataloading?: (data: mapboxgl.MapDataEvent) => void;
  /**
   * Fired when an icon or pattern needed by the style is missing. The missing
   * image can be added within this event listener callback to prevent the image
   * from being skipped. This event can be used to dynamically generate icons
   * and patterns.
   */
  onStyleimagemissing?: (data: string) => void;
  /**
   * Fired when a touchcancel event occurs within the map.
   */
  onTouchcancel?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a touchend event occurs within the map.
   */
  onTouchend?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a touchmove event occurs within the map.
   */
  onTouchmove?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a touchstart event occurs within the map.
   */
  onTouchstart?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when the WebGL context is lost.
   */
  onWebglcontextlost?: () => void;
  /**
   * Fired when the WebGL context is restored.
   */
  onWebglcontextrestored?: () => void;
  /**
   * Fired when a wheel event occurs within the map.
   */
  onWheel?: (data: mapboxgl.MapWheelEvent) => void;
  /**
   * Fired repeatedly during an animated transition from one zoom level to
   * another, as the result of either user interaction or a fly transition.
   */
  onZoom?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * Fired just after the map completes a transition from one zoom level to
   * another, as the result of either user interaction or a fly transition.
   */
  onZoomend?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * Fired just before the map begins a transition from one zoom level to
   * another, as the result of either user interaction or a fly transition.
   */
  onZoomstart?: (data: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent) => void;
  /**
   * An Object with properties to set styles on the element that contains the
   * map. Per React documentation customizing the appearance of React components
   * using "style" is not recommended. See:
   * https://reactjs.org/docs/dom-elements.html#style
   */
  style?: { [key: string]: string | number };
  /**
   * The zoom level of the map. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  zoom?: number | ZoomOptions;
}

export interface MapOptions {
  /**
   * Pans and zooms the map to contain its visible area within the specified
   * geographical bounds. Changing this value will cause the map position/zoom
   * to change. The appearance of the transition can be controlled through
   * animationOptions and motionType.
   */
  bounds?: LngLatBoundsLike;
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  center?: LngLatLike;
  /**
   * The element where the map will appear.
   */
  container: Element;
  /**
   * Controls the duration of the fade-in/fade-out animation for label
   * collisions, in milliseconds.
   */
  fadeDuration?: number;
  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  style: string;
  /**
   * The map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBounds;
  /**
   * The maximum zoom level of the map (0-24).
   */
  maxZoom?: number;
  /**
   * The minimum zoom level of the map (0-24).
   */
  minZoom?: number;
  /**
   * The zoom level of the map. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  zoom?: number;
}

export interface UseUpdateMapOptions {
  /**
   * Options common to camera animation through bounds, center, or zoom
   */
  animationOptions?: AnimationOptions;
  /**
   * Pans and zooms the map to contain its visible area within the specified
   * geographical bounds. Changing this value will cause the map position/zoom
   * to change. The appearance of the transition can be controlled through
   * animationOptions and motionType.
   */
  bounds?: LngLatBounds | BoundsOptions;
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  center?: LngLat | CenterOptions;
  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  mapboxStyle?: string;
  /**
   * The map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBounds;
  /**
   * The maximum zoom level of the map (0-24).
   */
  maxZoom?: number;
  /**
   * The minimum zoom level of the map (0-24).
   */
  minZoom?: number;
  /**
   * How the camera moves when transitioning from one location to another
   * through bounds, center, or zoom.
   */
  motionType?: MotionType;
  /**
   * The zoom level of the map. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  zoom?: number | ZoomOptions;
}

export interface MapContextValue {
  map: MapMbx | null;
}
