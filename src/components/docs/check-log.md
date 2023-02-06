## checkLog 审核日志

### 基础用法

:::demo

```html
<template>
  <div>
    <el-button @click="()=>this.showLog=true">打开弹窗</el-button>
    <rd-check-log :visible="showLog" :checkList="checkList" @hideDialog="showLog = false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLog: false,
      checkList: [
        {
          taskName: '小a',
          assigneeList: 'bbahkfjaskldjflkasd',
          dealOpinion: '同意',
          dealOperation: '操作'
        }
      ]
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| checkList    | 数据数组    | Array    |     | [ ]    |
| visible    | 关闭显示弹窗    | Boolean    |     | false    |
| title    | 弹窗标题    | String    |     | 审核日志    |
| width    | 弹窗宽度    | String    |     | 257px    |
| top    | 弹窗的 margin-top 值    | String    |     | 15vh    |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| hideDialog  | 点击按钮触发的事件 |  |
