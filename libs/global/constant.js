/**
 * @file 用于全局的一些变量
 */
/**
 * @namespace globalConstant
 * @property globalConstant 全局变量
 * @property globalConstant.base 基础配置
 * @property globalConstant.base.view 视图配置
 * @property globalConstant.base.view.dialog 弹窗配置
 * @property {String} globalConstant.base.view.dialog.SMALL 小弹窗
 * @property {String} globalConstant.base.view.dialog.MEDIUM 中弹窗
 * @property {String} globalConstant.base.view.dialog.BIG 大弹窗
 * @property globalConstant.base.view.form 表单配置
 * @property {String} globalConstant.base.view.form.SMALL 小表单
 * @property {String} globalConstant.base.view.form.MEDIUM 中表单
 * @property {String} globalConstant.base.view.form.BIG 大表单
 * @property globalConstant.base.view.table 表格配置
 * @property {Object} globalConstant.base.view.form.mainTitle 主标题
 * @property {Object} globalConstant.base.view.form.subTitle 副标题
 * @property globalConstant.base.data 数据配置
 * @property globalConstant.base.data.pagination 分页配置
 * @property {Array} globalConstant.base.data.pagination.pageSizes 分页页码数量
 */
export default {
  base: {
    view: {
      dialog: {
        SMALL: '500px',
        MEDIUM: '800px',
        BIG: '1080px'
      },
      form: {
        SMALL: '500px',
        MEDIUM: '800px',
        BIG: '1080px'
      },
      table: {
        mainTitle: {
          width: null,
          minWidth: 200
        },
        subTitle: {
          width: 200,
          minWidth: null
        }
      }
    },
    data: {
      pagination: {
        pageSizes: [10, 50, 100]
      }
    }
  },
  message: {
    limitTimeDay: '根据部门要求，对审核岗进行审核时间限时，如该字段显示为空，则表示无时间限制，忽略即可。（法定节假日不算在时限内）'
  }
}
