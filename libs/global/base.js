/**
 * @file 全局的一些基础方法
 * @author 何航, 吴云
 * @module global/base
 */
const pkg = require('~/package.json')

/**
 * 用于记录基础数据
 * @type {{}}
 */
let baseData = {}
/**
 * 用于记录系统变量
 * @type {null}
 */
let variables = null
/**
 * 用于记录区域列表数据
 */
let regionList
/**
 * 获取基础数据-region单独缓存 兼容之前 属性加上region
 * @returns {Object}
 */
export function getBaseData () {
  // 每次取缓存 多页面时 保证获取数据一致
  baseData = baseData || {}
  if (!baseData.region) { baseData.region = getRegionList() }
  return JSON.parse(JSON.stringify(baseData))
}

/**
 * 设置区域列表数据
 * @param list
 */
export function setRegionList (list) {
  regionList = list
}

/**
 * 获取区域列表数据
 * @returns {Array}
 */
export function getRegionList () {
  // 每次取缓存 多页面时 保证获取数据一致
  return JSON.parse(JSON.stringify(regionList))
}

/**
 * 设置baseData
 * @param {Object} dic 基础数据
 * @param {boolean} nochange 基础数据
 */
export async function setBaseData (dic, nochange = false) {
  // 兼容 将数组内的数字型字符串变为数字
  if (dic && !nochange) {
    if (!dic.industries) { dic.industries = dic.industry }
    Object.keys(dic).forEach(key => {
      if (key === 'region') { return }
      const item = dic[key]
      if (item) {
        if (Array.isArray(item)) {
          item.forEach(cell => {
            if (!isNaN(cell.id)) {
              cell.id = cell.id - 0
            }
          })
        }
      }
    })
  }
  baseData = {
    ...baseData,
    ...dic
  }
  Object.keys(baseData).forEach(key => {
    if (Array.isArray(baseData[key])) { baseData[key].sort((a, b) => a.sort - b.sort) }
  })
}

/**
 * 设置baseData 某个属性的值
 * @param {String} key 数据键
 * @param {any} value 数据值
 */
export async function setBaseDataValue (key, value) {
  const baseData = getBaseData()
  baseData[key] = value
  await setBaseData(baseData)
}

/**
 * 获取变量列表
 * @returns {Array|null}
 */
export function getVariables () {
  return variables
}

/**
 * 获取某个具体的系统变量
 * @param {String} id 需要获取的id
 * @param {*} defaultValue=null 设置默认值
 * @returns {*}
 */
export function getVariablesById (id, defaultValue = null) {
  if (!variables) { return defaultValue }
  const varItem = variables.find(item => item.id === id)
  if (!varItem) { return defaultValue }
  const value = varItem.value
  if (!value) { return defaultValue }
  if (isNaN(value)) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
  return value
}

/**
 * 设置系统变量
 * @param {Array} data 系统变量列表
 */
export function setVariables (data) {
  variables = data
}

/**
 * 设置系统title
 */
export function setPlatformTitle () {
  const titleItem = window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.info.config', {}, 'root')
  const title = location && window.Z.service.utils.string.getUrlQuery(decodeURI(location.href)).platformTitle
  const platformTitle = title || titleItem.title || window.Z.constant.title || pkg.title
  if (platformTitle) {
    document.title = platformTitle
  }
}
/**
 * 获取基础数据指定属性
 * @param {String} key 数据的键
 * @returns {any} 数据内容
 */
export function getBaseDataProperty (key) {
  let list = baseData[key] || []
  if (!list.length) {
    // 没有找到枚举时 commonStatus获取
    const commonList = baseData.commonStatus
    if (commonList) {
      list = commonList.filter(commonItem => commonItem.key.indexOf(key + '-') === 0)
        .map(item => {
          const itemKey = item.key.replace(key + '-', '')
          return {
            id: itemKey,
            key: itemKey,
            name: item.name,
            sort: item.sort,
            value: item.value
          }
        })
    }
  }
  return list
}

/**
 * 获取基础数据指定属性
 * @param {String} type 数据类型
 * @param {String} key 数据键
 * @param {String} keyCode=id 用于比较的id
 * @returns {*}
 */
export function getBaseDataKeyValue (type, key, keyCode = 'id') {
  const typeData = getBaseDataProperty(type)
  const itemData = typeData && typeData.find && typeData.find(item => {
    return item[keyCode] === key || item[keyCode] === key - 0
  })
  return (itemData && itemData.name) || key
}
