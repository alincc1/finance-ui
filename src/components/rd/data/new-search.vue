<template>
  <el-form class="fc-view-filter width-100" ref="searchForm" label-width="auto" @keyup.enter.native="doSearch" @submit.native.prevent>
    <el-row :gutter="20">
      <slot name="firstItem"/>
      <el-col :span="8" v-for="(item, index) in autoShowList" :key="'item' + index">
        <search-item :item="item" :autoParam="autoParam" :labelSlot="labelSlot"/>
      </el-col>
      <slot name="item"/>
      <span class="filter-more-content" v-if="toggleQueryFlag">
        <el-col :span="8"  :key="'item' + index" v-for="(item, index) in moreShowList">
          <search-item :item="item" :autoParam="autoParam" :labelSlot="labelSlot"/>
        </el-col>
        <slot name="moreItem"/>
      </span>
      <el-col v-if="hideSearch !== false" :span="8" class="toggle-content pl-10" :class="{'openClass': toggleQueryFlag, 'styleClass': isStyle}">
        <slot name="operate">
          <el-form-item label-width="0px">
            <el-button class="list-action-font" size="small" @click="doSearch">查询</el-button>
            <el-button class="list-action-font" size="small" type="secondary" @click="doReset">重置</el-button>
            <slot name="moreButton"/>
            <span v-if="allParamList.length > 2 && !isConfigure" @click="toggleQueryFlag = !toggleQueryFlag" class="fz-13 toggle-btn theme-hover cursor-pointer">
              {{toggleQueryFlag ? '收起' : '展开'}}
              <i v-if="!toggleQueryFlag" class="el-icon-arrow-down"></i>
              <i v-if="toggleQueryFlag" class="el-icon-arrow-up"></i>
            </span>
            <el-button class="list-action-font" type="secondary" size="small" v-if="isConfigure" @click="configure">高级</el-button>
          </el-form-item>
        </slot>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import SearchItem from './search-item'
export default {
  name: 'fc-tpl-select',
  title: '搜索框',
  desc: '支持搜索的字段',
  // mixins: [window.Z.Extends.common],
  components: {SearchItem},
  props: {
    // 配置列表
    paramList: {
      type: Array
    },
    labelWidth: {
      type: String
    },
    data: {
      type: Object
    },
    autoShowMore: Boolean,
    isConfigure: {
      type: Boolean,
      default: false
    },
    labelSlot: Boolean,
    isStyle: Boolean,
    hideSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      toggleQueryFlag: false,
      itemProps: [],
      moreItemProps: [],
      firstItemProps: [],
      autoParam: {}
    }
  },
  computed: {
    allParamList () {
      return this.searchList.concat(this.itemProps, this.moreItemProps, this.firstItemProps)
    },
    searchList () {
      return this.paramList ? this.paramList : []
    },
    autoShowList () {
      return this.searchList.slice(0, 2 - this.firstItemProps.length)
    },
    moreShowList () {
      return this.searchList.slice(2 - this.firstItemProps.length)
    }
  },
  created () {
    if (this.autoShowMore) { this.toggleQueryFlag = true }
    this.init()
  },
  watch: {
    data () {
      this.autoParam = this.data || {}
    },
    paramList () {
      this.autoParam = this.data || {}
    }
  },
  methods: {
    init () {
      this.autoParam = this.data || {}
      this.itemProps = this.getProps('item')
      this.firstItemProps = this.getProps('firstItem')
      this.moreItemProps = this.getProps('moreItem')
    },
    getProps (slot) {
      const slots = this.$slots[slot] ? this.$slots[slot].filter(a => a.tag) : []
      const componentOptions = slots.map(slot => slot.componentOptions)
      const com = componentOptions.filter(Boolean)
      if (com && com.length > 0) {
        return componentOptions.map(option => option.propsData)
      } else { return [] }
    },
    doReset () {
      this.searchList.forEach(param => {
        const key = param.key || (param.type + 'Id')
        this.$set(this.autoParam, key, '')
      })
      this.$emit('reset')
      this.$emit('search', {page: 1})
    },
    doSearch () {
      // console.log('搜索传参---', this.autoParam)
      this.$emit('search', {...this.autoParam, page: 1})
    },
    configure () {
      this.$emit('configure')
    }
  }
}
</script>
<style lang="scss" scoped>
// /deep/.el-form-item {
//   .el-form-item__label-wrap {
//     margin-left: 0 !important;
//   }
// }
</style>
