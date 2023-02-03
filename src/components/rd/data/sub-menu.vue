<template>
  <div>
    <el-submenu v-if="menu.children" :index="getMenuKey(menu)">
      <template>
        <template slot="title">
          <div slot="title" class="flex-align">
            <i :class="'rdIcon ' + `${menu.icon}`" class="icon-class"/>
            <span>{{menu.name}}</span>
          </div>
        </template>
        <template v-for="(cmenu, cindex) in menu.children">
          <rd-sub-menu v-if="cmenu.children" :key="cindex" :menu="cmenu" :index="getMenuKey(cmenu)"/>
          <el-menu-item :key="cindex" v-else size="mini" :index="getMenuKey(cmenu)">
            <span style="padding-left:5px;">{{cmenu.name}}</span>
          </el-menu-item>
        </template>

      </template>
    </el-submenu>
    <el-menu-item v-else size="mini" :index="getMenuKey(menu)">
      <div slot="title" class="flex-align">
        <i :class="'rdIcon ' + `${menu.icon}`" class="icon-class"/>
        <span>{{menu.name}}</span>
      </div>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: 'layout-sub-menu',
  title: '配置的菜单',
  desc: '后台配置的菜单',
  props: {
    menu: {
      type: Object,
      default: null,
      required: true
    },
    iconColor: {
      type: String,
      default: null
    },
    counts: Object
  },
  // inject: ['filterMenu'],
  methods: {
    getMenuKey (menu) {
      return menu.menuKey || menu.routePath || menu.path || menu.name
    }
  }
}
</script>

<style lang="scss">
.sub-menu-count {
  .ant-scroll-number-only {
    vertical-align: initial;
  }
}
.icon-class{
  font-size: 14px;
}

</style>
