const HappyPack = require('happypack')

const createJavaScriptLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
  options: {
    id: 'js',
  },
})

const createHappyPackPlugin = babelConfig => new HappyPack({
  id: 'js',
  loaders: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: babelConfig,
    },
  ],
  threads: 4,
  verbose: false,
})

module.exports = createBabelConfig =>
  (context, { merge }) => merge({
    module: {
      rules: [
        createJavaScriptLoader(),
      ],
    },
    plugins: [
      createHappyPackPlugin(createBabelConfig()),
    ],
  })
