export default {
  /**
   * 获取对象的属性 支持.链接
   * @param data
   * @param key
   * @returns {*}
   */
  getKeyValue (data, key) {
    if (!key) { return data[key] }
    key.split('.').forEach(useKey => {
      data = data && data[useKey]
    })
    return data
  },
  /**
   * 获取对象的属性 支持.链接
   * @param data
   * @param key
   * @param value
   * @returns {*}
   */
  setKeyValue (data, key, value) {
    if (!data || !key) return
    if (data && key.indexOf('.') !== -1) {
      data = this.getKeyValue(data, key.replace(/\.\w+$/, ''))
    }
    if (data) { data[key.split('.').pop()] = value }
  },
  /**
   * 获取对象的属性 jsonpath
   * @param json
   * @param key
   * @param _self 代表json本身
   * @returns {*}
   */
  getJsonPathValue (json, key, _self = '$') {
    if (key === _self) return json
    key = key.replace(_self, '')
    // 清除开始的.
    key = key.replace(/^\./, '')
    const keyMatch = key.match(/\[?[^.[\]]+]?/g)
    if (keyMatch) {
      keyMatch.forEach(useKey => {
        useKey = useKey.replace(/(\[)|]/g, '')
        try {
          json = json[useKey]
        } catch (e) {}
      })
    }
    return json
  }
}
