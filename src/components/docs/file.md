## file 上传附件文件(待优化，缺少 window.Z.attachment.upload)

### 基础用法

:::demo

```html
<template>
  <div>
    <rd-upload system="other" uploadText="上传" :files.sync="fileUrls" :onlineFile="true"></rd-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileUrls: [
        {
          fileSize: 17025,
          id: "1072091145841442816",
          mimeType: "minioyun",
          name: "测试环境相关.xlsx",
          url: "https://test-fsfczj.foshan.gov.cn/mp/filecenter/v1/file/file/url?id=1072091145841442816",
        }
      ]
    }
  }
}
</script>
```

:::

