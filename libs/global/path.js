/**
 * @file 部分路径方法的统一处理
 * @module global/path
 */
const packageJson = require('../../package.json')

export function setVersion (path) {
  path += path.indexOf('?') === -1 ? '?' : '&'
  return `${path}version=${getVersion()}`
}
let useVersion

/**
 * 获取版本号
 * @returns {*}
 */
export function getVersion () {
  // if (!useVersion) useVersion = window.Z.global.base.getVariablesById('front.public.system.version', Date.now())
  useVersion = packageJson.imgVersion
  return useVersion
}
/**
 * 跳转链接拼接
 * @param options
 * @param blank
 */
export function routerPush (options, blank = false) {
  if (!options) { return }
  if (typeof options === 'string') { options = {path: options} }
  if (!options.path) { return }
  // 新系统新标签打开
  if (options.path.indexOf('http') === 0) {
    window.open(options.path, '_blank')
    return
  }
  // 跳转当前系统
  if (!blank) {
    window.Z.constant.vue.$router.push(options)
    return
  }
  // 跳转新连接
  let href = window.Z.service.string.addQueryUrl(options.path, options.query)
  if (options.useToken) { href = pushToken(href) }
  if (blank) { window.open(href, '_blank') } else { window.location.href = href }
}

/**
 * 获取新的文件链接
 * @param url
 * @param region
 */
let ossFileUrl
let useHttps
function turnHttps (url) {
  if (useHttps === undefined && window.CONFIG.IS_MOBILE) {
    useHttps = window.Z.service.robot.common.enumConfig.getValue('regionConfig.mobile.public.config', {}, 'root').useHttps === 'Y'
  }
  if (!useHttps) { return url }
  return url.replace(/^(http:)*\/\//, 'https://')
}
export function getRegionFileUrl (url, region) {
  // 整体url 直接返回
  if (/^(https*:)*\/\//.test(url)) {
    return turnHttps(url)
  }
  if (!ossFileUrl) {
    ossFileUrl = window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.doc', 'root', {}).fileUrl || ('//res.oss.zqlian.com/')
  }
  region = region || getUseRegion()
  return turnHttps(window.Z.service.utils.string.addQueryUrl(ossFileUrl + region + url, {version: getVersion()}))
}
export function getUseRegion () {
  return window.Z.global.region.config().useRegion || window.Z.global.region.getRootRegion() || 'public'
}
/**
 * 获取链接里的文件名称
 * @param url
 */
export function getFileName (url) {
  if (!url) { return '' }
  return url.split('/').pop()
}
/**
 * 用get方式下载文件
 * @param url
 */
export async function pushAuth (url) {
  const params = {}
  const token = window.Z.global.auth.getToken()
  if (!token) {
    window.Z.global.message.info('请先登录！')
    return
  }
  await window.Z.service.utils.script.install('jsBase64')
  params._auth = btoa(token)
  return window.Z.service.utils.string.addQueryUrl(url, params)
}

/**
 * 链接过期 重新刷新
 */
export function routerRefresh (path, name) {
  window.Z.global.message.confirm('系统页面有更新，需要刷新！', '跳转提示!').then(() => {
    window.location.reload()
  })
}

/**
 * 导出数据城csv文件
 * @param url 需要处理的链接
 * @param query 更多的参数
 */
export function pushToken (url, query) {
  // 已有添加的忽略
  if (url.indexOf('platform=fuchi') > -1) { return url }
  return window.Z.service.utils.string.addQueryUrl(url, {
    ...query,
    platform: 'fuchi',
    token: window.Z.global.auth.getToken()
  })
}

let onlineShowFile // 在线打开文档
/**
 * 打开指定文件
 * @param url 文件链接
 * @param name 文件名称
 * @param onlineShow 强制在线打开文档
 * @returns {boolean}
 */
export function openUrl (url, name = '在线文档', onlineShow = false) {
  if (onlineShowFile === undefined) {
    onlineShowFile = window.Z.constant.isWww &&
      window.Z.service.robot.server.sys.fuchiConfigLocal.getValue('regionConfig.public.system.doc', 'root', {}).onlineWord === 'Y'
  }
  // 在线打开文档
  if (onlineShowFile || onlineShow) {
    const offices = ['doc', 'docx', 'dotx', 'xlsx', 'xlsb', 'xls', 'xlsm', 'pptx', 'ppsx', 'ppt', 'pps', 'potx', 'ppsm']
    let officeShowAble // 是否office
    let fileType = url.split('.').pop().split('?').shift()
    if (fileType) {
      fileType = fileType.toLowerCase()
      officeShowAble = offices.indexOf(fileType) > -1
    }
    if (officeShowAble) {
      url = `http://view.officeapps.live.com/op/view.aspx?name=${name}&src=` + encodeURIComponent(url)
      window.open(url, '_blank')
      return false
    }
    const showPdfAble = isPdf(url)
    if (showPdfAble) {
      if (location.protocol === 'https:') {
        url = url.replace(/^(http:)*\/\//, 'https://')
      }
      url = window.CONFIG.BASE_VIEW_URL.replace('/#', '') + '/static/pdf/web/viewer.html?file=' + encodeURIComponent(url)
      window.open(url, '_blank')
      return false
    }
  }
  window.open(url, '_blank')
}
export function isPdf (attachName) {
  if (!attachName || typeof attachName !== 'string') { return false }
  const name = attachName.split('?')[0]
  const pdf = name.split('.').pop()
  return pdf && pdf.toLowerCase() === 'pdf'
}
