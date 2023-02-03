<template>
  <div id="empty">
    <div class="no-data">
      <img :src="src" class="img-data">
      <div class="no-tit">暂无数据</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'rd-empty',
  title: '缺省页面',
  desc: '没有数据缺省',
  props: {
    src: {
      type: String,
      default: () => window.Z.global.path.getRegionFileUrl('/0021/0001/noData.png')
    }
  },
  data () {
    return { }
  },
  methods: { }
}
</script>

<style lang="scss">
#empty{
  .no-data{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img-data{
      width: 280px;
      height: 152px;
    }
    .no-tit{
      color: #616161;
      font-size: 14px;
    }
  }
}
</style>
