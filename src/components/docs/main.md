<!--
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-02-01 11:24:24
-->
### 页面结构

:::demo

```html
<template>
  <rd-main>
    <div slot="header">我是头部</div>
    <div slot="search">
      <div>我是搜索项</div>
    </div>
    <div slot="other">
      <div>我是内容区域</div>
    </div>
  </rd-main>
</template>
```

:::

### Attributes

| 参数   | 说明                                      | 类型   | 可选值 | 默认值 |
| ------ | ----------------------------------------- | ------ | ------ | ------ |
| header | 用于class命名                             | string |        | big    |
| type   | 不同组件传递类型不同，style样式展示也不同 | String |        |        |
| border | 不同组件border样式不一样                  | String |        |        |

