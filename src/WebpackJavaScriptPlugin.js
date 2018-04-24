const { PluginInstance } = require('@rispa/core')
const HappyPack = require('happypack')
const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const babelConfig = require('./configs/babel.config')
const clientWebpackConfig = require('./configs/client.wpc')

const getJavaScriptLoader = context => ({
  test: context.fileType('application/javascript'),
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
})

const getHappyPackPlugin = (context, babelLoaderConfig) => new HappyPack({
  loaders: [
    {
      test: context.fileType('application/javascript'),
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
    const config = context => {
      const babelLoaderConfig = this.babel.getConfig()

      return ({
        module: {
          rules: [
            getJavaScriptLoader(context),
          ],
        },
        plugins: [
          getHappyPackPlugin(context, babelLoaderConfig),
        ],
      })
    }

    return config
  }
}

module.exports = WebpackJavaScriptPlugin
