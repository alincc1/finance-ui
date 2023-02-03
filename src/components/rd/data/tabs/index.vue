<template>
  <div class="fc-tabs" :class="tabsClass" :style="tabsStyle">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'fc-tabs',
  title: '标签页',
  desc: '标签页',
  data () {
    return {
      active: -1,
      names: [],
      labels: []
    }
  },
  props: {
    value: {
      default: null
    },
    align: {
      default: 'center'
    },
    textColor: String,
    size: String
  },
  computed: {
    tabsStyle () {
      const style = {
        textAlign: this.align
      }
      if (this.textColor) { style.color = this.textColor }
      return style
    },
    tabsClass () {
      if (this.size) { return 'fc-tabs--' + this.size }
      return ''
    }
  },
  watch: {
    value (val) {
      this.active = this.names.findIndex(name => name === this.value)
    }
  },
  methods: {
    /**
       * 初始化
       */
    init () {
      const slots = this.$slots.default ? this.$slots.default.filter(a => a.tag) : []
      const componentOptions = slots.map(slot => slot.componentOptions)
      const propsData = componentOptions.map(option => option.propsData)
      const labels = propsData.map(prop => prop.label)
      const names = propsData.map(prop => prop.name)
      this.names = names
      this.labels = labels
      this.active = this.names.findIndex(name => name === this.value)
    },
    itemClick (name) {
      this.active = this.names.findIndex(item => name === item)
      this.$emit('input', name)
      this.$emit('tab-click', name)
    }
  }
}
</script>
