<template>
  <el-menu
    class="rd-el-menu"
    :default-active="showPath"
    background-color="#fff"
    text-color="#495060"
    active-text-color="#4795F1"
    style="border: none;"
    :collapse="collapse"
    @select="select"
  >
    <template v-for="(menu,i) in menuList">
      <rd-sub-menu :key="i" :menu="menu" />
    </template>
  </el-menu>

</template>
<script>
// import { color } from 'echarts'
export default {
  name: 'rdMenu',
  title: '页面左侧主菜单',
  props: {
    menuData: {
      type: Array,
      default: () => []
    },
    imgUrl: {
      type: String,
      default: () => {}
    },
    menus: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      collapse: false,
      activePictureC: '',
      imgData: false,
      changeIcon: true,
      menuList: this.menus,
      activeTimer: null,
      currentUser: window.Z.global.auth.getLoginUser(),
      pathIndex: null,
      counts: null,
      typeName: ''
    }
  },
  computed: {
    // 左边菜单默认高亮
    showPath () {
      const showMenu = this.useMenuList.find(item => item.path === this.$route.path) || {}
      console.log('是否高亮', this.pathIndex || showMenu.menuKey || showMenu.path || this.$route.meta.name || `${this.$route.meta.prefix}${this.$route.query.businessType}`)
      return this.pathIndex || showMenu.menuKey || showMenu.path || this.$route.meta.name || `${this.$route.meta.prefix}${this.$route.query.businessType}`
    },
    useMenuList () {
      return this.Z.service.utils.array.turnTreeToArray(this.menuList)
    }
  },
  methods: {
    getSelectMenu (index) {
      return this.useMenuList.find(item => item.menuKey === index)
    },
    select (index) {
      const useMenu = this.getSelectMenu(index)
      const usePath = useMenu ? useMenu.path : index
      this.pathIndex = null
      if (usePath !== this.$route.path) { this.$router.push(usePath) }
    }
  }
}
</script>
<style lang="scss">
.el-menu--collapse {
  width: 64px;
  min-height: 400px;
}
</style>
