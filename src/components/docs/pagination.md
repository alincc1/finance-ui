<!--
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-02-01 11:24:24
-->
### 分页

:::demo

```html
<template>
  <rd-pagination :page-data="pagination" @change="getList" />
</template>
<script>
export default {
  data () {
    return {
      pagination: {
        // page: 1, total: 2, pageSize: 5
       
      },
    }
  },
  methods: {
  }
  
}
</script>
```

:::

### Attributes

| 参数     | 说明                                     | 类型   | 可选值                                                       | 默认值                                    |
| -------- | ---------------------------------------- | ------ | ------------------------------------------------------------ | ----------------------------------------- |
| pageData | 分页的基础信息（总条目数，每页条目数等） | Object |                                                              |                                           |
| layout   | 组件布局，子组件名用逗号分隔             | String | sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot | 'total, sizes, prev, pager, next, jumper' |

### Events

| 事件名称   | 说明                         | 回调参数       |
| ---------- | ---------------------------- | -------------- |
| changePage | 分页信息发生改变时传递的事件 | page，pageSize |
