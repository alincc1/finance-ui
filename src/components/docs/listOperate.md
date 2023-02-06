### 搜索输入

:::demo

```html
<template>
  <rd-listOperate>
        <template slot="button">
          <el-input  v-model="input" placeholder="请输入内容" style="width:700px"></el-input>
        </template>
  </rd-listOperate>
</template>
<script>
export default {
  data () {
    return {
        input:''
     
    }
  },
}
</script>

```

:::

### Attributes

| 方法名        | 说明                                                | 参数       |
| ------------- | --------------------------------------------------- | ---------- |
| showFilterBox | 点击事件，让showFilter的布尔值改变，动态给class命名 | showFilter |
