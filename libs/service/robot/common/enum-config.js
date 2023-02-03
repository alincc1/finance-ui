let cacheList = {}
let currentRegionList = []
let rootRegionList
let hasInit
function configChange ({config, value}) {
  const changeRegionConfig = config.isRoot ? rootRegionList : currentRegionList
  if (changeRegionConfig) {
    try {
      const changeItem = changeRegionConfig.find(item => item.key === config.configKey)
      if (value && typeof value === 'object') { value = JSON.stringify(value) }
      if (changeItem) { changeItem.value = value }
    } catch (e) {
      console.error(e)
    }
  }
}
export default {
  async save (item) {
    await window.Z.api.server.sys.fuchiConfigLocal[item.id ? 'update' : 'add'](item)
    cacheList = {}
  },
  configList () {
    return window.Z.global.base.getVariables().filter(item => item.id.indexOf('regionConfig') === 0)
  },
  baseList () {
    const rootRegion = window.Z.global.region.getRootRegion()
    return window.Z.api.bones.sys.regionConfig.configList({region: rootRegion, rootRegion})
  },
  async regionList (region) {
    region = region || window.Z.global.region.getRootRegion()
    if (!cacheList[region]) {
      const rootRegion = window.Z.global.region.getRootRegion()
      cacheList[region] = await window.Z.api.bones.sys.regionConfig.configList({region, rootRegion})
    }
    return cacheList[region]
  },
  async setCurrentRegionList (region, notInit) {
    region = region || window.Z.global.region.getRootRegion()
    const rootRegion = window.CONFIG.rootRegion || window.Z.global.region.getRootRegion()
    if (!rootRegionList) { rootRegionList = await this.regionList(rootRegion) }
    if (rootRegion === region) {
      currentRegionList = JSON.parse(JSON.stringify(rootRegionList))
    } else {
      currentRegionList = await this.regionList(region)
    }
    if (!notInit) { window.Z.global.base.setPlatformTitle() }
    if (!notInit) {
      await this.doInit()
    }
  },
  async sync () {
    const configList = this.configList()
    const baseList = await this.baseList()
    const rootRegion = window.Z.global.region.getRootRegion()
    await window.Z.service.utils.array.doSyncQueue(configList, async configItem => {
      const baseItem = baseList.find(base => base.key === configItem.id)
      if (!baseItem) {
        let frontConfig = window.Z.global.base.getVariablesById(configItem.id.replace('regionConfig', 'front'))
        if (frontConfig) {
          if (typeof frontConfig === 'object') { frontConfig = JSON.stringify(frontConfig) }
        }
        await window.Z.api.server.sys.fuchiConfigLocal.add({
          key: configItem.id,
          remark: configItem.remark || frontConfig.remark,
          region: rootRegion,
          value: frontConfig
        })
      }
    })
  },
  getValue (id, defaultValue, useRegion) {
    if (defaultValue === undefined) {
      throw new Error('defaultValue is empty')
    }
    const useRegionList = useRegion === 'root' ? rootRegionList : currentRegionList
    const varItem = useRegionList && useRegionList.find(item => item.key === id)
    // 空数据找老id内容
    if (!defaultValue || (Array.isArray(defaultValue) && defaultValue.length === 0) ||
      (typeof defaultValue === 'object' && Object.keys(defaultValue).length === 0)) {
      const oldId = id.replace('regionConfig', 'front')
      const oldValue = window.Z.global.base.getVariablesById(oldId)
      if (oldValue) { defaultValue = oldValue }
    }
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
  },
  async doInit () {
    await window.Z.service.utils.themeColor.init()
    if (!hasInit) {
      hasInit = true
      window.Z.global.subscribe.bind('do-region-config-change', configChange)
      window.Z.global.subscribe.ready('window-g-ready')
    }
  }
}
