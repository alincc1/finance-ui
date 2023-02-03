/**
 * @file service相关的一些初始化全局处理
 * @author yun.wu
 */
import utilsInit from './utils/init'
import serviceUtils from './utils'
import serviceRobot from './robot'

/**
 * 初始化方法
 * @returns {Promise<void>}
 */
function start (Z) {
  /**
   * service utils的初始化
   */
  Z.service = {
    utils: serviceUtils,
    robot: serviceRobot
  }
}

/**
 * 初始化方法
 * @returns {Promise<void>}
 */
async function init (Z) {
  await utilsInit.init()
}

export default {start, init}
