/**
 * @file 简单的一个xhr 用于发送请求
 * @author yun.wu
 * @module utils/xhr
 */
/**
 * 获取一个xhr对象
 * @private
 * @returns {XMLHttpRequest}
 */
function getXhr () {
  return new XMLHttpRequest()
}

/**
 * 发起get请求
 * @param url get请求的url
 * @returns {Promise<any>} 请求返回数据
 */
function get (url) {
  const xhr = getXhr()
  return new Promise((resolve, reject) => {
    xhr.open('GET', url, false)
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

export default {
  get: get
}
