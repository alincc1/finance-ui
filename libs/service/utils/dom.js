let remUseFontSize
let remUseScale
let copyElement
const Dom = {
  // 获取元素的offset
  getOffset (ele, offset, scale = 1, scaleParent) {
    if (!ele) { return offset }
    offset = offset || { left: 0, top: 0 }
    if (!offset.width) {
      offset.width = ele.clientWidth
      offset.height = ele.clientHeight
    }
    offset.left += (ele.offsetLeft || 0) / scale
    offset.top += (ele.offsetTop || 0) / scale
    if (this.isParent(ele, scaleParent)) {
      return Dom.getOffset(ele.offsetParent, offset, scale, scaleParent)
    }
    return Dom.getOffset(ele.offsetParent, offset)
  },
  // 获取元素的offset
  getParentTop (ele, parent, top = 0) {
    if (!ele || ele === parent) { return top }
    top += ele.offsetTop || 0
    return Dom.getParentTop(ele.offsetParent, parent, top)
  },
  isParent (ele, parent) {
    if (!ele.parentNode || !parent) { return false }
    if (ele.parentNode === parent) { return true }
    return this.isParent(ele.parentNode, parent)
  },
  getCloneHtml (el) {
    const cloneEle = el.cloneNode(true);
    [].slice.call(cloneEle.querySelectorAll('[class*=none-show-],.pdf-add,input,textarea')).forEach(node => {
      node.remove()
    })
    return cloneEle.innerHTML
  },
  doRem (baseFontSize, scale, options = {}) {
    if (this.hasDoRem) { return }
    remUseFontSize = baseFontSize
    this.hasDoRem = true
    const setRem = () => {
      let width = document.documentElement.clientWidth || document.body.clientWidth
      const minWidth = options.minWidth || 1200
      const maxWidth = options.maxWidth || 1600
      if (options.maxAbleWidth && options.maxAbleWidth < width) { scale = 1 }
      if (scale) {
        remUseScale = scale
        baseFontSize = remUseFontSize
      } else if (!options.maxAbleWidth) {
        width = Math.max(width, minWidth)
        width = Math.min(width, maxWidth)
      }
      remUseScale = scale || width / baseFontSize
      if (!window.Z.service.utils.rem.isPc() && options.maxAbleWidth && width < options.maxAbleWidth) {
        baseFontSize = (width * 2 / 750) * remUseFontSize
      }
      // console.log('width', width, 'baseFontSize', baseFontSize, 'remUseScale', remUseScale)
      const documentElement = document.getElementsByTagName('html')[0]
      documentElement.style.fontSize = this.getRemFontSize(baseFontSize / remUseScale)
    }
    // 初始化
    setRem()
    window.Z.global.subscribe.bind('window-resize', setRem)
  },
  mobileRem () {
    if (this.hasDoRem) { return }
    const baseWidth = 750
    const width = document.documentElement.clientWidth || document.body.clientWidth
    remUseFontSize = document.documentElement.clientWidth || document.body.clientWidth
    this.hasDoRem = true
    const setRem = () => {
      remUseScale = width / baseWidth
      const documentElement = document.getElementsByTagName('html')[0]
      documentElement.style.fontSize = remUseScale * 100 + 'px'
    }
    // 初始化
    setRem()
  },
  /**
   * 获取转换后的fontsize
   * @param fontSize 需要转换的字体大小
   * @returns {string}
   */
  getRemFontSize (fontSize) {
    return this.getRemNumber(fontSize) + 'px'
  },
  /**
   * 获取转换后的fontsize
   * @param fontSize 需要转换的字体大小
   * @returns {string}
   */
  getRemNumber (fontSize) {
    return parseFloat(fontSize) * remUseScale
  },
  /**
   * 获取rem大小
   * @param fontSize 需要转换的字体大小
   * @returns {string}
   */
  getFontSizeRem (fontSize) {
    return (fontSize / remUseFontSize).toFixed(4) + 'rem'
  },
  /**
   * scrollTop
   * @param top 滚动位置
   */
  scrollTop (top) {
    document.documentElement.scrollTop = top
    document.body.scrollTop = top
  },
  /**
   * 拷贝
   * @param text 文本
   * @param showMessage 显示提示
   */
  copyText (text, showMessage) {
    if (typeof text === 'object') { text = JSON.stringify(text) }
    if (!copyElement) {
      copyElement = document.createElement('textarea')
      copyElement.style.position = 'absolute'
      copyElement.style.left = '-999px'
      copyElement.style.top = '-999px'
      copyElement.style.opacity = 0
      document.body.appendChild(copyElement)
    }
    copyElement.textContent = text
    copyElement.select()
    document.execCommand('Copy')
    if (showMessage) { window.Z.global.message.success('拷贝成功') }
  },
  /**
   * 获取可使用的单位
   * @param {string} str
   * @param {string} append
   */
  getUseString (str, append) {
    if (isNaN(str)) { return str }
    return this.getRemNumber(str) + append
  },
  /**
   * 获取可使用的单位
   * @param {string|Object} fontSize
   */
  formatFontSize (fontSize) {
    if (!fontSize) { return fontSize }
    const pxReg = /\b\d+px/g
    const resetOne = str => {
      // 数字直接返回
      if (!isNaN(str)) { return this.getUseString(str, 'px') }
      return str.replace(pxReg, text => this.getUseString(text.replace('px', ''), 'px'))
    }
    if (typeof fontSize !== 'object') { return resetOne(fontSize) }
    Object.keys(fontSize).forEach(key => {
      const val = fontSize[key] + ''
      if (['fontSize', 'height', 'width', 'lineHeight'].indexOf(key) > -1) {
        fontSize[key] = this.getUseString(val.replace('px', ''), 'px')
        return
      }
      if (pxReg.test(val)) {
        fontSize[key] = resetOne(val)
      }
    })
    return fontSize
  },
  createScript (url, options = {}) {
    return new Promise((rev, rej) => {
      const script = document.createElement('script')
      if (!options.origin) { url = window.Z.global.path.getRegionFileUrl(url) }
      script.src = url
      script.async = true
      script.type = 'text/javascript'
      if (options.id) { script.id = options.id }
      script.onload = function () {
        if (options.callback) { options.callback(script) }
        rev(script)
      }
      script.onerror = err => rej(err)
      document.body.appendChild(script)
    })
  },
  createLink (url, options = {}) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    if (options.id) { link.id = options.id }
    if (!options.origin) { url = window.Z.global.path.getRegionFileUrl(url) }
    link.href = url
    document.head.appendChild(link)
    return link
  }
}
export default Dom
