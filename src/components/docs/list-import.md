### 名单导入

:::demo

```html
<template>
  <el-button type="text" @click="importDialogShow.visible = true">点击打开 名单导入模板</el-button>
  <rd-list-import :dialogShow="importDialogShow" @confirmUpload="confirmUpload" @downTemplate="downTemplate" />
</template>
<script>
export default {
  data () {
    return {
      importDialogShow: {
        visible: false,
        show: false,
        handleKey: ''
      },
    }
  },
}
</script>

```

:::

### Attributes

| 参数       | 说明                                            | 类型    | 可选值 | 默认值 |
| ---------- | ----------------------------------------------- | ------- | ------ | ------ |
| dialogShow | 接收传递过来的数据（弹窗显示/隐藏，要展示数据） | Object  |        |        |
| action     | 文件上传的地址                                  | String  |        |        |
| showFile   |                                                 | Boolean |        | true   |
| limit      | 文件最大允许上传个数                            | Number  |        |        |
| accept     | 接受上传的[文件类型]                            | String  |        | .xlsx  |
| showTip    | 区分弹窗要显示的内容                            | Boolean |        | true   |


### Events

| 事件名称      | 说明               | 回调参数      |
| ------------- | ------------------ | ------------- |
| downTemplate  | 调取下载模板的接口 |               |
| confirmUpload | 将文件传过去       | files，onLine |