<template>
  <div class="fc-upload-file">
    <div class="top-block" @click="click" v-if="showUploadBtn && system === 'rongdan'">
      <div class="file-title">附件：</div>
      <slot name="trigger" v-if="showBtn">
        <div class="box-upload">
          <i class="el-icon-circle-plus-outline add-icon"></i>
          <div class="upload-text">{{uploadText || '上传附件'}}</div>
        </div>
      </slot>
    </div>
    <div class="flex-left">
      <div @click="click" v-if="showUploadBtn && system !== 'rongdan'" style="width: 104px">
        <slot name="trigger" v-if="showBtn">
          <div class="">
            <!-- <div class="upload-text">{{uploadText || '上传附件'}}</div> -->
            <el-button :type="btnType" size="small">
              {{uploadText || '上传附件'}}
            </el-button>
          </div>
        </slot>
      </div>
      <span class="down-template" v-if="showDownTemplate" @click="download">下载模板</span>
    </div>
    <input ref="file" type="file" name="file" @change="change" style="display: none;" :accept="uploadType" :multiple="multiple"/>
    <template v-if="!notShowFile && files && files.length">
      <div
        v-for="(item, index) in files"
        :key="item.id + index"
        class="file-show-item mr-10 flex-left"
        :style="textStyle">
        <div class="inline-block ellipsis need-ellipsis">
          <el-image v-if='showImage' :src="item.url"></el-image>
          <rd-download-tip v-else :onlineFile="onlineFile" :attach="item" :showName="showName"/>
        </div>
        <div v-if="!read || delAble" class="del inline-block" @click.stop="del(index)">删除</div>
      </div>
    </template>
    <slot name="file" :data="files"/>
  </div>
</template>
<script>
export default {
  name: 'fc-upload-file',
  title: '上传文件',
  desc: '上传文件',
  props: {
    showImage: Boolean,
    files: Array,
    oneFile: Boolean,
    read: Boolean,
    uploadText: String,
    showName: String,
    width: String,
    // eslint-disable-next-line vue/require-prop-type-constructor
    notShowFile: Boolean | String,
    category: {
      type: String,
      default: 'other'
    },
    system: {
      type: String,
      default: 'rongdan'
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    maxlength: Number,
    ossType: String,
    fileType: [String, Array],
    onlineFile: Boolean,
    delAble: Boolean,
    btnType: {
      type: String,
      default: 'primary'
    },
    uploadType: [String, Array],
    multiple: {
      type: Boolean,
      default: true
    },
    showDownTemplate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // accept: '*/*'
    }
  },
  methods: {
    change (e) {
      if (!this.multiple && this.files.length) {
        return window.Z.global.message.error(`只允许上传单个文件！`)
      }
      const suffix = this.$refs.file.value.substr(this.$refs.file.value.lastIndexOf('.'))
      if (this.fileType && this.fileType.indexOf(suffix.substr(1, suffix.length)) < 0) {
        const str = this.fileType.join('，')
        window.Z.global.message.error(`文件格式不正确，只支持后缀名为${str}格式的文件！`)
        this.$refs.file.value = ''
        return
      }
      const target = e.target
      const file = target.files[0]
      console.log('上传文件----', JSON.parse(JSON.stringify(target.files)))
      if (file) {
        for (let i = 0; i < target.files.length; i++) {
          window.Z.attachment.upload({file: target.files[i], category: this.category, ossType: this.ossType}).then(resp => {
            if (resp && resp.id) {
              const files = this.files || []
              this.$emit('update:files', JSON.parse(JSON.stringify(files.concat(resp))))
              this.$emit('fileChange', JSON.parse(JSON.stringify(files.concat(resp))))
            }
          }).finally(res => {
            this.$refs.file.value = ''
          })
        }
      }
    },
    click () {
      this.$refs.file.click()
    },
    del (index) {
      const files = JSON.parse(JSON.stringify(this.files))
      files.splice(index, 1)
      this.$emit('update:files', files)
      this.$emit('fileChange', this.files)
    },
    download () {
      this.$emit('download')
    }
  },
  computed: {
    hasFile () {
      return this.files && this.files.length
    },
    fileLength () {
      if (!this.files) { return 0 }
      return this.files.length
    },
    ableLength () {
      if (this.oneFile) { return 1 }
      return this.maxlength || 1000
    },
    showUploadBtn () {
      return !this.read && this.ableLength > this.fileLength
    },
    textStyle () {
      const style = {}
      if (this.width) { style.width = this.width }
      return style
    }
  }
}
</script>
<style lang="scss">
  .fc-upload-file {
    width: 100%;
    .top-block{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      .file-title{
        color: #262626;
        font-size: 14px;
      }
      .box-upload{
        display: flex;
        align-items: center;
        cursor: pointer;
        .add-icon{
          font-size: 14px;
          color: $theme-color;
          margin-right: 5px;
        }
        .upload-text{
          color: $theme-color;
          font-size: 14px;
        }
      }
    }
    .file-show-item {
      color: #333;
    }
    .down-template{
      display: inline-block;
      margin-left: 48px;
      cursor: pointer;
    }

    .del {
      cursor: pointer;
      color: #666666;
      font-size: 14px;
      margin-left: 18px;
    }

    .need-ellipsis {
      line-height: 0;

      & > * {
        line-height: 32px;
      }
    }
  }
</style>
