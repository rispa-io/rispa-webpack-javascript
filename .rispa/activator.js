import { init, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import webpackJavascriptConfig from './javascript.wpc'

const activator = on => {
  const initHandler = registry => {
    registry.add('webpack.common', webpackJavascriptConfig)
    registry.add('webpack.client', webpackJavascriptConfig)
  }

  on(init(build), initHandler)
  on(init(server), initHandler)
}

export default activator
