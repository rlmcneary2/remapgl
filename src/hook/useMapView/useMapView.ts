import { CameraOptions, Map as MapMbx } from "mapbox-gl";
import { useEffect } from "react";
import {
  extractBounds,
  extractCenter,
  extractZoom
} from "../../util/extractors/extractors";
import {
  AnimationOptions,
  BoundsOptions,
  CenterOptions,
  LngLatBounds,
  MotionType,
  ZoomOptions
} from "../../types/location";

/**
 * A hook that updates the camera's view of the map when bounds, center, or zoom
 * change. Takes options that define the location and the camera motion to get
 * there.
 */
export function useMapView(
  map: MapMbx | undefined,
  {
    animationOptions,
    bounds,
    center,
    motionType,
    zoom
  }: {
    animationOptions?: AnimationOptions;
    bounds?: LngLatBounds | BoundsOptions;
    center: CenterOptions | [number, number] | { lng: number; lat: number };
    motionType?: MotionType;
    zoom: ZoomOptions | number;
  }
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
  }, [animationOptions, bounds, map, motionType]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const { center: nextCenter, eventData: centerEventData } = extractCenter(
      center
    );
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
  }, [center, map, motionType, zoom]);
}
