const { default: BabelPluginApi } = require('@rispa/babel')
const WebpackPluginApi = require('@rispa/webpack')
const WebpackJavaScriptPlugin = require('./WebpackJavaScriptPlugin')

module.exports.default = WebpackJavaScriptPlugin

module.exports.after = [
  WebpackPluginApi.pluginName,
  BabelPluginApi.pluginName,
]
