# Layer
The `<Layer/>` component is a child of [Map](../../map/map.md), it causes a layer to be added to a map. Layers are not DOM objects, they are rendered by the Map in its presentation layer, for example a canvas element.

The order that layers appear in a Map are controlled by their order as children of a `<Map/>`. As in an HTML document the last Layer in a `<Map/>` component will be the top Layer in the Map.

## LayerProps
These are the props that can be passed to the `<Layer />` component.

A property followed by a "?" indicates an optional prop.

|Property|Type|Comments|
|---|---|---|
|filter?|Expression|An expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The "feature-state" expression is not supported in filter expressions.|
|**id**|string|Unique layer name.|
|layout?|Layout|Layout properties for the layer.|
|maxZoom?|number|The maximum zoom level (0 - 24) for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.|
|metadata?|object|Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'remapgl:'.|
|minZoom?|number|The minimum zoom level (0 - 24) for the layer. At zoom levels less than the minzoom, the layer will be hidden.|
|onClick?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is pressed and released at the same point on the layer.|
|onContextmenu?|(MapMouseEvent) => void|Fired when the right button of the mouse is clicked or the context menu key is pressed within the layer.|
|onDblclick?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is clicked twice at the same point on the layer.|
|onMousedown?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is pressed within the layer.|
|onMousemove?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is moved within the layer.|
|onMouseout?|(MapMouseEvent) => void|Fired when a point device (usually a mouse) leaves the layer.|
|onMouseover?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is moved within the layer.|
|onMouseup?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is released within the layer.|
|onTouchcancel?|(MapTouchEvent) => void|Fired when a touchcancel event occurs within the layer.|
|onTouchend?|(MapTouchEvent) => void|Fired when a touchend event occurs within the layer.|
|onTouchstart?|(MapTouchEvent) => void|Fired when a touchstart event occurs within the layer.|
|paint?|Paint|Default paint properties for this layer.|
|source?|string|Name of a source description to be used for this layer. Required for all RenderingTypes except "background".|
|sourceLayer?|string|Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.|
|**type**|RenderingType|Rendering type of this layer.|


# Associated types
## Expression
Please see the [MapboxGL documentation for expressions](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions).

## Layout
Please see the [MapboxGL documentation for layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers).

## Paint
Please see the [MapboxGL documentation for layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers).

## RenderingType
Rendering type of this layer.<br/>
`"background" | "circle" | "fill" | "fill-extrusion" | "heatmap" | "hillshade" | "line" | "raster" | "symbol"`