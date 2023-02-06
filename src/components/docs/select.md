
### select选择器

:::demo

```html
<template>
  <rd-select :options="options" @change="change" :useDataList="yearList" v-model="year" :filterable="false" />
</template>
<script>
export default {
  data () {
    return {
      year:'',
      yearList: [
        {
          name: '全部年度',
          value: ''
        },
      ],
      options: {
        labelKey: 'name',
        valueKey: 'id'
      },
    }
  },
}
</script>
```

:::

### Attributes

| 参数               | 说明                                                         | 类型                             | 可选值 | 默认值                              |
| ------------------ | ------------------------------------------------------------ | -------------------------------- | ------ | ----------------------------------- |
| value              | 绑定值                                                       | [Number, String, Boolean, Array] |        |                                     |
| autoSearch         |                                                              | Boolean                          |        |                                     |
| dataType           | 数据类型                                                     | String                           |        |                                     |
| options            |                                                              | Object                           |        | {labelKey: 'value',valueKey: 'key'} |
| multiple           | 是否多选                                                     | Boolean                          |        | false                               |
| disabled           | 是否禁用                                                     | Boolean                          |        | false                               |
| clearable          | 是否可以清空选项                                             | Boolean                          |        | false                               |
| collapseTags       | 多选时是否将选中值按文字的形式展示                           | Boolean                          |        | false                               |
| filterable         | 是否可搜索                                                   | Boolean                          |        | true                                |
| allowCreate        | 是否允许用户创建新条目，需配合 `filterable` 使用             | Boolean                          |        | false                               |
| loading            | 是否正在从远程获取数据                                       | Boolean                          |        | false                               |
| reserveKeyword     | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词     | Boolean                          |        | false                               |
| defaultFirstOption | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | Boolean                          |        | false                               |
| popperAppendToBody | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | Boolean                          |        | true                                |
| automaticDropdown  | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | Boolean                          |        | false                               |
| size               | 输入框尺寸                                                   | String                           |        |                                     |
| name               | select input 的 name 属性                                    | String                           |        |                                     |
| placeholder        | 占位符                                                       | String                           |        |                                     |
| autocomplete       | select input 的 autocomplete 属性                            | String                           |        | off                                 |
| loadingText        | 远程加载时显示的文字                                         | String                           |        | 加载中                              |
| noMatchText        | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置     | String                           |        | 无匹配数据                          |
| noDataText         | 选项为空时显示的文字，也可以使用`slot="empty"`设置           | String                           |        | 无数据                              |
| popperClass        | Select 下拉框的类名                                          | String                           |        |                                     |
| multipleLimit      | 多选时用户最多可以选择的项目数，为 0 则不限制                | Number                           |        | 0                                   |
| filterMethod       | 自定义搜索方法                                               | Function                         |        |                                     |
| useDataList        | 下拉数据展示                                                 | Array                            |        |                                     |

### Events

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| input          | 输入框中输入的值                         |                               |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除tag时触发                  | 移除的tag值                   |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 |                               |
| blur           | 当 input 失去焦点时触发                  |                               |
| focus          | 当 input 获得焦点时触发                  |                               |


