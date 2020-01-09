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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

fs.readFile("./README.md", "utf8", (err, data) => {
  let text =
    `---
name: Getting Started
---

` + data;

  text = insertApiTitles(text);
  fs.writeFile("./src/README.mdx", text, "utf8", () => console.log("done"));
});

function insertApiTitles(text) {
  return text.replace(
    /## API\s[\w :/.[\]()]*/m,
    `## API
You probably want to start with the [Map](/map) component.

### [Attribution](/attribution)
An AttributionControl control presents the map's attribution information.

### [Layer](/layer)
Display a set of information on a map.

### [Map](/map)
The root component of remapgl; creates and displays a map.

### [Marker](/marker)
Creates a marker component.

### [Navigation](/navigation)
Creates the navigation control in the map that contains zoom buttons and a compass.

### [Popup](/popup)
Provides information when the user manipulates a control.`
  );
}
