import Pagination from './pagination'

/* istanbul ignore next */
Pagination.install = function (Vue, options) {
  Vue.component(Pagination.name, Pagination)
}

export default Pagination
