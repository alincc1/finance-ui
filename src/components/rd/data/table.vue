<template>
  <div i="data-table">
    <el-table
      v-loading="loading"
      ref="table"
      :stripe="stripe"
      :data="deTableData"
      :height="height"
      :max-height="maxHeight"
      :border="!noBorder"
      :lazy="lazy"
      :row-key="rowKey"
      :row-style="rowStyle"
      :tree-props="treeProps"
      :load="handleLoad"
      :show-summary="showSummary"
      :show-header="headerIsShow"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-click="handleRowClick"
      :span-method="spanMethod"
      :summary-method="getSummary"
    >
      <template slot="empty">
        <rd-empty class="emptyOne"/>
        <rd-empty class="emptyTwo"/>
      </template>
      <el-table-column v-if="showExpand" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :row="scope.row" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showSelection"
        type="selection"
        :width="60"
        fixed="left"
        :selectable="selectable">
      </el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLable"
        :width="indexWidth">
      </el-table-column>
      <template v-for="(item, index) in column">
        <!-- :width="item.width || column.length < 8 ? (item.label.length > 5 ? (item.label.length > 10 ? '260' : '') : '') : (item.label.length > 5 ? (item.label.length > 10 ? '260' : '160') : '')" -->
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth || 110"
          :width="item.width"
          :sortable="item.isSort"
          :sort-method="(a,b)=>soreMethods(a,b,item)"
          :show-overflow-tooltip="item.showTip === false ? false : true"
          :fixed="item.fixed"
          :align="item.align || 'left'"
          v-if="column.length && column[index].label !== '操作' && ((typeof column[index].show === 'function' && column[index].show()) || column[index].show === undefined || column[index].show === true)">
          <template slot-scope="scope">
            <!-- 插槽 -->
            <template v-if="item.slot">
              <slot :name="scope.column.property" :row="scope.row" :index="scope.$index"></slot>
            </template>
            <!-- 自定义内容 -->
            <div v-else-if="item.customValue">
              {{item.customValue(scope.row)}}
            </div>
            <!-- 图片 or 头像 -->
            <div v-else-if="item.template && (item.template.type === 'pic' || item.template.type === 'avatar')" :class="[item.template.type === 'avatar' ? 'avatarImg' : 'coverImg', item.class]"
                 :style="{width: item.template.width, height: item.template.width,cursor: item.template.cursor || 'normal'}">
              <el-image :src="scope.row[item.prop]" :fit="item.template.fit" :preview-src-list="item.template.preview && [scope.row[item.prop]]" @click="$emit('clickAvatar',scope.row)">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <p style="text-align:center" v-if="item.template.nickName" @click="$emit('clickAvatar',scope.row)">{{item.template.nickName(scope.row)}}</p>
              <!-- <img :src="scope.row[item.prop]" :style="`object-fit: ${item.template.fit}`" /> -->
            </div>
            <template v-else-if="item.template && item.template.type === 'icon'">
              <Svgicon :icon="scope.row[item.prop]" />
            </template>
            <!-- tag标签 -->
            <div v-else-if="item.template && item.template.type === 'tag'">
              <el-tag :type="item.template.tagType[scope.row[item.prop]]">{{item.map ? item.map[scope.row[item.prop]] : scope.row[item.prop]}}</el-tag>
            </div>
            <div v-else-if="item.template && item.template.type === 'date'">
              <span>{{ window.Z.global.date.timestampFormat(scope.row[item.prop], 'YYYY-MM-DD')}}</span>
            </div>
            <div v-else-if="item.template && item.template.type === 'number'">
              <!-- <span>{{showNumber(scope.row[item.prop])}}</span> -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="(scope.row[item.prop] || 0).toString()+'万元'" placement="bottom">
                <span>{{showNumber(scope.row[item.prop] || 0)}}</span>
              </el-tooltip>
            </div>
            <!-- 状态 -->
            <div v-else-if="item.template && item.template.type === 'status'">
              <span
                class="table-status"
                :class="scope.row[item.prop] === item.flag ? 'success' : 'fail'">
                {{scope.row[item.prop] === item.flag ? item.template.successTxt : item.template.failTxt}}
              </span>
            </div>
            <!-- 开关 -->
            <div v-else-if="item.template && item.template.type === 'switch'">
              <el-switch
                v-model="scope.row[item.prop]"
                :active-value="item.template.actValue"
                :inactive-value="item.template.inactValue"
                :active-color="item.template.actColor"
                @change="item.template.callback && item.template.callback(scope.row, scope.$index)">
              </el-switch>
            </div>
            <!-- 数字输入框 -->
            <div v-else-if="item.template && item.template.type === 'inputNumber'" class="column-flex">
              <span v-if="item.template.prefix" class="prefix">{{item.template.prefix}}</span>
              <el-input-number
                :style="{width: (item.template.width || 100) + 'px'}"
                v-model="scope.row[item.prop]"
                controls-position="right"
                size="mini"
                :controls="item.template.controls || false"
                :precision="item.template.precision || 0"
                @change="item.template.callback && item.template.callback(scope.row, scope.$index)"
                :min="item.template.min || 0"
                :max="item.template.max || Infinity">
              </el-input-number>
              <span v-if="item.template.append" class="ml-5">{{item.template.append}}</span>
            </div>
            <!-- 输入框 -->
            <div v-else-if="item.template && item.template.type === 'input'">
              <el-input
                v-model="scope.row[item.prop]"
                :placeholder="item.template.placeholder"
                size="small"
                :disabled="item.disabled ? !showPower(item.disabled) : false"
                @change="item.template.callback && item.template.callback(scope.row, scope.$index)" />
            </div>
            <!-- 星级 -->
            <div v-else-if="item.template && item.template.type === 'rate'" class="rate-box">
              <el-rate
                v-if="scope.row[item.prop] > 5"
                :value="5"
                disabled>
              </el-rate>
              <el-rate
                v-else
                v-model="scope.row[item.prop]"
                disabled>
              </el-rate>
              <span class="plus" v-if="scope.row[item.prop] > 5">+</span>
            </div>
            <!-- 下拉菜单 -->
            <div v-else-if="item.template && item.template.type === 'select'">
              <el-select
                v-model="scope.row[item.prop]"
                size="small"
                class="inline-select"
                :clearable="item.template.clearable"
                :filterable="item.template.filterable"
                :placeholder="item.template.placeholder"
                :disabled="item.disabled ? !showPower(item.disabled) : false"
                @change="(val) => item.template.callback && item.template.callback(scope.row, scope.$index, 'change', val)"
              >
                <el-option
                  v-for="option in item.template.options"
                  :key="option[item.template.valueKey || 'value']"
                  :label="option[item.template.labelKey || 'label']"
                  :value="option[item.template.valueKey || 'value']">
                </el-option>
              </el-select>
            </div>
            <!-- 时间段 -->
            <div v-else-if="item.template && item.template.type === 'time'" class="time-select">
              <el-time-select
                v-model="scope.row[item.prop][0]"
                :picker-options="{
                  start: item.template.start || '00:00',
                  end: item.template.end || '23:59',
                  step: item.template.step || '00:15'
                }"
                size="small"
                placeholder="开始时间">
              </el-time-select>
              <span class="separator">-</span>
              <el-time-select
                v-model="scope.row[item.prop][1]"
                :picker-options="{
                  start: item.template.start || '00:00',
                  end: item.template.end || '24:00',
                  step: item.template.step || '00:15'
                }"
                size="small"
                placeholder="结束时间">
              </el-time-select>
            </div>
            <!-- 常规 -->
            <template v-else>
              {{item.map ? item.map[scope.row[item.prop]] : isBlank(scope.row[item.prop]) ? '--' : scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-if="showPower(column[column.length - 1] && column[column.length - 1].template)">
        <el-table-column
          v-if="column.length && column[column.length - 1].label === '操作' && column[column.length - 1].show !== false"
          :label="column[column.length - 1].label"
          :width="column[column.length - 1].width || 110"
          :fixed="column[column.length - 1].fixed || 'right'">
          <template slot-scope="scope">
            <div class="operation">
              <template v-for="(item, index) in column[column.length - 1].template">
                <div
                  v-if="(typeof item.show === 'function' && item.show(scope.row)) || item.show === undefined || item.show === true"
                  :key="index"
                >
                  <!-- 跳转路由 -->
                  <router-link
                    v-if="item.tag === 'router-link'"
                    :to="Object.keys(item.query || {}).reduce((a, b) => { a.query[b] = scope.row[b] || item.query[b]; return a }, { path: typeof item.path === 'function' ? item.path(scope.row,  scope.$index) : item.path, query: {}})"
                    tag="a">
                    {{item.map ? item.map[scope.row[item.prop]] : (item.customValue ? item.customValue(scope.row) : item.text)}}
                  </router-link>
                  <!-- 普通按钮 -->
                  <template v-if="!item.confirm">
                    <a
                      v-if="item.tag === 'a'"
                      href="javascript:;"
                      @click.stop="item.callback && item.callback(scope.row, scope.$index)">
                      {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                    </a>
                    <el-button
                      v-else-if="item.tag === 'disabled'"
                      size="medium"
                      disabled
                      type="text">
                      {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                    </el-button>
                    <el-button
                      v-else-if="item.tag === 'button'"
                      size="medium"
                      :type="(item.type ? item.type : (scope.row[item.prop] === item.flag) ? item.actType : item.inactType) || ''"
                      @click.stop="item.callback && item.callback(scope.row, scope.$index)">
                      {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                    </el-button>
                    <a
                      v-else-if="item.tag === 'copy'"
                      href="javascript:;"
                      v-clipboard="item.copyText ? item.copyText + scope.row[item.prop] : ''"
                      @success="() => {
                        typeof item.handleSuccess === 'function' && item.handleSuccess()
                      }"
                      @error="() => {
                        typeof item.handleError === 'function' && item.handleError()
                      }"
                    >
                      {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                    </a>
                    <!-- 按钮更多展示 -->
                    <el-dropdown v-if="item.tag === 'dropdown'">
                      <span class="el-dropdown-link">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <template v-for="(ele, index) in item.dropDownList">
                          <el-dropdown-item :key="index"  @click.stop="ele.callback && ele.callback(scope.row)" v-if="(typeof ele.show === 'function' && ele.show(scope.row)) || ele.show === undefined || ele.show === true">{{ele.label}}</el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                  <!-- 带二次确认的按钮 -->
                  <el-popconfirm
                    v-if="item.confirm"
                    :title="item.confirmTxt || '确定执行该操作吗？'"
                    @onConfirm="item.confirm(scope.row, scope.$index)"
                  >
                    <a
                      v-if="item.tag === 'a'"
                      href="javascript:;"
                      slot="reference">
                      {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                    </a>
                    <el-button
                      v-else-if="item.tag === 'button'"
                      size="small"
                      :type="(item.type ? item.type : (scope.row[item.prop] === item.flag) ? item.actType : item.inactType) || ''"
                      slot="reference">
                      {{item.map ? item.map[scope.row[item.prop]] : item.text ? item.text : (scope.row[item.prop] === item.flag) ? item.actText : item.inactText}}
                    </el-button>
                  </el-popconfirm>
                </div>
              </template>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot></slot>
    <div class="pagination-box" v-if="showPage">
      <el-pagination
        background
        class="table-footer-container"
        :layout="layout || 'prev, pager, next, jumper'"
        :current-page.sync="pageData.page"
        :total="pageData.total"
        :page-size.sync="pageData.pageSize"
        :page-sizes="[10, 20, 30, 500, 1000]"
        @current-change="changePage"
        :pager-count="5"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import util from '@/util/util'
import Sortable from 'sortablejs'

export default {
  name: 'RdTable',
  title: '列表table',
  desc: '列表组件',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Object,
      default: () => ({})
    },
    // 是否无边框
    noBorder: {
      type: Boolean,
      default: true
    },
    // 是否开启展开行功能
    showExpand: {
      type: Boolean,
      default: false
    },
    // Table 的高度
    height: {
      type: [Number, String],
      default: null
    },
    // Table 的最大高度
    maxHeight: {
      type: [Number, String],
      default: null
    },
    // 是否要高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    // 分页组件布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 分页总数
    total: {
      type: Number,
      default: 0
    },
    // 序号是否显示
    showIndex: {
      type: Boolean,
      default: false
    },
    // 序号列名
    indexLable: {
      type: String,
      default: '序号'
    },
    // 序号列宽
    indexWidth: {
      type: Number,
      default: 80
    },
    // 显示分页
    showPage: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowStyle: {
      type: [Object, Function],
      default: () => ({})
    },
    treeProps: {
      type: Object,
      default: () => ({ children: 'children', hasChildren: 'hasChildren' })
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 是否显示多选
    showSelection: {
      type: Boolean,
      default: false
    },
    // CheckBox 是否可以勾选
    selectable: {
      type: Function,
      default: () => true
    },
    // 显示合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    pageData: {
      type: Object,
      default: () => {}
    },
    pageSizes: {
      type: Array,
      default: () => []
    },
    // 是否loading
    loading: {
      type: Boolean,
      default: false
    },
    // 是否显示拖拽
    showDrop: {
      type: Boolean,
      default: false
    },
    // 是否显示斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 表头是否显示
    headerIsShow: {
      type: Boolean,
      default: true
    },
    // 合并方法
    spanMethod: {
      type: Function,
      default: null
    },
    // 合计
    getSummary: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      page: this.currentPage,
      deTableData: []
    }
  },
  computed: {
    // 工具类
    // util () {
    //   return util
    // },
    column () {
      return Object.entries(this.tableColumn)
        .map(item => Object.assign({ prop: item[0] }, typeof item[1] === 'string' ? {label: item[1]} : item[1]))
        .sort((a, b) => b.prop === 'operation' ? -1 : 0)
    }
  },
  watch: {
    currentPage (newVal) {
      this.page = this.currentPage
    },
    tableData () {
      this.deTableData = this.getTableData()
    }
  },
  created () {
    this.deTableData = this.getTableData()
  },
  mounted () {
    this.showDrop && this.rowDrop()
  },
  methods: {
    rowDrop () {
      console.log('进入拖拽------')
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody)
    },
    // 改变页数后
    changePage (page) {
      this.page = page
      this.$emit('changePage', { page })
    },
    // 每页多少条
    handleSizeChange (pageSize) {
      this.$emit('changePage', { page: 1, pageSize })
    },
    // 触发多选框后
    handleSelectionChange (val) {
      this.$emit('changeSelection', val)
      if (this.tableData.length === val.length) {
        console.log('组件--------', val)
      }
    },
    handleCurrentChange (val) {
      this.$emit('changeCurrent', val)
    },
    handleRowClick (row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    handleLoad (tree, treeNode, resolve) {
      this.$emit('load', tree, treeNode, resolve)
    },
    replaceProp (obj, str, prehook) {
      if (prehook) {
        return prehook(obj[str.match(/[a-zA-Z0-9_]+(?=\})/)[0]], str.match(/[a-zA-Z0-9_]+(?=\})/)[0], obj)
      }
      return obj[str.match(/[a-zA-Z0-9_]+(?=\})/)[0]]
    },
    showPower (value = 0) {
      const permissions = JSON.parse(localStorage.getItem('permissions') || '{}')
      if (typeof value === 'number') {
        if (value === 0) return false
        return permissions[value] ? permissions[value].showMenu : false
      } else {
        const allPass = Array.isArray(value) ? value.map(item => item.permission || 0).some(item => value > 0 ? permissions[item].showMenu : true) : false
        return allPass
      }
    },
    isBlank (value) {
      return value === null || value === undefined || value === 'null' || value === 'undefined' || value === ''
    },
    // 保留两位小数
    showNumber (item) {
      item = item + ''
      let str
      if (item.indexOf('.') > -1) {
        str = item.substring(0, item.indexOf('.') + 3)
      } else {
        str = item
      }
      // const str = item.substring(0, item.indexOf('.') + 3)
      return str
    },
    // 解决字符串类型排序的错乱
    soreMethods (a, b, item) {
      let pre = a[item.prop]
      let next = b[item.prop]
      if (typeof pre === 'string') {
        pre = parseFloat(pre.replace('%'))
        next = parseFloat(next.replace('%'))
      }
      if (pre === next) {
        return a
      }

      return pre - next
    },
    getTableData () {
      const datas = this.tableData
      if (!datas || datas.length <= 0) {
        return []
      }
      datas.forEach(item => {
        if (item.region) {
          if (isNaN(item.region)) {
            return
          }
          const regionObj = window.Z.enumData.regionList.find(sub => sub.value === item.region)
          item.region = regionObj ? regionObj.label : '-'
        }
      })
      return datas
    }
  }
}
</script>
<style lang="scss">
    [i="data-table"] {
        // overflow: hidden;
        .el-table__header {
            thead {
                tr {
                    th {
                        line-height: 1.3;
                    }
                }
            }
        }
        .el-input {
            input {
                width: 100% !important;
            }
        }
        .time-select {
            display: flex;
            .separator {
                margin: 0 20px;
                font-size: 30px;
                line-height: 25px;
                color: #ccc;
            }
        }
        .avatarImg {
            width: 50px;
            // height: 75px;
        }
        .coverImg .el-image {
            width: 100%;
            height: 100%;
        }
        .coverImg {
            width: 160px;
            height: 98px;
        }
        .table-status {
            position: relative;
            left: .6rem;
            &.success::before {
                content: '';
                width: 6px;
                height: 6px;
                position: absolute;
                left: -13px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
                background: #a3df85;
            }
            &.fail::before {
                content: '';
                width: 6px;
                height: 6px;
                position: absolute;
                left: -13px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
                background: red;
            }
        }
        .column-flex {
            display: flex;
            align-items: center;
            .prefix {
                margin-right: 4px;
            }
        }
        .operation {
            display: flex;
            flex-wrap: wrap;
            > div {
                position: relative;
                display: flex;
                align-items: center;
                padding: 0 10px;
                line-height: 1;
                box-sizing: border-box;
                color: $theme-color;
                font-weight: 500;
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    &::after {
                        display: none;
                    }
                }
            }
        }
        // 分页样式
        .table-footer-container {
          display: flex;
          text-align: right;
          padding: 20px 0px 0px 0px;
          align-items: center;
          box-sizing: border-box;
          .btn-prev,
          .btn-next {
            margin: 0 !important;
            color: rgba(0, 0, 0, 0.65) !important;
            background-color: white !important;
            border: none;

            &:disabled {
              cursor: not-allowed;
              color: #d9d9d9 !important;
            }
          }
          .el-pager {
            padding: 0 18px;
            box-sizing: border-box;
            height: 30px;
            display: flex;
            li {
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 3px !important;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              background-color: #FFFFFF !important;
              &.active+li {
                border-left: 1px solid #d9d9d9 !important;
                &:hover{
                border: 1px solid $theme-color !important;
              }
              }
            }
          }

          .el-pagination__jump {
            font-size: 14px !important;
            font-family: MicrosoftYaHei;
            color: #262626;
            height: 30px;
            .el-pagination__editor {
              width: 44px;
              background: #FFFFFF;
              border-radius: 2px;
              border-color: #D9D9D9;
              margin: 0 8px;

              input {
                height: 30px;
                background: #FFFFFF;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
              }
            }
          }
        }
    }
    // 修改无数据时的样式
    .el-table{
      position: relative;
      .el-table__empty-text{
        line-height: 0;
      }
      .el-table__body-wrapper{
        position:static;
      }
      .emptyOne{
        visibility: hidden;
        height: 250px;
      }
      .emptyTwo{
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -55%);
      }
      // 修改有固定列时，滚动条不可拉动问题
      .el-table__fixed { // 右固定列
        height: auto !important;
        bottom: 10px;
      }
      .el-table__fixed-left { // 左固定列
        height: auto !important;
        bottom: 10px; // 改为自动高度后，设置与父容器的底部距离，高度会动态改变，值可以设置比滚动条的高度稍微大一些
      }
      .el-table__fixed-right{ // 右固定列
        height: auto !important;
        bottom: 10px;
      }
      .el-table__fixed::before,
      .el-table__fixed-right::before{
        background-color: transparent;
      }
    }
    // 更多下拉选择
    .el-table  .el-dropdown-link {
      font-size: 14px;
      cursor: pointer;
      color: $theme-color;
    }
    .el-table  .el-icon-arrow-down {
      font-size: 14px;
    }
    //修改表头height
    .el-table th{
      padding: 0;
      height:56px;
    }

</style>
