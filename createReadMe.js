const fs = require("fs");

fs.readFile("./README.md", "utf8", (err, data) => {
  let updated =
    `---
name: Getting Started
---
 
` + data;

  updated = insertApiTitles(updated);
  fs.writeFile("./src/README.mdx", updated, "utf8", () => console.log("done"));
});

function insertApiTitles(data) {
  return data.replace(
    /## API\s[\w [\](.)/]*/,
    `## API
You probably want to start with the [Map](/map) component.`
  );
}
