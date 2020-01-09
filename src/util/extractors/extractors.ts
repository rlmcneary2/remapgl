/* Copyright (c) 2020 Richard L. McNeary II
 *
 * MIT License Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {
  BoundsOptions,
  CenterOptions,
  FitBoundsOptions,
  LngLat,
  LngLatBounds,
  ZoomOptions
} from "../../types/location";

export function extractBounds(
  options: BoundsOptions | LngLatBounds
): {
  bounds: LngLatBounds;
  eventData: { [key: string]: any } | undefined;
  fitBoundsOptions: FitBoundsOptions | undefined;
} {
  let bounds: LngLatBounds;
  let eventData: { [key: string]: any } | undefined;
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
): { center: LngLat; eventData: { [key: string]: any } | undefined } {
  let center: LngLat;
  let eventData: { [key: string]: any } | undefined;
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
): { zoom: number | undefined; eventData: { [key: string]: any } | undefined } {
  let zoom: number | undefined;
  let eventData: { [key: string]: any } | undefined;
  if (isZoomOptions(options)) {
    ({ eventData, zoom } = options as ZoomOptions);
  } else if (options) {
    zoom = options;
  }

  return {
    eventData,
    zoom
  };
}

function isBoundsOptions(
  options: LngLatBounds | BoundsOptions | undefined
): options is BoundsOptions {
  return !!options && "bounds" in options;
}

function isCenterOptions(
  options: LngLat | CenterOptions | undefined
): options is CenterOptions {
  return !!options && "center" in options;
}

function isZoomOptions(
  options: number | ZoomOptions | undefined
): options is ZoomOptions {
  return !!options && typeof options === "object";
}
