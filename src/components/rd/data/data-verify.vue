<template>
  <el-dialog
    append-to-body
    class="intelligent-verify-report"
    :visible.sync="visible"
    width="700px"
    height="577px"
    :before-close="beforeClose"
  >
    <div slot="title" class="result-header"  :style="{backgroundImage: `url(${headerBgImg})`}">
      <div class="status-text">数据异常</div>
    </div>
    <div class="content-wrapper">
      <template v-for="(item, idx) in data">
        <div class="rule-item" :key="idx" v-if="item.dataList.length">
          <div class="rule-top">
            <div class="rule-left">
              <i class="el-icon-warning"></i>
              <div class="rule-name">{{item.dataType}}</div>
            </div>
            <div class="rule-right" @click="handleCollapse(idx)">
              <i class="el mr-10" :class="iconType(item.showStatus)"></i>
              <span class="right-word">{{item.showStatus ? '收起' : '展开'}}</span>
            </div>
          </div>
          <template v-if="item.showStatus">
            <div class="gray-bg" v-for="(ele, index) in item.dataList" :key="index">
              <el-table class="project-table" :data="ele">
                <el-table-column label="名称" prop="key" width="220px"/>
                <el-table-column label="详情" prop="value" :show-overflow-tooltip="true" width="340px"/>
              </el-table>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div slot="footer" style="text-align: right">
      <el-button type="normal-level" @click="$emit('close')">我知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'intelligentVerifyReport',
  title: '数据校验报告',
  desc: '数据校验报告',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: { // 根据检测报告总状态计算对应样式值
    buttonType () {
      return {
        N: 'high-level',
        Y: 'normal-level'
      }[this.data.status]
    },
    headerBgImg () {
      return window.Z.global.path.getRegionFileUrl(`/0001/0010/high-level.png`)
    }
  },
  data () {
    return {
      activeNames: [],
      enumList: [] // 枚举
    }
  },
  created () {
    // this.getEnumList()
  },
  methods: {
    iconColor (status) {
      return {
        N: '#FA4141',
        Y: '#27CA69'
      }[status]
    },
    iconType (status) {
      return {
        false: 'el-icon-arrow-down',
        true: 'el-icon-arrow-up'
      }[status]
    },
    // 重置折叠组件状态，默认将有风险的项展开，没风险的收起
    resetCollapse () {
      // 找到风险的项并映射成对应的名字
      this.activeNames = this.data.rules.map((r, idx) => r.status === 'N' ? `rule-${idx}` : '').filter(r => r)
    },
    // 收起、展开
    handleCollapse (idx) {
      this.data.forEach((ele, index) => {
        idx === index && (ele.showStatus = !ele.showStatus)
      })
    },
    // 枚举类型
    async getEnumList () {
      const data = await this.Z.api.admin.verify.enumList()
      this.enumList = data.list
    },
    // 关闭弹窗
    beforeClose () {
      this.$emit('close')
    },
    // 根据枚举获得dataTypeName
    transferName () {
      this.data.forEach(item => {
        item.dataTypeName = this.enumList.find(ele => ele.key === item.dataType).value
      })
    }
  },
  watch: {
    data () { // data发生变化认为是展示新的数据了，重置折叠状态
      // this.data.length && this.transferName()
    }
  }
}
</script>
<style lang="scss" scoped>
// 修改el的样式
/deep/ .el-collapse {
  border-top: none;
  border-bottom: none;
}
/deep/ .el-dialog__header {
  padding: 0 0 0 0;
}
/deep/ .el-dialog__headerbtn:hover {
  color: #fff;
}
/deep/ .el-dialog__close {
  color: #fff;
  opacity: 0.87;

  :hover {
    color: #fff;
  }
}
/deep/ .el-dialog__close::before:hover {
  color: #fff;
}
/deep/ .el-dialog__body {
  padding: 0 0 0 0;
}
/deep/ .el-collapse-item__header {
  border-bottom: none;
}
/deep/ .el-collapse-item__content {
  padding-bottom: 0;
}
/deep/ .el-collapse-item__header {
  background-color: transparent;
}
/deep/ .el-collapse-item__wrap {
  background-color: transparent;
  border-bottom: none;
}
/deep/ .el-table {
  background-color: transparent;
  border-top: none;
}
/deep/ .el-table tr {
  background-color: transparent;
}
/deep/ .el-table th {
  background-color: transparent;
  border-right: none;
}
/deep/ .el-table td {
  border-bottom: none;
}
/deep/ .el-dialog__footer {
  padding: 15px 39px 15px 39px;
  border-top: none;
  flex: right;
}
// 状态对应的按钮样式
.el-button--normal-level {
  padding: 6px 20px;
  font-size: 14px;
  border-radius: 2px;
  background: #FA4141;
  border-color: #FA4141;
  color: #fff;
}
.el-button--high-level {
  background: #FA4141;
  border-color: #FA4141;
  color: #fff;
}

.status-text {
  position: absolute;
  left: 120px;
  top: 39px;
  font-size: 28px;
  color: #fff;
}
.intelligent-verify-report {
  .result-header {
    width: 100%;
    height: 116px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .content-wrapper {
    background-color: #fff;
    width: 100%;
    height: 400px;
    overflow-y: auto;
    padding: 32px 38px 0 38px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .rule-item{
      width: 100%;
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
      .rule-top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rule-left{
          display: flex;
          align-items: center;
          .el-icon-warning{
            color: #FA4141;
            font-size: 16px;
            margin-right: 8px;
          }
          .rule-name{
            color: #FA4141;
            font-size: 14px;
          }
        }
        .rule-right{
          cursor: pointer;
          .right-word{
            color: #131415;
            font-size: 14px;
          }
          .el{
            font-size: 12px;
          }
        }
      }
      .gray-bg {
        width: 100%;
        border-radius: 2px;
        background-color: #F6F6F6;
        padding: 0 22px 2px 22px;
        box-sizing: border-box;
        margin-top: 8px;
        .project-table {
          // border: 1px solid red;
          flex: 1;
          margin-bottom: 12px;
          :last-child{
            margin-bottom: 0;
          }
        }
        /deep/ .el-table td {
          height: 38px !important;
          padding: 8px 0 !important;
          border-bottom: none;
        }
        /deep/ .el-table th {
          height: 38px !important;
          padding: 8px 0 !important;
        }
        /deep/ .el-table::before{
          height: 0 !important;
        }
        .project-table.el-table{
          .el-table__body-wrapper {
            .el-table__body {
              .el-table__row,
              td {
                height: 38px !important;
              }
            }
          }
        }
      }

    }
  }
}
</style>
