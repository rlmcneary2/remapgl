import { AttributionControl } from "mapbox-gl";
import React, { useEffect } from "react";
import { useMap } from "../map/map-context";

const Attribution = (props: Props): React.ReactElement | null => {
  const map = useMap();

  useEffect(() => {
    const attribution = new AttributionControl(props);
    map.addControl (attribution);
    return () => { map.removeControl(attribution); };
  }, [map, props]);

  return null;
};

interface Props {
  /**
   * If true force a compact attribution that shows the full attribution on
   * mouse hover, or if false force the full attribution control.
   */
  compact?: boolean;
  /**
   * String or strings to show in addition to any other attributions.
   */
  customAttribution?: string | string[];
}

export default Attribution;
