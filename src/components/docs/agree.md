## agree 允许贴息操作组件

允许贴息操作组件

### 基础用法

:::demo

```html
<template>
  <div>
    <el-button @click="()=>this.visible=true">打开弹窗</el-button>
    <rd-agree :visible="visible" @allow="handleAudit" @closeDialog="cancleDialog"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    handleAudit () {
      this.visible = false
    },
    cancleDialog () {
      this.visible = false
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

### Events

| 参数  | 说明  | 回调参数  |
|:----------|:----------|:----------|
| allow    | 点击确认按钮时触发    |     |
| closeDialog    | 点击取消按钮时触发   |     |
