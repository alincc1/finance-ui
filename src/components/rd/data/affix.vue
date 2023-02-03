<template>
  <div class="zq-affix-box" :style="boxStyle">
    <div class="zq-affix" ref="zqAffix" :class="{positionFixed: isFixed}" :style="positionStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import utilsDom from '~/libs/service/utils/dom.js'
export default {
  name: 'affix',
  title: '固钉组件',
  desc: '固钉组件',
  props: {
    offsetBottom: Number, // 浮动后距离底部的位置
    offsetTop: Number, // 浮动后距离顶部的距离
    target: { // 相对定位的元素
      type: Function,
      default: null
    },
    affix: { // 是否使用浮动
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      scrollTop: 0, // 滚动高度
      eleOption: null, // 定位元素的配置
      fixed: false, // 是否浮动
      positionLeft: 0, // 浮动后记录left
      parentsPositionLeft: 0, // 相对元素的left位置
      diffScroll: 0, // 定位 后距离顶部的距离
      parentsDom: null, // 相对元素
      boxStyle: {}, // 占位元素的style
      footerOffsetTop: 0, // 脚部距离页面顶部的距离
      diffTop: 0// 元素需要往上提升的高度差
    }
  },
  computed: {
    // 固钉Style
    positionStyle () {
      const style = {
        width: this.boxStyle.width,
        top: this.positionTop + 'px',
        // left: this.positionLeft + 'px',
        bottom: this.offsetBottom + 'px'
      }
      return style
    },
    // 固钉top
    positionTop () {
      return this.diffTop > 0 ? (this.diffScroll || this.offsetTop) - this.diffTop : (this.diffScroll || this.offsetTop)
    },
    // 是否浮动
    isFixed () {
      return this.affix && this.fixed
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy () {
    // 清除绑定的函数
    window.removeEventListener('scroll', this.scrollTarget, false)
    window.removeEventListener('scroll', this.scrollTopBody, false)
  },
  methods: {
    // 初始化
    init (notEventListener) {
      // 获取元素dom
      const dom = this.$refs.zqAffix
      // 当前定位高度比最大初始位置小者不赋值
      if (this.eleOption && this.eleOption.top > dom.offsetTop) { return }
      this.eleOption = utilsDom.getOffset(dom)
      this.positionLeft = this.eleOption.left
      // 获取局部元素dom
      if (this.target) {
        const parentsDom = this.target()
        this.parentsDom = utilsDom.getOffset(parentsDom)
        this.parentsPositionLeft = this.parentsDom.left
      }
      this.setBoxStyle()
      // 是否需要监听
      if (notEventListener) { return }
      // 添加-scroll-监控
      if (this.target) {
        // 局部
        this.target().addEventListener('scroll', this.scrollTarget, false)
      } else {
        // 全局
        window.addEventListener('scroll', this.scrollTopBody, false)
      }
    },
    // 更新组件定位
    updatePosition (scrollTop, diffScroll) {
      if (!this.eleOption) { return }
      if (scrollTop > diffScroll) {
        this.fixed = true
      } else {
        this.fixed = false
      }
      // 脚部距离页面顶部的距离-已经滚动的距离=脚部距离窗口顶部的距离
      // 元素高度+元素距离脚部的高度=元素需要占用的高度
      // 元素需要占用的高度-脚部距离窗口顶部的距离=元素需要往上提升的高度差
      // if(元素需要往上提升的高度差>0) 设置元素距离页面顶部的距离=浮动后距离顶部的距离-元素需要往上提升的高度差
      // else 设置元素距离页面顶部的距离=浮动后距离顶部的距离
      const footer = document.querySelector('.common-footer')
      if (footer) {
        this.footerOffsetTop = footer.offsetTop
        this.diffTop = (this.eleOption.height + this.offsetTop + 40) - (this.footerOffsetTop - this.scrollTop)
      }
      this.$emit('change', this.fixed)
    },
    // 相对元素滚动位移变化
    scrollTarget () {
      this.scrollTop = this.target().scrollTop
      // 窗口变化或者页面没渲染完的时候获取元素的定位可能不准，因此以是否触发了浮动来判断是否需要更新位置信息，
      if (!this.fixed) {
        const dom = this.$refs.zqAffix
        this.eleOption = utilsDom.getOffset(dom)
        // console.log('重定位元素位置信息', this.eleOption.top)
      }
      // console.log('菜单原始高度：', this.eleOption)
      // console.log('滚动距离：', this.scrollTop)
      // console.log('触发浮动的高度：', this.eleOption.top - this.offsetTop)
      // console.log('触发浮动后的高度：', this.offsetTop)

      const diffScroll = this.eleOption.top - this.offsetTop
      this.updatePosition(this.scrollTop, diffScroll)
    },
    // 元素滚动位移变化
    scrollTopBody () {
      if (!this.fixed) {
        const dom = this.$refs.zqAffix
        this.eleOption = utilsDom.getOffset(dom)
        // console.log('重定位元素位置信息', this.eleOption.top)
      }
      // console.log('菜单原始高度：', this.eleOption)
      // console.log('滚动距离：', this.scrollTop)
      // console.log('触发浮动的高度：', this.eleOption.top - this.offsetTop)
      // console.log('触发浮动后的高度：', this.offsetTop)
      this.init(true)
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.updatePosition(this.scrollTop, this.eleOption.top)
    },
    // 设置占位元素高度
    setBoxStyle () {
      const dom = this.$refs.zqAffix
      const domstyle = utilsDom.getOffset(dom)
      this.boxStyle.height = domstyle.height + 'px'
      this.boxStyle.width = domstyle.width + 'px'
    }
  }
}
</script>
