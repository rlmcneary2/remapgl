# remapgl
Declarative MapboxGL bindings <🌎>

Quickly and easily create maps with [MapboxGL](https://docs.mapbox.com/mapbox-gl-js/api/) with [React](https://reactjs.org/). Add Markers, Layers, Popups, and other controls to a map using remapgl's React components and props. See it [live at codesandbox](https://codesandbox.io/s/remapgl-hfuhl?fontsize=14).

## API
Full API documentation is available: [https://limnous.com/remapgl/docs/](https://limnous.com/remapgl/docs/).

## Sample
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
