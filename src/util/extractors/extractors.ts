import { BoundsOptions, CenterOptions, FitBoundsOptions, LngLat, LngLatBounds, ZoomOptions } from "../../types/location";


export function extractBounds(
  options: BoundsOptions | LngLatBounds
): {
  bounds: LngLatBounds;
  eventData: {[key: string]: any} | undefined;
  fitBoundsOptions: FitBoundsOptions | undefined
} {
  let bounds: LngLatBounds;
  let eventData: {[key: string]: any} | undefined;
  let fitBoundsOptions: FitBoundsOptions | undefined;
  if (isBoundsOptions(options)) {
    ({ bounds, eventData } = options);
    const { maxZoom: boundsMaxZoom, padding } = options;
    fitBoundsOptions = { maxZoom: boundsMaxZoom, padding };
  } else {
    bounds = options;
  }

  return {
    bounds,
    eventData,
    fitBoundsOptions
  };
}

export function extractCenter(
  options: CenterOptions | LngLat
): { center: LngLat; eventData: {[key: string]: any} | undefined; } {
  let center: LngLat;
  let eventData: {[key: string]: any} | undefined;
  if (isCenterOptions(options)) {
    ({ center, eventData } = options);
  } else {
    center = options;
  }

  return {
    center,
    eventData
  };
}

export function extractZoom(
  options: number | ZoomOptions | undefined
): { zoom: number | undefined; eventData: {[key: string]: any} | undefined; } {
  let zoom: number | undefined;
  let eventData: {[key: string]: any} | undefined;
  if (isZoomOptions(options)) {
    ({ eventData, zoom } = (options as ZoomOptions));
  } else if (options) {
    zoom = options;
  }

  return {
    eventData,
    zoom
  };
}


function isBoundsOptions(options: LngLatBounds | BoundsOptions | undefined): options is BoundsOptions {
  return !!options && "bounds" in options;
}

function isCenterOptions(options: LngLat | CenterOptions | undefined): options is CenterOptions {
  return !!options && "center" in options;
}

function isZoomOptions(options: number | ZoomOptions | undefined): options is ZoomOptions {
  return !!options && typeof options === "object";
}
