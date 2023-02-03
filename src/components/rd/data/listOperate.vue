<template>
  <div class="operate-box">
    <div class="operate-left">
      <slot name="button"></slot>
    </div>
    <div class="operate-right">
      <slot name="right-btn" />
      <div class="operate-btn flex-center back-white" @click="showFilterBox">
        <!-- <i class="el-icon-search fz-14 mr-5" :class="showFilter ? 'check-search' : ''"></i> -->
        <i class="rdIcon rd-sousuo fz-14 mr-5" :class="showFilter ? 'check-search' : 'search'"></i>
        <div class="search-tit fz-14" :class="showFilter ? 'check-search' : ''">搜索</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      showFilter: false
    }
  },
  methods: {
    showFilterBox () {
      this.showFilter = !this.showFilter
      this.$emit('showOperate', this.showFilter)
    }
  }
}
</script>
<style lang="scss">
.operate-box{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .operate-left{
    display: flex;
    align-items: center;
  }
  .operate-right{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .operate-btn{
      border-radius: 2px;
      padding: 0 12px;
      height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      margin-left: 16px;
      .el-icon-search{
        color: #A4ABAD;
      }
      .search-tit{
        color: #A4ABAD;
        font-weight: 400;
      }
        .check-search{
          color: $theme-color;
          font-weight: 400;
          font-size: 14px !important;
        }
        .search{
          color: #D8D8D8;
          font-size: 14px !important;
        }
    }
  }
}
</style>
