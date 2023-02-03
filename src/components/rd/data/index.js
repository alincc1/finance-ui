/*
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-01-31 17:42:57
 */
import pagination from './pagination'
import btns from './btns'
import filters from './filters'
import futterbtn from './footer-button'
import tab from './tab'
import table from './table'
import header from './header'
import uploadFile from './_import'
import listImport from './listImport'
import check from './check'
import bread from './bread'
import checkLog from './checkLog'
import empty from './empty'
import boxHeader from './box-header'
import select from './select'
import file from './file'
import fileTip from './file-tip'
import downloadTip from './download-tip'
import opinion from './opinion'
import subMenu from './sub-menu'
import sideMenu from './menu'
import dataVerify from './data-verify'
import importResults from './import-results'
import infoTable from './info-table'
import listOperate from './listOperate'
import showMore from './show-more'
import PaginationNew from './pagination/pagination_new'
import PayMoneyPlan from './payMoneyPlan'
import Text from './text'
import Main from './main'
import NewSearch from './new-search'
import tabs from './tabs'
import tabItem from './tabs/item'
import affix from './affix'
import anchor from './anchor'
import anchorItem from './anchorItem'
import RdUpload from './upload'
import agree from './agree'
import backtop from './backtop'

export default {
  install (Vue, options) {
    Vue.component('RdPagination', pagination)
    Vue.component('RdGlobalUpload', RdUpload)
    Vue.component('RdBtns', btns)
    Vue.component('RdFilters', filters)
    Vue.component('RdTab', tab)
    Vue.component('RdTable', table)
    Vue.component('RdHeader', header)
    Vue.component('RdCheck', check)
    Vue.component('RdFooterBtn', futterbtn)
    Vue.component('RdUploadFile', uploadFile)
    Vue.component('RdListImport', listImport)
    Vue.component('RdBread', bread)
    Vue.component('RdCheckLog', checkLog)
    Vue.component('RdEmpty', empty)
    Vue.component('RdBoxHeader', boxHeader)
    Vue.component('RdSelect', select)
    Vue.component('RdUpload', file)
    Vue.component('RdDownloadTip', downloadTip)
    Vue.component('RdOpinion', opinion)
    Vue.component('RdSubMenu', subMenu)
    Vue.component('RdSideMenu', sideMenu)
    Vue.component('RdDataVerify', dataVerify)
    Vue.component('RdImportResults', importResults)
    Vue.component('RdInfoTable', infoTable)
    Vue.component('RdListOperate', listOperate)
    Vue.component('RdShowMore', showMore)
    Vue.component('PaginationNew', PaginationNew)
    Vue.component('RdPayMoneyPlan', PayMoneyPlan)
    Vue.component('RdDownloadTip', fileTip)
    Vue.component('RdFold', Text)
    Vue.component('RdMain', Main)
    Vue.component('RdNewSearch', NewSearch)
    Vue.component('RdTabs', tabs)
    Vue.component('RdTabItem', tabItem)
    Vue.component('RdAffix', affix)
    Vue.component('RdAnchor', anchor)
    Vue.component('RdAnchorItem', anchorItem)
    Vue.component('RdAgree', agree)
    Vue.component('RdBacktop', backtop)
  }
}
