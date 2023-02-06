## file-tip 读取文件

### 基础用法

:::demo

```html
<template>
  <div>
    <rd-download-tip  :attach="file" :showName="true"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: {
        fileSize: 17025,
        id: "1071035796711571456",
        mimeType: "minioyun",
        name: "测试环境相关.xlsx",
        url: "https://test-fsfczj.foshan.gov.cn/mp/filecenter/v1/file/file/url?id=1071035796711571456",
      }
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
|  attach   | 文件相关    |  Object   |     |  null   |

