const polyfill = require.resolve('./polyfill')

module.exports = (context, { merge }) => merge({
  entry: {
    vendors: !process.env.DISABLE_POLYFILL ? [
      polyfill,
    ] : [],
  },
})
