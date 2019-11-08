# Popup

The `<Popup />` component is a child of [Map](../map/map.md) or returned by the `popup` prop of [Marker](../marker/marker.md), it provides information when the user manipulates a control.

## PopupProps
Props that can be passed to every `<Popup />` component.

A property followed by a "?" indicates an optional prop.

|Property|Type|Comments|
|---|---|---|
|anchor?|AnchorType|A string indicating the part of the Marker that should be positioned closest to the coordinate set by location. Can't be changed once set.|
|**children**|JSX.Element|The content of the popup.|
|closeButton?|boolean=true|If true, a close button will appear in the top right corner of the popup.|
|offset?|Point|The offset in pixels to apply relative to the element's center; negative values indicate left and up. Can't be changed once set.|

## Non-Marker PopupProps
Props that are only valid for a `<Popup />` component **not** associated with a Marker.

|Property|Type|Comments|
|---|---|---|
|**location**|LngLat|Sets the geographical location of the popup's anchor, and moves the popup to it.|

# Associated Types

## AnchorType
A string indicating the part of the Marker that should be positioned closest to the coordinate set by location.
`"center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"`

## LngLat
Represents a geographic location on the map. When using the tuple (array) signature the first element is the longitude and the second element is the latitude.
`[number, number]` | `{ lat: number; lng: number; }`

## Point
A Point geometry object, which has x and y properties representing screen coordinates in pixels.

|Property|Type|Comments|
|---|---|---|
|**x**|number|X coordinate in pixels.|
|**y**|number|Y coordinate in pixels.|
