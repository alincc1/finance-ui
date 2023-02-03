<template>
  <el-pagination
    background
    class="table-footer-container"
    :layout="layout || 'prev, pager, next, jumper'"
    :current-page.sync="pageData.page"
    :total="pageData.total"
    :page-size.sync="pageData.pageSize"
    :page-sizes="[5, 10, 20, 30, 500, 1000]"
    @current-change="handlePageChange"
    :pager-count="5"
    @size-change="handleSizeChange"
  >
  </el-pagination>
</template>
<script>
export default {
  name: 'rd-pagination',
  title: '底部页码',
  desc: '底部页码可切换选择页数',
  // props: ['layout', 'pageData'],
  props: {
    pageData: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    // 每页多少条
    handleSizeChange (pageSize) {
      this.$emit('changePage', { page: 1, pageSize })
    },
    handlePageChange (page) {
      this.$emit('changePage', { page })
    }
  }
}
</script>
