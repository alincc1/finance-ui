import fetch from "~/libs/service/utils/fetch"
const FileSaver = require('file-saver')
/**
 * @file 针对文件相关的处理
 */
export default {
  /**
   * base64 字符串转blob 对象
   * @param urlData {String} base64字符串
   * @param type {string} 转换的文件类型
   * @returns {Blob} 返回的Blob
   */
  base64UrlToBlob (urlData, type = 'image/png') {
    const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
    // 处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], {type: type})
  },
  /**
   * 导出数据城csv文件
   * @param options
   */
  exportCsv (options) {
    if (!options.dataList) { return }
    let exportStr = '\uFEFF'
    const filename = options.name || Date.now()
    // 头部数据转换
    const headMap = options.headMap || (a => a)
    // 列表数据转换
    const listMap = options.listMap || (a => a)
    // 头部数据 可以缺省
    const headList = (options.headList || []).filter(a => a).map(headMap).join()
    // 数据拼接
    exportStr += [].concat(headList, options.dataList.map(item => {
      if (Array.isArray(item)) {
        return item.map(listMap).join()
      }
      return item
    })).filter(a => a).join('\n')
    // 生成blob文件
    const blob = new Blob([exportStr], {type: 'text/plain;charset=utf-8'})
    // 下载
    FileSaver.saveAs(blob, filename + (options.fileType || '.CSV'))
  },
  /**
   * 用get方式下载文件
   * @param url
   * @param params 链接里的更多参数
   */
  async downloadOpen (url, params = {}) {
    const token = window.Z.global.auth.getToken()
    if (!token) { return window.Z.global.message.info('请先登录！') }
    await window.Z.service.utils.script.install('jsBase64')
    params._auth = btoa(token)
    const openUrl = window.Z.service.utils.string.addQueryUrl(url, params)
    window.open(openUrl)
  },
  /**
   * 下载文件
   * @param url 文件链接
   * @param filename 文件名称
   * @param useAuth 需要登录
   */
  downloadSave (url, filename, useAuth) {
    if (useAuth) {
      if (!window.Z.global.auth.getToken()) {
        return window.Z.global.message.info('请先登录！')
      }
    }
    return window.Z.api.bones.util.download({
      url,
      _config: {
        responseType: 'blob'
      }
    }).then((blob, res) => {
      FileSaver.saveAs(blob, filename || url.split('/').pop())
    })
  },
  /**
   * POST方式导出excel文件
   * @param url 文件链接/接口
   * @param params 参数
   */
  exportForm (url, params) {
    if (!url) {
      url = '/api/v2/file/request/exportForm'
    }
    const ext = params.ext || '.xls'
    fetch('POST', url, params, {
      responseType: 'blob'
    }).then(result => {
      if (result.size > 0) {
        const blob = new Blob([result], {type: 'application/vnd.ms-excel'})
        FileSaver.saveAs(blob, params.fileName + ext)
      }
    })
  },
  /**
   * 下载打开PDF
   * @param requestId
   * @param kind
   * @param num
   * @param download
   */
  downloadPDF ({requestId, kind = 'request', num = 1, download = ''}) {
    window.open(`${window.CONFIG.API_URL}/v2/file/pdf/requestPdf?requestId=${requestId}&kind=${kind}&num=${num}&download=${download}`, '_blank')
  }
}
