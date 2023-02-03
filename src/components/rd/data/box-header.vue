<template>
  <div class="box-header">
    <div class="title">{{title}}</div>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  name: 'rd-box-header',
  title: '企业画像信息标题',
  desc: '企业画像每个信息标题',
  props: {
    title: {
      default: ''
    }
  }
}
</script>
<style lang="scss">
.box-header{
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 6px;
  border-bottom: 1px solid #000000;
  display: flex;
  justify-content: space-between;
  .title{
    font-weight: 500;
    font-size: 16px;
    color: #000000;
  }
}
</style>
