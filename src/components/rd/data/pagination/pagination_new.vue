<template>
  <rdorg-pagination
    class="rdorg_pagination width-wrap"
    background
    @current-change="handlePageChange"
    :current-page="pageData.page"
    :page-size="pageData.pageSize"
    :layout="layout"
    :total="pageData.total">
  </rdorg-pagination>
</template>
<script>
export default {
  name: 'paginationn-new',
  title: '分页',
  desc: '分页',
  props: {
    pageData: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: 'prev, jumper, totalPage, jumperBtn, next'
    }
  },
  methods: {
    handlePageChange (page) {
      this.$emit('change', {page})
    }
  }
}
</script>
<style lang="scss">
  .rdorg_pagination {
    height: 34px;

    .btn-prev, .btn-next {
      height: 34px;
      border: unset;
      background: #eee;
      width: 34px;
      text-align: center;
      padding: unset;
    }

    .btn-prev {
      margin-right: 12px;
    }

    .btn-next {
      margin-left: 12px;
    }

    .rdorg-pagination__jump {
      .rdorg-pagination__editor {
        .el-input__inner {
          width: 80px;
          height: 34px;
          box-sizing: border-box;
          text-align: center;
          border-radius: unset;
        }
      }
    }

    .rdorg-pagination__total {
      margin-left: 12px;
      margin-right: 12px;
    }

    .rdorg-pagination__jumpBtn {
      width: 80px;
      height: 34px;
      border: unset;
      background: #ebf4fb;
      color: #4795f1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
