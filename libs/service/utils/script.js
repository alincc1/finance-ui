const useScript = {
  jsSparkMd5: {
    js: ['plugins/js-spark-md5.js'],
    check: () => window.SparkMD5
  },
  jsBase64: {
    js: ['plugins/base64.js'],
    check: () => window.btoa
  },
  staticObjectPako: {
    js: ['plugins/base64.js'],
    check: () => window.staticObjectPako
  }
}
function loadCss (cssData) {
  if (!cssData) { return }
  cssData.forEach(item => {
    const url = item.url || item
    window.Z.service.utils.dom.createLink(url, {origin: true})
  })
}
function loadScript (scriptData) {
  if (!scriptData) { return }
  return window.Z.service.utils.array.doSyncQueue(scriptData, async script => {
    const url = script.url || script
    await window.Z.service.utils.dom.createScript(url, {origin: true})
  })
}
async function load (scriptData) {
  await loadScript(scriptData.js)
  loadCss(scriptData.css)
  // 脚本加载完成
  scriptData.isReady = true
}
export default {
  async install (script) {
    const scriptData = useScript[script]
    if (!scriptData) {
      throw new Error('未知的脚本')
    }
    if (scriptData.isReady) { return }
    // 脚本加载检查
    try {
      if (scriptData.check()) { return }
    } catch (e) {}
    await load(useScript[script])
  },
  // 创建 x-icon 浏览器的显示logo
  createIconLink (icoUrl) {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/x-icon'
    icoUrl = icoUrl || window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.logo', {}, 'root').ico || '/0001/0002/0003/logo.ico'
    link.href = window.Z.global.path.getRegionFileUrl(icoUrl) + `?version=${window.Z.global.path.getVersion()}`
    document.head.appendChild(link)
  }
}
