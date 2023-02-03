/**
 * @file 用于global的功能整合和初始化
 * @author 吴云
 * @module global/index
 */
/**
 * 用户账户模块
 * @const auth
 */
import * as auth from './auth'
import * as path from './path'
import * as base from './base'
import * as subscribe from './subscribe'
import * as date from './date'
import * as region from './region'
import * as math from './math'
import * as variable from './variable'
// import * as jsencrypt from './jsencrypt'
import enumData from './enumData'
// import api from '~/libs/api'
// import init from '~/libs/init'
import constant from './constant'
import service from '~/libs/service/index'
import common from './common'

export default {
  install (Vue, options = {}) {
    // 移除mobile/message
    const message = require('~/libs/global/message.js')
    // electron
    const baseGlobal = (window.Z || {}).global
    date.init()
    // 全局属性
    const G = {
      ...options,
      base,
      auth,
      path,
      region,
      date,
      enumData,
      subscribe,
      math,
      message,
      constant,
      variable,
      // jsencrypt,
      ...baseGlobal
    }
    window.Z = {
      ...window.Z,
      ...options,
      global: G,
      // api,
      Extends: {},
      constant: {
        ...options
      }
    }
    window.G = G
    common.install(G)
    service.start(window.Z)
    Vue.prototype.Z = window.Z
    // 系统环境初始化
    // init.init(Vue).then(async () => {
    //   init.then(Vue)
    //   window.Z.global.base.setPlatformTitle()
    //   await window.Z.service.utils.themeColor.init()
    //   window.Z.global.subscribe.ready('window-g-ready')
    // })
  }
}
