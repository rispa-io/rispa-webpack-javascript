module.exports = (context, { merge }) => merge({
  entry: {
    polyfill: !process.env.DISABLE_POLYFILL ? [
      require.resolve('./polyfill'),
    ] : [],
  },
})
