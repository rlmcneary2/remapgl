# Map
The `<Map/>` component creates and displays a map. The Map can be controlled and interacted with via its props. The only required prop is `accessToken`. This is [a string token provided by Mapbox](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/), you will need to create a Mapbox account to get one.

A Map component can accept a number of other tokens as children. Data at a specific point is displayed on a map using a `<Marker/>`. Information that applies to paths or regions on a map can be applied by `<Layer/>` components.

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
|events?|stirng[]|The map will listen for these events. If onEvent is provided it will be invoked when an event occurs.|
|cssFile?|string|The MapboxGL CSS file to use; defaults to "//api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css".|
|fadeDuration?|number|Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.|
|maxBounds?|LngLatBounds|The map will be constrained to the given bounds.|
|maxZoom?|number|The maximum zoom level of the map (0-24).|
|minZoom?|number|The minimum zoom level of the map (0-24).|
|motionType?|MotionType|How the camera moves when transitioning from one location to another through bounds, center, or zoom.|
|onEvent?|(data: EventData) => void|Invoked when an event specified in "events" occurs.|
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

## MotionType
Type of motion the camera should use when transitioning from one location to another.
`"ease" | "fly" | "jump"`

## ZoomOptions

|Property|Type|Comments|
|---|---|---|
|eventData?|object|Additional properties to be added to event objects of events triggered by a change.|
|**zoom**|number|The zoom level of the map.|
