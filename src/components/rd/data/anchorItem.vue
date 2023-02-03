<template>
  <div  class="anchor-item" :class="{active: active}" @click="itemClick()">
    {{anchor.title}}
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'anchor-item',
  title: '左侧导航菜单的子菜单',
  desc: '申报项目的详情的左侧导航菜单的子菜单',
  props: {
    anchor: Object,
    active: Boolean,
    index: Number
  },
  data () {
    return {
      inActive: false
    }
  },
  methods: {
    itemClick () {
      this.$emit('itemClick', this.anchor, this.index)
    }
  },
  computed: {}
}
</script>
