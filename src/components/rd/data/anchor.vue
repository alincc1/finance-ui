<template>
  <rd-affix :offsetTop="offsetTop" :affix="affix" :target="target">
    <div class="zq-anchor anchor-box" :class="[propsClass, type]" ref="zqAnchor">
      <slot></slot>
      <template  v-if="anchorList.length">
        <rd-anchor-item v-for="(item, index) in anchorList"
                        :key="item.id"
                        :anchor="item"
                        :index="index"
                        @itemClick="itemClick"
                        :active="index === activeIndex"/>
      </template>
    </div>
  </rd-affix>
</template>

<script>
// import { color } from 'echarts'
import rdAffix from './affix'
import rdAnchorItem from './anchorItem'
export default {
  name: 'anchor',
  title: '左侧导航菜单',
  desc: '申报项目的详情的左侧导航菜单',
  components: { rdAffix, rdAnchorItem },
  props: {
    affix: {
      type: Boolean,
      default: false
    },
    anchorList: {
      type: Array
    },
    target: { // 相对定位的元素
      type: Function,
      default: null
    },
    getAnchor: {
      type: Function,
      default: () => {}
    },
    bottomOff: Number,
    offsetTop: Number,
    propsClass: String,
    type: {
      type: String,
      default: 'line'
    }
  },
  data () {
    return {
      activeIndex: 0,
      scrollTop: 0,
      innerAffix: true,
      parentsDomConfig: {},
      parentTop: null
    }
  },
  watch: {
    anchorList () {
      this.init()
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
  computed: {},
  methods: {
    init () {
      if (this.target) {
        const parentsDom = this.target()
        this.parentsDomConfig = window.Z.service.utils.dom.getOffset(parentsDom)
        this.parentTop = this.parentsDomConfig.top
      }
      this.anchorList.forEach(item => {
        let dom = this.getAnchor(item.id)
        dom = Array.isArray(dom) ? dom[0] : dom
        if (!dom) { return }
        if (this.target) {
          item.scrollTop = window.Z.service.utils.dom.getOffset(dom.$el || dom).top - this.parentTop
        } else {
          item.scrollTop = window.Z.service.utils.dom.getOffset(dom.$el || dom).top
        }
      })
      // 添加-scroll-监控
      if (this.target) {
        console.log('进啦这里')
        // 局部
        this.target().addEventListener('scroll', this.scrollTarget, false)
      } else {
        console.log('进来那里')
        // 全局
        window.addEventListener('scroll', this.scrollTopBody, false)
      }
    },
    scrollTopBody () {
      this.init()
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.changeActive()
    },
    scrollTarget () {
      this.init()
      this.scrollTop = this.target().scrollTop
      this.changeActive()
    },
    itemClick (anchor, index) {
      console.log('hakdfhoiadfhd', index)
      this.init()
      if (this.target) {
        console.log('是吧', index)
        // 局部
        this.target().scrollTop = this.anchorList[index].scrollTop
      } else {
        // 全局
        document.documentElement.scrollTop = this.anchorList[index].scrollTop + 5
        document.body.scrollTop = this.anchorList[index].scrollTop + 5
      }
    },
    changeActive () {
      let showIndex = 0
      this.anchorList.forEach((item, index) => {
        const selfTop = this.anchorList[index].scrollTop
        if (selfTop <= this.scrollTop) { showIndex = index }
      })
      this.activeIndex = showIndex
    }
  }
}
</script>
