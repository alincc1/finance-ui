<template>
  <div id="footer-btns">
    <template v-for="(item, index) in data">
      <el-button
        :class="index === 0 ? 'other-color' : ''"
        :plain="index === 0"
        :type="index !== 0 ? 'primary': ''"
        :key="index"
        size="small"
        @click.native="item.callback">
        {{item.label}}
      </el-button>
    </template>
  </div>
</template>

<script>

export default {
  name: 'FooterBtn',
  title: '页面底部按钮',
  desc: '可传数组进来展示按钮',
  props: {
    data: {
      type: Array,
      default: () => []
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
