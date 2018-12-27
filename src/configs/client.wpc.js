const polyfill = require.resolve('./polyfill')

module.exports = () => prevConfig => ({
  ...prevConfig,
  entry: {
    ...prevConfig.entry,
    client: [
      ...(!process.env.DISABLE_POLYFILL ? [
        polyfill,
      ] : []),
      ...prevConfig.entry.client,
    ],
  },
})
