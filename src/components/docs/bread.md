## bread 面包屑

### 基础用法

:::demo

```html
<template>
  <rd-bread :selfTitle="title" />
</template>
<script>
export default {
  data () {
    return {
      title: '首页'
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| selfTitle    | 文案说明    | String    |     | 该菜单名称    |
| isMore    | 是否带有底部padding    | Boolean    |     | false    |

