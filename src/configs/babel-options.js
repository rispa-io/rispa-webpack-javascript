module.exports = config => ({
  presets: [
    !process.env.DISABLE_POLYFILL ?
      [require.resolve('babel-preset-env'), {
        targets: {
          browsers: config.browsers,
        },
        useBuiltIns: true,
        debug: Boolean(process.env.POLYFILL_DEBUG),
      }] : null,
  ].filter(Boolean),
})
