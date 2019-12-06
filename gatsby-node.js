exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  console.log(`---------------------STAGE = ${stage}`);
  if (stage === "build-html" || stage === "develop-html") {
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
