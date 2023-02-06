<template>
  <div id="CommonCheck">
    <el-dialog
      class="check-dialog"
      :visible.sync="visible"
      :append-to-body="true"
      :width="width"
      :top="top"
      :before-close="beforeClose">
      <div class="check-box">
        <div class="dialog-tit">{{title}}</div>
        <div class="check-item" v-for="(item, index) in checkList" :key="index">
          <div class="check-left">
            <template v-if="index < checkList.length">
              <i class="el-icon-success icon-success" v-if="item.dealOperation === 'agree' || item.activityType === 'startEvent'"></i>
              <i class="el-icon-error icon-error" v-if="item.dealOperation === 'reject' || item.dealOperation === 'turn_down'"></i>
            </template>
            <div class="left-index" v-if="index === checkList.length - 1 && item.activityType !== 'endEvent'">{{index + 1 }}</div>
            <div class="left-gray" v-if="!item.assigneeList && item.activityType === 'endEvent' && item.dealOperation !== 'agree'"></div>
            <template v-if="index !== checkList.length -1">
              <div class="left-gray-line" v-if="item.dealOperation === 'reject' || item.dealOperation === 'turn_down'"></div>
              <div class="left-line" v-else></div>
            </template>
          </div>
          <div class="check-right">
            <div class="right-tit">{{item.taskName}}{{item.orgName && `-${item.orgName}`}}</div>
            <div class="right-card" v-if="item.assigneeList">
              <div class="right-name">{{item.assigneeList}}</div>
              <div class="right-name">{{item.dealOpinion}}</div>
              <div class="right-name">{{item.dealOperation}}</div>
              <div class="right-time">{{item.createdAt ? window.Z.global.date.timestampFormat(item.createdAt, 'YYYY-MM-DD HH:mm:ss') : item.createdAt}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rd-check-log',
  title: '审核日志',
  desc: '查看审核日志',
  props: {
    checkList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => '审核日志'
    },
    width: {
      type: String,
      default: () => '257px'
    },
    top: {
      type: String,
      default: () => '15vh'
    }
  },
  data () {
    return {
      processStateMap: {
        Y: '同意',
        N: '不同意'
      }
    }
  },
  mounted () {
    console.log('查看日志=----', this.checkList)
  },
  methods: {
    // 关闭dialog前
    beforeClose () {
      this.$emit('hideDialog', false)
    }
  }
}
</script>

<style lang="scss">
.check-dialog{
  .el-dialog__body{
    padding-top: 0;
  }
  .el-dialog__header{
    background: #fff !important;
  }
}
.check-box{
  width: 100%;
  box-sizing: border-box;
  max-height: 450px;
  overflow: hidden;
  overflow-y: auto;
  .dialog-tit{
    color: #262626;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 18px;
  }
  .check-item{
    width: 100%;
    display: flex;
    align-items: flex-start;
    .check-left{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex-shrink: 0;
      .icon-success{
        font-size: 15px;
        color: $theme-color;
      }
      .icon-error{
        font-size: 15px;
        color: #E70404;
      }
      .left-gray{
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #DFDFDF;
      }
      .left-index{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $theme-color;
        font-size: 10px;
        font-weight: 500;
        border: 1px solid $theme-color;
      }
      .left-line{
        width: 1px;
        height: 93px;
        background: $theme-color;
      }
      .left-gray-line{
        width: 1px;
        height: 93px;
        background: #DFDFDF;
      }
    }
    .check-right{
      margin-left: 10px;
      .right-tit{
        color: #5D7084;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 14px;
      }
      .right-card{
        padding: 8px 12px;
        box-sizing: border-box;
        background: #F9F9FA;
        border-radius: 0px 10px 10px 10px;
        .right-name{
          color: #131415;
          font-size: 14px;
          margin-bottom: 4px;
          line-height: 1;
        }
        .right-name{
          color: #65778A;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
