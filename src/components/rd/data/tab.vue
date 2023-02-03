<template>
  <div id="tab">
    <div class="tab-box">
      <div class="tab-item mr-32" v-for="(item, index) in tabData" :key="index" @click="changTab(item, index)">
        <div :class="index === curIndex ? (activeRed ? 'active-red-label' : 'active-tab-label') : 'tab-label'">{{item.label}}<span v-if="item.number">({{item.number}})</span></div>
        <div class="tab-line" v-if="curIndex === index"></div>
      </div>
    </div>
    <div class="right-btn">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'rd-tab',
  title: 'tab切换',
  desc: '切换tab获取不同数据',
  props: {
    tabData: {
      type: Array,
      default: () => []
    },
    propIndex: {
      type: Number,
      default: -1
    },
    activeRed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      curIndex: 0
    }
  },
  methods: {
    // 切换tab栏
    changTab (item, index) {
      this.curIndex = index
      this.$emit('changeTab', item.value, item.label)
    }
  }
}
</script>

<style lang="scss">

</style>
