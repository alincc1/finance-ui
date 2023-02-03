<template>
  <div id="filters">
    <el-form class="rd-view-filter width-100" ref="searchForm" :label-width="labelWidth || '95px'" @keyup.enter.native="confirm" @submit.native.prevent>
      <div class="form-row">
        <el-form-item :label="item.label" :class=" item.template.notShow ? '' : 'form-col'" v-for="(item, index) in setting" :key="index" :label-width="item.template.labelWidth || '95px'" :style="hedgingMargin?'marginLeft:543px!important': ''">
          <template v-if="item.slot">
            <slot :name="item.prop"></slot>
          </template>
          <el-input v-if="item.type === 'input'" v-model="form[item.prop]" size="small" class="inline-input" :placeholder="item.template.placeholder || '请输入' " :clearable="item.template.clearable" />
          <div class="inline-select" v-if="item.type === 'select'">
            <el-select
              v-if="item.type === 'select'"
              v-model="form[item.prop]"
              size="small"
              class="inline-select"
              :clearable="item.template.clearable"
              :filterable="item.template.filterable"
              :placeholder="item.template.placeholder || '请选择'"
              :remote="item.template.remote"
              :remote-method="item.template.remoteMethod"
              @clear="(val) => item.template.callback && item.template.callback('clear', val)"
              @change="(val) => item.template.callback && item.template.callback('change', val)"
            >
              <el-option
                v-for="option in item.template.options"
                :key="option[item.template.valueKey || 'value']"
                :label="option[item.template.labelKey || 'label']"
                :value="option[item.template.valueKey || 'value']">
              </el-option>
            </el-select>
          </div>
          <div
            v-if="item.type === 'datetimerange' || item.type === 'daterange'"
            class="inline-date"
          >
            <el-date-picker
              v-model="form[item.prop]"
              size="small"
              class="inline-date"
              :type="item.type"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="item.template.clearable"
              :default-time="['00:00:00', '23:59:59']"
              :picker-options="item.template.options || {}"
              :value-format="item.format || defaultFormat(item.type)">
            </el-date-picker>
          </div>
          <div v-if="item.type === 'date'">
            <el-date-picker
              size="small"
              v-model="form[item.prop]"
              :type="item.type"
              :value-format="item.format || defaultFormat(item.type)"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div v-if="item.type === 'year'">
            <el-date-picker
              size="small"
              v-model="form[item.prop]"
              :type="item.type"
              :value-format="item.format || defaultFormat(item.type)"
              placeholder="选择年份">
            </el-date-picker>
          </div>
          <div v-if="item.type === 'month'" class="inline-month">
            <el-date-picker
              size="small"
              class="inline-month"
              v-model="form[item.prop]"
              :type="item.type"
              :value-format="item.format || defaultFormat(item.type)"
              placeholder="选择月"
              :picker-options="isDisabledDate ? endDatePicker : ''">
            </el-date-picker>
          </div>
        </el-form-item>
        <div :class="isActive ? 'isFlex' : 'notFlex'" class="inline-item-btn">
          <template v-if="showSearchBtn">
            <el-button @click="confirm" class="btn-class">搜索</el-button>
            <el-button v-if="isResetBtn" @click="clearForm">重置</el-button>
          </template>
          <slot name="button" />
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Filters',
  title: '表格筛选',
  desc: '支持搜索的字段',
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    filterData: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String
    },
    showSearchBtn: {
      type: Boolean,
      default: true
    },
    isDisabledDate: {
      type: Boolean,
      default: false
    },
    hedgingMargin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultFormat () {
      return (type) => {
        switch (type) {
          case 'daterange':
            return 'yyyy-MM-dd'
          case 'datetimerange':
            return 'yyyy-MM-dd HH:mm:ss'
          case 'date':
            return 'yyyy-MM-dd'
        }
      }
    },
    // 传过来的filterData对象转为数组[{prop: '', label: '', type: ''}]
    setting () {
      return Object.entries(this.filterData)
        .map(item => Object.assign({ prop: item[0] }, item[1]))
    },
    // 是否显示重置
    isResetBtn () {
      const flag = this.$route.path.indexOf('/portal') >= 0
      return !flag
    }
  },
  data () {
    return {
      isActive: true,
      originForm: {},
      endDatePicker: this.handelFixDate()
    }
  },
  created () {
    this.originForm = JSON.parse(JSON.stringify(this.form))
    // 判断搜索按钮是否添加flex:1
    const filterDataNum = Object.getOwnPropertyNames(this.filterData)
    filterDataNum[filterDataNum.length - 1] === '__ob__'
      ? (filterDataNum.length - 1) % 3 === 2 ? this.isActive = false : this.isActive = true
      : filterDataNum.length % 3 === 2 ? this.isActive = false : this.isActive = true
  },
  methods: {
    // 搜索
    confirm () {
      this.$emit('confirm', this.form)
    },
    // 重置
    clearForm () {
      Object.keys(this.originForm).forEach(key => {
        this.form[key] = this.originForm[key]
      })
      this.$emit('clear')
    },
    handelFixDate () {
      return {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  }
}
</script>
