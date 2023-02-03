<template>
  <div id="opinion" v-if="showOpinion.visible">
    <el-dialog :title="title"
               :before-close="handleClose"
               :visible.sync="showOpinion.visible"
               class="template-dialog-container height-body-full box-white">
      <div class="dislogContent">
        <div class="opinion-title">{{isDetail ? '查看' : '填写'}}意见：</div>
        <el-input class="unify" type="textarea" :disabled="isDetail" v-model="showOpinion.opinionText"  placeholder="请填写您的意见" maxlength="50" show-word-limit></el-input>
        <rd-upload :files.sync="attachments" :onlineFile="true" :read="isDetail">
          <el-button icon="el-icon-plus">上传附件</el-button>
        </rd-upload>
      </div>
      <rd-btns :data="btns"></rd-btns>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "opinion",
  title: "填写、修改、查看意见组件",
  props: {
    title: {
      type: String,
      default: '意见'
    },
    showOpinion: {
      type: Object,
      default: {}
    },
    showDate: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    attachmentFiles: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      btns: [
        {
          label: '取消',
          callback: this.cancel
        },
        {
          label: '确认',
          callback: this.confirm,
          type: 'primary'
        }
      ],
      attachments: this.fileList
    }
  },
  computed: {
    getFileList () {
      return this.fileList || []
    }
  },
  methods: {
    // 确认
    confirm () {
      this.$emit('confirm', this.attachments)
    },
    // 不同意按钮
    cancel () {
      this.handleClose()
    },
    // 关闭弹窗
    handleClose () {
      this.$emit('closeDialog')
    }
  }
}
</script>
