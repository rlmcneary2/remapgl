exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null() // mapbox-gl attempts to use "self" which fails while building documentation.
          }
        ]
      }
    });
  }
};
