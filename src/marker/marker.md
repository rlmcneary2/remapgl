# Marker
The `<Marker/>` component is a child of [Map](../map/README.md), it causes a marker to appear at a specific location on a map. Markers can have popups that provide more information as needed.

## MarkerProps
These are the props that can be passed to the `<Marker />` component.

A property followed by a "?" indicates an optional prop.

|Property|Type|Comments|
|---|---|---|
|as?|string="div"|The name of an HTML element that hosts the marker.|
|anchor?|AnchorType="center"|A string indicating the part of the Marker that should be positioned closest to the coordinate set ny location. Can't be changed once set.|
|children?|ReactElement|Defines the appearance of a marker. If not provided the default pin marker will be displayed.|
|className?|string|A class name to set on the containing host element.|
|color?|string="#3FB1CE"|The color to use for the default marker if children are not provided. The default is light blue. Can't be changed once set.|
|draggable?|boolean=false|Indicates if a marker can be dragged to a new location on the map.|
|**location**|LngLat|Set the marker's geographical position and move to it.|
|offset?|Point|The offset in pixels to apply relative to the element's center. Negative values indicate left and up.|
|onClick?|(props) => void|Fired when the marker is clicked.|
|onDrag?|(props) => void|Fired while dragging.|
|onDragend?|(LngLat) => void|Fired when the marker is finished being dragged.|
|onDragstart?|(LngLat) => void|Fired when dragging starts.|
|onMouseenter?|(props) => void|Fired when the mouse enters the marker.|
|onMouseleave?|(props) => void|Fired when the mouse leaves the marker.|
|popup?|() => \<Popup /\>|A function that returns a Popup component for this marker.|
|togglePopup?|boolean=false|If true the popup will be shown.|

# Associated Types

## AnchorType
A string indicating the part of the Marker that should be positioned closest to the coordinate set ny location.

`"center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"`

## Point
A Point geometry object, which has x and y properties representing screen coordinates in pixels.

|Property|Type|Comments|
|---|---|---|
|**x**|number|X coordinate in pixels.|
|**y**|number|Y coordinate in pixels.|
