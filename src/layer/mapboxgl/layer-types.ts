/*
 * Copyright (c) 2020 Richard L. McNeary II
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

export interface InternalLayerProps extends LayerProps {
  /**
   * This is a "secret" prop added by MapContent to let us know which layer, if
   * any, this layer goes before.
   */
  beforeId: string;
}
