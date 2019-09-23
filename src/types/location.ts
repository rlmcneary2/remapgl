import { AnimationOptions, CameraOptions } from "mapbox-gl";

interface BoundsOptions {
  /**
   * Center these bounds in the viewport and use the highest zoom level up to
   * and including maxZoom that fits them in the viewport.
   */
  bounds: LngLatBounds;
  /**
   * Additional properties to be added to event objects of events triggered by a
   * change.
   */
  eventData?: {[key: string]: any};
  /**
   * The type of motion to use during the transition.
   */
  motionType?: "ease" | "fly";
  options?: BoundsTransitionOptions;
}

interface BoundsTransitionOptions extends AnimationOptions, CameraOptions {
    /**
     * Options for setting padding in pixels. All properties of this object must
     * be non-negative integers.
     */
    padding?: { bottom: number; left: number; right: number; top: number; };
    /**
     * The maximum zoom level to allow when the map view transitions to the
     * specified bounds.
     */
    maxZoom?: number;
}

interface CenterOptions {
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change.
   */
  center: LngLat;
  /**
   * Additional properties to be added to event objects of events triggered by a
   * change.
   */
  eventData?: {[key: string]: any};

  /**
   * The type of motion to use during the transition.
   */
  motionType?: "ease" | "fly" | "jump";
  options: CameraOptions;
}

/**
 * Represents a geographic location on the map. When using the tuple (array)
 * signature the first element is the longitude and the second element is the
 * latitude.
 */
type LngLat = [number, number] | { lat: number; lng: number; };

/**
 * Represent a geographic rectangle on a map. A tuple; the first element is the
 * south west corner, the second element is the north east corner.
 */
type LngLatBounds = [LngLat, LngLat];

interface ZoomOptions {
  /**
   * Additional properties to be added to event objects of events triggered by a
   * change.
   */
  eventData?: {[key: string]: any};
  /**
   * The type of motion to use during the transition.
   */
  motionType?: "ease" | "fly" | "jump";
  options?: AnimationOptions;
  /**
   * The zoom level of the map.
   */
  zoom: number;
}

export { BoundsOptions, CenterOptions, LngLat, LngLatBounds, ZoomOptions };
