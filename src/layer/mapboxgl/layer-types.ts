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
    BackgroundLayout |
    CircleLayout |
    FillLayout |
    FillExtrusionLayout |
    HeatmapLayout |
    HillshadeLayout |
    LineLayout |
    RasterLayout |
    SymbolLayout;
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
   * Fired when a touchcancel event occurs within the map.
   */
  onTouchcancel?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a touchend event occurs within the map.
   */
  onTouchend?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Fired when a touchstart event occurs within the map.
   */
  onTouchstart?: (data: mapboxgl.MapTouchEvent) => void;
  /**
   * Default paint properties for this layer.
   */
  paint?:
    BackgroundPaint |
    FillPaint |
    FillExtrusionPaint |
    LinePaint |
    SymbolPaint |
    RasterPaint |
    CirclePaint |
    HeatmapPaint |
    HillshadePaint;
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
    "fill" |
    "line" |
    "symbol" |
    "circle" |
    "fill-extrusion" |
    "raster" |
    "background" |
    "heatmap" |
    "hillshade";
}
