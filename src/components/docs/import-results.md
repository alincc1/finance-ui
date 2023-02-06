## import-results 导入结果异常

### 基础用法

:::demo

```html
<template>
  <div>
    <el-button @click="confirmUpload">打开弹窗</el-button>
    <!-- 导入结果异常 -->
    <rd-import-results :visible="importVisible" @closeDialog="closeImport" :textareal="errorList" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      importVisible: false, // 导入结果是否显示
      errorList: ['字段名错误', '数据不符'] // 导入错误列表
    }
  },
  methods: {
    // 确认上传导入
    async confirmUpload () {
      this.importVisible = true
    },
    // 关闭导入结果组件
    closeImport () {
      this.importVisible = false
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| visible    | 打开关闭弹窗    | Boolean    |     | false    |
| textareal    | 失败原因    | Array    |     |  [ ]   |
| resultInfo    | 更多信息详情    | Object    |     |  {}   |
| showNumber    | 是否展示更多信息    | Boolean    |     | 确 认    |
| btnName    | 右下角按钮文字    | String    |     |  [ ]   |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| closeDialog  | 关闭弹窗 |  |
