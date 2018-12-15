const { PluginInstance } = require('@rispa/core')
const HappyPack = require('happypack')
const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const clientWebpackConfig = require('./configs/client.wpc')

const createJavaScriptLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
})

const createHappyPackPlugin = babelLoaderConfig => new HappyPack({
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
            createJavaScriptLoader(),
          ],
        },
        plugins: [
          createHappyPackPlugin(babelLoaderConfig),
        ],
      })
    }

    return config
  }
}

module.exports = WebpackJavaScriptPlugin
