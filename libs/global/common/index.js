import * as utils from './utils'
export default {
  install (G) {
    G.utils = utils
  },
  init (G = {}) {
    utils.init()
  }
}
