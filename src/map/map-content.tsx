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
