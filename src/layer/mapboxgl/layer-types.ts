import {
  AnySourceData,
  BackgroundLayout,
  BackgroundPaint,
  CircleLayout,
  CirclePaint,
  FillExtrusionLayout,
  FillExtrusionPaint,
  FillLayout,
  FillPaint,
  HeatmapLayout,
  HeatmapPaint,
  HillshadeLayout,
  HillshadePaint,
  LineLayout,
  LinePaint,
  MapMouseEvent,
  MapTouchEvent,
  RasterLayout,
  RasterPaint,
  SymbolLayout,
  SymbolPaint
} from "mapbox-gl";

/**
 * Props for the Layer component.
 */
export interface LayerProps {
  /**
   * An expression specifying conditions on source features. Only features that
   * match the filter are displayed. Zoom expressions in filters are only
   * evaluated at integer zoom levels. The "feature-state" expression is not
   * supported in filter expressions.
   */
  filter?: any[];
  /**
   * Unique layer name.
   */
  id: string;
  /**
   * Layout properties for the layer.
   */
  layout?:
    | BackgroundLayout
    | CircleLayout
    | FillLayout
    | FillExtrusionLayout
    | HeatmapLayout
    | HillshadeLayout
    | LineLayout
    | RasterLayout
    | SymbolLayout;
  /**
   * The maximum zoom level (0 - 24) for the layer. At zoom levels equal to or
   * greater than the maxzoom, the layer will be hidden.
   */
  maxZoom?: number;
  /**
   * Arbitrary properties useful to track with the layer, but do not influence
   * rendering. Properties should be prefixed to avoid collisions, like
   * 'mapbox:'.
   */
  metadata?: any;
  /**
   * The minimum zoom level (0 - 24) for the layer. At zoom levels less than the
   * minzoom, the layer will be hidden.
   */
  minZoom?: number;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released at
   * the same point on the layer.
   */
  onClick?: (data: MapMouseEvent) => void;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key
   * is pressed within the layer.
   */
  onContextmenu?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is clicked twice at the same
   * point on the layer.
   */
  onDblclick?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is pressed within the layer.
   */
  onMousedown?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the layer.
   */
  onMousemove?: (data: MapMouseEvent) => void;
  /**
   * Fired when a point device (usually a mouse) leaves the layer.
   */
  onMouseout?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the layer.
   */
  onMouseover?: (data: MapMouseEvent) => void;
  /**
   * Fired when a pointing device (usually a mouse) is released within the layer.
   */
  onMouseup?: (data: MapMouseEvent) => void;
  /**
   * Fired when a touchcancel event occurs within the layer.
   */
  onTouchcancel?: (data: MapTouchEvent) => void;
  /**
   * Fired when a touchend event occurs within the layer.
   */
  onTouchend?: (data: MapTouchEvent) => void;
  /**
   * Fired when a touchstart event occurs within the layer.
   */
  onTouchstart?: (data: MapTouchEvent) => void;
  /**
   * Default paint properties for this layer.
   */
  paint?:
    | BackgroundPaint
    | FillPaint
    | FillExtrusionPaint
    | LinePaint
    | SymbolPaint
    | RasterPaint
    | CirclePaint
    | HeatmapPaint
    | HillshadePaint;
  /**
   * Name of a source description to be used for this layer. Required for all
   * RenderingTypes except "background".
   */
  source?: string | AnySourceData;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources;
   * prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * Rendering type of this layer.
   */
  type?:
    | "fill"
    | "line"
    | "symbol"
    | "circle"
    | "fill-extrusion"
    | "raster"
    | "background"
    | "heatmap"
    | "hillshade";
}
