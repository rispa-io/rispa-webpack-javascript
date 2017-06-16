import getBabelrcConfig from '@rispa/core/babel'
const HappyPack = require('happypack')

export const getBabelLoader = () => {
  return {
    loader: 'happypack/loader',
  }
}

export const getHappyPackPlugin = () => {
  const babelrcConfig = getBabelrcConfig()
  // add react-hot-loader/babel to babel plugins
  if (process.env.NODE_ENV === 'development') {
    const hotLoaderPlugin = require.resolve('react-hot-loader/babel')
    babelrcConfig.plugins.push(hotLoaderPlugin)
  }

  return new HappyPack({
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: babelrcConfig,
    }]
  })
}
