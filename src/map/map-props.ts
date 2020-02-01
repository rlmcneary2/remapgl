import {
  AnimationOptions,
  CameraOptions,
  EventData,
  LngLatBoundsLike,
  PaddingOptions,
  PointLike,
  MapMouseEvent,
  MapboxEvent,
  MapBoxZoomEvent,
  MapDataEvent,
  MapboxOptions,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapContextEvent,
  MapWheelEvent,
  Style,
  Light
} from "mapbox-gl";

interface MapComponentProps {
  /**
   * Sets the map's access token.
   */
  accessToken: string;
  /**
   * Options common to camera animation through bounds, center, or zoom
   */
  // animationOptions?: AnimationOptions;
  /**
   * The name of an HTML element that hosts the map; defaults to div.
   */
  as?: string;
  /**
   * A class name to set on the containing DIV element.
   */
  className?: string;
  /**
   * The MapboxGL CSS file to use. Must match the current version of the
   * mapbox-gl package.
   */
  cssFile?: string;
  /**
   * An Object with properties to set styles on the element that contains the
   * map. Per React documentation customizing the appearance of React components
   * using "style" is not recommended. See:
   * https://reactjs.org/docs/dom-elements.html#style
   */
  style?: { [key: string]: string | number };
}

type MapConstructorOptions = Omit<MapboxOptions, "container">;

export interface MapInstanceProps {
  /**
   * Sets the map's bearing (rotation). The bearing is the compass direction
   * that is "up"; for example, a bearing of 90° orients the map so that east is
   * up.
   */
  bearing?: {
    bearing: number;
    eventData?: EventData;
  };

  /**
   * Pans and zooms the map to contain its visible area within the specified
   * geographical bounds. This function will also reset the map's bearing to 0
   * if bearing is nonzero.
   */
  bounds?: {
    bounds: LngLatBoundsLike;
    eventData?: EventData;
    options?: AnimationOptions &
      CameraOptions & {
        curve: number;
        maxDuration?: number;
        minZoom?: number;
        screenSpeed?: number;
        speed: number;
      };
  };

  /**
   * Changes any combination of center, zoom, bearing, and pitch, with an
   * animated transition between old and new values. The map will retain its
   * current values for any details not specified in options.
   */
  ease?: {
    eventData?: EventData;
    options: CameraOptions | CameraOptions & AnimationOptions;
  };

  /**
   * Changes any combination of center, zoom, bearing, and pitch, animating the
   * transition along a curve that evokes flight. The animation seamlessly
   * incorporates zooming and panning to help the user maintain her bearings
   * even after traversing a great distance.
   */
  fly?: {
    eventData?: EventData;
    options:
      | CameraOptions
      | CameraOptions & AnimationOptions
      | CameraOptions &
          AnimationOptions & {
            curve: number;
            maxDuration?: number;
            minZoom?: number;
            screenSpeed?: number;
            speed: number;
          };
  };

  /**
   * These images will be available to the style. Images can be displayed on the
   * map like any other icon in the style's sprite using an image's ID with
   * icon-image, background-pattern, fill-pattern, or line-pattern. A Map error
   * event will be fired if there is not enough space in the sprite to add an
   * image.
   */
  images?: [
    {
      name: string;
      image:
        | HTMLImageElement
        | ArrayBufferView
        | {
            width: number;
            height: number;
            data: Uint8Array | Uint8ClampedArray;
          }
        | ImageData;
      options?: { pixelRatio?: number; sdf?: boolean };
    }
  ]; // addImage / removeImage

  /**
   * Changes any combination of center, zoom, bearing, and pitch, without an
   * animated transition. The map will retain its current values for any details
   * not specified in options.
   */
  jump?: {
    eventData?: EventData;
    options: CameraOptions;
  };

  /**
   * Sets the any combination of light values.
   */
  light?: { options: Light; lightOptions?: any };

  /**
   * The map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBoundsLike; // if undefined setMaxBounds()

  /**
   * The maximum zoom level of the map (0-24).
   */
  maxZoom?: number; // if undefined setMaxZoom()

  /**
   * The minimum zoom level of the map (0-24).
   */
  minZoom?: number; // if undefined setMinZoom()

  /**
   * Sets the map's pitch (tilt).
   */
  pitch?: {
    pitch: number;
    eventData?: EventData;
  };

  /**
   * If true:
   * - multiple copies of the world will be rendered side by side beyond -180
   *   and 180 degrees longitude.
   * If set to false:
   * - When the map is zoomed out far enough that a single representation of the
   *   world does not fill the map's entire container, there will be blank space
   *   beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two
   *   (with one portion on the right edge of the map and the other on the left
   *   edge of the map) at every zoom level.
   */
  renderWorldCopies?: boolean; // if undefined setRenderWorldCopies(true)

  /**
   * Gets and sets a Boolean indicating whether the map will continuously
   * repaint. This information is useful for analyzing performance.
   */
  repaint?: boolean; // default false

  /**
   * Rotates the map to the specified bearing, with an animated transition. The
   * bearing is the compass direction that is "up"; for example, a bearing of
   * 90° orients the map so that east is up.
   */
  rotate?: {
    bearing: number;
    eventData?: EventData;
    options?: AnimationOptions;
  };

  /**
   * Pans, rotates and zooms the map to to fit the box made by points p0 and p1
   * once the map is rotated to the specified bearing. To zoom without rotating,
   * pass in the current map bearing.
   */
  screen?: {
    p0: PointLike;
    p1: PointLike;
    bearing: number;
    eventData?: EventData;
    options?: {
      easing?: (time: number) => number;
      linear: number;
      maxZoom?: number;
      offset: PointLike;
      padding?: number | PaddingOptions;
    };
  };

  /**
   * Gets and sets a Boolean indicating whether the map will render boxes around
   * all symbols in the data source, revealing which symbols were rendered or
   * which were hidden due to collisions. This information is useful for
   * debugging.
   */
  showCollisionBoxes?: boolean; // default false

  /**
   * Gets and sets a Boolean indicating whether the map will render an outline
   * around each tile and the tile ID. These tile boundaries are useful for
   * debugging.
   *
   * The uncompressed file size of the first vector source is drawn in the top
   * left corner of each tile, next to the tile ID.
   */
  showTileBoundaries?: boolean; // default false

  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  styleMbx?:
    | Style
    | string
    | {
        style: Style | string;
        options?: { diff?: boolean; localIdeographFontFamily?: string };
      };
}

export interface MapEventProps {
  /**
   * Fired when a "box zoom" interaction ends.
   */
  onBoxzoomcancel?: (data: MapBoxZoomEvent) => void;
  /**
   * Fired when a "box zoom" interaction ends.
   */
  onBoxzoomend?: (data: MapBoxZoomEvent) => void;
  /**
   * Fired when a "box zoom" interaction starts.
   */
  onBoxzoomstart?: (data: MapBoxZoomEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released at
   * the same point on the map.
   */
  onClick?: (data: MapMouseEvent) => void;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key
   * is pressed within the map.
   */
  onContextmenu?: (data: MapMouseEvent) => void;
  /**
   * Fired when any map data loads or changes.
   */
  onData?: (data: MapDataEvent) => void;
  /**
   * Fired when any map data (style, source, tile, etc) begins loading or
   * changing asynchronously. All dataloading events are followed by a data or
   * error event.
   */
  onDataloading?: (data: MapDataEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is clicked twice at the same
   * point on the map.
   */
  onDblclick?: (data: MapMouseEvent) => void;
  /**
   * Fired repeatedly during a "drag to pan" interaction..
   */
  onDrag?: (data: MapboxEvent<MouseEvent | TouchEvent | undefined>) => void;
  /**
   * Fired when a "drag to pan" interaction ends.
   */
  onDragend?: (data: MapboxEvent<MouseEvent | TouchEvent | undefined>) => void;
  /**
   * Fired when a "drag to pan" interaction starts.
   */
  onDragstart?: (
    data: MapboxEvent<MouseEvent | TouchEvent | undefined>
  ) => void;
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
  onMousedown?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the map.
   */
  onMousemove?: (data: MapMouseEvent) => void;
  /**
   * Fired when a point device (usually a mouse) leaves the map's canvas.
   */
  onMouseout?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the map.
   */
  onMouseover?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is released within the map.
   */
  onMouseup?: (data: MapMouseEvent) => void;
  /**
   * Fired repeatedly during an animated transition from one view to another, as
   * the result of either user interaction or a fly transition.
   */
  onMove?: (
    data: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  ) => void;
  /**
   * Fired just after the map completes a transition from one view to another,
   * as the result of either user interaction or a jump transition.
   */
  onMoveend?: (
    data: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  ) => void;
  /**
   * Fired just before the map begins a transition from one view to another, as
   * the result of either user interaction or a jump transition.
   */
  onMovestart?: (
    data: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  ) => void;
  /**
   * Fired whenever the map's pitch (tilt) changes as the result of either user
   * interaction or a fly transition.
   */
  onPitch?: (data: MapboxEvent<MouseEvent | TouchEvent | undefined>) => void;
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
  onRotate?: (data: MapboxEvent<MouseEvent | TouchEvent | undefined>) => void;
  /**
   * Fired when a "drag to rotate" interaction ends.
   */
  onRotateend?: (
    data: MapboxEvent<MouseEvent | TouchEvent | undefined>
  ) => void;
  /**
   * Fired when a "drag to rotate" interaction starts.
   */
  onRotatestart?: (
    data: MapboxEvent<MouseEvent | TouchEvent | undefined>
  ) => void;
  /**
   * Fired when one of the map's sources loads or changes, including if a tile
   * belonging to a source loads or changes.
   */
  onSourcedata?: (data: MapSourceDataEvent) => void;
  /**
   * Fired when one of the map's sources begins loading or changing
   * asynchronously. All sourcedataloading events are followed by a sourcedata
   * or error event.
   */
  onSourcedataloading?: (data: MapSourceDataEvent) => void;
  /**
   * Fired when the map's style loads or changes.
   */
  onStyledata?: (data: MapStyleDataEvent) => void;
  /**
   * Fired when the map's style begins loading or changing asynchronously. All
   * styledataloading events are followed by a styledata or error event.
   */
  onStyledataloading?: (data: MapStyleDataEvent) => void;
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
  onTouchcancel?: (data: MapTouchEvent) => void;
  /**
   * Fired when a touchend event occurs within the map.
   */
  onTouchend?: (data: MapTouchEvent) => void;
  /**
   * Fired when a touchmove event occurs within the map.
   */
  onTouchmove?: (data: MapTouchEvent) => void;
  /**
   * Fired when a touchstart event occurs within the map.
   */
  onTouchstart?: (data: MapTouchEvent) => void;
  /**
   * Fired when the WebGL context is lost.
   */
  onWebglcontextlost?: (data: MapContextEvent) => void;
  /**
   * Fired when the WebGL context is restored.
   */
  onWebglcontextrestored?: (data: MapContextEvent) => void;
  /**
   * Fired when a wheel event occurs within the map.
   */
  onWheel?: (data: MapWheelEvent) => void;
  /**
   * Fired repeatedly during an animated transition from one zoom level to
   * another, as the result of either user interaction or a fly transition.
   */
  onZoom?: (
    data: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  ) => void;
  /**
   * Fired just after the map completes a transition from one zoom level to
   * another, as the result of either user interaction or a fly transition.
   */
  onZoomend?: (
    data: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  ) => void;
  /**
   * Fired just before the map begins a transition from one zoom level to
   * another, as the result of either user interaction or a fly transition.
   */
  onZoomstart?: (
    data: MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  ) => void;
}

export type MapProps = MapComponentProps &
  MapConstructorOptions &
  MapInstanceProps &
  MapEventProps;

/*
 * TODO: Implement these imperative functions...
 */

// export interface MapProps {
//   areTilesLoaded(): boolean; // event?

//   cameraForBounds(
//     bounds: LngLatBoundsLike,
//     options?: CameraForBoundsOptions
//   ): CameraForBoundsResult | undefined;

//   getFeatureState(
//     feature: FeatureIdentifier | mapboxgl.MapboxGeoJSONFeature
//   ): { [key: string]: any };

//   isEasing(): boolean; /// event?

//   isMoving(): boolean; // event?

//   isRotating(): boolean; // event?

//   isSourceLoaded(id: string): boolean; // event?

//   isStyleLoaded(): boolean; // event?

//   isZooming(): boolean; // event?

//   loaded(): boolean; // event?

//   loadImage(url: string, callback: Function): this; // event

//   /** Returns a Point representing pixel coordinates, relative to the map's container, that correspond to the specified geographical location. */
//   project(lnglat: LngLatLike): mapboxgl.Point;

//   /** Returns an array of GeoJSON Feature objects representing visible features that satisfy the query parameters. */
//   queryRenderedFeatures(
//     pointOrBox?: PointLike | [PointLike, PointLike],
//     options?: { layers?: string[]; filter?: any[]; validate?: boolean }
//   ): MapboxGeoJSONFeature[];

//   /** Returns an array of GeoJSON Feature objects representing features within the specified vector tile or GeoJSON source that satisfy the query parameters. */
//   querySourceFeatures(
//     sourceID: string,
//     parameters?: {
//       sourceLayer?: string;
//       filter?: any[];
//       validate?: boolean;
//     }
//   ): MapboxGeoJSONFeature[];

//   removeFeatureState(
//     target: FeatureIdentifier | mapboxgl.MapboxGeoJSONFeature,
//     key?: string
//   ): void;

//   resetNorth(options?: AnimationOptions, eventData?: mapboxgl.EventData): this;

//   /** Resizes the map according to the dimensions of its container element. */
//   resize(eventData?: EventData): this;

//   setFeatureState(
//     feature: FeatureIdentifier | mapboxgl.MapboxGeoJSONFeature,
//     state: { [key: string]: any }
//   ): void;

//   snapToNorth(options?: AnimationOptions, eventData?: mapboxgl.EventData): this;

//   stop(): this;

//   triggerRepaint(): void;

//   /** Returns a LngLat representing geographical coordinates that correspond to the specified pixel coordinates. */
//   unproject(point: PointLike): mapboxgl.LngLat;
// }
