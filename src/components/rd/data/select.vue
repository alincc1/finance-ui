<template>
  <el-select
    v-model="selectValue"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    :collapseTags="collapseTags"
    :filterable="realFilterable"
    :allowCreate="allowCreate"
    :remote="remote"
    :loading="searching"
    :reserveKeyword="reserveKeyword"
    :defaultFirstOption="defaultFirstOption"
    :popperAppendToBody="popperAppendToBody"
    :automaticDropdown="automaticDropdown"
    :size="size"
    :name="name"
    :placeholder="realPlaceholder"
    :autocomplete="autocomplete"
    :loadingText="loadingText"
    :noMatchText="noMatchText"
    :noDataText="noDataText"
    :popperClass="popperClass"
    :multipleLimit="multipleLimit"
    :filterMethod="filterMethod"
    :remoteMethod="getList"
    @change="change"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @blur="blurEvent"
    @focus="focusEvent"
    ref="select">
    <el-option v-for="(item, index) in dataList" :key="index" :label="item[labelKey]" :value="item[valueKey]"/>
  </el-select>
</template>
<script>
export default {
  name: 'rd-form-select',
  title: '下拉选择组件',
  desc: '下拉选择组件',
  // mixins: [window.Z.Extends.common],
  props: {
    value: {
      type: [Number, String, Boolean, Array]
    },
    autoSearch: {
      type: Boolean
    },
    dataType: {
      type: String
    },
    options: {
      type: Object,
      default: () => ({
        labelKey: 'value',
        valueKey: 'key'
      })
    },
    multiple: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    collapseTags: {
      type: Boolean
    },
    filterable: {
      type: Boolean,
      default: true
    },
    allowCreate: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    reserveKeyword: {
      type: Boolean
    },
    defaultFirstOption: {
      type: Boolean
    },
    popperAppendToBody: {
      type: Boolean
    },
    automaticDropdown: {
      type: Boolean
    },
    size: {
      type: String
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    loadingText: {
      type: String
    },
    noMatchText: {
      type: String
    },
    noDataText: {
      type: String
    },
    popperClass: {
      type: String
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    filterMethod: {
      type: Function
    },
    useDataList: Array
  },
  data () {
    return {
      selectValue: null,
      govName: '',
      localType: ['gov'],
      dataList: [],
      searching: false
    }
  },
  computed: {
    remote () {
      if (this.useDataList) { return false }
      return !this.enumAble && !this.localAble
    },
    enumAble () {
      return this.enumType[this.dataType]
    },
    localAble () {
      return this.localType[this.dataType]
    },
    govNameList () {
      return this.options.type === 'gov'
    },
    realFilterable () {
      return this.filterable
    },
    realPlaceholder () {
      return this.placeholder || (!this.remote ? '请选择' : '请输入')
    },
    methodKey () {
      return this.options.methodKey || ({
        themeType: 'th.themeType',
        theme: 'th.theme',
        policy: 'th.policy',
        notice: 'th.notice',
        themePlugin: 'th.themePlugin',
        projectTitle: 'da.projectInfo'
      })[this.dataType]
    },
    // 请求参数的关键字字段
    nameKey () {
      return this.options.nameKey || ({
        notice: 'keyword',
        policy: 'keyword',
        publicity: 'keyword',
        themePlugin: 'pluginLabel',
        projectTitle: 'projectTitle'
      })[this.dataType] || 'name'
    },
    // option value
    valueKey () {
      return this.options.valueKey || ({
        gov: 'govCode',
        themePlugin: 'pluginId'
      })[this.dataType] || 'id'
    },
    // option key
    labelKey () {
      return this.options.labelKey || ({
        notice: 'title',
        policy: 'title',
        themePlugin: 'pluginLabel'
      })[this.dataType] || 'name'
    },
    methodName () {
      return this.options.methodName || ({
        themePlugin: 'search',
        theme: 'search',
        themeType: 'search',
        notice: 'search',
        policy: 'search'
      })[this.dataType] || 'list'
    },
    infosMethodName () {
      return this.options.infosMethodName || ({
        themePlugin: 'list'
      })[this.dataType] || 'infos'
    },
    infosKey () {
      return this.options.infosKey || ({
        themePlugin: 'pluginId'
      })[this.dataType] || 'ids'
    },
    resDataKey () {
      return 'list'
    },
    remotePageSize () {
      return this.options.pageSize || 20
    },
    enumType () {
      return window.Z.global.base.getBaseData()
    }
  },
  async created () {
    this.selectValue = this.value
    this.$watch('selectValue', (newVal, oldVal) => {
      if (newVal !== oldVal) { this.$emit('input', newVal) }
    })
    this.$watch('value', (newVal, oldVal) => {
      if (newVal !== oldVal) { this.selectValue = newVal }
    })
    this.$watch('dataType', async (newVal, oldVal) => {
      await this.getList()
    })
    this.$watch('useDataList', (newVal, oldVal) => {
      this.dataList = this.useDataList
    })
    if (this.useDataList) {
      this.dataList = this.useDataList
    } else {
      await this.getList()
    }
  },
  methods: {
    async getList (keyword) {
      this.searching = true
      if (this.enumAble) {
        let dataList = await this.getEnumTypeList(this.dataType)
        dataList = dataList.filter(item => {
          return !keyword || item[this.labelKey].indexOf(keyword) > -1
        })
        this.dataList = dataList
      } else if (this.govNameList && keyword) {
        let dataList = await this.getLocalTypeList(this.dataType)
        dataList = dataList.filter(item => {
          return !keyword || item[this.labelKey].indexOf(keyword) > -1
        })
        this.dataList = dataList
      } else if (this.selectValue || keyword || this.autoSearch) {
        this.dataList = []
        if (this.methodKey) {
          // 获取请求的方法对象
          const methodObject = window.Z.global.utils.getKeyValue(window.Z.api[this.options.apiType || 'server'], this.methodKey)
          if (methodObject) {
            // 拼装请求参数
            let params = {
              pageSize: this.remotePageSize
            }
            params[this.nameKey] = keyword
            params = {
              ...params,
              ...this.options.params
            }
            let dataList
            let selectValue = this.selectValue
            if (Array.isArray(selectValue)) { selectValue = selectValue.join() }
            if (window.CONFIG.rootRegion && !params.region && !params.regions) {
              params.regions = this.getUseRootRegionIds(this.Z.global.region.getRootRegion())
            }
            if (selectValue && !keyword) {
              params[this.infosKey] = selectValue
              dataList = await methodObject[this.infosMethodName](params)
            } else {
              dataList = await methodObject[this.methodName](params)
            }
            dataList = dataList[this.resDataKey] || dataList
            // 对返回结果进行过滤
            if (this.options.dataFilter) {
              dataList = this.options.dataFilter(dataList)
            }
            this.dataList = dataList
          }
        }
      }
      this.searching = false
    },
    getEnumTypeList (type) {
      return this.Z.global.cache.getCache('enum/' + type)
    },
    getLocalTypeList (type) {
      switch (type) {
        case 'gov':
          // return window.Z.global.cache.getCache('ORGANIZATIONS')
          return window.Z.global.cache.getCache('ORGANIZATIONS').filter(org => org.region === this.regionId && !org.parentId && !org.parentCode)
        default:
          return []
      }
    },
    change () {
      let govName
      if (this.dataType === 'gov') {
        govName = this.dataList.filter(item => item.govCode === this.selectValue)[0].name
      }
      this.$emit('input', this.selectValue)
      this.$emit('change', this.selectValue, govName)
    },
    visibleChange () {
      this.$emit('visible-change')
    },
    removeTag () {
      this.$emit('remove-tag')
    },
    clear () {
      this.$emit('clear')
    },
    blurEvent () {
      this.$emit('blur')
    },
    focusEvent () {
      this.$emit('focus')
    },
    focus () {
      if (this.enable || this.localAble) {
        this.getList()
      }
      this.$refs.select.focus()
    },
    blur () {
      this.$refs.select.blur()
    },
    clearList () {
      this.dataList = []
    }
  }
}
</script>
