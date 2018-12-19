const polyfill = require.resolve('@babel/polyfill')

module.exports = (context, { merge }) => merge({
  entry: {
    polyfill: !process.env.DISABLE_POLYFILL ? [
      polyfill,
    ] : [],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        polyfill: {
          name: 'polyfill',
          chunks: 'all',
          test: module => module.rawRequest === polyfill,
          priority: 20,
        },
      },
    },
  },
})
