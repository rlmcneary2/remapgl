import { NavigationControl } from "mapbox-gl";
import React, { useEffect } from "react";
import { useMap } from "../map/map-context";
import { debug } from "../util/logger/logger";

const Navigation = (props: NavigationProps): React.ReactElement | null => {
  const map = useMap();

  useEffect(() => {
    debug("Navigation", () => ["Creating NavigationControl, props=", [props]]);
    const navigation = new NavigationControl(props);
    map.addControl(navigation);
    return () => {
      debug("Navigation", () => "Removing NavigationControl");
      map.removeControl(navigation);
    };
  }, [map, props]);

  return null;
};

interface NavigationProps {
  /**
   * If true the compass button is included.
   */
  showCompass?: boolean;
  /**
   * If true the zoom-in and zoom-out buttons are included.
   */
  showZoom?: boolean;
  /**
   * If true the pitch is visualized by rotating X-axis of compass.
   */
  visualizePitch?: boolean;
}

export default Navigation;
