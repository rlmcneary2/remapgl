import { useEffect } from "react";
import { AttributionControl } from "mapbox-gl";
import { useMap } from "../map/map-context";

export default function Attribution({
  compact = false,
  customAttribution
}: AttributionProps): null {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const attribution = new AttributionControl({ compact, customAttribution });
    map.addControl(attribution);
    return () => {
      map.removeControl(attribution);
    };
  }, [map, compact, customAttribution]);

  return null;
}

export interface AttributionProps {
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
