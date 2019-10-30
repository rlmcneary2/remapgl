const { mergeWith } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Remapgl',
    description:
      "Quickly and easily create MapboxGL-based maps. Add Markers, Layers, Popups, and other controls to a map using remapgl's React components and props.",
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/Users/rich/github/remapgl/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Remapgl',
        description:
          "Quickly and easily create MapboxGL-based maps. Add Markers, Layers, Popups, and other controls to a map using remapgl's React components and props.",
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/rich/github/remapgl',
          templates:
            '/Users/rich/github/remapgl/node_modules/docz-core/dist/templates',
          docz: '/Users/rich/github/remapgl/.docz',
          cache: '/Users/rich/github/remapgl/.docz/.cache',
          app: '/Users/rich/github/remapgl/.docz/app',
          appPackageJson: '/Users/rich/github/remapgl/package.json',
          gatsbyConfig: '/Users/rich/github/remapgl/gatsby-config.js',
          gatsbyBrowser: '/Users/rich/github/remapgl/gatsby-browser.js',
          gatsbyNode: '/Users/rich/github/remapgl/gatsby-node.js',
          gatsbySSR: '/Users/rich/github/remapgl/gatsby-ssr.js',
          importsJs: '/Users/rich/github/remapgl/.docz/app/imports.js',
          rootJs: '/Users/rich/github/remapgl/.docz/app/root.jsx',
          indexJs: '/Users/rich/github/remapgl/.docz/app/index.jsx',
          indexHtml: '/Users/rich/github/remapgl/.docz/app/index.html',
          db: '/Users/rich/github/remapgl/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
