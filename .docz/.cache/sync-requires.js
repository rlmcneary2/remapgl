const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/rich/github/remapgl/.docz/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/rich/github/remapgl/.docz/src/pages/404.js"))),
  "component---readme-md": hot(preferDefault(require("/Users/rich/github/remapgl/README.md"))),
  "component---src-map-map-mdx": hot(preferDefault(require("/Users/rich/github/remapgl/src/map/map.mdx"))),
  "component---src-popup-popup-md": hot(preferDefault(require("/Users/rich/github/remapgl/src/popup/popup.md"))),
  "component---src-user-interface-attribution-md": hot(preferDefault(require("/Users/rich/github/remapgl/src/user-interface/attribution.md"))),
  "component---src-user-interface-navigation-md": hot(preferDefault(require("/Users/rich/github/remapgl/src/user-interface/navigation.md"))),
  "component---src-marker-marker-md": hot(preferDefault(require("/Users/rich/github/remapgl/src/marker/marker.md"))),
  "component---src-layer-mapboxgl-layer-md": hot(preferDefault(require("/Users/rich/github/remapgl/src/layer/mapboxgl/layer.md"))),
  "component---src-map-map-md": hot(preferDefault(require("/Users/rich/github/remapgl/src/map/map.md")))
}

