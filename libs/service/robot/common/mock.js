export default {
  async create (data, options) {
    const moreParams = []
    for (const key in options) {
      const item = data[key]
      if (item === '' || item === null || item === undefined) {
        const optionItem = options[key]
        // 非必须参数 50%几率构建
        if (optionItem.required || Math.random() > 0.5) {
          if (optionItem.moreParams) {
            moreParams.push({
              key,
              options: optionItem
            })
            continue
          }
          if (optionItem.default) {
            data[key] = optionItem.default
          } else {
            data[key] = await this.createOne(optionItem)
          }
        }
      }
    }
    if (moreParams.length) {
      await this.doMoreParams(data, moreParams)
    }
    return data
  },
  async doMoreParams (data, moreParams) {
    const nextParams = []
    for (let i = 0; i < moreParams.length; i++) {
      const params = {}
      const moreItem = moreParams[i]
      if (moreItem.options.moreParams.every(key => {
        const dataItem = data[key]
        if (dataItem === null || dataItem === undefined || dataItem === '') {
          nextParams.push(moreItem)
          return false
        }
        params[key] = dataItem
        return true
      })) {
        data[moreItem.key] = await this.createOne(moreItem.options, params)
      }
    }
    if (nextParams.length) {
      await this.doMoreParams(data, nextParams)
    }
  },
  async createOne (options, params) {
    let data
    if (options.mockType) {
      data = await this.createByMockType(options.mockType, params)
      return data
    }
    return this.createTypeData(options)
  },
  createTypeData (options) {
    switch (options.type) {
      case Number:
        return this.createNumber(options)
      case String:
        return this.createString(options)
      case Boolean:
        return this.createBoolean(options)
    }
  },
  createString (options) {
    let string = ''
    const length = options.length || 4
    if (options.start) { string = options.start }
    let chatString = 'qwertyuiopasdfghjklzxcvbnm'
    chatString += chatString.toUpperCase()
    if (options.appendType === 'number') {
      chatString = '0123456789'
    }
    string += Array(length).fill(1).join('').replace(/./g, () => {
      return chatString[Math.floor(Math.random() * chatString.length)]
    })
    return string
  },
  createNumber (options) {
    const min = options.min || 0
    const max = options.max || 1e4
    let number = Math.ceil(Math.random() * (max - min)) + min
    if (options.decimal) {
      number += Math.random().toFixed(2) - 0
    }
    return number
  },
  createBoolean (options) {
    return Math.random() > 0.5
  },
  async createByMockType (mockType, params) {
    return window.Z.service.robot.common.data.getData(mockType)(params)
  }
}
