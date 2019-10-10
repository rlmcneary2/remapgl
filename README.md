# remapgl
Declarative MapboxGL bindings <🌎>

Quickly and easily create MapboxGL-based maps. Add Markers, Layers, Popups, and other controls to a map using remapgl's React components and props. See it [live at codesandbox](https://codesandbox.io/s/remapgl-hfuhl?fontsize=14).

# API
You want to start with the [Map](#map) component.

## Attribution
An AttributionControl control presents the map's [attribution information](https://docs.mapbox.com/help/how-mapbox-works/attribution/).
### customAttribution: [string | string[]]
One or more strings to show in addition to the default attributions.
### compact: [boolean=false]
If true force a compact attribution that shows the full attribution on mouse hover, or if false force the full attribution control. The default is a responsive attribution that collapses when the map is less than 640 pixels wide.

## CircleLayer
TODO: display a layer wih circles on it.
### points: any[]
An array of points to render as a layer.

## GeoJsonCircleLayer
TODO: display a layer wih circles on it.
### geoJson: object
The geojson object with circle locations.

## GeoJsonPathLayer
TODO: display a layer wih a path.
### geoJson: object
The geojson object with path locations.

# [Layer](./src/layer/mapboxgl/layer.md)
Display a set of information on a map.

## [Map](./src/map/README.md)
The root component of remapgl; creates and displays a map.

## [Marker](.src/marker/marker.md)
Creates a marker component.

## Navigation
### showCompass: [boolean=true]
If true the compass button is included.
### showZoom: [boolean=true]
If true the zoom-in and zoom-out buttons are included.
### visualizePitch: [boolean=true]
If true the pitch is visualized by rotating X-axis of compass.

## PathLayer
TODO: display a layer wih a path.
### path: any
A thing that defines a path (to be turned into geojson).

## Popup *(for Marker)*
### children: React.ReactElement
The contents of the popup component.
### className: [string]
A class name to set on the containing DIV element.
### closeButton: [boolean=true]
### offset: [number | PointLike | { [key: string]: Point }]
A pixel offset applied to the popup's location.
- a single number specifying a distance from the popup's location
- a PointLike specifying a constant offset
- an object of Points specifing an offset for each anchor position Negative offsets indicate left and up.

## Popup
### children: React.ReactElement
The body of the popup component.
### className: [string]
A class name to set on the containing DIV element.
### closeButton: [boolean=true]
If true, a close button will appear in the top right corner of the popup.
### offset: [number | PointLike | { [key: string]: Point }]
A pixel offset applied to the popup's location.
- a single number specifying a distance from the popup's location
- a PointLike specifying a constant offset
- an object of Points specifing an offset for each anchor position Negative offsets indicate left and up.
### location: LngLat
Set the popup's geographical position and move to it.
