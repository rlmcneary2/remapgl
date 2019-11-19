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
    /## API\s[\w :/.]*/m,
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
