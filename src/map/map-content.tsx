import React from "react";

/**
 * Gather information when both the context provider and the map have to exist.
 */
export default function MapContent({ children }): JSX.Element {
  // This code is part of the synchronization of the order of the layers in the
  // map-container component with the layers in the mapboxgl map. It iterates
  // over all the children and determines the layers' order, it passes a
  // "beforeId" prop to each layer clone so the clone knows where it belongs in
  // the map object and can update its position if needed.
  const clones = React.Children.toArray(children).map((child, i, arr) => {
    if ("isRemapGLLayer" in (child as any).type) {
      const beforeId = nextBeforeLayerId(i, arr);
      return React.cloneElement(child as any, { beforeId });
    }

    return child;
  });

  return <>{clones}</>;
}

/**
 * Find the ID of the layer that is before the current one.
 * @param currentIndex Index of the current layer
 * @param children All the children of this component.
 */
function nextBeforeLayerId(currentIndex: number, children: any[]) {
  for (let i = currentIndex + 1; i < children.length; i++) {
    if ("isRemapGLLayer" in (children[i] as any).type) {
      return children[i].props.id;
    }
  }

  return "";
}
