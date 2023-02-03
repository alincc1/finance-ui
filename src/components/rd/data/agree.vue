<template>
  <div id="agree" v-if="visible">
    <el-dialog title="提示"
               :before-close="handleClose"
               :visible.sync="visible"
               class="template-dialog-container height-body-full box-white">
      <div class="dislogContent">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="审核意见：">
            <el-input class="unify" type="textarea" v-model="form.discountOpinion"  placeholder="请输入审核意见" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <rd-btns :data="btns"></rd-btns>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Agree",
  title: "允许贴息操作组件",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        discountOpinion: ''
      },
      btns: [
        {
          label: '取消',
          callback: this.reject
        },
        {
          label: '确定',
          callback: this.allow,
          type: 'primary'
        }
      ]
    }
  },
  methods: {
    // 同意
    allow () {
      const { discountOpinion } = this.form
      if (!discountOpinion) return this.$message.error('请填写常用或审核意见')
      const param = JSON.parse(JSON.stringify(this.form))
      this.form = {
        discountOpinion: ''
      }
      this.$emit('allow', param)
    },
    // 取消按钮
    reject () {
      this.handleClose()
    },
    // 关闭弹窗
    handleClose () {
      this.form = {
        discountOpinion: ''
      }
      this.$emit('closeDialog')
    }
  }
}
</script>
<style lang="scss">
#agree{
  background: #ffffff;
  border: 1px solid #ccc;
  .el-dialog{
    width: 550px !important;
    .el-dialog__header{
      height: 48px !important;
    }
    .el-dialog__body{
      padding: 0 !important;
    }
    .dislogContent{
      padding: 24px 87px 0 59px;
      .el-form{
        position: relative;
        width: 100%;
        margin: 0;
        .el-form-item{
          // display: flex;
          // justify-content: flex-end;
          margin-bottom: 24px;
          .el-form-item__content{
            position: absolute;
            right: 0;
            width: 302px !important;
          }
          .el-form-item__label{
            width: 100px !important;
            overflow: hidden;
            padding: 0;
          }
        }
        .el-form-item:nth-child(1){
          height: 96px !important;
        }
        .unify{
          width: 302px !important;
        }
        .el-textarea{
          height: 96px !important;
          // resize:none;
          .el-textarea__inner{
          height: 96px !important;
          resize:none;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          // color: #C1C1C1;
          }
        }
      }
    }
    #btns{
      border-top: 1px solid #F0F0F0;
      padding: 11px 24px 11px 0;
      .right-btns span{
        font-size: 14px !important;
      }
      button{
        padding: 8px 18px !important;
      }
    }
  }
}
</style>
