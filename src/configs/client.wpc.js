module.exports = () => ({
  entry: {
    polyfill: !process.env.DISABLE_POLYFILL ? [
      require.resolve('./polyfill'),
    ] : [],
  },
})
