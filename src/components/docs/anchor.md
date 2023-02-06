## anchor 标签页

### 基础用法

:::demo

```html
<template>
  <div class="audit-content overflow-auto-y" ref="auditDialog">
    <div class="audit-body-content">
      <div class="record mt-12">
        <el-row :gutter="30">
          <el-col :span="4">
            <div class="left">
              <div class="left_menu">
                <div :style="{'width': '110px'}">
                  <rd-anchor
                    width="70%"
                    :getAnchor="(refs) => $refs[refs]"
                    :target="() => $refs.auditDialog"
                    :affix="affix"
                    :bottomOff="bottomOff"
                    :anchorList="defaultMenus"
                    :offsetTop="offsetTop"/>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="right_menu">
              <template v-for="item in defaultMenus">
                <div :is="item.id" :ref="item.id" :key="item.id" class="mb-32"></div>
              </template>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-duplicates */
// import info from '../components/common.vue'
// import purchaseList from '../components/common.vue'
// ...
export default {
  data () {
    return {
      affix: true,
      defaultMenus: [
        {title: '申报信息', id: 'el-button'},
        {title: '采购清单', id: 'el-input'},
        {title: '设备清单', id: 'el-rate'},
        {title: '附件信息', id: 'el-button'},
        {title: '企业信息', id: 'el-button'},
        {title: '信用信息', id: 'el-button'}
      ],
      bottomOff: 0,
      offsetTop: 60,
    }
  }
}
</script>
```

:::


### Attributes

| 参数  | 说明  | 类型  | 可选值  | 默认值  |
|:----------|:----------|:----------|:----------|:----------|
| title    | 文案说明    | String    |     | 该菜单名称    |
| data    | 有关按钮的数据    | Array    |     | [ ]    |
| label    | 按钮文字    |     |     |     |
| callback    | 点击该按钮时触发    | Function    |     |     |
| type    | 按钮的类型    |     | primary / success / warning / danger / info / text    |     |
| plain    | 是否朴素按钮    | Boolean    |     | false    |

