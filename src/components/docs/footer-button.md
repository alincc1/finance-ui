## footer-btn 底部按钮

### 基础用法

:::demo

```html
<template>
  <div>
    <rd-footer-btn :data="data" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          label: '搜索',
          callback: () => {console.log('搜索')}
        },
        {
          label: '重置',
          callback: () => {console.log('重置')}
        },
        {
          label: '上一步',
          callback: () => {console.log('上一步')}
        },
        {
          label: '下一步',
          callback: this.next
        }
      ]
    }
  },
  methods: {
    next() {
      console.log('下一步')
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
|  data   | 数据数组    |  Array   |     |  [ ]   |
