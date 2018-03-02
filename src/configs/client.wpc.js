module.exports = context => ({
  entry: {
    polyfill: !process.env.DISABLE_POLYFILL ? [
      require.resolve('./polyfill'),
    ] : [],
  },
})
