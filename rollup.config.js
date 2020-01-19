import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const banner = `/* Copyright (c) 2020 Richard L. McNeary II
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
 */`;

const commonjsResult = commonjs({
  namedExports: {
    "mapbox-gl": [
      "AttributionControl",
      "GeolocateControl",
      "Map",
      "Marker",
      "NavigationControl",
      "Point",
      "Popup",
      "ScaleControl",
      "version"
    ]
  }
});
const input = "./src/index.ts";
const cjs = {
  external: ["mapbox-gl", "react", "react-dom"],
  input,
  output: {
    banner,
    file: `./dist/index.cjs.js`,
    format: "cjs",
    plugins: [terser()],
    sourcemap: true
  },
  plugins: [typescript(), resolve(), commonjsResult]
};
const esm = {
  external: ["mapbox-gl", "react", "react-dom"],
  input,
  output: {
    banner,
    file: `./dist/index.es.js`,
    format: "esm",
    plugins: [terser()],
    sourcemap: true
  },
  plugins: [typescript(), resolve(), commonjsResult]
};
const umd = {
  external: ["mapbox-gl", "react", "react-dom"],
  input,
  output: {
    banner,
    file: "./dist/index.umd.js",
    format: "umd",
    globals: {
      "mapbox-gl": "mapboxgl",
      react: "React",
      "react-dom": "ReactDOM"
    },
    name: "remapgl",
    plugins: [terser()],
    sourcemap: true
  },
  plugins: [typescript(), resolve(), commonjsResult]
};
// const umdDebug = {
//   ...umd,
//   output: {
//     ...umd.output,
//     file: "./dist/index.js",
//     plugins: [],
//     sourcemap: true,
//   }
// };

export default [
  cjs,
  esm,
  umd
  // umdDebug
];
