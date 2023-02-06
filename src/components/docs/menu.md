### 菜单

:::demo

```html
<template>
  <rd-sideMenu :menus="menus"/>
</template>
<script>
export default {
  data () {
    return {
      menus:[
        {
          name:'形式审查'
        },
        {
          name:'业务确认'
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
| menuData |                    | Array  |        |        |
| imgUrl   |                    | String |        |        |
| menus    | 需要展示的菜单列表 | Array  |        |        |
