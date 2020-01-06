import React, { useEffect } from "react";
import { Layer as LayerMbx, Map as MapMbx } from "mapbox-gl";
import { useMap } from "../../map/map-context";
import { InternalLayerProps, LayerProps } from "./layer-types";
import { debug } from "../../util/logger/logger";

/**
 * A layer in a map.
 */
export default function Layer(props: LayerProps): JSX.Element {
  const map = useMap();
  const { id } = props;

  // Create the layer in the map.
  useEffect(() => {
    return () => {
      if (map) {
        debug("Layer", () => `Layer: "${id}" is being removed.`);
        map.getLayer(id) && map.removeLayer(id);
        map.getSource(id) && map.removeSource(id);
      }
    };
  }, [id, map]);

  if (map && !addLayer(map, props as InternalLayerProps)) {
    // Update layer position based on beforeId.
    updateLayerPosition(map, props as InternalLayerProps);
  }

  return <></>;
}

// Set this flag so that we can find a map's children that are Layers. This is
// necessary to tie their position in children to their position in the map's
// layers.
(Layer as any).isRemapGLLayer = true;

function addLayer(
  map: MapMbx,
  {
    beforeId,
    filter,
    id,
    layout,
    maxZoom,
    metadata,
    minZoom,
    paint,
    source,
    type,
    ...props
  }: InternalLayerProps
): boolean {
  if (map.getLayer(id)) {
    return false;
  }

  const layerData: LayerMbx = {
    id
  };

  // If these properties have a value of undefined mapboxgl will error with a
  // red herring error message; so only add them if they have a value.
  if (Array.isArray(filter)) {
    layerData.filter = filter;
  }

  if (layout !== null && typeof layout !== "undefined") {
    layerData.layout = layout;
  }

  if (typeof maxZoom === "number") {
    layerData.maxzoom = maxZoom;
  }

  if (metadata !== null && typeof metadata !== "undefined") {
    layerData.metadata = metadata;
  }

  if (typeof minZoom === "number") {
    layerData.minzoom = minZoom;
  }

  if (paint !== null && typeof paint !== "undefined") {
    layerData.paint = paint;
  }

  if (typeof props["source-layer"] === "string") {
    layerData["source-layer"] = props["source-layer"];
  }

  if (source !== null && typeof source !== "undefined") {
    layerData.source = source;
  }

  if (type !== null && typeof type !== "undefined") {
    layerData.type = type;
  }

  const args: [LayerMbx, string?] = [layerData];

  if (beforeId && map.getLayer(beforeId)) {
    args.push(beforeId);
  }

  map.addLayer(...args);
  debug("Layer", () => [`Layer: '${id}' added to map; args=`, args]);
  return true;
}

function updateLayerPosition(
  map: MapMbx,
  { beforeId, id }: InternalLayerProps
) {
  if (!map.getLayer(id)) {
    return;
  }

  debug(
    "Layer",
    () =>
      `Layer updateLayerPosition: '${id}' is before (but visually below) '${beforeId}'.`
  );

  const args: [string] = [id];
  if (beforeId && map.getLayer(beforeId)) {
    args.push(beforeId);
  }

  map.moveLayer(...args);
}
