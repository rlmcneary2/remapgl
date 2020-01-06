import React, { useState, useEffect } from "react";
import MapContextProvider from "./map-context";
import MapContent from "./map-content";
import { MapContainerProps } from "./map-types";

/**
 * Creates the HTML object for the map and a MaboxGL Map object.
 */
export default function MapContainer({
  as = "div",
  children,
  className,
  style,
  ...props
}: React.PropsWithChildren<MapContainerProps>): JSX.Element {
  // mapElement is stored with useState so when the element is created the
  // MapContext will be updated with the container element for the map.
  const [mapElement, setMapElement] = useState<HTMLElement>();

  // Release the mapElement when this component is unmounted.
  useEffect(() => () => mapElement && setMapElement(undefined), [mapElement]);

  return React.createElement(
    as,
    {
      className,
      ref: (element: HTMLElement) => setMapElement(element),
      style
    },
    <MapContextProvider container={mapElement} {...props}>
      <MapContent>{children}</MapContent>
    </MapContextProvider>
  );
}
