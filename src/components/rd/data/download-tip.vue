<template>
  <div v-if="attach" class="download-tip-contaienr width-100" :class="[isLongTip ? '' : 'max-width-class']">
    <div v-if="attach.id" @click.stop="handleShow(attach.url)" class="download-title" slot="reference">
      <span class="theme-color" v-if="noName">下载</span>
      <template  v-if="!noName">
        <slot>
          <a target="_blank" :class="[ellipsis ? 'ellipsis' : '', titleClass]" :title="fileTitle" class="a-tip-class">{{fileTitle}}</a>
        </slot>
      </template>
    </div><span class="del" v-if="delAble && attach.id" @click.stop="del"><i class="el icon-guanbi"></i></span>
  </div>
</template>

<script>
export default {
  name: 'fc-download-tip',
  title: '附件文件',
  desc: '下载或读取附件文件',
  props: {
    titleClass: {
      type: String,
      default: 'theme-color'
    },
    attach: {
      type: Object,
      default: null
    },
    showName: {
      type: String,
      default: null
    },
    delAble: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    // 是否显示水印 外部根据状态判断
    waterMarkAble: {
      type: Boolean
    },
    // 水印ID
    attachmentWaterMarkId: {
      type: String
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    noName: {
      type: Boolean,
      default: false
    },
    onlineFile: {
      type: Boolean,
      default: false
    },
    startWith: {
      type: String,
      default: ''
    },
    isLongTip: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ossName: '',
      ossUrl: null
    }
  },
  watch: {
    attach (newVal, oldVal) {
      if (!oldVal || !newVal || newVal.id !== oldVal.id) {
        this.ossUrl = ''
      }
    }
  },
  beforeDestroy () {
    this.Z.global.subscribe.oneUnBind(this)
  },
  computed: {
    hasUrl () {
      return this.showAttachmentWaterMark || this.hasAttach
    },
    hasAttach () {
      return this.attach && this.attach.id
    },
    showAttachmentWaterMark () {
      return this.attachmentWaterMarkId && this.waterMarkAble
    },
    showUrl () {
      return (this.attach && this.attach.url) || this.ossUrl
    },
    online () {
      return this.isWww && this.getFuchiConfigValue('regionConfig.public.system.doc', 'root', {}, this.useConfigChangeCount).onlineWord === 'Y'
    },
    isWww () {
      return window.Z.constant.isWww
    },
    useTitle () {
      return this.showName || (this.attach || {}).name || this.ossName
    },
    fileTitle () {
      return this.startWith + this.useTitle
    }
  },
  methods: {
    del () {
      this.$emit('del')
    },
    // 在线查看
    handleShow (url) {
      window.open(url)
    }
  },
  components: {}
}
</script>

<style lang="scss">
  .download-tip-contaienr {
    position: relative;
    display: inline-block;

    .max-width-class{
      max-width: 160px;
    }

    .download-title {
      cursor: pointer;

      a {
        width: inherit;
        display: inherit;
      }
      .a-tip-class{
        margin-bottom: 10px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }

    .del {
      height: 16px;

      .el {
        font-size: 14px;
      }

      position: absolute;
      right: -16px;
      top: 2px;
      color: blue;
      cursor: pointer;
    }
  }
</style>
