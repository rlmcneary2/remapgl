import {
  AnimationOptions,
  AnySourceData,
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
  Layer,
  CustomLayerInterface,
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
  // bounds?: LngLatBounds | BoundsOptions;
  /**
   * The geographical center point of the map. Changing this value will cause
   * the map position to change. The appearance of the transition can be
   * controlled through animationOptions and motionType.
   */
  // center?: LngLatLike;
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
   * Controls the duration of the fade-in/fade-out animation for label
   * collisions, in milliseconds.
   */
  // fadeDuration?: number;
  /**
   * The map's Mapbox style. This must be an a JSON object conforming to the
   * schema described in the Mapbox Style Specification, or a URL to such JSON.
   */
  // mapboxStyle?: string;
  /**
   * The map will be constrained to the given bounds.
   */
  // maxBounds?: LngLatBounds;
  /**
   * The maximum zoom level of the map (0-24).
   */
  // maxZoom?: number;
  /**
   * The minimum zoom level of the map (0-24).
   */
  // minZoom?: number;
  /**
   * How the camera moves when transitioning from one location to another
   * through bounds, center, or zoom.
   */
  // motionType?: MotionType;
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
  // zoom?: number | ZoomOptions;
}

type MapConstructorOptions = Omit<MapboxOptions, "container">;

export interface MapInstanceProps {
  bearing?: {
    bearing: number;
    eventData?: EventData;
    options:
      | AnimationOptions
      | AnimationOptions & CameraOptions
      | AnimationOptions &
          CameraOptions & {
            curve: number;
            maxDuration?: number;
            minZoom?: number;
            screenSpeed?: number;
            speed: number;
          };
  };

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

  ease?: {
    eventData?: EventData;
    options: CameraOptions | CameraOptions & AnimationOptions;
  };

  filters?: [{ layer: string; filter?: any[] }]; // addFilter / setFilter

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

  jump?: {
    eventData?: EventData;
    options: CameraOptions;
  };

  layers?: [
    {
      layer: Layer | CustomLayerInterface;
      layoutProperty?: { name: string; value: any };
      paintProperty?: { name: string; value: any; klass?: string };
      zoomRange?: { minzoom: number; maxzoom: number };
    }
  ]; // addLayer / removeLayer / moveLayer

  light?: { options: Light; lightOptions?: any };

  maxBounds?: LngLatBoundsLike; // if undefined setMaxBounds()

  maxZoom?: number; // if undefined setMaxZoom()

  minZoom?: number; // if undefined setMinZoom()

  pitch?: {
    pitch: number;
    eventData?: EventData;
    options:
      | AnimationOptions
      | AnimationOptions & CameraOptions
      | AnimationOptions &
          CameraOptions & {
            curve: number;
            maxDuration?: number;
            minZoom?: number;
            screenSpeed?: number;
            speed: number;
          };
  };

  renderWorldCopies?: boolean; // if undefined setRenderWorldCopies(true)

  repaint?: boolean; // default false

  rotate?: {
    bearing: number;
    eventData?: EventData;
    options:
      | AnimationOptions
      | AnimationOptions & CameraOptions
      | AnimationOptions &
          CameraOptions & {
            curve: number;
            maxDuration?: number;
            minZoom?: number;
            screenSpeed?: number;
            speed: number;
          };
  };

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

  showCollisionBoxes?: boolean; // default false

  showTileBoundaries?: boolean; // default false

  sources?: [{ id: string; source: AnySourceData }]; // addSource() / removeSource()

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
  onTiledataloading?: (data: MapDataEvent) => void;
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
