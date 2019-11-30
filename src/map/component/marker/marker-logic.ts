import { Map as MapGL, Marker as MarkerGL, Point as PointGL } from "mapbox-gl";
import { Point } from "../../../types/location";
import { AnchorType } from "../../../types/ui";

export function createMapboxGLMarker(
  map: MapGL,
  { anchor, color, draggable, offset }: Options,
  markerElement?: HTMLElement
): [MarkerGL, () => void] {
  const options: mapboxgl.MarkerOptions = {
    anchor,
    color,
    element: markerElement,
    draggable
  };

  if (offset) {
    options.offset = new PointGL(offset.x, offset.y);
  }

  // Create a marker but provide a dummy location. Don't use the location prop
  // because that means it will be wanted as a dependency of useEffect, but we
  // don't want the Marker removed and recreated just because it moved. A
  // location is needed because if there is no location when the Marker is
  // added to the map an error will be thrown.
  const marker = new MarkerGL(options).setLngLat([0, 0]).addTo(map);
  return [marker, () => marker.remove()];
}

export interface Options {
  anchor?: AnchorType;
  color?: string;
  draggable?: boolean;
  offset?: Point;
}
