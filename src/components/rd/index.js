import rdData from './data'
import rdPage from './data/pagination/index'
export default {
  install (Vue, options) {
    Vue.use(rdData, options)
    Vue.use(rdPage, options)
  }
}
