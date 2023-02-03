/**
 * @file 区域数据转换
 * @module global/region
 */

/**
 * 记录区划列表
 */
let regionList

/**
 * 基础区划配置
 */
let baseRegionConfig

/**
 * 获取区划列表
 * @returns {Promise<Array>}
 */
function getRegionList () {
  return regionList || window.Z.global.base.getRegionList()
}

/**
 * 获取当前项目的顶级区域代码
 * @returns {string}
 */
export function getRootRegion () {
  let rootRegion = window.CONFIG.rootRegion || config().rootCode
  if (!rootRegion) return rootRegion
  if (rootRegion === '00') return '00'
  rootRegion += ''
  return rootRegion.replace(/(00|0000)$/g, '')
}

/**
 * 获取顶级区划名称
 * @param {String} region 区划编码
 * @param {Boolean} start 基础名称
 * @returns {string} 区划名称
 */
export function getRegionBaseName (region, start) {
  const regionConfig = config()
  const regionLevelList = regionConfig.levelConfig || []
  region = region || getRootRegion()
  region += ''
  let name
  if (region === '00') { return '中央' }
  const regionItem = regionLevelList.find(item => item.level === region.length)
  if (regionItem) { return regionItem.name }
  switch (region.length) {
    case 2:
      name = '省本级'
      break
    case 4:
      name = '市本级'
      break
    case 6:
      name = '区本级'
      break
    case 9:
      name = '镇本级'
      break
    default:
      name = '社区'
  }
  if (start && name.length === 3) {
    return name.slice(0, 1)
  }
  return name
}

/**
 * 获取顶层区划层级
 * @returns {number}
 */
export function getTopLevel () {
  return config().levelRange.min
}

/**
 * 获取最大区划层级
 * @returns {Number}
 */
export function getMaxLevel () {
  return config().levelRange.max
}
/**
 * 获取区划层级
 * params {string} val 区划
 * @returns {Number}
 */
export function getLevel (val) {
  if (val === '00') return 0
  if (!val) return 0
  if (val.length <= 2) return 1
  if (val.length === 4) return 2
  if (val.length === 6) return 3
  if (val.length === 9) return 4
  return 5
}

/**
 * 获取区划名称
 * @param {string} region 区划编码
 * @param {boolean} shortName 简称
 * @returns {string} 区划名称
 */
export function getRegionName (region, shortName) {
  if (isNaN(Number(region))) return region
  const regionItem = getRegionItem(region)
  if (shortName) return regionItem.shortName || regionItem.name
  return regionItem.name
}

/**
 * 获取子级区划列表
 * @param {string} region 区划编码
 * @param {number} disp=2 启用状态
 * @returns {Array}
 */
export function getChildren (region, disp = 2) {
  if (!region) region = window.Z.global.region.getRootRegion()
  let list
  if (window.Z.service.robot.common.region.hasRegionList()) {
    list = window.Z.service.robot.common.region.getChildren(region)
  } else {
    const level = getLevel(region) + 1
    list = window.Z.global.base.getRegionList().filter(a =>
      (!region || a.id.indexOf(region) === 0) &&
      (!disp || a['disp' + disp] === 'Y') &&
      a.level === level)
  }
  return JSON.parse(JSON.stringify(list))
}

/**
 * 获取指定区划区间的tree
 * @param {number} maxLevel 最大层级
 * @param {Array} regionList 可选的区划列表
 * @returns {Array}
 */
export function getRegionLevelTree (regionList, maxLevel) {
  const rootRegion = getRootRegion()
  if (rootRegion !== '00') {
    regionList = regionList || [getRegionItem(rootRegion)]
  } else {
    regionList = getChildren(rootRegion)
  }
  maxLevel = maxLevel || getMaxLevel()
  regionList.forEach(item => {
    if (item.level < maxLevel) {
      item.children = getDeepChildren(item.id, maxLevel)
    }
  })
  return regionList
}
function getDeepChildren (region, maxLevel) {
  const list = getChildren(region)
  list.forEach(item => {
    if (item.level < maxLevel) {
      item.children = getDeepChildren(item.id, maxLevel)
    }
  })
  return list
}

/**
 * 获取短区划code
 * @param {string} code 区划编码
 * @returns {string} 去多余0的区划编码
 */
export function getSortRegion (code) {
  if (!code || code === '00') return code
  code += ''
  return code.replace(/(00)+$/, '')
}

/**
 * 获取区划对象
 * @param {string} region 区划编码
 * @param {boolean} realItem 真实数据
 * @returns {{id: *, name: *}}
 */
export function getRegionItem (region, realItem = false) {
  let regionItem
  if (window.Z.service.robot.common.region.hasRegionList()) regionItem = window.Z.service.robot.common.region.getRegionItem(region)
  else regionItem = getRegionList().find(a => a.id === region)
  if (realItem) return regionItem
  return regionItem || { id: region, name: region }
}

/**
 * 获取指定层级的ID长度
 * @param {Number} level 区划层级
 * @returns {*|number} id长度
 */
export function getLevelLength (level) {
  if (level === 5) { return 12 }
  if (level === 4) { return 9 }
  return level * 2
}

/**
 * 获取父级IDs
 * @param regionId {string} 区域编码
 * @param minLevel {Number} 区域编码
 * @returns {*|number} 祖辈区划编码合集
 */
export function getParentIds (regionId, minLevel = 1) {
  const rt = []
  let lastRegion = regionId
  let parentId = getParentId(lastRegion)
  rt.push(lastRegion)
  let level = getLevel(parentId)
  while (parentId !== lastRegion && level >= minLevel) {
    // 00 特殊处理
    if (parentId === '00' && minLevel === 1) break
    if (getRegionItem(parentId, 1)) rt.unshift(parentId)
    // 00 特殊处理
    if (parentId === '00' || level === minLevel) break
    lastRegion = parentId
    parentId = getParentId(lastRegion)
    level = getLevel(parentId)
  }
  return rt
}

/**
 * 获取上级区划ID
 * @param {string} id 区划编码
 * @param {number} level 区划层级
 * @returns {string}
 */
export function getParentId (id, level) {
  if (!id) return id
  if (id === '00') return ''
  if (level) return id.slice(0, getLevelLength(level))
  if (id.length === 12) return id.slice(0, 9)
  if (id.length === 9) return id.slice(0, 6)
  if (id.length > 2) return id.slice(0, -2)
  if (id.length === 2) return '00'
  return ''
}

/**
 * 根据区划名称获取区划编码
 * @param {string} name 区划名称
 * @param {boolean} realItem 区划名称
 * @returns {{}}
 */
export function getRegionByName (name, realItem) {
  let regionItem
  if (window.Z.service.robot.common.region.hasRegionList()) regionItem = window.Z.service.robot.common.region.getRegionByName(name)
  else regionItem = getRegionList().find(a => a.name === name)
  if (realItem) return regionItem
  return regionItem || { id: name, name: name }
}

/**
 * 获取区划配置
 * @returns {String}
 */
export function config () {
  return baseRegionConfig || window.Z.global.base.getVariablesById('front.public.system.region', {levelRange: {}})
}

/**
 * 设置默认配置
 * @param {Object} config
 */
export function setRegionConfig (config) {
  baseRegionConfig = config || window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.region', null)
}

/**
 * 根据区划层级获取列表
 * @param region
 * @param minLevel
 * @param disp
 * @returns {[]}
 */
export function levelRegion (region, minLevel, disp = 1) {
  const regionConfig = window.Z.global.region.config()
  minLevel = minLevel || regionConfig.levelRange.min
  let selectedList = []
  const levelRegions = []
  selectedList = selectedList.concat(getParentIds(region, minLevel))
  let fistList = [{
    id: '',
    name: '不限',
    shortName: '不限'
  }]
  fistList = fistList.concat(getRegion({
    pid: '',
    level: minLevel,
    disp
  }))
  // 去重
  levelRegions.push({
    children: fistList,
    region: ''
  })
  selectedList.map((item, index) => {
    if (!item) { return }
    const pid = selectedList[index]
    const list = getRegion({
      pid: pid,
      level: getLevel(pid) + 1,
      disp
    })
    levelRegions.push({
      children: list,
      region: pid
    })
  })
  return levelRegions
}
/*
  * 获取指定区划的子级  同步方法
  * @params 参数 pid 父级ID disp 是否显示 level 区划等级
  * @call 提供回调
  * */
export function getRegion (region, level, disp = 2) {
  let list
  if (!region) region = getRootRegion()
  if (!level) level = getLevel(region) + 1
  if (window.Z.service.robot.common.region.hasRegionList()) {
    list = window.Z.service.robot.common.region.getRegionByLevel(region, level, disp)
  } else {
    list = getRegionList()
      .filter(a => a.id.indexOf(region) === 0)
      .filter(a => !disp || a['disp' + disp] === 'Y')
      .filter(a => a.level === level)
  }
  return JSON.parse(JSON.stringify(list))
}

/**
 * 判定当前区划Id 是否可用
 * @param regionId
 * @returns {boolean}
 */
export function getRegionAble (regionId) {
  const rootRegion = getRootRegion()
  // 00选项默认可用
  if (regionId && regionId !== '00') {
    // 下级
    if (regionId > rootRegion) {
      if (regionId.indexOf(rootRegion) !== 0) return false
    } else if (regionId.length < rootRegion.length) {
      // 上级
      if (rootRegion.indexOf(regionId) !== 0) return false
    } else {
      // 暂时不支持多同级
      // 同级
      if (regionId !== rootRegion) return false
    }
  }
  return true
}

/**
 * 获取当前项目可用的区划ids
 * @returns {Array}
 */
let ableRegionIds
export function getAbleRegionIds () {
  if (ableRegionIds) return ableRegionIds
  if (!window.CONFIG.rootRegion) return []
  const rootRegion = getRootRegion()
  const regionList = getRegionList()
  // 启用父级
  const showParent = config().showParent
  let ids
  // 已启用的区划
  if (window.Z.service.robot.common.region.hasRegionList()) {
    ids = window.Z.service.robot.common.region.getAllChildren(rootRegion, 1).map(item => item.id)
  } else {
    ids = regionList.filter(item => item.id.indexOf(rootRegion) === 0 && item.disp1 === 'Y').map(item => item.id)
  }
  ids.push(rootRegion)
  if (showParent === 'Y') {
    ids = ids.concat(getParentIds(rootRegion, 0))
  }
  ableRegionIds = window.Z.service.utils.array.unique(ids)
  return ableRegionIds
}
