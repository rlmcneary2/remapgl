import React, { useEffect } from "react";
import { useMap } from "../map/map-context";

/**
 * A layer in a map.
 */
const Layer: React.FC<Props> = ({ id, paint, source, type, ...props }): null => {
  const map = useMap();
  // This is a "secret" prop added by map-data to let us know which layer, if
  // any this layer goes before.
  const { beforeId }: { beforeId: string; } = props as any;

  // Update layer position based on beforeId.
  useEffect(() => {
    if (!map.getLayer(id)) {
      return;
    }

    const args: [string] = [ id ];
    if (beforeId) {
      args.push(beforeId);
    }

    console.log(`${id} moveLayer(${JSON.stringify(args)})`);

    map.moveLayer(...args);
  }, [ beforeId, id ]);

  // Create the layer in the map.
  useEffect(() => {
    if (map.getLayer(id)) {
      map.removeLayer(id);
      map.removeSource(id);
    }

    const args: Partial<[any, string]> = [{
      id,
      paint,
      source,
      type
    }];

    if (beforeId && map.getLayer(beforeId)) {
      args.push(beforeId);
    }

    console.log(`${id} addLayer(${args[1]})`);

    map.addLayer(...args);

    return () => {
      map.removeLayer(id);
      map.removeSource(id);
    };
  }, [ id, map, paint, source, type ]);

  return null;
};

// Set this flag so that we can find a map's children that are Layers. This is
// necessary to tie their position in children to their position in the map
// layers.
(Layer as any).isRemapGLLayer = true;

export default Layer;

interface Props {
  /**
   * Unique layer name.
   */
  id: string;
  /**
   * How to draw the data contained in the source.
   */
  paint: { [key: string]: any };
  /**
   * The source of information for the layer.
   */
  source: LayerSource;
  /**
   * Rendering type of this layer.
   */
  type: "circle";
}


/**
 * The source of information for the layer.
 */
interface LayerSource {
  data: any;
  type: "geojson";
}
