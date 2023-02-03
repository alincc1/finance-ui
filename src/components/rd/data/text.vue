<template>
  <span class ="text">
    <span>{{showText}}</span>
    <span class="ml-10 color-theme cursor-pointer" v-if="!isUnFold" @click="status = !status">{{flodText}}</span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    maxLength: {
      type: Number
    }
  },

  data () {
    return {
      status: true
    }
  },

  computed: {
    isUnFold () {
      return this.text.length <= this.maxLength
    },
    flodText () {
      return this.status ? '展开' : '收起'
    },
    showText () {
      return this.isUnFold ? this.text : this.status ? (this.text.slice(0, this.maxLength) + '...') : this.text
    }
  }
}
</script>
<style lang="scss" scoped>
.text {
  display: inline-block;
  padding: 11px 9px 11px 18px;
  box-sizing: border-box;
}
</style>
