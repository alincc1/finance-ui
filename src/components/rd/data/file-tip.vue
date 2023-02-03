<template>
  <div v-if="attach.id" @click.stop="handleShow()" class="download-title cursor-pointer ellipsis" style="width:100px">
    <a target="_blank" :class="[ellipsis ? 'ellipsis' : '', titleClass]" :title="attach.name" class="a-tip-class">{{attach.name}}</a>
  </div>
</template>

<script>
export default {
  props: {
    titleClass: {
      type: String,
      default: 'theme-color'
    },
    attach: {
      type: Object,
      default: null
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleShow () {
      window.Z.global.path.openUrl(this.attach.url, this.attach.name, false)
    }
  }
}
</script>

<style>

</style>
