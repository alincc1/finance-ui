/* eslint-disable no-cond-assign */
/**
 * @file 一些全局的工具类方法
 * @module global/utils
 */
import _ from 'lodash'
import moment from 'moment'

const Cookies = require('cookies-js')

// 获取url链接的指定参数 默认null
export function getUrlQueryVariableNeat (variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return null
}

// 获取url链接的指定参数 默认false
export function getUrlQueryVariable (variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return (false)
}

// 防止页面阻拦链接打开
export function windowDownload (url) {
  // 打开页面，此处最好使用提示页面
  const newWin = window.open('加载中...')
  newWin.location.href = url
}

// 克隆对象
export function clone (object) {
  return _.cloneDeep(object)
}

// 设置cookie
export function setCookie (key, data, options = {}) {
  return Cookies.set(key, data, options)
}

// 获取cookie
export function getCookie (key) {
  return Cookies.get(key)
}

// 截取字符串显示
export function ellipsisText (text, length) {
  if (!text) { return '' }
  return text.length > length ? `${text.substring(0, length)}...` : text
}

// 创建 x-icon 浏览器的显示logo
export function createIconLink (object) {
  const icoUrl = window.Z.service.robot.server.sys.fuchiConfigLocal.getValue('regionConfig.public.system.logo', {}, 'root').ico || '/0001/0002/0003/logo.ico'
  const iconhref = window.Z.global.path.getRegionFileUrl(icoUrl) + `?version=${window.Z.global.cache.getVersion()}`
  const iconlink = document.querySelector('link[rel="icon"]')
  if (iconlink) {
    iconlink.href = iconhref
    return
  }
  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/x-icon'
  link.href = iconhref
  document.head.appendChild(link)
}

// enter 替换为换行
export function replaceEnterToBr (text) {
  if (!text) { return null }
  return text.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />')
}

// 清理树对象里的空子级
export function treeEmptyChildrenClean (datas) {
  for (let i = 0; i < datas.length; i += 1) {
    if (datas[i].children && datas[i].children.length > 0) {
      treeEmptyChildrenClean(datas[i].children)
    } else {
      delete datas[i].children
    }
  }
  return datas
}

/*
 *在前补全字符串
 * */
export function stringPadStart (str, len, split) {
  if (str == null) { str = '' }
  str += ''
  if (str.length > len) { return str }
  const _len = len - str.length
  return Array(_len + 1).join(split).slice(0, _len) + str
}

/*
 *在后补全字符串
 * */
export function stringPadEnd (str, len, split) {
  if (str == null) { str = '' }
  str += ''
  if (str.length > len) { return str }
  const _len = len - str.length
  return str + Array(_len + 1).join(split).slice(0, _len)
}

// 日期格式转换
export function parseDate (date, format) {
  format = format || 'Y-m-d H:i:s'// 默认转换格式
  if (!(date instanceof Date)) {
    if (date - 0) {
      date -= 0
    }
  } else {
    date = date.getTime()
  }
  date = moment(date)
  if (date === 'Invalid Date') { return '' }
  const momentObject = date.toObject()
  const time = {}
  time.Y = momentObject.years
  time.y = (time.Y + '').slice(2)
  time.m = this.stringPadStart(momentObject.months + 1, 2, '0')
  time.d = this.stringPadStart(momentObject.date, 2, '0')
  // time.D = '星期' + '日一二三四五六'[momentObject.day]
  time.H = this.stringPadStart(momentObject.hours, 2, '0')
  time.h = this.stringPadStart(momentObject.hours % 12, 2, '0')
  time.i = this.stringPadStart(momentObject.minutes, 2, '0')
  time.s = this.stringPadStart(momentObject.seconds, 2, 0)
  time.w = this.stringPadStart(momentObject.milliseconds, 3, 0)
  time.a = time.H >= 12 ? '下午' : '上午'
  return format.replace(/./g, function (a) {
    return time[a] || a
  })
}

// 计算时间
const sumDate = function (time) {
  const timeData = {
    d: '',
    s: '',
    h: '',
    i: ''
  }
  if (time < 60 * 1000) {
    timeData.s = (time / 1000).toFixed(2)
    return timeData
  }
  time = Math.floor(time / 1000)
  let more
  if (more = time % 60) {
    timeData.s = more
    time -= more
  }
  time /= 60
  if (more = time % 60) {
    timeData.i = more
    time -= more
  }
  time /= 60
  if (more = time % 24) {
    timeData.h = more
    time -= more
  }
  time /= 24
  if (time >= 1) {
    timeData.d = time
  }
  return timeData
}

// 获取剩余时间
export function sumTime (time, format, maxlength = 4) {
  if (time < 0) { return '已过期' }
  const timeData = sumDate(time)
  let len = 0
  if (timeData.d) {
    timeData.h = timeData.h || '0'
    timeData.i = timeData.i || '0'
    timeData.s = timeData.s || '0'
    timeData.d += '天'
    len++
  }
  if (maxlength > len && timeData.h) {
    timeData.i = timeData.i || '0'
    timeData.s = timeData.s || '0'
    timeData.h += '时'
    len++
  } else {
    timeData.h = ''
  }
  if (maxlength > len && timeData.i) {
    timeData.s = timeData.s || '0'
    timeData.i += '分'
    len++
  } else {
    timeData.i = ''
  }
  if (maxlength > len && timeData.s) {
    timeData.s += '秒'
  } else {
    timeData.s = ''
  }
  format = format || 'dhis'
  return format.replace(/./g, function (a) {
    return timeData[a] || ''
  })
}

// 申报对象获取（个人与单位
export function towardShowName (row) {
  if (!row) { return '' }
  let organization = row.organization
  if (row.request) {
    organization = row.request.organization || row.organization
    row = row.request
  }
  if (organization) {
    return organization.name
  }
  if (row.reqUser) {
    return row.reqUser.name
  }
  if (row.user) {
    return row.user.name
  }
  return row.submitPerson
}

// 去除对象里 字符串两端的空格
export function trim (data) {
  if (data instanceof FormData || data instanceof File || data instanceof Blob) { return data }
  if (data) {
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        data.forEach((cell, i) => {
          data[i] = trim(cell)
        })
      } else {
        for (const key in data) {
          data[key] = trim(data[key])
        }
      }
    } else if (typeof data === 'string') {
      return data.trim()
    }
  }
  return data
}

/**
 * 获取vue的指定class样式的子级
 * @vue vue对象
 * @className 查询的样式名
 * @returns {Array} vue对象数组
 */
export function findVue (vue, className) {
  let vueList = []
  if (vue.$el.classList.contains(className)) {
    vueList.push(vue)
  }
  vue.$children.forEach(children => {
    vueList = vueList.concat(findVue(children, className))
  })
  return vueList
}

/**
 * 获取对象的属性 支持.链接
 * @param data
 * @param key
 * @returns {*}
 */
export function getKeyValue (data, key) {
  if (!data) { return null }
  if (!key) { return data[key] }
  let rt = data
  key.split('.').forEach(item => {
    rt = rt && rt[item]
  })
  return rt
}

/**
 * 获取对象的属性 支持.链接
 * @param data
 * @param key
 * @returns {*}
 */
export function setKeyValue (data, key, value) {
  if (data && key.indexOf('.') !== -1) {
    data = this.getKeyValue(data, key.replace(/\.\w+$/, ''))
  }
  if (data) { data[key.split('.').pop()] = value }
  // const arr = key.split('.')
  // const len = arr.length - 1
  // arr.reduce((cur, key, index) => {
  //   if (!cur[key]) return {}
  //   if (index === len) {
  //     cur[key] = value
  //   }
  //   return cur[key]
  // }, data)
}

/**
 * 获取对象的属性 支持.链接
 * @param arr 需要获取的数组
 * @param key 目标键的值
 * @param keyCode 数组对象里的键
 * @param valueCode 数组对象里的值
 * @returns {*}
 */
export function getArrayValue (arr, key, keyCode = 'id', valueCode = 'name') {
  if (!arr) { return null }
  const item = arr.find(item => item[keyCode] === key)
  return (item && item[valueCode]) || key
}
/**
 * 获取对象的属性 jsonpath
 * @param json
 * @param key
 * @param _self 代表json本身
 * @returns {*}
 */
export function getJsonPathValue (json, key, _self = '$') {
  if (key === _self) { return json }
  key = key.replace(_self, '')
  // 清除开始的.
  key = key.replace(/^\./, '')
  const keyMatch = key.match(/\[?[^.[\]]+]?/g)
  if (keyMatch) {
    keyMatch.forEach(useKey => {
      useKey = useKey.replace(/\[|]/g, '')
      try {
        json = json[useKey]
      } catch (e) {}
    })
  }
  return json
}

export function init () {
}
