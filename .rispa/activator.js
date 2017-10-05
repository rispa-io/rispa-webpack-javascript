const WebpackJavaScriptPlugin = require('../src/WebpackJavaScriptPlugin')

function init(context, config) {
  return new WebpackJavaScriptPlugin(context, config)
}

const after = ['@rispa/webpack', '@rispa/babel']

module.exports = init

module.exports.after = after
