<!--
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-02-01 11:24:24
-->
### 文本展开/收起

:::demo

```html
<template>
  <rd-fold text='一日看尽长安花' :max-length='5' />
</template>
```

:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| text             | 文本内容                           | string          |        |        |
| max-length       | 最大截取长度                       | number          |        | 文本长度|
