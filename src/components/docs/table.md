### table表格

:::demo

```html
<template>
  <rd-table
            showIndex
            :tableData="projectData"
            :tableColumn="tableColumn"
          >
          </rd-table>
</template>
<script>
export default {
  data () {
    return {
      tableColumn: {
        discountMonth: {
          label: '贴息月份'
        },
        listName: {
          label: '清单名称'
        },
        discountAmount: {
          label: '贴息金额（万元）'
        },
        discountNumber: {
          label: '贴息笔数'
        },
        enterpriseNumber: {
          label: '涉及企业数'
        }
      },
      projectData:[
        {
            discountMonth:'12',
            listName:'清单名称1',
            discountAmount:12,
            discountNumber:4,
            enterpriseNumber:5
        },
        {
            discountMonth:'11',
            listName:'清单名称2',
            discountAmount:12,
            discountNumber:4,
            enterpriseNumber:5
        }
      ]
    }
  },
}
</script>

```

:::

### Attributes
| 参数                | 说明                                                         | 类型               | 可选值 | 默认值                                               |
| ------------------- | ------------------------------------------------------------ | ------------------ | ------ | ---------------------------------------------------- |
| tableData           | 表格数据                                                     | Array              |        |                                                      |
| tableColumn         | 匹配表格数据                                                 | Object             |        |                                                      |
| noBorder            | 是否无边框                                                   | Boolean            |        | true                                                 |
| showExpand          | 是否开启展开行功能                                           | Boolean            |        | false                                                |
| height              | Table 的高度                                                 | [Number, String]   |        | null                                                 |
| maxHeight           | Table 的最大高度                                             | [Number, String]   |        | null                                                 |
| highlightCurrentRow | 是否要高亮当前行                                             | Boolean            |        | false                                                |
| layout              | 分页组件布局                                                 | String             |        | total, sizes, prev, pager, next, jumper              |
| total               | 分页总数                                                     | Number             |        | 0                                                    |
| showIndex           | 序号是否显示                                                 | Boolean            |        | false                                                |
| indexLable          | 序号列名                                                     | String             |        | 序号                                                 |
| indexWidth          | 序号列宽                                                     | Number             |        | 80                                                   |
| showPage            | 显示分页                                                     | Boolean            |        | false                                                |
| lazy                | 是否懒加载子节点数据                                         | Boolean            |        | false                                                |
| rowKey              | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | String             |        | id                                                   |
| rowStyle            | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | [Object, Function] |        |                                                      |
| treeProps           | 渲染嵌套数据的配置选项                                       | Object             |        | { children: 'children', hasChildren: 'hasChildren' } |
| pageSize            | 每页条数                                                     | Number             |        | 10                                                   |
| currentPage         | 当前页数                                                     | Number             |        | 1                                                    |
| showSelection       | 是否显示多选                                                 | Boolean            |        | false                                                |
| selectable          | CheckBox 是否可以勾选                                        | Function           |        | true                                                 |
| showSummary         | 显示合计行                                                   | Boolean            |        | false                                                |
| pageData            | 存储分页数据                                                 | Object             |        |                                                      |
| pageSizes           |                                                              | Array              |        |                                                      |
| loading             | 是否loading                                                  | Boolean            |        | false                                                |
| showDrop            | 是否显示拖拽                                                 | Boolean            |        | false                                                |
| stripe              | 是否显示斑马纹                                               | Boolean            |        | false                                                |
| headerIsShow        | 表头是否显示                                                 | Boolean            |        |                                                      |
| spanMethod          | 合并方法                                                     | Function           |        | null                                                 |
| getSummary          | 合计                                                         | Function           |        | null                                                 |






### Events

| 事件名称        | 说明                                                         | 回调参数                  |
| --------------- | ------------------------------------------------------------ | ------------------------- |
| changePage      | 改变页数后                                                   |                           |
| changeSelection | 触发多选框后                                                 |                           |
| changeCurrent   | 当表格的当前行发生变化的时候会触发该事件                     | currentRow, oldCurrentRow |
| rowClick        | 当某一行被点击时会触发该事件                                 | row, column, event        |
| load            | 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 |                           |
| clickAvatar     | 传递当前行的数据                                             |                           |
