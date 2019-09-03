import React, { useEffect, useRef, useState } from "react";
import { useMap } from "../map/map-context";
import { LngLatLike, Marker as MarkerGL } from "mapbox-gl";


const Marker: React.FC<Props> = ({ children, location }): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const markerRef = useRef<MarkerGL | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!ref.current || markerRef.current) {
      return;
    }

    // Create a marker but provide a dummy location. Don't use the location prop
    // because that means it will be wanted as a dependency of useEffect, but we
    // don't want the Marker removed and recreated just because it moved. A
    // location is needed because if there is no location when the Marker is
    // added to the map an error will be thrown.
    const markerState = new MarkerGL(ref.current);
    markerState.setLngLat([0, 0]);
    markerState.addTo(map);

    markerRef.current = markerState;

    return () => {
      markerState.remove();
      markerRef.current = null;
    };
  }, [map]);

    // Update the vehicle location.
    useEffect(() => {
      if (markerRef.current){
        markerRef.current.setLngLat(location);
      }
    }, [location]);
  
  return (
    <div ref={ref}>{children}</div>
  )
}

export default Marker;


export interface Props {
  location: LngLatLike;
}
