## download-tip 下载或读取附件文件（待优化）

### 基础用法

:::demo

```html
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="附件名称" align="center" width="200px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <rd-download-tip  :attach="scope.row.file" :showName="true"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        width="200px"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="upload(scope.row)">上传</el-button>
          <el-button v-if="scope.row.file.id" type="primary" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          file: {
            url: '',
            name: '',
            id: ''
          }
        },
        {
          file: {
            url: '',
            name: '',
            id: ''
          }
        },
        {
          file: {
            url: '',
            name: '',
            id: ''
          }
        }
      ]
    }
  },
  methods: {
    // 附件上传
    upload (row) {
      this.Z.global.subscribe.trigger('do-file-upload', (res) => {
        console.log(res)
        row.file = {
          ...res
        }
        const fileList = this.tableData.map(item => {
          return {
            ...item,
            fileId: item.file.id
          }
        })
        this.tableData = fileList
      })
    },
    // 删除文件
    del (row) {
      row.file = {}
      row.fileId = ''
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
|     |     |     |     |     |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| del  | 点击按钮触发的事件 |  |
