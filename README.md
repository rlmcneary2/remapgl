# remapgl
Declarative MapboxGL bindings <🌎>

Quickly and easily create [MapboxGL](https://docs.mapbox.com/mapbox-gl-js/api/) maps with [React](https://reactjs.org/) components. Create a [Map](/map) then add children like [Marker](/marker), [Layer](/layer), [Popup](/popup), and other remapgl React components. See it [live at codesandbox](https://codesandbox.io/dashboard/sandboxes/remapgl).

## Getting Started
Add the remapgl package to your application:
```
yarn add remapgl
```
Then import the components you want to use:
```
import { Map, Layer, Marker } from "remapgl";
```
The Map component is the parent element of a map. Simply add other components as children to build a map with data and interactive components like Layer and Marker.

It's easy to customize Marker and Popup components by giving them child components. This allows you to use [styled components](https://emotion.sh/docs/styled) and other React libraries you already know to create custom content.

## API
Full API and component documentation is available: [https://limnous.com/remapgl/docs/](https://limnous.com/remapgl/docs/).

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
