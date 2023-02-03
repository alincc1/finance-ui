let config
const defaultConfig = {
  themeTypeName: '专项名称',
  themeName: '专题名称',
  allotMoneyName: '分配金额',
  allotName: '资金分配',
  themeSortName: '专题',
  govTitle: '主管部门',
  themeTSortName: '专项',
  reportName: '项目',
  funcName: '支持领域',
  budgetName: '政策清单',
  setupName: '立项'
}
export function initData () {
  config = {
    ...defaultConfig,
    ...window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.variable', {}, 'root')
  }
}

export function getVariable (id, more = '') {
  if (!config) initData()
  return (config[id] || '') + more
}
