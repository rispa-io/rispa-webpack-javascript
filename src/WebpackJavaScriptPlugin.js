const { PluginInstance } = require('@rispa/core')
const HappyPack = require('happypack')
const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const babelConfig = require('./configs/babel-options')
const clientWebpackConfig = require('./configs/client.wpc')

const getJavaScriptLoader = context => ({
  test: context.fileType('application/javascript'),
  exclude: /node_modules/,
  loader: require.resolve('happypack/loader'),
})

const getHappyPackPlugin = (context, babelConfig) => new HappyPack({
  loaders: [
    {
      test: context.fileType('application/javascript'),
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: babelConfig,
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

    this.webpack.addClientConfig(config, clientWebpackConfig)
    this.webpack.addCommonConfig(config)
  }

  createWebpackConfig() {
    const config = context => {
      const babelConfig = this.babel.getConfig()

      return ({
        module: {
          rules: [
            getJavaScriptLoader(context),
          ],
        },
        plugins: [
          getHappyPackPlugin(context, babelConfig),
        ],
      })
    }

    return config
  }
}

module.exports = WebpackJavaScriptPlugin
