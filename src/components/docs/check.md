## check 审核弹窗

### 基础用法

:::demo

```html
<template>
  <div>
    <el-button @click="()=>this.showAudit=true">打开弹窗</el-button>
    <rd-check :visible="showAudit" @agree="handleAudit"  @closeDialog="cancleDialog"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showAudit: false
    }
  },
  methods: {
    handleAudit () {
      this.showAudit = false
    },
    cancleDialog () {
      this.showAudit = false
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| noNormal    | 判断是下拉框还是输入框    | Boolean    |     | false    |
| visible    | 打开关闭弹窗    | Boolean    |     | false    |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| agree  | 点击按钮触发的事件 |  |
| closeDialog  | 点击按钮触发的事件 |  |