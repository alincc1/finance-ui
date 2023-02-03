/**
* 全局可用于上传文件的组件
*/
<template>
  <div>
    <input ref="file" type="file" name="file" @change="change"  :multiple="multiple" :accept="accept">
  </div>
</template>
<script>
export default {
  name: 'rd-upload',
  title: '上传文件',
  desc: '全局可用于上传文件的组件',
  props: {
    uploadType: String,
    platformType: String
  },
  data () {
    return {
      accept: '*/*',
      callback: null,
      options: null,
      showInput: false,
      acceptValue: '.xls,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg, image/jpg'
    }
  },
  computed: {
    multiple () {
      return (this.options || {}).multiple || false
    }
  },
  created () {
    this.Z.global.subscribe.oneBind('do-file-upload' + (this.uploadType || ''), (call, options = { accept: this.acceptValue}) => {
      this.callback = call
      this.options = options
      this.setAccept(options.type, options.mimeType, options.accept || '*/*')
      this.showInput = true
      this.doUpload()
    }, this)
  },
  beforeDestroy () {
    this.Z.global.subscribe.oneUnBind(this)
  },
  methods: {
    setAccept (type = 'image', mimeType = '*', accept) {
      this.accept = accept || [type, mimeType].join('/')
    },
    async change (e) {
      const target = e.target
      const resList = []
      if (this.options.fileUpload) {
        try {
          await this.options.fileUpload(target.files)
        } catch (e) {
        }
        this.$refs.file.value = ''
        this.showInput = false
        return
      }
      try {
        window.Z.global.subscribe.trigger('loading', 1)
        for (let i = 0; i < target.files.length; i++) {
          const file = target.files[i]
          // 上传前进行校验
          if (this.options) {
            if (this.options.valid) {
              const valid = await this.options.valid(file)
              if (valid === false) {
                continue
              }
            }
          }
          const category = this.options && this.options.category
          const resp = await window.Z.attachment.upload({file, category, ...this.options.params, loading: false})
          if (resp && resp.id) {
            if (!this.multiple) {
              // 单一文件上传
              if (this.callback) { this.callback(resp, file) }
            } else {
              resList.push({res: resp, file})
            }
          } else {
            if (this.options.errorReturn) {
              this.$refs.file.value = ''
              this.showInput = false
              window.Z.global.subscribe.trigger('loading', 0)
              return
            }
            if (this.options.errorBreak) { break }
          }
        }
      } catch (e) {
        if (this.options.errorReturn) {
          window.Z.global.subscribe.trigger('loading', 0)
          this.$refs.file.value = ''
          this.showInput = false
          return
        }
      }
      this.$refs.file.value = ''
      this.showInput = false
      if (this.multiple) {
        // 多选的执行回调
        if (this.callback) {
          await this.callback(resList)
        }
      }
      window.Z.global.subscribe.trigger('loading', 0)
    },
    doUpload () {
      this.$nextTick(() => {
        this.$refs.file.click()
      })
    }
  }
}
</script>
