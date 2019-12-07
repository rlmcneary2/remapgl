import { Layer as LayerGL } from "mapbox-gl";
import React, { useEffect } from "react";
import { useMap } from "../../map/map-context";
import { LayerProps } from "./layer-types";

/**
 * A layer in a map.
 */
const Layer: React.FC<LayerProps> = (props): null => {
  const {
    beforeId,
    filter,
    id,
    layout,
    maxZoom,
    metadata,
    minZoom,
    paint,
    source,
    "source-layer": sourceLayer,
    type,
    ...eventListeners
  } = props as InternalLayerProps;
  const map = useMap();

  // Update layer position based on beforeId.
  useEffect(() => {
    if (!map.getLayer(id)) {
      return;
    }

    const args: [string] = [id];
    if (beforeId) {
      args.push(beforeId);
    }

    map.moveLayer(...args);
  }, [beforeId, id, map]);

  // Create the layer in the map.
  useEffect(() => {
    if (map.getLayer(id)) {
      map.removeLayer(id);
      map.removeSource(id);
    }

    // tslint:disable: object-literal-key-quotes
    const layerData: LayerGL = {
      id
    };

    if (filter) {
      layerData.filter = filter;
    }

    if (layout) {
      layerData.layout = layout;
    }

    if (maxZoom) {
      layerData.maxzoom = maxZoom;
    }

    if (metadata) {
      layerData.metadata = metadata;
    }

    if (minZoom) {
      layerData.minzoom = minZoom;
    }

    if (paint) {
      layerData.paint = paint;
    }

    if (source) {
      layerData.source = source;
    }

    if (sourceLayer) {
      layerData["source-layer"] = sourceLayer;
    }

    if (type) {
      layerData.type = type;
    }

    const args: [LayerGL, string?] = [layerData];
    // tslint:enable: object-literal-key-quotes

    if (beforeId && map.getLayer(beforeId)) {
      args.push(beforeId);
    }

    map.addLayer(...args);

    return () => {
      map.removeLayer(id);
      map.removeSource(id);
    };
  }, [
    beforeId,
    filter,
    id,
    layout,
    map,
    maxZoom,
    metadata,
    minZoom,
    paint,
    source,
    sourceLayer,
    type
  ]);

  // Connect layer events.
  useEffect(() => {
    if (!map) {
      return;
    }

    function handlerFactory(eventType: string) {
      return (data: any) => eventHandler(eventType, eventListeners, data);
    }

    const listeners = {};
    for (const prop in eventListeners) {
      if (prop.startsWith("on") && typeof eventListeners[prop] === "function") {
        const eventType = prop.substr(2);
        listeners[eventType] = handlerFactory(eventType);
        map.on(eventType.toLowerCase() as any, id, listeners[eventType]);
      }
    }

    return () => {
      // tslint:disable-next-line: forin
      for (const eventType in listeners) {
        map.off(eventType.toLowerCase() as any, id, listeners[eventType]);
      }
    };
  }, [eventListeners, id, map]);

  return null;
};

// Set this flag so that we can find a map's children that are Layers. This is
// necessary to tie their position in children to their position in the map
// layers.
(Layer as any).isRemapGLLayer = true;

export default Layer;

function eventHandler(type: string, eventListeners: any, data: any) {
  eventListeners[`on${type}`](data);
}

interface InternalLayerProps extends LayerProps {
  /**
   * This is a "secret" prop added by map-data to let us know which layer, if
   * any, this layer goes before.
   */
  beforeId: string;
}
