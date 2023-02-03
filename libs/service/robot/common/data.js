let typeDataList
export default {
  async getOne (options) {
    const searchParams = this.searchParams
    const params = {
      name: this.keyword,
      title: this.keyword,
      ...this.options.params,
      ...this.pagination,
      ...this.fetchConfig
    }
    const methodKey = searchParams.methodKey.replace(/\//g, '.').replace(/^\./g, '')
    this.loading = true
    let dataList = window.Z.global.utils.getKeyValue(window.Z.api, methodKey)(params)
    dataList = dataList[options.resKey || 'list'] || dataList
    return dataList.sort(() => Math.random() - 0.5).pop()
  },
  getTypeDataList () {
    if (typeDataList) { return typeDataList }
    const dataList = []
    function getTypeData (data) {
      if (Array.isArray(data)) { return }
      if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
          if (key === 'typeData') {
            dataList.push(data[key])
          } else {
            getTypeData(data[key])
          }
        })
      }
    }
    getTypeData(window.Z.service.robot)
    typeDataList = dataList
    return dataList
  },
  getData (type) {
    let func
    function getFunction (data) {
      if (func) { return }
      if (Array.isArray(data)) {
        data.forEach(getFunction)
        return
      }
      if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
          if (func) { return }
          if (key === type && typeof data[key] === 'function') {
            func = data[key]
          } else {
            getFunction(data[key])
          }
        })
      }
    }
    getFunction(window.Z.service.robot)
    return func || (() => {})
  }
}
