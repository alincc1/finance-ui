let regionList
let regionMap
let levelList
let regionData
function getSortRegion (code) {
  if (code === '00') return code
  if (!code) { return code }
  if (code.length !== 6) { return code }
  return (code + '').replace(/(0000|00)$/, '')
}
export default {
  hasRegionList () {
    return !!regionList
  },
  getRegionList () {
    return regionList
  },
  getRegionData () {
    return regionData
  },
  init (regions) {
    const worker = new Worker('plugins/worker/region.js')
    worker.postMessage(regions)
    worker.onmessage = function (event) {
      console.log('worker region message')
      regionData = event.data
      if (typeof regionData === 'string') { regionData = JSON.parse(regionData) }
      regionList = regionData.list || regionData
      regionMap = regionData.map || {}
      levelList = regionData.levelList || []
      worker.terminate()
    }
  },
  getParentList (region) {
    let parentId = window.Z.global.region.getParentId(region)
    while (!regionList[parentId]) {
      parentId = window.Z.global.region.getParentId(parentId)
      if (!parentId) break
    }
    return regionList[parentId] || []
  },
  getRegionName (id, shortName) {
    if (isNaN(id)) { return id }
    const item = this.getRegionItem(id)
    if (!item) { return '' }
    if (shortName) {
      return item.shortName || item.name
    }
    return item.name
  },
  getRegionItem (region, realItem) {
    let regionItem
    const regionCode = getSortRegion(region)
    // eslint-disable-next-line prefer-const
    regionItem = this.getParentList(regionCode).find(a => a.id === regionCode)
    if (realItem) { return regionItem }
    return regionItem || { id: region, name: region }
  },
  /**
   * 获取下级
   * @param region
   * @param disp
   * @returns {any}
   */
  getChildren (region, disp = 2) {
    if (!region) region = window.Z.global.region.getRootRegion()
    const useList = regionList[region]
    let list = []
    if (useList) {
      list = useList.filter(a => !disp || a['disp' + disp] === 'Y')
    }
    return JSON.parse(JSON.stringify(list))
  },
  getAllChildren (region, disp = 2) {
    if (!region) region = window.Z.global.region.getRootRegion()
    const useList = regionList[region]
    let list = []
    if (useList) {
      list = useList.filter(a => !disp || a['disp' + disp] === 'Y')
    }
    let parentList = list
    while (parentList.length) {
      let innerList = []
      parentList.forEach(item => {
        let innerRegion = regionList[item.id]
        if (innerRegion) {
          innerRegion = innerRegion.filter(a => !disp || a['disp' + disp] === 'Y')
        }
        innerList = innerList.concat(innerRegion)
      })
      list = list.concat(innerList)
      parentList = innerList
    }
    return JSON.parse(JSON.stringify(list))
  },
  getRegionByLevel (region, level, disp = 2) {
    const levelMap = levelList[level]
    let list = []
    Object.keys(levelMap).forEach(key => {
      if (key.indexOf(region) === 0) list = list.concat(levelMap[key].filter(item => !disp || item['disp' + disp] === 'Y'))
    })
    return JSON.parse(JSON.stringify(list))
  },
  /**
   * 根据名称获取区划
   * @param name
   * @returns {*}
   */
  getRegionByName (name) {
    return regionMap[name]
  }
}
