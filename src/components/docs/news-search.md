### 搜索

:::demo

```html
<template>
  <rd-new-search :paramList="paramList" @search="getList" :data="searchData" @reset="searchReset" label-width="110px" />
</template>
<script>
export default {
  data () {
    return {
      paramList: [
        { label: '区域', key: 'region', tagName: 'select', useDataList: window.Z.enumData.region},
        { label: '上报批次区间', keyOne: 'reportFinancialBatchStart', keyTwo: 'reportFinancialBatchEnd', tagName: 'twoInput'},
        { label: '选择时间区间', key: 'dateRange', tagName: 'select', formDate: 'timestamp', type: 'dateRange', dateType: 'daterange', placeholder: '请选择'},
        { label: '金融产品类型', key: 'projectType', tagName: 'select', useDataList: window.Z.enumData.financeType}
      ],
      searchData: {
        region: '',
        reportFinancialBatchStart: '',
        reportFinancialBatchEnd: '',
        dateRange: '',
        projectType: '',
        orgId: ''
      },
    }
  },
  methods: {}
  
}
</script>
```

:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| text             | 文本内容                           | string          |        |        |
| max-length       | 最大截取长度                       | number          |        | 文本长度|