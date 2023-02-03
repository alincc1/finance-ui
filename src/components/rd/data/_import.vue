<template>
  <div id="import">
    <el-upload
      :limit="limit"
      class="upload"
      ref="uploadForm"
      :action="action || uploadURL"
      :data="uploadData"
      :show-file-list="showFile"
      :accept="accept"
      :file-list="fileList"
      :on-change="function (file) {
        submitUpload(file)
        return false
      }"
      :on-remove="handleRemove"
      :auto-upload="false"
    >
      <slot name="button"></slot>
    </el-upload>
    <!-- <el-button :type="btnType" size="small" @click="upload">
      <slot>点击选择文件</slot>
    </el-button> -->
    <!-- <div class="upload-file" @click="upload">
      <slot>+ 添加</slot>
    </div> -->
    <!-- <input ref="file" type="file" name="file" @change="handleChange" style="display: none;" :accept="accept" :multiple="oneFile ? '' : 'multiple'" /> -->
    <!-- <div class="file-show">
      <div class="file-name">{{fileName}}</div>
      <span class="del" @click.stop="del(index)">×</span>
    </div> -->
  </div>
</template>

<script>
// import util from '@/util/util'

export default {
  name: 'import',
  props: {
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
      default: '.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
    },
    headers: {
      type: Object,
      default: () => {}
    },
    // fileList: {
    //   type: Array,
    //   default: () => []
    // },
    // files: {},
    // 限制文件上传类型
    uploadType: {
      type: [String, Array],
      default: '.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
    },
    // 是否批量上传 true为否
    oneFile: {
      type: Boolean,
      default: true
    },
    // 限制件上传文大小
    fileSize: {
      type: [String, Number],
      default: 50 // 默认限制100M
    },
    btnType: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      uploadURL: '',
      uploadData: {},
      fileName: '',
      fileList: [], // 上传的文件
      files: {} // 要上传的文件对象
    }
  },
  methods: {
    // 点击上传获取到事件
    upload () {
      this.$refs.file.click()
    },
    // 上传事件
    handleChange (e) {
      console.log('e------', e.target.files)
      const totalFiles = e.target.files.length + this.fileList.length
      if (e.target.files.length) {
        let flag
        for (let i = 0; i < e.target.files.length; i++) {
          const currentFile = e.target.files[i]
          if ((currentFile.size / 1024 / 1024) > this.fileSize) flag = true
        }
        if (flag) {
          return (window.MZ || window.Z).global.message.warning(`文件大小超过${this.fileSize}M，请重新上传`)
        }
      }
      if (!this.oneFile && totalFiles > this.ableLength) {
        return (window.MZ || window.Z).global.message.warning(`限制上传${this.maxlength}个文件，本次选择了${e.target.files.length}，共选择了${totalFiles}个文件`)
      }
      // const suffix = this.$refs.file.value.substr(this.$refs.file.value.lastIndexOf('.'))
      // if (this.uploadType && this.uploadType.indexOf(suffix.substr(1, suffix.length)) < 0) {
      //   console.log('this.uploadType', this.uploadType)
      //   let str
      //   if (Array.isArray(this.uploadType)) {
      //     str = this.uploadType.join(',')
      //   } else {
      //     str = this.uploadType.replace(/\./g, '')
      //   }
      //   (window.MZ || window.Z).global.message.error(`文件格式不正确，只支持后缀名为${str}格式的文件！`)
      //   this.$refs.file.value = ''
      //   return
      // }
      const target = e.target
      let file
      // 单个文件
      if (this.oneFile) file = target.files[0]
      else file = target.files
      this.fileName = file.name
      if (file) {
        // 单个文件
        if (this.oneFile) {
          // window.Z.api.file.attachment.upload({file, ossType: 'ex', fileSize: this.fileSize}).then(resp => {
          //   if (resp && resp.id) {
          //     this.fileList.push(resp)
          //     const files = this.fileList || []
          //     this.$emit('update:files', JSON.parse(JSON.stringify(files)))
          //     this.$emit('change', JSON.parse(JSON.stringify(files)))
          //   }
          // }).finally(res => {
          //   this.$refs.file.value = ''
          // })
          this.$emit('update:files', JSON.parse(JSON.stringify(file)))
          this.$emit('change', JSON.parse(JSON.stringify(file)))
        } else {
          // 多个文件上传
          for (let i = 0; i < file.length; i++) {
            const itemFile = file[i]
            window.Z.api.file.attachment.upload({file: itemFile, category: this.category, ossType: 'ex', fileSize: this.fileSize}).then(resp => {
              if (resp && resp.id) {
                this.fileList.push(resp)
                const files = this.fileList || []
                this.$emit('update:files', JSON.parse(JSON.stringify(files)))
                this.$emit('change', JSON.parse(JSON.stringify(files)))
              }
            }).finally(res => {
              this.$refs.file.value = ''
            })
          }
        }
      }
    },
    // 点击删除按钮
    del (index) {
      this.fileList.splice(index, 1)
      this.$emit('update:files', this.fileList)
      this.$emit('change', this.fileList)
    },
    // 移除文件
    handleRemove () {
      this.files = ''
      this.fileList = []
    },
    // 文件上传
    submitUpload (file) {
      console.log('上传file', file)
      this.files = file.raw
      this.$emit('update:files', file.raw)
    }
  }
}
</script>

<style lang="scss">
#import {
  display: flex;
  align-items: center;
  .upload{
    display: flex;
    .el-upload-list{
      margin-left: 24px;
    }
  }
  .upload-file{
    color: $theme-color;
    font-size: 16px;
    cursor: pointer;
  }
  .file-info{
    display: flex;
    align-items: center;
    margin-top: 17px;
    position: relative;
    left: -90px;
    .file-left{
      .file-img{
        width: 28px;
        height: 30px;
      }
    }
    .file-only{
      display: flex;
      align-items: center;
      margin-left: 12px;
      .file-name{
        color: #686868;
        font-size: 12px;
      }
      .del{
        cursor: pointer;
        font-size: 12px;
      }
    }
  }
  .file-show{
    display: flex;
    align-items: center;
    margin-left: 32px;
    .file-name{
      color: #686868;
      font-size: 16px;
    }
    .del{
      cursor: pointer;
      font-size: 16px;
      margin-left: 24px;
    }
  }
    // flex: 1;
    // display: flex;
    // overflow: hidden;
    // justify-content: flex-end;
    // > * {
    //     margin-left: 10px;
    //     &:first-child {
    //         margin-left: 0;
    //     }
    // }
    // button {
    //     padding: 9px 16px;
    // }
    // .export-btn {
    //     float: left;
    //     margin-left: 20px;
    //     background: #4F92EA;
    //     border-color: #4F92EA;
    //     color: #fff;
    //     &:hover {
    //         background: #4F92EA;
    //         border-color: #4F92EA;
    //         color: #fff;
    //         opacity: .8;
    //     }
    // }
    // .add-btn {
    //     float: left;
    // }
    // .table-right {
    //     height: 40px;
    //     line-height: 40px;
    //     float: right;
    // }
}
</style>
