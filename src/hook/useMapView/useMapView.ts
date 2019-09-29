import { CameraOptions, Map as MapboxMap } from "mapbox-gl";
import { useEffect } from "react";
import { AnimationOptions, BoundsOptions, CenterOptions, FitBoundsOptions, LngLat, LngLatBounds, MotionType, ZoomOptions } from "../../types/location";
import { extractBounds, extractCenter, extractZoom } from "../../util/extractors/extractors";


/**
 * A hook that updates the camera's view of the map when bounds, center, or zoom
 * change. Takes options that define the location and the camera motion to get
 * there.
 */
export function useMapView(
  map: MapboxMap | undefined,
  animationOptions: AnimationOptions | undefined,
  motionType: MotionType | undefined,
  bounds: Bounds,
  center: Center,
  zoom: Zoom
) {
  useEffect(() => {
    if (!map || !bounds) {
      return;
    }

    const { bounds: nextBounds, eventData } = extractBounds(bounds);

    map.fitBounds(
      nextBounds,
      animationOptions && motionType
        ? { ...animationOptions, linear: motionType === "ease" }
        : undefined,
      eventData
    );
  }, [bounds]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const { center: nextCenter, eventData: centerEventData } = extractCenter(center);
    const { zoom: nextZoom, eventData: zoomEventData } = extractZoom(zoom);

    const options: Partial<CameraOptions> = {};
    let eventData: any;
    if (zoom) {
      options.zoom = nextZoom;
      eventData = zoomEventData;
    }

    if (center) {
      options.center = nextCenter;
      eventData = { ...eventData, ...centerEventData };
    }

    map[`${motionType || "jump"}To`](options, eventData);
  }, [center, zoom]);
}


type Bounds = LngLatBounds | BoundsOptions | undefined;
type Center = LngLat | CenterOptions;
type Zoom = number | ZoomOptions;
