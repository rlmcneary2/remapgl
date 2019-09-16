import React, { useEffect, useRef, useState } from "react";
import MapCss from "./map-css";
import MapElement, { Props as MapElementProps } from "./map-element";


/**
 * The Map object represents the map on your page.
 */
const Map: React.FC<Props> = ({ css, ...props }): JSX.Element => {
  return (
    <MapCss css={css}>
      <MapElement {...props} />
    </MapCss>
  );
};

export default Map;

export interface Props extends MapElementProps {
  css?: string;
}
