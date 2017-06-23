import { init, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import getWebpackJavascriptConfig from './javascript.wpc'
import getBabelOptions from './babel-options'

const activator = on => {
  const initHandler = registry => {
    registry.add('webpack.common', getWebpackJavascriptConfig(registry))
    registry.add('webpack.client', getWebpackJavascriptConfig(registry))
    registry.add('babel', getBabelOptions)
  }

  on(init(build), initHandler)
  on(init(server), initHandler)
}

export default activator
