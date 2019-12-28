import { NavigationControl } from "mapbox-gl";
import { useEffect } from "react";
import { useMap } from "../../map-context";
import { debug } from "../../../util/logger/logger";

export default function Navigation({
  showCompass,
  showZoom,
  visualizePitch
}: NavigationProps): null {
  const map = useMap();

  useEffect(() => {
    const options = { showCompass, showZoom, visualizePitch };

    debug("Navigation", () => [
      "Creating NavigationControl, options=",
      [options]
    ]);

    const navigation = new NavigationControl(options);
    map.addControl(navigation);
    return () => {
      debug("Navigation", () => "Removing NavigationControl");
      map.removeControl(navigation);
    };
  }, [map, showCompass, showZoom, visualizePitch]);

  return null;
}

interface NavigationProps {
  /**
   * If true the compass button is included. Defaults to true.
   */
  showCompass?: boolean;
  /**
   * If true the zoom-in and zoom-out buttons are included. Defaults to true.
   */
  showZoom?: boolean;
  /**
   * If true the pitch is visualized by rotating X-axis of compass. Defaults to false.
   */
  visualizePitch?: boolean;
}
