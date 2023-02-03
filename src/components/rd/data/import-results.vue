<template>
  <div id="import-results" v-if="visible">
    <el-dialog :title="title"
               :before-close="handleClose"
               :visible.sync="visible"
    >
      <i class="el-icon-warning"></i>
      <p class="title-one">导入失败</p>
      <div class="mb-8" v-if="showNumber">
        共上传<span class="fz-30 red-class">{{resultInfo.countSize}}</span>条,
        已匹配<span class="fz-30 red-class">{{resultInfo.successSize}}</span>条,
        匹配失败<span class="fz-30 red-class">{{resultInfo.errorSize}}</span>条
      </div>
      <p class="title-two">请核对并修改以下信息后，再重新发起提交。</p>
      <div class="showMessage" v-html="testText">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">{{btnName}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'import-results',
  title: '导入出现报错结果',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    textareal: {
      type: Array,
      default: []
    },
    resultInfo: {
      type: Object,
      default: () => {}
    },
    showNumber: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: '确 认'
    },
    title: {
      type: String,
      default: '导入结果'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    testText () {
      const stringtext = []
      this.textareal.forEach(element => {
        stringtext.push('<p>' + element + '</p>')
      })
      return stringtext.join('')
    }
  },
  methods: {
    // 关闭弹窗
    handleClose () {
      this.$emit('closeDialog')
    }
  }

}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper{
  /deep/ .el-dialog{
            width: 550px;
          }
  /deep/ .el-dialog__body{
    position: relative;
    padding: 28px 56px 24px;
    text-align: center;
  }
  .el-icon-warning{
    color: #FFBC00;
    font-size:92px;
  }
  .title-one{
    color: #FFBC00;
    font-size: 18px;
    padding-top: 26px;
    padding-bottom: 8px;
  }
  .title-two{
    color: #262626;
    font-size: 14px;
    padding-bottom: 24px;
  }
  .red-class{
    color: red;
  }
  .showMessage{
    width: 438px;
    height: 200px;
    overflow: auto;
    color: #666666;
    text-align: left;
    padding: 24px;
    box-shadow: 0px 2px 7px 2px rgba(0, 0, 0, 0.09);
    /deep/ p{
      padding-bottom: 16px;
    }
  }
  .showMessage::-webkit-scrollbar{
    width: 4px;
    border-radius: 2px;
  }
  .showMessage::-webkit-scrollbar-thumb{
      background: #D0D0D0;
      border-radius: 2px;
  }
  /deep/ .el-dialog__footer{
    padding: 11px 24px 11px 0;
  }
  /deep/ .dialog-footer{
    position: static;
    padding: 0;
    justify-content: flex-end;
  }
  /deep/ .el-button{
      padding: 8px 16px;
      border-radius: 2px;
    }

}
</style>
