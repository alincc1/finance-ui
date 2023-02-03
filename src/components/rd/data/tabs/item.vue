<template>
  <div class="fc-tabs--item" @click="clickHandler" :class="itemClass">
    <template>
      <slot>
        {{label}}
      </slot>
    </template>
  </div>
</template>
<script>
export default {
  name: 'fc-tabs-item',
  title: '子标签页',
  desc: '子标签页',
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    }
  },
  computed: {
    active () {
      return this.$parent.names[this.$parent.active] === this.name
    },
    itemClass () {
      return {
        active: this.active
      }
    }
  },
  mounted () {
    if (this.$parent.init) {
      this.$parent.init()
    }
  },
  methods: {
    clickHandler () {
      if (this.$parent.itemClick) {
        this.$parent.itemClick(this.name)
      }
    }
  }
}
</script>
