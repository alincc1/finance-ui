<!--显示更多-->
<template>
  <div
    v-if="value > count"
    class="show-more-data cursor-pointer"
    :class="moreStyle"
    @click="handle">
    {{showMoreData ? expendText : closeText}}
    <i v-if="showIcon" class="el fz-10" :class="showMoreData ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"/>
  </div>
</template>

<script>
export default {
  name: 'show-more',
  title: '查看更多',
  desc: '查看更多',
  data () {
    return {
    }
  },
  methods: {
    handle () {
      this.$emit('handle')
    }
  },
  /*
    * value: 返回的list的总条数
    * showMoreData: 显示更多和收起的切换
    * count: 数据小于多少条显示，默认5条
    * */
  props: {
    value: {
      type: Number,
      default: 0
    },
    showMoreData: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 6
    },
    expendText: {
      type: String,
      default: '收起'
    },
    closeText: {
      type: String,
      default: '查看更多'
    },
    // 显示更多的样式 : fontStyle
    moreStyle: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  }
}
</script>
