const StaticUrl = {
  codemirror: {
  }
}
let queue = []
function doQueue (tagName, data) {
  let index = 0
  while (index < queue.length) {
    const useItem = queue[index]
    if (useItem.tagName === tagName) {
      const $this = useItem.$this
      if (!$this.$options.components) $this.$options.components = {}
      $this.$options.components[useItem.componentName] = data
      if ($this.staticInstallReady !== undefined) $this.staticInstallReady = true
      useItem.rev(data)
      queue.splice(index, 1)
      continue
    }
    index++
  }
}
let isInit
function init () {
  if (isInit) return
  isInit = true
  window.Z.global.subscribe.bind('zq-import-static-plugin', (tagName, data) => {
    doQueue(tagName, data)
  })
}
export default {
  clearStatic ($this) {
    queue = queue.filter(obj => obj.$this !== $this)
    if ($this.installImportStatics) {
      $this.installImportStatics.forEach(item => {
        try {
          item.remove()
        } catch (e) {}
      })
      $this.installImportStatics = []
    }
  },
  /**
   * 注册静态文件组件
   * @param $this  当前组件对象 - 用于销毁队列
   * @param options 注册组件配置 tagName 需要的组件， componentName 注册名称
   * @param url 静态资源链接 已配置的url 可以不传
   * @returns {Promise<unknown>}
   */
  async install ($this, options = {}, url) {
    init()
    if (typeof options === 'string') options = {tagName: options}
    if (!options.componentName) options.componentName = options.tagName
    url = url || StaticUrl[options.tagName]
    if (!url) throw new Error('install url is empty')
    if (!url.js) throw new Error('install js url is empty')
    if (url.css) {
      const cssUrl = window.Z.service.utils.string.addQueryUrl(url.css, {version: window.Z.global.path.getVersion()})
      const link = window.Z.service.utils.dom.createLink(cssUrl, {origin: true})
      if (!$this.installImportStatics) $this.installImportStatics = []
      $this.installImportStatics.push(link)
    }
    // 添加版本号
    const jsUrl = window.Z.service.utils.string.addQueryUrl(url.js, {version: window.Z.global.path.getVersion()})
    const res = new Promise(rev => {
      queue.push({...options, rev, $this})
    })
    const script = await window.Z.service.utils.dom.createScript(jsUrl, {origin: true})
    if (!$this.installImportStatics) $this.installImportStatics = []
    $this.installImportStatics.push(script)
    return res
  }
}
