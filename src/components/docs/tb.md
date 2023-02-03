<!--
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-02-01 11:24:24
-->
### 标签切换

:::demo

```html
<template>
  <rd-tab :tabData="tabList" @changeTab="changeTab" />
</template>
<script>
export default {
  data () {
    return {
      tabList: [
        {
          label: '备案信息',
          value: 'record'
        },
        {
          label: '企业信息',
          value: 'org'
        }
      ],
    }
  },
  
}
</script>
```

:::

### Attributes

| 参数      | 说明                    | 类型    | 可选值 | 默认值 |
| --------- | ----------------------- | ------- | ------ | ------ |
| tabData   | 标签名称                | Array   |        |        |
| propIndex |                         | Number  |        | -1     |
| activeRed | 给下划线动态赋值class名 | Boolean |        | false  |

