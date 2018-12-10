const { PluginInstance } = require('@rispa/core')
const HappyPack = require('happypack')
const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const babelConfig = require('./configs/babel.config')
const clientWebpackConfig = require('./configs/client.wpc')

const getJavaScriptLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
})

const getHappyPackPlugin = babelLoaderConfig => new HappyPack({
  loaders: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: babelLoaderConfig,
    },
  ],
})

class WebpackJavaScriptPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.webpack = context.get(WebpackPluginApi.pluginName)
    this.babel = context.get(BabelPluginApi.pluginName)
  }

  start() {
    this.babel.addConfig(babelConfig)

    const config = this.createWebpackConfig()

    this.webpack.addClientConfig(clientWebpackConfig)
    this.webpack.addCommonConfig(config)
  }

  createWebpackConfig() {
    const config = (context, { merge }) => {
      const babelLoaderConfig = this.babel.getConfig()

      return merge({
        module: {
          rules: [
            getJavaScriptLoader(),
          ],
        },
        plugins: [
          getHappyPackPlugin(babelLoaderConfig),
        ],
      })
    }

    return config
  }
}

module.exports = WebpackJavaScriptPlugin
