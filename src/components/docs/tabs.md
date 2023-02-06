## tabs 标签页

### 基础用法

:::demo

```html
<template>
  <rd-tabs slot="header"  v-model="tabValue" @tab-click="changeTab(tabValue)">
    <rd-tab-item v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.value"/>
  </rd-tabs>
</template>

<script>
export default {
  data () {
    return {
      tabValue: 'N',
      tabList: [
        {
          label: '待放款',
          value: 'N',
          check: true
        },
        {
          label: '放款确认',
          value: 'Y',
          check: false
        },
        {
          label: '已关闭',
          value: 'reject',
          check: false
        }
      ],
    }
  },
  methods: {
    // 切换tab栏
    changeTab (value) {
      console.log('切换tab栏目', value)
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| align    | 对齐方式    | String    |     | center    |
| textColor    | 未选中文本颜色    | String    |     |     |
| size    | 两侧margin大小    | String    | small、item    |  item(20px)   |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| input  | 点击文本触发的事件 |  |
| tab-click  | 点击文本触发的事件 |  |