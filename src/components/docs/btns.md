## btns 操作按钮

### 基础用法

:::demo

```html
<template>
  <rd-btns title="文案说明" :data="btns" />
</template>

<script>
export default {
  data () {
    return {
      btns: [
        {
          label: '导出',
          callback: this.export,
          type: 'primary',
          plain: false
        }
      ]
    }
  },
  methods: {
    export () {
      console.log('点击该按钮时触发')
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| title    | 文案说明    | String    |     | 该菜单名称    |
| data    | 有关按钮的数据    | Array    |     | [ ]    |
| label    | 按钮文字    |     |     |     |
| callback    | 点击该按钮时触发    | Function    |     |     |
| type    | 按钮的类型    |     | primary / success / warning / danger / info / text    |     |
| plain    | 是否朴素按钮    | Boolean    |     | false    |

