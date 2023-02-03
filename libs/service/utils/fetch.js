/* eslint-disable prefer-promise-reject-errors */
/**
 * @file 统一的http 请求处理
 * @module service/utils/fetch
 */
import axios from 'axios'
let usePost

// 转化GET请求，data参数为url地址参数
const formatGET = (config) => {
  const data = config.data
  if (['get'].indexOf(config.method.toLowerCase()) > -1 && data &&
    config.url.indexOf('?') < 0
  ) {
    config.url = config.url + '?' + Object.keys(data).map(
      (key) => {
        if (data[key] === '' || data[key] === null || data[key] === undefined) { return null }
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      }
    ).filter(
      (item) => (item !== null && item !== undefined)
    ).join('&')
  }
  return config
}

const setZValue = (url) => {
  // monitor-web直接使用window.Z
  if (window.Z && window.Z.constant.isMonitor) {
    return window.Z
  } else {
    // 根据为url判断是否为skd请求
    const isSdkUrl = url.indexOf('/api/v2/monitor/') !== -1
    return isSdkUrl ? window.MZ : window.Z
  }
}
const setCONFIGValue = (url) => {
  // monitor-web直接使用window.Z
  if (window.Z && window.Z.constant.isMonitor) {
    return window.CONFIG
  } else {
    // 根据为url判断是否为skd请求
    const isSdkUrl = url.indexOf('/api/v2/monitor/') !== -1
    return isSdkUrl ? window.MTCONFIG : window.CONFIG
  }
}

// 是否包含请求前缀 http || https
function hasRquestPrefix (url) {
  if (url.indexOf('http') === 0) { return true }
  if (url.indexOf('//') === 0) { return true }
}
const fetchCache = {}
/**
 * Responsible for all HTTP requests.
 */

const fetch = {
  request (method, url, data, config) {
    const Z = setZValue(url)
    // matrix 不用转换
    if (!usePost && !Z.constant.disableFct) {
      const post = Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.config', 'root', {})
      usePost = (post.usePost || 'PUT,DELETE').toLowerCase().split(',')
    }
    if (!url && typeof method === 'object') {
      url = method.url
      data = method.data || method.params
      method = method.method
    }
    method = method.toLowerCase()
    // trim
    if (data && Z.global.utils) { data = Z.global.utils.trim(data) }
    if (!navigator.onLine) {
      if (process.env.PLATFORM === 'mobile') {
        Z.global.message.error('网络异常，请确认你的手机处于联网状态！')
      } else {
        Z.global.message.error('网络异常，请确认你的电脑处于联网状态！')
      }
      Z.global.subscribe.trigger('loading', 0)
      return Promise.reject('网络异常，请确认你的电脑处于联网状态！')
    }
    data = data || {}
    if (usePost) {
      // 将指定请求改为post方式
      if (usePost.indexOf(method.toLowerCase()) > -1) { method = 'POST' }
    }
    return axios.request({url, data, method, ...data._config, ...config})
  },

  get (url, data = {}, progress = false) {
    return this.request('get', url, data, progress)
  },

  post (url, data = {}, progress = false) {
    return this.request('post', url, data, progress)
  },

  put (url, data = {}, progress = false) {
    return this.request('put', url, data, progress)
  },

  delete (url, data = {}, progress = false) {
    return this.request('delete', url, data, progress)
  },

  /**
   * Init the service.
   */
  init () {
    axios.interceptors.request.use(async config => {
      const Z = setZValue(config.url)
      const CONFIG = setCONFIGValue(config.url)
      // 更多的_config
      const _config = config._config || (config.data && config.data._config) || {}
      if (_config) {
        // 通过请求把参数绑定到config
        if (_config.configExtends) {
          Object.keys(_config.configExtends).forEach(key => {
            config[key] = _config.configExtends[key]
          })
        }
      }
      if (config.data) { delete config.data._config }
      if (config.headers &&
        (config.url.indexOf('bones') > -1 ||
        !((Z && Z.constant.disableFct) ||
        config.url.indexOf('matrix') > -1 ||
        config.url.indexOf('monitor/v2') > -1 ||
        config.url.indexOf('WebCrawler') > -1))) {
        config.headers.platform = 'pc'
        if (config.url.indexOf('fuchiyi') === -1) {
          const qixicode = (_config && _config.qixicode) || (Z && Z.global.auth.getQixicode())
          if (qixicode) {
            config.headers.qixicode = qixicode
          }
        }
      }
      if (config.url.indexOf('bones') > -1) {
        // get请求添加remote
        if (config.data && config.method.toUpperCase() === 'GET') {
          if (config.data) {
            // 没有remote时 添加
            if (!config.data.remote) {
              config.data.remote = CONFIG.CONNECT_ALI_YUN
            }
          } else {
            // 没有参数时 添加
            config.data = {remote: CONFIG.CONNECT_ALI_YUN}
          }
        }
      }
      config = formatGET(config)
      if (config.url.indexOf('bones') > -1 || config.url.indexOf('fuchi') > -1) {
        config.withCredentials = false
      }
      // 如果没有前缀，加上默认前缀
      if (!hasRquestPrefix(config.url)) {
        // 根据参数拼接url
        if (_config && _config.baseUrl) {
          config.url = _config.baseUrl + config.url
        } else if (config.url.indexOf('/api') === 0) {
          /**
           * v2 前缀xx.xx.com/api 无fuchi
           */
          config.url = (CONFIG.API_URL + config.url.slice(4))
        } else {
          config.url = CONFIG.BASE_API_URL + config.url
        }
      }
      const configUrl = config.url.split('?')[0]
      // 有数据的 非get请求
      if (config.data && ['get'].indexOf(config.method.toLowerCase()) === -1) {
        if (
          typeof config.data === 'object' && // 对象才需要加密
          configUrl.indexOf('matrix') === -1 && // matrix 不需要加密
          CONFIG.ENABLE_ENCRYPT && // 环境需要加密
          !Z.global.alg.whitelist(configUrl)) { // 不在加密白名单内
          try {
            // 上传接口及FormData 不需要加密
            if (configUrl.indexOf('upload') === -1 && !(config.data instanceof FormData)) {
              config.data = Z.global.alg.jsonSncrypt(config.data)
              config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            }
          } catch (e) {
            // console.error(e)
          }
        }
        // 更多的配置处理
        if (_config) {
          // gzip压缩
          if (_config.gzip) {
            let configData = config.data
            if (Array.isArray(config.data)) {
              configData = [...config.data]
            } else {
              if (typeof config.data === 'object') {
                configData = {...config.data}
              }
            }
            let stringify = configData
            if (typeof configData === 'object') { stringify = JSON.stringify(configData) }
            await window.Z.service.utils.script.install('staticObjectPako')
            config.data = window.staticObjectPako.gzip(stringify)
            config.headers['Content-Encoding'] = 'fc-zip'
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
          }
        }
      }
      // FormData 才进行进度更新
      if (config.data instanceof FormData) {
        let lastTime = Date.now()
        let lastLoaded = 0
        config.onUploadProgress = (progressEvent) => {
          const complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          const nowTime = Date.now()
          let allTime = (progressEvent.total - progressEvent.loaded) * (nowTime - lastTime) / (progressEvent.loaded - lastLoaded)
          allTime = Z.global.utils.sumTime(allTime).replace(/\.\w+/, '') // 移除.xx秒数据
          lastTime = nowTime
          lastLoaded = progressEvent.loaded
          Z.global.subscribe.trigger('loading-text', `上传进度${complete},预计还需要${allTime}`)
        }
      }
      // 允许请求自带token
      let token = (_config && _config.token) || (Z && Z.global.auth && Z.global.auth.getToken())
      if (Z && Z.constant.isQa) {
        if (Z && Z.utils) { token = Z.utils.auth.getToken(config, _config) }
      }
      if (config.data instanceof FormData) { config.headers['Content-Type'] = 'multipart/form-data' }
      // 阿里云接口不需要token
      if (config.url.indexOf('aliyuncs.com') > -1) {
        config.withCredentials = false
      } else {
        if (config.url.indexOf('222.172.224.35') < 0) {
          if (token) { config.headers.token = token }
          // 中间键请求特殊处理
          if (config.url.indexOf('/bones/') > -1) {
            config.headers['server-origin'] = CONFIG.AIP_ORIGIN
          }
        }
      }
      if (config.method.toLowerCase() !== 'get') {
        if (fetchCache[config.url]) { return Promise.resolve('重复提交') }
        fetchCache[config.url] = 1
      }
      return config
    })

    // Intercept the response and…
    axios.interceptors.response.use(response => {
      delete fetchCache[response.config.url]
      const Z = setZValue(response.config.url)
      const CONFIG = setCONFIGValue(response.config.url)
      if (response.data.status === 302) {
        return
      }
      if (response.data && typeof response.data === 'string' &&
        (CONFIG.ENABLE_ENCRYPT || response.config.url.indexOf('sys') > -1 || response.config.url.indexOf('util') > -1 || response.config.url.indexOf('res') > -1)) {
        try {
          response.data = Z.global.alg.jsonDecrypt(response.data)
        } catch (e) {
          // console.error(e)
        }
      }

      if (response.data && response.data.time) {
        Z.global.date.setTimestamp(response.data.time)
      }
      // 过滤掉多余的data层 将data list pagination 提升一级
      if (typeof response.data === 'object' && 'data' in response.data) {
        if (response.data.status) {
          response.data = response.data.data
          // 文字处理
          const text = JSON.stringify(response.data)
          const replaceText = text.replace(/\$\$variable\{\w+\}/g, match => {
            const key = match.replace(/\W/g, '').replace('variable', '')
            return Z.global.variable.getVariable(key)
          })
          response.data = JSON.parse(replaceText)
        }
      }
      return response.data
    },
    async error => {
      console.log('error----', error)
      delete fetchCache[error.response.config.url]
      let Z
      let CONFIG
      if (!error.response) {
        Z = window.MZ || window.Z
        CONFIG = window.MTCONFIG || window.CONFIG
      } else {
        Z = setZValue(error.response.config.url)
        CONFIG = setCONFIGValue(error.response.config.url)
      }
      Z.global.subscribe.trigger('loading', 0)
      const errResponse = error.response
      let resData = errResponse && errResponse.data
      if (resData && typeof resData === 'string' && (CONFIG.ENABLE_ENCRYPT || errResponse.config.url.indexOf('sys') > -1 || errResponse.config.url.indexOf('util') > -1 || errResponse.config.url.indexOf('res') > -1)) {
        // console.info(`解密前的数据：${errResponse.error.data}`)
        try {
          if (resData) { resData = errResponse.data = Z.global.alg.jsonDecrypt(resData) }
        } catch (e) {
          // console.error(e)
        }
      }
      let errorMessage = resData && resData.message
      if (errorMessage) {
        // 返回非字符串
        if (typeof errorMessage !== 'string') {
          errorMessage = '系统繁忙，请稍后再试...'
        }
        // 屏蔽json式异常
        if (/^{[\w\W]*}^/.test(errorMessage)) {
          errorMessage = '系统繁忙，请稍后再试...'
        }
        // 屏蔽过长的异常
        if (errorMessage.length > 100) {
          errorMessage = '系统繁忙，请稍后再试...'
        }
      }
      const resStatus = errResponse && errResponse.status
      // if (!resStatus) return Promise.reject(resData || error)
      // 接口需要授权
      if (resStatus === 402) {
        const config = errResponse.config
        try {
          config.data = JSON.parse(config.data)
        } catch (e) {}
        const authCode = await Z.global.message.prompt(errorMessage || '请输入授权码', '操作提示')
        config.headers = {
          ...config.headers,
          'upgrade-auth-code': authCode.value
        }
        return fetch.request(config.method, config.url, config.data, config)
      }
      // 接口需要访问录授权
      if (resStatus === 477) {
        const config = errResponse.config
        try {
          config.data = JSON.parse(config.data)
        } catch (e) {}
        const qixiCode = await Z.global.message.prompt(errorMessage || '请输入访问授权码', '操作提示')
        Z.global.auth.setQixicode(qixiCode.value)
        return fetch.request(config.method, config.url, config.data, config)
      }
      if (errResponse) {
        // 某些接口 异常不需要做处理
        if (errResponse.config) {
          if (errResponse.config.errorReturnNull === true) {
            return null
          }
          if (errResponse.config.errorHandler === false) {
            return Promise.reject({status: resStatus, data: resData})
          }
        }
      }
      if (resStatus === 401) {
        if ((!Z.constant.isQa || /\/qa\//.test(errResponse.config.url))) {
          if (Z.global.auth.getToken()) {
            Z.global.auth.removeLoginUser()
          } else {
            Z.global.subscribe.ready('user-info', null)
          }
          // 登录接口 或登录页面不做登录失败二次处理
          if (window.location.href.indexOf('/bind') < 0 &&
            errResponse.config.url.indexOf('/login') < 0 &&
            window.location.href.indexOf('/login') < 0) {
            if (!(Z.constant.disableFct) && Z.global.subscribe.trigger('do-login') === false) { return Promise.reject(error) }
            if (Z.global.subscribe.trigger('login-error-401') !== true) {
              Z.global.auth.loginOut()
            }
          }
          showErrorMessage(errorMessage || '登录失效，请重新登录！', Z)
        }
      } else {
        // 首页移除大部分报错提示
        if (Z.constant.isWww) {
          // 400异常保留
          if (/4\d{2}/.test(resStatus)) {
            showErrorMessage(errorMessage, Z)
          }
        } else {
          // 服务器相应错误信息
          if (resStatus === 403) {
            showErrorMessage(errorMessage || '跨域请求失败，请确定有跨域权限！', Z)
          } else if (resStatus === 406) {
            window.location.href = `${CONFIG.BASE_WWW_URL}/maintain`
            return Promise.reject(error)
          } else if (/4\d{2}/.test(resStatus) || resStatus === 500) {
            // 服务器相应错误信息
            showErrorMessage(errorMessage || '系统繁忙，请稍后再试...', Z)
          } else {
            // 其他情况
            showErrorMessage(errorMessage || '系统繁忙，请稍后再试...', Z)
          }
        }
      }
      // 4xx异常不做反馈处理
      if ((resStatus + '').indexOf(4) !== 0) {
        Z.global.subscribe.trigger('message-error-dialog', {
          error,
          status: errResponse && errResponse.status,
          config: error.config || (errResponse && errResponse.config),
          data: errResponse && errResponse.data
        })
      }
      return Promise.reject(error)
    })
  }
}
function showErrorMessage (errorMessage, Z) {
  if (/^<[\s\S]+>$/.test(errorMessage)) {
    return Z.global.message.confirm(errorMessage, '操作提示', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '我知道了',
      type: 'warning',
      showCancelButton: false
    })
  }
  Z.global.message.error(errorMessage)
}
// fetch.init()

export default fetch.request
