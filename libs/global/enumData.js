// 记录部分枚举
export default {
  getValue (key, code, type = 'id', name = 'name') {
    const enumData = this[key] && this[key]()
    if (!enumData) { return '' }
    const item = enumData.find(a => a[type] === code)
    return item && item[name]
  },
  treeProps: {
    id: 'id',
    label: 'name',
    children: 'children',
    disabled: 'disabled'
  },
  newTreeProps: {
    id: 'key',
    label: 'value',
    children: 'children',
    disabled: 'disabled'
  },
  pluginTypes: [
    {
      value: 'DATA_CHECK',
      name: '数据检查',
      desc: '检查用户提交的数据是否符合规则，web和gov都可以用'
    },
    {
      value: 'DATA_LIST',
      name: '可用数据列表',
      desc: '检查可用数据列表，web和gov都可以用，主要用于展示',
      selectAble: false
    },
    {
      value: 'DATA_LIST_SELECTABLE',
      name: '可用数据填充列表',
      desc: '检查可用数据列表，可选择填充到表单中的表格，带交互'
    },
    {
      value: 'DATA_EXPORT',
      name: '导出数据',
      desc: '导出excel数据下载',
      selectAble: false
    },
    {
      value: 'DATA_INFO',
      name: '详情数据',
      desc: '显示详细数据，包含字段，字段可分组',
      selectAble: false
    },
    {
      value: 'DATA_REPEAT_ADD',
      name: '数据提取用于查重',
      desc: '提取数据用于检测、导出等'
    },
    {
      value: 'DATA_THEME_SHOW',
      name: '专题选择条件展示',
      desc: '显示专题的条件列表'
    },
    {
      value: 'DATA_THEME_SELECT',
      name: '专题选择',
      desc: '获取具体的专题id'
    },
    {
      value: 'DATA_FILL',
      name: '数据填充',
      desc: '数据填充'
    },
    {
      value: 'DATA_THEME_SELECT_SECOND',
      name: '专题方向检测',
      desc: '专题方向检测，符合要求到相应专题，不符合则拦截'
    },
    {
      value: 'AUTO_AUDIT',
      name: '流程节点自动审批',
      desc: '流程节点自动审批'
    },
    {
      value: 'EXECUTE_IMPORT',
      name: '前置审批导入名单',
      desc: '前置审批导入名单'
    },
    {
      value: 'PRE_CHECK_DATA',
      name: '前置审批数据校验',
      desc: '前置审批-审核对导入名单进行校验'
    },
    {
      value: 'DATA_SUMMARY',
      name: '前置审批数据汇总',
      desc: '前置审批-审核对导入名单进行校验'
    }
  ]
}
