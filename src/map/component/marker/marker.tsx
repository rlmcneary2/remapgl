import React, { useRef } from "react";
import { MarkerProps } from "./marker-types";
import MarkerDefault from "./marker-default";
import MarkerCustom from "./marker-custom";
import { useMap } from "../../map-context";

let moduleUid = Date.now();

/**
 * Creates a marker component.
 */
export default function Marker({
  children,
  ...props
}: MarkerProps): JSX.Element | null {
  const map = useMap();
  const uid = useRef(`${moduleUid++}`);

  if (!map) {
    return null;
  }

  const markerProps = {
    ...props,
    map,
    uid: uid.current
  };

  return 0 < React.Children.count(children) ? (
    <MarkerCustom {...markerProps}>{children}</MarkerCustom>
  ) : (
    <MarkerDefault {...markerProps} />
  );
}
