const BabelPluginApi = require('@rispa/babel').default
const WebpackPluginApi = require('@rispa/webpack')
const WebpackJavaScriptPlugin = require('./WebpackJavaScriptPlugin')

module.exports.default = WebpackJavaScriptPlugin

module.exports.after = [
  WebpackPluginApi.pluginName,
  BabelPluginApi.pluginName,
]
