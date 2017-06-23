import getBabelOptions from './babel-options'

const HappyPack = require('happypack')

export const getBabelLoader = () => ({
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
})

export const getHappyPackPlugin = () => {
  const babelrcConfig = getBabelOptions()
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
    }],
  })
}


export default () => ({
  module: {
    rules: [
      getBabelLoader(),
    ],
  },
  plugins: [
    getHappyPackPlugin(),
  ],
})
