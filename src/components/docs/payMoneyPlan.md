### 还款计划

:::demo

```html
<template>
  <rd-payMoneyPlan />
</template>
<script>
export default {
  data () {
    return {
       
     
    }
  },
}
</script>

```

:::

### Attributes

| 参数     | 说明                          | 类型    | 可选值 | 默认值   |
| -------- | ----------------------------- | ------- | ------ | -------- |
| planList | 记录还款的基本信息            | Array   |        |          |
| visible  | 判断弹窗显示/隐藏             | Boolean |        | false    |
| title    | 弹窗标题                      | String  |        | 还款计划 |
| width    | Dialog 的宽度                 | String  |        | 500px    |
| top      | Dialog CSS 中的 margin-top 值 | String  |        | 15vh     |
