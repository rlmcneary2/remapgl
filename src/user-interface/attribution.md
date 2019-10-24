# Attribution

The `<Attribution />` component is a child of [Map](../map/map.md), it sets the [attribution information](https://docs.mapbox.com/help/how-mapbox-works/attribution/) that will appear on the map.

## AttributionProps
Props that can be passed to the `<Attribution />` component.

A property followed by a "?" indicates an optional prop.

|Property|Type|Comments|
|---|---|---|
|customAttribution?|string \| string[]|One or more strings to show in addition to the default attributions.|
|compact?|boolean=false|If true force a compact attribution that shows the full attribution on mouse hover, or if false force the full attribution control. The default is a responsive attribution that collapses when the map is less than 640 pixels wide.|
