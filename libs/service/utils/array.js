/**
 * @file 用于封装一些array数组方法
 * @author 吴云
 */
/**
 * @namespace serviceUtilsArray
 */
const array = {
  /**
   * 数据去重
   * @function
   * @memberOf serviceUtilsArray
   * @param arr 需要去重的数组
   * @param func 去重时获取唯一数据的方法
   * @returns {Array} 返回去重后的数组 不会打乱顺序
   */
  unique (arr, func = a => a) {
    const rt = []
    const keysMap = {}
    arr.forEach(a => {
      const key = func(a)
      if (!keysMap[key]) {
        keysMap[key] = 1
        rt.push(a)
      }
    })
    return rt
  },
  // 计算总数  值或对象数组里的值
  sum (arr, func = a => a) {
    let sum = 0
    arr.forEach(a => {
      sum = window.Z.global.math.sum(sum, (func(a) - 0) || 0)
    })
    return sum
  },
  async doSyncQueue (list, func) {
    for (let i = 0; i < list.length; i++) {
      await func(list[i], i)
    }
  },
  // 通过key获取数组的值
  getValueByKey (id, datas, key = 'id', value = 'value') {
    return datas.find(data => data[key] === id)[value]
  },
  // 通过keys获取数组的值
  getValuesByKeys (ids, datas, key, value) {
    if (!ids) { return [] }
    if (!Array.isArray(datas)) { return [] }
    return ids.split(',').map(id => this.getValueByKey(id, datas, key, value)).filter(one => one !== undefined)
  },
  // 获取树形结构
  getTree (list, parentId = 'parentId', id = 'id') {
    list.sort((a, b) => a.sort - b.sort)
    list.forEach(menu => {
      if (menu[parentId]) {
        const parentMenu = list.find(m => m[id] === menu[parentId])
        if (parentMenu) {
          menu.isChildren = true
          parentMenu.children = parentMenu.children || []
          parentMenu.children.push(menu)
        }
      }
    })
    return list.filter(a => !a.isChildren)
  },
  // 将树结构 展开成一维数组
  turnTreeToArray (arr, childrenKey = 'children', hasParse = false) {
    if (!hasParse) { arr = JSON.parse(JSON.stringify(arr)) }
    let rt = []
    if (!Array.isArray(arr)) { arr = [arr] }
    arr.forEach(item => {
      const children = item[childrenKey]
      if (!hasParse) { delete item[childrenKey] }
      rt.push(item)
      if (children && children.length) {
        rt = rt.concat(this.turnTreeToArray(children, childrenKey, 1))
      }
    })
    return rt
  },
  // 将树结构 展开成一维数组不需要children
  turnTreeToArrayNoChild (arr, childrenKey = 'children', hasParse = false) {
    if (!hasParse) { arr = JSON.parse(JSON.stringify(arr)) }
    let rt = []
    if (!Array.isArray(arr)) { arr = [arr] }
    arr.forEach(item => {
      const children = item[childrenKey]
      if (!hasParse) { delete item[childrenKey] }
      rt.push(item)
      if (children && children.length) {
        rt = rt.concat(this.turnTreeToArrayNoChild(children, childrenKey, false))
      }
    })
    return rt
  }
}
export default array
