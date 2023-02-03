<template>
  <div id="newSilderHelp" :style="{ opacity: isVisibility? 1: 0 }">
    <ul class="toggled-box" v-show="isVisibility">
      <el-popover
        placement="left"
        trigger="hover"
        v-for="(item,i) in popoverMenu"
        :key="i"
        :content="item.conent">
        <li slot="reference">
          <el-badge>
            <i :class="item.icon"></i>
          </el-badge>
          {{item.title}}
        </li>
      </el-popover>
      <li @click="doTop"><i class="el-icon-upload2"></i>
        返回顶部
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'rd-backtop',
  data () {
    return {
      isVisibility: false,
      popoverMenu: [
        {
          icon: 'el-icon-notebook-1',
          title: '使用帮助',
          conent: '最新使用帮助请联系商务人员获取'
        },
        {
          icon: 'el-icon-phone-outline',
          title: '咨询热线',
          conent: '020-28186794'
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isVisibility = scrollTop > 180
    },
    doTop () {
      // document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang='scss' scoped>
#newSilderHelp {
    position: fixed;
    right: 1%;
    bottom: 10%;
    z-index: 1000;
    box-shadow: 0 2px 9px 4px rgba(227, 223, 223, 0.5);
    transition: all 0.5s;

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 72px;
        height: 72px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.9);
        font-size: 13px;
        color: #666;

        i {
            // color: $theme-color;
            font-size: 20px;
            margin-top: 5px;
        }

        &:hover {
            color: #fff;
            background-color: $theme-color;

            i {
                color: #fff;
            }

            .el {
                color: #fff;
            }
        }
    }

    .toggled {
        width: 72px;
        // height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: #666;
        transition: all 0.2s linear;
        background: rgba(255, 255, 255, 0.9);
        border-top: 1px solid #eee;

        &:hover {
            color: #fff;
            background-color: $theme-color;
            border-color: $theme-color;

            .el {
                color: #fff;
            }
        }
    }

    .showToggle {
        height: 72px;
        transition: all 0.2s linear;

        .el {
            color: $theme-color;
            font-size: 24px;
            margin-top: 5px;
        }
    }

    .toggled-box {
        transition: all 1s;
    }
}
</style>
