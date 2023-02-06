### 表格

:::demo

```html
<template>
  <rd-infoTable :data="data"/>
</template>
<script>
export default {
  data () {
    return {
      data:[
        {
          label:'内容1',
          value:1,
          // button:true
        },
        {
          label:'内容2',
          value:2,
          // button:true
        }
      ]
     
    }
  },
}
</script>

```

:::

### Attributes

| 参数     | 说明               | 类型   | 可选值 | 默认值 |
| -------- | ------------------ | ------ | ------ | ------ |
| data     | 要展示信息的数据   | Array  |        |        |
| sideData | 关于图片的基础信息 | Object |        |        |

