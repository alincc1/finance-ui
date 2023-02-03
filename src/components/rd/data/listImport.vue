<template>
  <el-dialog class="template-dialog-container" title="名单导入" width="600px" :visible.sync="dialogShow.visible" :before-close="hideDialog">
    <div v-if="state === 'start'">
      <div class="tips mb-26">
        <!-- <i class="el-icon-warning warning mr-5"></i> -->
        <span class="tip-title">温馨提示:进行批量导入前，请按照以下指引进行文件整理：</span>
      </div>
      <!-- <p class="mb-10 line-h--input" v-if="showTip">
        1、请下载模板<span @click="downTemplate" class="downdMould cursor-pointer theme-color mr-20">点击下载模板;</span><br>
        2、按照导入模板填充数据并保存;<br>
        3、上传文件。
      </p> -->
      <div v-if="showTip" class="step mb-36">
        <div class="step-one">
          <div class="step-left">
            <div class="icon">
              <div class="circle">
                <i class="el-icon-download step-icon"></i>
              </div>
            </div>
            <p class="step-title">第一步</p>
            <p class="step-tip">下载模板</p>
          </div>
          <div class="step-line"></div>
        </div>
        <div class="step-two">
          <div class="step-left">
            <div class="icon">
              <div class="circle">
                <i class="el-icon-document step-icon"></i>
              </div>
            </div>
            <p class="step-title">第二步</p>
            <p class="step-tip">按照导入模板填充数据并保存</p>
          </div>
          <div class="step-line"></div>
        </div>
        <div class="step-three">
          <div class="step-left">
            <div class="icon">
              <div class="circle">
                <i class="el-icon-upload2 step-icon"></i>
              </div>
            </div>
            <p class="step-title">第三步</p>
            <p class="step-tip">上传文件</p>
          </div>
        </div>
      </div>
      <div v-if="dialogShow.show">
        <p class="mb-8">数据来源:</p>
        <el-select v-model="onLine" placeholder="请选择" style="width: 100%;" size="small" :filterable="true" class="mb-15">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <div class="upload-btn mr-20">
          <el-upload
            :limit="limit"
            class="upload"
            :action="action"
            :data="uploadData"
            :accept="accept"
            :file-list="fileList"
            :on-change="function (file) {
              submitUpload(file)
              return false
            }"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-button class="mr-20" type="primary">上传文件</el-button>
            <!-- <el-button class="down-btn" @click.self="downTemplate">下载模板</el-button> -->
          </el-upload>
        </div>
        <div class="down-btn" style="position:absolute;left:157px">
          <el-button @click="downTemplate">下载模板</el-button>
        </div>
      </div>
    </div>
    <div slot="footer" style="marginRight:20px">
      <el-button class="second-class" @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'rd-list-import',
  title: '名单导入',
  desc: '新增报送名单导入',
  props: {
    dialogShow: {
      type: Object,
      default: () => ({
        action: ''
      })
    },
    action: {
      type: String,
      default: () => ''
    },
    showFile: {
      type: Boolean,
      default: () => true
    },
    limit: {
      type: Number,
      default: () => 1
    },
    accept: {
      type: String,
      default: '.xlsx'
    },
    showTip: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      uploadData: {},
      loading: false,
      dataList: [],
      file: [],
      state: 'start',
      summaryFiles: {}, // 上传的文件
      fileList: [], // 上传的文件
      files: {}, // 要上传的文件对象
      typeList: [
        {
          label: '线上',
          value: 'Y'
        },
        {
          label: '线下',
          value: 'N'
        }
      ],
      onLine: ''
    }
  },
  created () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 下载模板
    downTemplate () {
      this.$emit('downTemplate')
    },
    // 移除文件
    handleRemove () {
      this.files = ''
      this.fileList = []
    },
    // 文件上传
    submitUpload (file) {
      this.files = file.raw
    },
    // 弹窗确认
    confirm () {
      // 将文件传过去
      this.$emit('confirmUpload', this.files, this.onLine)
      this.files = ''
      this.fileList = []
    },
    // 关闭弹窗
    hideDialog () {
      this.files = ''
      this.fileList = []
      this.onLine = ''
      this.summaryFiles = ''
      this.dialogShow.visible = false
    }
  }
}
</script>
<style lang="scss">
.template-dialog-container{
  .el-dialog__body{
    padding: 21px 40px 20px 40px;
    box-sizing: border-box;
  }
  .tips{
    color: #686868;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 26px;
    .warning {
      color: #feac16;
      font-size: 20px;
      line-height: 22px;
    }
    .tip-title {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
  }
  .step {
    display: flex;
    .step-one,
    .step-two,
    .step-three {
      display: flex;
      .step-left {
        width: 80px;
        .icon {
          width: 100%;
          display: flex;
          justify-content: center;
          .circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #D9E6FA;
            display: flex;
            justify-content: center;
            align-items: center;
            .step-icon {
              color: #4884e4;
              font-size: 32px;
            }
          }
        }
        .step-title {
          font-size: 16px;
          font-weight: 500;
          color: #333333;
          line-height: 22px;
          margin-top: 16px;
          margin-bottom: 8px;
          text-align: center;
        }
        .step-tip {
          font-size: 14px;
          font-weight: 400;
          color: #7C878E;
          line-height: 22px;
          text-align: center;
        }
      }
      .step-line {
       width: 120px;
       height: 1px;
       margin-top: 30px;
       border-bottom: 1px dashed #979797;
      }
    }
    .step-two {
      .step-left {
        position: relative;
        .step-tip {
          position: absolute;
          bottom: 0;
          left: -58px;
          width: 200px;
        }
      }
    }
  }
  // .line-h--input{
  //   font-size: 14px;
  // }
  .btn {
    display: flex;
    .upload-btn{
      display: flex;
      color: #3F4A56;
      font-size: 18px;
      font-weight: 500;
      line-height: 1;
      align-items: center;
      .el-button{
        font-size:14px
      }
    }
  }
  .el-dialog__footer{
    .el-button{
      padding:8px 16px;
    }
  }
}
.el-upload-list__item-name{
  max-width: 370px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
