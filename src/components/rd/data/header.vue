<template>
  <div class="header-box width-100">
    <div class="el-header flex-between">
      <div class="left-header-box">
        <div class="ml-30">
          <img src="../../../assets/images/zqlian.png" alt="logo" style="width: 130px;" />
        </div>
        <div class="back-box" @click="goBack" v-if="showBack">
          <img :src="window.Z.global.path.getRegionFileUrl('/0021/0001/back.png')" class="back-img mr-10">
          <span class="fz-16 name">{{backName}}</span>
        </div>
      </div>
      <div class="right-header">
        <span class="mr-20 use-help" @click="showUseHelp" v-if="isBank">使用帮助</span>
        <el-dropdown>
          <div class="right-info pr-20">
            <!-- <img class="mr-10" :src='avatar' alt="" style="width: 24px;"/> -->
            <span class="mr-10">设置</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="beforeExit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'rd-header',
  title: '顶栏容器',
  desc: '',
  props: {
  },
  data () {
    return {
      imgUrl: window.Z.global.path.getRegionFileUrl("/0021/0002/page-logo.png"),
      avatar: window.Z.global.path.getRegionFileUrl("/0006/0003/user.png")
      // userInfo: {}
    }
  },
  watch: {},
  computed: {
    backName () {
      const { businessType } = this.$route.query
      const name = businessType === 'bank'
        ? '-政银' : businessType === 'guarantee'
          ? '-政银担' : businessType === 'loan' ? '-数字贷' : ''
      return this.$route.meta.backName + name
    },
    showBack () {
      return this.$route.meta.showBack
    },
    loginUser () {
      return window.Z.global.auth.getLoginUser()
    },
    // 银行端
    isBank () {
      return +this.loginUser.userType === 5
    }
  },
  // created () {},
  mounted () {
    console.log('heaser-------', this.loginUser)
  },
  methods: {
    // getUserInfo () {
    //   const info = window.Z.global.auth.getLoginUser() || {}
    //   this.userInfo = info
    //   console.log('用户信息', info)
    // },
    // 退出前
    beforeExit () {
      this.$confirm('是否退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.Z.global.auth.removeLoginUser()
        localStorage.setItem('path', '')
        localStorage.removeItem('extendInfo')
        this.toLogin()
      }).catch((err) => {
        console.log(err)
      })
    },
    toLogin () {
      const url = window.CONFIG.isDev ? window.CONFIG.AIP_ORIGIN : location.origin
      const path = ['http://dev-2.zqlian.com', 'https://dev3.zqlian.com']
      let fix = ''
      if (path.includes(url)) {
        fix = 'demo-'
      }
      window.open(url + `/${fix}user/#/user/login`, '_self')
    },
    goBack () {
      this.$router.go(-1)
    },
    // 查看使用帮助
    showUseHelp () {
      window.open(window.Z.global.path.getRegionFileUrl('/0021/0001/org-use.pdf'), '_blank')
    }
  }
}
</script>
<style lang='scss'>
.el-header {
  padding-left: 0;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.06);
  .use-help{
    color: #fff;
    cursor: pointer;
  }
}
</style>
