<template>
  <div :class="isMore ? 'rd-more-bread' : 'rd-bread'">
    <div class="title">{{selfTitle || title}}</div>
    <slot name="content"></slot>
  </div>
</template>
<script>
export default {
  name: 'rd-bread',
  title: '面包屑',
  desc: '路由名称',
  props: {
    selfTitle: {
      default: ''
    },
    isMore: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    title () {
      return this.Z.global.auth.getMenuNameByPath(this.$route.path)
    }
  }
}
</script>
<style lang="scss">
.rd-bread,.rd-more-bread{
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  color: #171819;
  position: relative;
  .title{
    font-weight: 500;
    font-size: 20px;
  }
}
.rd-bread{
  padding: 20px 24px 24px 32px;
}
.rd-more-bread{
  padding: 20px 24px 0 32px;
}
</style>
