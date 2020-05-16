/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = config => {
  config.set({
    client: { clearContext: false },
    frameworks: ["jasmine", "karma-typescript"],
    files: [{ pattern: "src/**/*.+(ts|tsx)" }, "test/**/*.ts"],
    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [
          require("karma-typescript-es6-transform")({
            presets: [
              [
                "env",
                {
                  targets: {
                    browsers: ["last 2 Chrome versions"]
                  }
                }
              ]
            ]
          })
        ]
      },
      compilerOptions: {
        // target: "es2019",
        lib: ["dom", "es6", "es7", "esnext"],
        // allowJs: false,
        skipLibCheck: true,
        // esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        // strict: true,
        // forceConsistentCasingInFileNames: true,
        // module: "esnext",
        // moduleResolution: "node",
        resolveJsonModule: true,
        // isolatedModules: true,
        // jsx: "react",
        // noImplicitAny: false,
        // outDir: "dist",
        sourceMap: true,
        // types: ["jest", "mapbox-gl"],
        // declaration: true,
        // declarationDir: "dist"
        baseUrl: ".",
        paths: {
          "@enzyme": ["test/enzyme.ts"]
        }
      }
      // exclude: ["dist", "src/test"]
      // exclude: ["dist"]
      // include: ["src/**/*.ts", "src/**/*.tsx"]
    },
    preprocessors: {
      "**/*.ts": "karma-typescript",
      "**/*.tsx": "karma-typescript"
    },
    reporters: ["kjhtml", "progress", "karma-typescript"],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    concurrency: Infinity
  });
};
