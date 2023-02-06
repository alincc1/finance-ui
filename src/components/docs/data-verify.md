## data-verify 数据异常弹窗

### 基础用法

:::demo

```html
<template>
  <div>
    <el-button @click="showVerify.visible=true">打开弹窗</el-button>
    <rd-data-verify :visible="showVerify.visible" :data="showVerify.verifyData" @close="handleClose" headerBgImg="https://res.oss.zqlian.com/public/0001/0010/high-level.png" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showVerify: {
        visible: false,
        verifyData: [
          {
            dataType: '1234',
            showStatus: true,
            dataList: [
              {
                key: '1',
                value: '11111'
              },
              {
                key: '2',
                value: '22222'
              }
            ]
          },
          {
            dataType: '1234',
            showStatus: true,
            dataList: [
              {
                key: '1',
                value: '11111'
              },
              {
                key: '2',
                value: '22222'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.showVerify.visible = false
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| data    | 展示数据    | Array    |     | [ ]    |
| visible    | 打开关闭弹窗    | Boolean    |     | false   |
| headerBgImg    | 头部图片    | String    |     |    |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| close  | 关闭弹窗 |  |