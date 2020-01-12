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

 const input = "./src/index.ts";
 const esm = 
  {
    external: ["mapbox-gl", "react"],
    input,
    output: {
      banner,
      file: `./dist/remapgl.esm.js`,
      format: "esm",
      sourcemap: true
    },
    plugins: [typescript()]
};
const umd = {
  external: ["react"],
  input,
  output: {
    banner,
    file: "./dist/remapgl.min.umd.js",
    format: "umd",
    globals: { react: "React", "mapbox-gl": "mapboxgl" },
    name: "remapgl",
    plugins: [terser()]
  },
  plugins: [
    resolve(),
    commonjs({
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
    }),
    typescript()
  ],
};
const umdDebug = {
  ...umd,
  output: {
    ...umd.output,
    file: "./dist/remapgl.umd.js",
    plugins: [],
    sourcemap: true,
  }
};

export default [
  esm,
  umd,
  umdDebug
];
