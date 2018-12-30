const { PluginInstance } = require('@rispa/core')
const WebpackPluginApi = require('@rispa/webpack')
const BabelPluginApi = require('@rispa/babel').default
const createUniversalWebpackConfig = require('./configs/universal.wpc')

class WebpackJavaScriptPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.webpack = context.get(WebpackPluginApi.pluginName)
    this.babel = context.get(BabelPluginApi.pluginName)
  }

  start() {
    this.webpack.addClientConfig(
      createUniversalWebpackConfig(() => this.babel.getClientConfig()),
    )
    this.webpack.addServerConfig(
      createUniversalWebpackConfig(() => this.babel.getServerConfig()),
    )
  }
}

module.exports = WebpackJavaScriptPlugin
