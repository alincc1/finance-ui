/**
 * @file 用于主题色的统一换肤管理
 * @author yun.wu
 * @module utils/color
 * @requires module:utils/xhr
 */
const pkg = require('~/package.json')

/**
 * @ignore
 * @desc 主题色的枚举配置 根据当前选择的主题进行颜色替换
 */
let themeColorType
/**
 * 主题色配置
 */
let themeColorConfig
const autoThemeColor = '#0FB8B8'
let hasInit
export default {
  getThemeColor () {
    if (themeColorConfig) { return themeColorConfig[autoThemeColor] || autoThemeColor }
    return autoThemeColor
  },
  getDomHead () {
    return document.getElementsByTagName('head')[0]
  },
  /**
   * 初始化
   * @public
   */
  async init () {
    const colorConfig = window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.theme.color', {}, 'root')
    // 有配置则认为已初始化
    if (Object.keys(colorConfig).length) {
      if (hasInit) return
      hasInit = true
    }
    if (colorConfig.style) {
      try {
        const style = document.createElement('style')
        style.innerHTML = colorConfig.style
        this.getDomHead().appendChild(style)
      } catch (e) {}
    }
    // 是否启用换肤
    if (colorConfig) {
      if (colorConfig.show === 'Y') {
        // 只需要执行一次初始化
        if (!this.isInit) {
          this.isInit = true
          try {
            // themeColorType = window.Z.global.base.getBaseDataProperty('themeColorType')
            themeColorType = []
            const colorTypeId = localStorage.themeColorId || colorConfig.colorTypeId
            if (colorTypeId) {
              // 获取id的配置颜色
              themeColorConfig = await window.Z.api[window.Z.constant.platformApi || 'server'].sys.styleTheme.info({ id: colorTypeId, _config: { errorHandler: false } })
              if (!themeColorConfig.config) return
              themeColorConfig = JSON.parse(themeColorConfig.config || '{}')
              // 生成需要处理的style
              await this.resetStyle()
              this.doListener()
            }
          } catch (e) {
            console.error(e)
          }
        }
      }
      Object.keys(colorConfig).forEach(key => {
        if (key.indexOf('css') > -1) {
          if (key === 'css') {
            return this.pushCss('isWww', colorConfig.css)
          }
          this.pushCss(key.slice(0, -3), colorConfig[key])
        }
      })
    }
  },
  /**
   * node insert处理
   * target insert对象
   */
  targetInsert (target) {
    if (target.localName === 'link' || target.nodeName === 'LINK') {
      this.replaceLink(target)
    } else if (target.localName === 'style') {
      if (target.getAttribute('format')) return
      this.replaceStyle(target)
    }
  },
  /**
   * 动态监听style link数据
   */
  doListener () {
    // 新方法
    if (window.MutationObserver) {
      const targetNode = this.getDomHead()
      const config = { attributes: true, childList: true, subtree: true }
      const observer = new MutationObserver((mutationsList, observer) => {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes) {
              mutation.addedNodes.forEach(target => {
                this.targetInsert(target)
              })
            }
          }
        }
      })
      observer.observe(targetNode, config)
      return
    }
    this.getDomHead().addEventListener('DOMNodeInserted', e => {
      this.targetInsert(e.target)
    })
  },
  /**
   * 更新style 内容
   */
  replaceStyle (style) {
    this.setStyle(themeColorConfig, style.textContent, style)
  },
  /**
   * 更新link 内容
   */
  async replaceLink (link) {
    const linkText = await window.Z.service.utils.xhr.get(link.href)
    if (this.setStyle(themeColorConfig, linkText)) {
      setTimeout(() => {
        link.remove()
      }, 200)
    }
  },
  /**
   * 生成一个对应的css
   * @param key
   * @param css
   */
  pushCss (key, css) {
    if (!window.Z.constant[key]) { return }
    window.Z.service.utils.dom.createLink(css)
  },
  /**
   * 主题色颜色替换
   * @param params 主题色对象
   * @param text 主题色更换内容
   * @param themeStyle style对象
   */
  setStyle (params, text, themeStyle) {
    console.log('setStyle')
    if (!text) return
    params = JSON.parse(JSON.stringify(params || {}))
    let keys = Object.keys(params)
    keys = keys.map(key => {
      const colorEnum = themeColorType.find(item => item.id === key)
      if (colorEnum) {
        const colorKey = '#' + colorEnum.remark.toLowerCase()
        params[colorKey] = params[key]
        return colorKey
      }
    }).filter(a => a)
    if (keys.length) {
      const regexp = new RegExp(keys.join('|'), 'img')
      if (text) {
        text = text.replace(regexp, re => {
          return params[re.toLowerCase()] || re
        })
        if (!themeStyle) {
          themeStyle = document.createElement('style')
          themeStyle.setAttribute('format', Date.now())
          this.getDomHead().appendChild(themeStyle)
        }
        themeStyle.textContent = text
        return true
      }
    }
  },
  /**
   * 重新生成style的样式字符串
   * @returns {Promise<void>}
   */
  async resetStyle () {
    const styles = this.getDomHead().querySelectorAll('style')
    styles.forEach(style => {
      this.setStyle(themeColorConfig, style.textContent, style)
    })
    // 本地不需要处理link 新版需要
    let doLink = true
    if (location.hostname === 'localhost1') doLink = false
    if (doLink) {
      const links = this.getDomHead().querySelectorAll('link')
      for (let i = 0; i < links.length; i++) {
        try {
          // 只需要处理app.xxxx.css
          const startWith = pkg.cssName || 'app'
          const reg = new RegExp(startWith + '\\..*\\.css$')
          if (reg.test(links[i].href)) {
            this.replaceLink(links[i])
          }
        } catch (e) {
          console.log('catch', e)
        }
      }
    }
  }
}
