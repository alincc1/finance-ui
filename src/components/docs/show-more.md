<!--
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-02-01 11:24:24
-->
### 展示更多

:::demo

```html
<template>
  <rd-show-more v-if="filterShowList.length > 0" :count="0" :value="filterShowList.length" :showMoreData="showMoreData" closeText="更多" @handle="showMoreData = !showMoreData"/>
</template>
<script>
export default {
  data () {
    return {
      filterShowList:[
        {
            item: '南海',
        },
        {
            item: '三水',
        }
      ],
      showMoreData:true
    }
  },
  methods: {
  }
  
}
</script>
```

:::

### Attributes

| 参数         | 说明                        | 类型    | 可选值 | 默认值   |
| ------------ | --------------------------- | ------- | ------ | -------- |
| value        | 接口返回的list的总条数      | Number  |        | 0        |
| showMoreData | 显示更多和收起的切换        | Boolean |        | false    |
| count        | 数据小于多少条显示，默认5条 | Number  |        | 5        |
| expendText   | 文字描述                    | String  |        | 收起     |
| closeText    | 文字描述                    | String  |        | 查看更多 |
| moreStyle    | 显示更多的样式              | String  |        |          |
| showIcon     | 判断是否显示图标            | Boolean |        | true     |

### Events

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| handle   | 点击事件触发的操作 |          |
