import mergeBabelConfigs from 'babel-merge'

const HappyPack = require('happypack')

export const getBabelLoader = () => ({
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
})

export const getHappyPackPlugin = (context, registry) => {
  const babelConfig = registry.get('babel').map(getConfig => getConfig()).reduce(mergeBabelConfigs, {})

  // add react-hot-loader/babel to babel plugins
  if (process.env.NODE_ENV === 'development') {
    const hotLoaderPlugin = require.resolve('react-hot-loader/babel')
    babelConfig.plugins.push(hotLoaderPlugin)
  }

  return new HappyPack({
    loaders: [
      {
        test: context.fileType('application/javascript'),
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: babelConfig,
      },
    ],
  })
}

export default registry => context => ({
  module: {
    rules: [getBabelLoader()],
  },
  plugins: [getHappyPackPlugin(context, registry)],
})
