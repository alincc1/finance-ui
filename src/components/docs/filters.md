## filters 筛选条件

### 基础用法

:::demo

```html
<template>
  <div>
    <rd-filters :form="searchForm" :filterData="filterData" @confirm="changePage({page: 1})" @clear="changePage({page: 1})" :labelWidth="'120px'" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        updatedAt: '',
        recordName: '',
        region: ''
      },
      filterData: {
        updatedAt: {
          label: '提交日期',
          type: 'date',
          template: {
            placeholder: '请选择',
            clearable: true
          }
        },
        recordName: {
          label: '项目名称:',
          type: 'input',
          template: {
            placeholder: '请输入',
            clearable: true
          }
        },
        region: {
          label: '选择区划:',
          type: 'select',
          template: {
            placeholder: '请选择区划',
            options: [{label: '南海区', value: '440605'}, {label: '顺德区', value: '440606'}],
            clearable: true
          }
        }
      }
    }
  },
  methods: {
    // 切换页码、切换每页条数、搜索重置
    changePage (val) {
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
|  form   | 文件相关    |  Object   |     |  { }   |
|  filterData   | 筛选项    |  Object   |     |  { }   |
|  labelWidth   | 表格宽度    |  String   |     |     |
|  showSearchBtn   | 是否显示搜索重置按钮    |  Boolean   |     |  true   |
|  isDisabledDate   | 是否禁用时间    |  Boolean   |     |  false   |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| confirm  | 搜索 |  |
| clear  | 重置 |  |