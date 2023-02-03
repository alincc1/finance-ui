<!--
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-02-01 11:24:24
-->
### 意见弹窗

:::demo

```html
<template>
  <el-button type="text" @click="showOpinion.visible = true">点击打开 意见弹窗</el-button>
  <rd-opinion :showOpinion="showOpinion" :isDetail="id ? true : false" :fileList="showOpinion.attachments" v-if="showOpinion.visible" @closeDialog="closeDialog" @confirm="handleConfirm" />
</template>
<script>
export default {
  data () {
    return {
      showOpinion: {
        visible: false,
        opinionText: '',
        dataId: '', // 列表数据id
        id: '' // 意见id
      }, // 填写意见
    }
  },
  methods: {
    handleConfirm(){
        this.showOpinion.visible = false
    },
    closeDialog(){
        this.showOpinion.visible = false
    }
  }
  
}
</script>
```

:::

### Attributes

| 参数            | 说明                                  | 类型    | 可选值 | 默认值 |
| --------------- | ------------------------------------- | ------- | ------ | ------ |
| title           | 控制弹窗标题                          | String  |        | 意见   |
| showOpinion     | 判断弹窗显示/隐藏，收集文本内容等信息 | Object  |        |        |
| showDate        |                                       | Boolean |        | false  |
| isDetail        | 区分二级表头文字（查看/填写）         | Boolean |        | false  |
| attachmentFiles |                                       | Array   |        |        |
| fileList        | 用于回显后端传递的数据                | Array   |        |        |
