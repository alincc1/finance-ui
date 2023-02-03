/**
 * @file 各种提示的集合
 */
/**
 * @constant Message
 */
import {Message, MessageBox} from 'element-ui'

/**
 * 记录loading的元素
 */
let loadingEle
/**
 * 记录之前的弹出信息
 * @type {{}}
 */
const MessageCache = {}
function checkAble (type, message) {
  const cacheItem = MessageCache[type]
  if (cacheItem) {
    // 1秒内不重复显示提示
    if (cacheItem.message === message && Date.now() - cacheItem.time < 1000) {
      return false
    }
  }
  setCache(type, message)
  return true
}
function setCache (type, message) {
  MessageCache[type] = {
    message,
    time: Date.now()
  }
}
/**
 * info提示
 * @param {String} message 提示内容
 * @param {Object} options 更多配置
 * @returns {Object} VueComponent
 */
export function info (message, options) {
  if (checkAble('info', message)) {
    return Message({
      message,
      ...options
    })
  }
}

let successMessage
/**
 * success提示
 * @param {String} message 提示信息
 * @param {Object} options 更多配置
 * @returns {Object} VueComponent
 */
export function success (message, options) {
  if (checkAble('success', message)) {
    if (successMessage) { successMessage.close() }
    successMessage = Message.success({
      message,
      ...options,
      offset: 350
    })
    return successMessage
  }
}

/**
 * error提示
 * @param {String} message 提示信息
 * @param {Object} options 更多配置
 * @returns {Object} VueComponent
 */
export function error (message, options) {
  if (checkAble('error', message)) {
    return Message.error({
      message,
      ...options,
      offset: 350
    })
  }
}

/**
 * warning提示
 * @param {String} message 提示信息
 * @param {Object} options 更多配置
 * @returns {Object} VueComponent
 */
export function warning (message, options) {
  if (checkAble('warning', message)) {
    return Message.warning({
      message,
      ...options,
      offset: 350
    })
  }
}

/**
 * confirm提示
 * @param {String} message 提示信息
 * @param {string} title 更多配置
 * @param {Object} params 更多参数
 * @returns {Promise<any>}
 */
export function confirm (title, message, params) {
  return MessageBox.confirm(title, message, params)
}

/**
 * prompt
 * @param {String} message 提示信息
 * @param {string} title 更多配置
 * @param {Object} params 更多参数
 * @returns {Promise<any>}
 */
export function prompt (title, message, params) {
  return MessageBox.prompt(title, message, params)
}

/**
 * loading
 * @param {String|Number|Boolean} text 提示信息
 * @param {Object} options 更多配置
 * @returns {any}
 */
export function loading (text, options) {
  if (text === 0) {
    if (loadingEle) { loadingEle.close() }
    return
  }
  loadingEle = window.Z.constant.vue.$loading({
    lock: true,
    text: text || '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    ...options
  })
  return loadingEle
}

/**
 * notify
 * @param {Object} options 更多配置
 * @param {Object} title 标题
 * @returns {any}
 */
export function notify (options, title) {
  if (!options) return
  if (typeof options === 'string') {
    options = {
      title,
      message: options
    }
  }
  return window.Z.constant.vue.$notify({
    ...options,
    offset: 350
  })
}

/**
 * alert
 * @param {Object} options 更多配置
 * @param {string} title 标题
 * @param {string} message 提示信息
 * @returns {Promise<any>}
 */
export function alert (message, title = '提示', options) {
  return MessageBox.alert(message, title, options)
}
