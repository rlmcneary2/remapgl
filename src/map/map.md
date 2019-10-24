# Map
The `<Map/>` component creates and displays a map. The Map can be controlled and interacted with via its props. The only required prop is `accessToken`. This is [a string token provided by Mapbox](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/), you will need to create a Mapbox account to get one.

A Map component can accept a number of other components as children. Data at a specific point is displayed on a map using a `<Marker/>`. Information that applies to paths or regions on a map can be applied by `<Layer/>` components.

Camera position: TODO

CSS styling: TODO

MapboxGL style: TODO

Animation: TODO

## MapProps
These are the props that can be passed to the `<Map/>` component which is the root component of remapgl.

A property followed by a "?" indicates an optional prop.

|Property|Type|Comments|
|---|---|---|
|**accessToken**|string|Sets the map's access token.|
|animationOptions?|AnimationOptions|Options common to camera animation through bounds, center, or zoom.|
|as?|string|The name of an HTML element that hosts the map; defaults to div.|
|bounds?|LngLatBounds \| BoundsOptions|Pans and zooms the map to contain its visible area within the specified geographical bounds. Changing this value will cause the map position/zoom to change. The appearance of the transition can be controlled through animationOptions and motionType.|
|center?|LngLat \| CenterOptions|The geographical center point of the map. Changing this value will cause the map position to change. The appearance of the transition can be controlled through animationOptions and motionType.|
|className?|string|A class name to set on the containing host element.|
|cssFile?|string|The MapboxGL CSS file to use; defaults to "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css".|
|fadeDuration?|number|Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.|
|maxBounds?|LngLatBounds|The map will be constrained to the given bounds.|
|maxZoom?|number|The maximum zoom level of the map (0-24).|
|minZoom?|number|The minimum zoom level of the map (0-24).|
|motionType?|MotionType|How the camera moves when transitioning from one location to another through bounds, center, or zoom.|
|onBoxzoomcancel?|(MapBoxZoomEvent) => void|Fired when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold.|
|onBoxzoomend?|(MapBoxZoomEvent) => void|Fired when a "box zoom" interaction ends.|
|onBoxzoomstart?|(MapBoxZoomEvent) => void|Fired when a "box zoom" interaction starts.|
|onClick?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is pressed and released at the same point on the map.|
|onContextmenu?|(MapMouseEvent) => void|Fired when the right button of the mouse is clicked or the context menu key is pressed within the map.|
|onDblclick?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is clicked twice at the same point on the map.|
|onData?|(MapDataEvent) => void|Fired when any map data loads or changes.|
|onDataloading?|(MapDataEvent) => void|Fired when any map data (style, source, tile, etc) begins loading or changing asynchronously. All dataloading events are followed by a data or error event.|
|onDrag?|(MapMouseEvent \| MapTouchEvent) => void|Fired repeatedly during a "drag to pan" interaction.|
|onDragend?|(Event) => void|Fired when a "drag to pan" interaction ends.|
|onDragstart?|(Event) => void|Fired when a "drag to pan" interaction starts.|
|onError?|({ error: { message: string } }) => void|Fired when an error occurs. This is GL JS's primary error reporting mechanism. We use an event instead of throw to better accommodate asyncronous operations. If no listeners are bound to the error event, the error will be printed to the console.|
|onIdle?|() => void|Fired after the last frame rendered before the map enters an "idle" state: no camera transitions are in progress, all currently requested tiles have loaded, all fade/transition animations have completed.|
|onLoad?|() => void|Fired immediately after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.|
|onMousedown?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is pressed within the map.|
|onMousemove?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is moved within the map.|
|onMouseout?|(MapMouseEvent) => void|Fired when a point device (usually a mouse) leaves the map's canvas.|
|onMouseover?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is moved within the map.|
|onMouseup?|(MapMouseEvent) => void|Fired when a pointing device (usually a mouse) is released within the map.|
|onMove?|(MapMouseEvent \| MapTouchEvent) => void|Fired repeatedly during an animated transition from one view to another, as the result of either user interaction or a fly transition.|
|onMoveend?|(Event) => void|Fired just after the map completes a transition from one view to another, as the result of either user interaction or a jump transition.|
|onMovestart?|(Event) => void|Fired just before the map begins a transition from one view to another, as the result of either user interaction or a jump transition.|
|onPitch?|(MapEventData) => void|Fired whenever the map's pitch (tilt) changes as the result of either user interaction or a fly transition.|
|onPitchend?|(MapEventData) => void|Fired whenever the map's pitch (tilt) finishes changing as the result of either user interaction or a fly transition.|
|onPitchstart?|(MapEventData) => void|Fired whenever the map's pitch (tilt) begins a change as the result of either user interaction or a fly transition.|
|onRemove?|() => void|Fired immediately after the map has been removed.|
|onRender?|() => void|Fired whenever the map is drawn to the screen, as the result of: a change to the map's position, zoom, pitch, or bearing; a change to the map's style; a change to a GeoJSON source; the loading of a vector tile, GeoJSON file, glyph, or sprite.|
|onResize?|() => void|Fired immediately after the map has been resized.|
|onRotate?|(MapMouseEvent \| MapTouchEvent) => void|Fired repeatedly during a "drag to rotate" interaction.|
|onRotateend?|(MapMouseEvent \| MapTouchEvent) => void|Fired when a "drag to rotate" interaction ends.|
|onRotatestart?|(MapMouseEvent \| MapTouchEvent) => void|Fired when a "drag to rotate" interaction starts.|
|onSourcedata?|(MapDataEvent) => void|Fired when one of the map's sources loads or changes, including if a tile belonging to a source loads or changes.|
|onSourcedataloading?|(MapDataEvent) => void|Fired when one of the map's sources begins loading or changing asynchronously. All sourcedataloading events are followed by a sourcedata or error event.|
|onStyledata?|(MapDataEvent) => void|Fired when the map's style loads or changes.|
|onStyledataloading?|(MapDataEvent) => void|Fired when the map's style begins loading or changing asynchronously. All styledataloading events are followed by a styledata or error event.|
|onStyleimagemissing?|(string) => void|Fired when an icon or pattern needed by the style is missing. The missing image can be added within this event listener callback to prevent the image from being skipped. This event can be used to dynamically generate icons and patterns.|
|onTouchcancel?|(MapTouchEvent) => void|Fired when a touchcancel event occurs within the map.|
|onTouchend?|(MapTouchEvent) => void|Fired when a touchend event occurs within the map.|
|onTouchmove?|(MapTouchEvent) => void|Fired when a touchmove event occurs within the map.|
|onTouchstart?|(MapTouchEvent) => void|Fired when a touchstart event occurs within the map.|
|onWebglcontextlost?|() => void|Fired when the WebGL context is lost.|
|onWebglcontextrestored?|() => void|Fired when the WebGL context is restored.|
|onWheel?|(MapWheelEvent) => void|Fired when a wheel event occurs within the map.|
|onZoom?|(MapMouseEvent \| MapTouchEvent) => void|Fired repeatedly during an animated transition from one zoom level to another, as the result of either user interaction or a fly transition.|
|onZoomend?|(MapMouseEvent \| MapTouchEvent) => void|Fired just after the map completes a transition from one zoom level to another, as the result of either user interaction or a fly transition.|
|onZoomstart?|(MapMouseEvent \| MapTouchEvent) => void|Fired just before the map begins a transition from one zoom level to another, as the result of either user interaction or a fly transition.|
|style?|string|The map's Mapbox style. This must be an a JSON object conforming to the schema described in the Mapbox Style Specification, or a URL to such JSON.|
|zoom?|number \| ZoomOptions|The zoom level of the map. The appearance of the transition can be controlled through animationOptions and motionType.|

# Sample
```jsx
<Map
  accessToken="my_token"
  center={[-68.8008887, 44.5591077]}
  motionType="ease"
  zoom={9}
>
  {
    markers.map(marker => (
      <Marker
        location={marker.location}
      >{marker.name}</Marker>
    ))
  }
  <Layer
    id={selectedLayer.id}
    paint={selectedLayerPaint}
    source={selectedLayer.source}
    type="path"
  />
  {
    layers.filter(layer => layer.id !== selectedLayer.id)
      .map(layer => (
        <Layer
          id={layer.id}
          paint={layerPaint}
          source={layer.source}
          type="path"
        />
      ))
  }
</Map>
```

# Associated types
## AnimationOptions

|Property|Type|Comments|
|---|---|---|
|duration?|number|The animation's duration, measured in milliseconds.|
|easing?|(input: number) => number|A function taking a time in the range 0..1 and returning a number where 0 is the initial state and 1 is the final state.|

## BoundsOptions

|Property|Type|Comments|
|---|---|---|
|**bounds**|LngLatBounds|Center these bounds in the viewport and use the highest zoom level up to and including maxZoom that fits them in the viewport.|
|eventData?|object|Additional properties to be added to event objects of events triggered by a change.|

## CenterOptions

|Property|Type|Comments|
|---|---|---|
|**center**|LngLat|The geographical center point of the map. Changing this value will cause the map position to change.|
|eventData?|object|Additional properties to be added to event objects of events triggered by a change.|

## LngLat
Represents a geographic location on the map. When using the tuple (array) signature the first element is the longitude and the second element is the latitude.
`[number, number] | { lat: number; lng: number; }`

## LngLatBounds
Represents a geographic rectangle on a map. A tuple; the first element is the south west corner, the second element is the north east corner.
`[LngLat, LngLat]`


## MapBoxZoomEvent

|Property|Type|Comments|
|---|---|---|
|originalEvent|MouseEvent|The DOM event which caused the map event.|


## MapDataEvent

|Property|Type|Comments|
|---|---|---|
|coord?|Coordinate|The coordinate of the tile if the event has a dataType of "source" and the event is related to loading of a tile.
|dataType|string|The type of data that has changed. One of "source" or "style".|
|isSourceLoaded?|boolean|True if the event has a dataType of source and the source has no outstanding network requests.|
|source?|object|The style spec representation of the source if the event has a dataType of "source".|
|sourceDataType?|string|Included if the event has a dataType of "source" and the event signals that internal data has been received or changed. Possible values are "metadata" and "content".|
|tile?|object|The tile being loaded or changed, if the event has a dataType of "source" and the event is related to loading of a tile.|
|type|string|The event type.|

## MapMouseEvent

|Property|Type|Comments|
|---|---|---|
|defaultPrevented|boolean|true if preventDefault has been called.|
|lngLat|LngLat|The geographic location on the map of the mouse cursor.|
|originalEvent|Event|The DOM event which caused the map event.|
|point|*|The pixel coordinates of the mouse cursor, relative to the map and measured from the top left corner.|
|preventDefault|() => void|Prevents subsequent default processing of the event by the map.|
|target|Map|The object that fired the event.|
|type|*|The event type.|

## MapTouchEvent

|Property|Type|Comments|
|---|---|---|
|defaultPrevented|boolean|true if preventDefault has been called.|
|lngLat|LngLat|The geographic location on the map of the center of the touch event points.|
|lngLats|LngLat|The geographical locations on the map corresponding to a touch event's touches property.|
|originalEvent|Event|The DOM event which caused the map event.|
|point|*|The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left corner.|
|points|*|The array of pixel coordinates corresponding to a touch event's touches property.|
|preventDefault|() => void|Prevents subsequent default processing of the event by the map.|
|target|Map|The object that fired the event.|
|type|*|The event type.|


## MapWheelEvent

|Property|Type|Comments|
|---|---|---|
|defaultPrevented|boolean|true if preventDefault has been called.|
|originalEvent|Event|The DOM event which caused the map event.|
|preventDefault|() => void|Prevents subsequent default processing of the event by the map.|
|target|Map|The object that fired the event.|
|type|*|The event type.|

## MotionType
Type of motion the camera should use when transitioning from one location to another.
`"ease" | "fly" | "jump"`

## ZoomOptions

|Property|Type|Comments|
|---|---|---|
|eventData?|object|Additional properties to be added to event objects of events triggered by a change.|
|**zoom**|number|The zoom level of the map.|
