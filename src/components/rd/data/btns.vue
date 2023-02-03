<template>
  <div id="btns">
    <div class="title">
      <span>{{title}}</span>
      <slot name="title-append" />
    </div>
    <template v-if="data.length">
      <div class="right-btns">
        <template v-for="(item, index) in data">
          <el-button
            :key="index"
            v-if="item.type ==='primary' || item.plain"
            :class="(index === 0 && item.type !=='primary') ? 'other-color' : ''"
            :plain="item.plain || false"
            :type="item.type"
            size="small"
            @click.native="item.callback">
            {{item.label}}
          </el-button>
          <el-button
            :key="index"
            v-else
            class="second-class"
            :plain="item.plain || false"
            :type="item.type"
            size="small"
            @click.native="item.callback">
            {{item.label}}
          </el-button>
        </template>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Btns',
  title: '页面按钮',
  desc: '可传数组进来展示按钮',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return { }
  },
  methods: { }
}
</script>

<style lang="scss">
</style>
