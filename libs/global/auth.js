/**
 * 用户权限
 * @author 吴云
 * @module global/auth
 */
/**
 * 引入cookies
 * @const Cookies
 */
const Cookies = require('cookies-js')
/**
 * 记录用户登录信息
 */
let loginUser
/**
 * 记录用户登录token
 */
let authToken
/**
 * 记录用户qixicode
 */
let qixicode
/**
 * 记录用户的顶级部门-用于政府用户
 */
let rootGov
/**
 * 用户拥有的权限菜单列表
 */
let AuthMenuList
/**
 * 系统全部的菜单列表
 */
let AllMenuList

/**
 * 设置登录用户
 * @param user 用户信息
 */
export function setLoginUser (user) {
  loginUser = user
  Cookies.set((window.Z.constant.systemFlag || '') + 'loginUser', JSON.stringify(user), {expires: Infinity})
  // 设置cookie后 触发userInfo的改变 某些地方使用cookie user
  if (user) {
    if (window.Z.global.subscribe) {
      window.Z.global.subscribe.trigger('user-info', user)
      window.Z.global.subscribe.ready('user-info', user)
    }
  }
}

/**
 * 用户信息更新后，重新设置用户信息。
 * @param {Object} organization 用户机构信息，没有则重新获取
 * @param {Boolean} onlyOrg 只更新机构信息
 */
export async function resetLoginUser (organization, onlyOrg) {
  const loginUser = getLoginUser()
  if (organization) {
    organization = {
      ...organization,
      detail: '',
      businessInfo: '',
      businessScope: '',
      introduction: '',
      remark: ''
    }
  }
  if (onlyOrg) { // 只更新机构信息
    // 机构信息移除大字段 减少cookie长度
    loginUser.organization = organization
    setLoginUser(loginUser)
    return
  }
  const user = await window.Z.api[window.Z.constant.platformApi || 'server'].uc.user.info({id: loginUser.id})
  user.organization = organization || loginUser.organization
  setLoginUser(user)
}

/**
 * 获取登录用户
 * @returns {*}
 */
export function getLoginUser () {
  if (loginUser) { return loginUser }
  return JSON.parse(Cookies.get((window.Z.constant.systemFlag || '') + 'loginUser') || null)
}

/**
 * 清除登录用户
 */
export function removeLoginUser () {
  loginUser = null
  authToken = null
  Cookies.expire((window.Z.constant.systemFlag || '') + 'loginUser')
  Cookies.expire((window.Z.constant.systemFlag || '') + 'token')
  window.Z.global.subscribe.ready('user-info', null)
  window.Z.global.subscribe.trigger('login-out')
}

/**
 * 退出登录
 * @param {Boolean} logout 是否需要服务器退出登录
 * @returns {Promise<void>}
 */
export async function loginOut (logout) {
  const token = getToken()
  if (token && logout) {
    if (window.Z.constant.isMatrix) {
      await window.Z.api.matrix.uc.ucenter.logout()
    } else if (window.Z.constant.isMonitor) {
      await window.Z.api.monitor.upms.ucenter.logout()
    } else {
      let doDel = true
      if (window.Z.constant.isWww || window.Z.constant.isGov || window.Z.constant.isWeb) {
        if (token.indexOf('www') !== 0) { doDel = false }
      }
      if (doDel) await window.Z.api.server.uc.ucenter.logout()
    }
  }
  removeLoginUser()
}

/**
 * 跳转到登录页面
 */
export function goToLogin () {
  if (!window.CONFIG.BASE_WWW_URL || (window.Z.constant.isAdmin || window.Z.constant.disableFct)) {
    window.Z.constant.router && window.Z.constant.router.push('/login')
  } else {
    window.location.href = `${window.CONFIG.BASE_WWW_URL}/login`
  }
}

/**
 * 跳转到首页
 */
export function goToHome () {
  window.location.href = `${window.CONFIG.BASE_WWW_URL}`
}

/**
 * 根据环境跳转
 */
export function getLoginPath () {
  let url = location.origin
  let pathName = "/user/#/user/login"
  if (window.CONFIG.isDemo) {
    // 内部测试环境
    url = "http://dev-2.zqlian.com"
    pathName = "/demo-user/#/user/login"
  } else if (window.CONFIG.isDev3) {
    // 演示环境
    url = "https://dev3.zqlian.com"
    pathName = "/demo-user/#/user/login"
  } else if (window.CONFIG.isDev) {
    url = "http://dev-1.zqlian.com"
  }
  return url + pathName
}

/**
 * 设置用户登录token
 * @param {String} token
 * @returns {CookiesStatic}
 */
export function setToken (token) {
  authToken = token
  return Cookies.set((window.Z.constant.systemFlag || '') + 'token', token, {expires: Infinity}) // localStorage.setItem('token', token)
}

/**
 * 获取token
 * @returns {String}
 */
export function getToken () {
  if (!authToken) { authToken = Cookies.get((window.Z.constant.systemFlag || '') + 'token') }
  return authToken
}

/**
 * 设置授权码
 * @param {String} code
 * @returns {CookiesStatic}
 */
export function setQixicode (code) {
  qixicode = code
  return Cookies.set((window.Z.constant.systemFlag || '') + 'qixicode', code, {expires: Infinity})
}

/**
 * 获取qixicode
 * @returns {String}
 */
export function getQixicode () {
  if (!qixicode) { qixicode = Cookies.get((window.Z.constant.systemFlag || '') + 'qixicode') }
  return qixicode
}

/**
 * 获取当前登录用户的注册区划
 * @returns {String|null}
 */
export function getLoginRegion () {
  const user = getLoginUser()
  if (!user) { return null }
  if (user.organization) { return user.organization.region }
  return user.region
}

/**
 * 个人信息是否完善
 * @returns {Boolean}
 */
export function personIsComplete () {
  const user = getLoginUser()
  if (!user) { return false }
  return !!(user.personId && user.region)
}

/**
 * 检查是否登录 未登录进行跳转
 * @returns {boolean}
 */
export async function checkLogin () {
  if (!getLoginUser()) {
    goToHome()
    return Promise.reject('登录超时')
  }
}

/**
 * 是否为自然人
 * @returns {boolean}
 */
export function isPerson () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return loginUser.type === 5
}

/**
 * 是否为第三方
 * @returns {boolean}
 */
export function isThirdUser () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return loginUser.type === 6
}

/**
 * 是否为gov用户
 * @returns {boolean}
 */
export function isGov () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return (
    loginUser.type === 1 ||
    loginUser.type === 2 ||
    loginUser.type === 3 ||
    loginUser.type === 6 // 第三方机构
  )
}

/**
 * 是否为web用户
 * @returns {boolean|*}
 */
export function isWeb () {
  return isPerson() || isCompany()
}

/**
 * 是否为数字贷企业用户
 * @returns {boolean|*}
 */
export function isSzdCompany () {
  const loginUser = getLoginUser()
  return loginUser.userType === 2
}

/**
 * 是否为政府用户
 * @returns {boolean}
 */
export function isFinancial () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return loginUser.type === 1 ||
    loginUser.type === 2
}

/**
 * 是否为企业单位用户
 * @returns {boolean}
 */
export function isCompany () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return loginUser.type === 4
}

/**
 * 是否为后台管理用户
 * @returns {boolean}
 */
export function isAdmin () {
  const loginUser = getLoginUser()
  if (!loginUser) { return false }
  return loginUser.type === 7 || loginUser.type === 9
}

/**
 * 仅为企业管理员
 * @returns {boolean}
 */
export function isOnlyCompanyAdmin () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return isCompany() && loginUser.role === 1 && loginUser.adminOnly === 'Y'
}

/**
 * 是申报员
 * @returns {boolean}
 */
export function isNotCompanyAdmin () {
  return isCompany() && !isCompanyAdmin()
}

/**
 * 是否含有企业管理员角色
 * @returns {boolean}
 */
export function isCompanyAdmin () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return isCompany() && loginUser.role === 1
}

/**
 * 是否为专家
 * @param {Object} user 可以指定一个用户
 * @returns {boolean}
 */
export function isSpecialist (user) {
  if (!user) user = getLoginUser()
  if (!user) return false
  return user.type === 3
}

/**
 * 是否为监管系统用户
 * @returns {boolean}
 */
export function isMonitor () {
  const loginUser = getLoginUser()
  if (!loginUser) return false
  return window.Z.constant.isMonitor
}

/**
 * 设置用户菜单列表
 * @param {Array} dataList 用户权限菜单列表
 */
export function setMenuList (dataList) {
  AuthMenuList = dataList
}

/**
 * 设置系统所有的菜单列表
 * @param {Array} dataList 系统所有的菜单列表
 */
export function setAllMenuList (dataList) {
  AllMenuList = dataList
}

/**
 * 获取用户的菜单列表
 * @param {String} type 过滤类型
 * @returns {Array}
 */
export function getAuthMenuTree (type) {
  if (!AuthMenuList) { return [] }
  const list = JSON.parse(JSON.stringify(AuthMenuList))
  if (type) { return list.find(menu => (menu.routePath || menu.path).indexOf(type) > -1).children }
  return list
}

/**
 * 获取菜单树
 * @param {String} type 过滤类型
 * @returns {Array} 树结构的数组
 */
export function getAllMenuTree (type) {
  if (!AllMenuList) { return [] }
  const list = JSON.parse(JSON.stringify(AllMenuList))
  if (type) { return list.find(menu => (menu.routePath || menu.path).indexOf(type) > -1).children }
  return list
}

/**
 * 获取用户的子菜单列表-没有子级的菜单
 * @param {Array} menuList 可选参数-指定菜单列表
 * @returns {Array}
 */
export function getMenuChildList (menuList) {
  if (!menuList) {
    menuList = JSON.parse(JSON.stringify(AuthMenuList))
  }
  let rt = []
  menuList.forEach(menu => {
    if (!menu.children || !menu.children.length) {
      rt.push(menu)
    } else {
      rt = rt.concat(getMenuChildList(menu.children, 1))
    }
  })
  return rt
}

/**
 * 判断用户是否拥有菜单权限
 * @param {String} path 需要判断的链接
 * @param {Boolean} equal=true 是否需要全等
 * @returns {boolean}
 */
export function hasAuthMenu (path, equal = true) {
  return !!getMenuChildList().find(menu => equal ? menu.path === path : path.indexOf(menu.path) === 0)
}

/**
 * 获取所有的子菜单列表-没有子级的菜单
 * @param {Array} menuList 可选参数-指定菜单列表
 * @returns {Array}
 */
export function getAllMenuChildList (menuList) {
  if (!menuList) {
    menuList = JSON.parse(JSON.stringify(AllMenuList))
  }
  let rt = []
  menuList.forEach(menu => {
    if (!menu.children || !menu.children.length) {
      rt.push(menu)
    } else {
      rt = rt.concat(getAllMenuChildList(menu.children))
    }
  })
  return rt
}

/**
 * @desc  通过菜单url路径找到菜单名称
 * @param {String}  path  菜单路径
 * @return {String}  菜单名称
 */
export function getMenuNameByPath (path) {
  const item = getAllMenuChildList().find(data => data.path === path)
  return item && item.name
}
/**
 * @desc  获取登录用户的顶级部门
 * @return {Promise<String>}  顶级部门
 */
export function getRootGov () {
  if (rootGov) return rootGov
  return window.Z.api.server.uc.user.rootGov().then(res => {
    return (rootGov = res)
  })
}

/**
 * 根据token  设置用户登录信息
 * @param {String} token 新的token
 * @param {Object} loginUser 有效的登录用户，无需重新获取
 * @returns {Promise<Object>}
 */
export async function setLoginUserByToken (token, loginUser) {
  if (token) {
    setToken(token)
    if (!loginUser) {
      loginUser = await window.Z.api.server.uc.user.info()
    }
    if (loginUser.organizationId) {
      loginUser.organization = await window.Z.api.server.uc.organization.info({id: loginUser.organizationId})
    }
    window.Z.global.auth.setLoginUser(loginUser)
    return loginUser
  }
}

/**
 * @desc  获取唯一代码 个人返回身份证
 */
export function getCreditCode () {
  const userInfo = getLoginUser()
  if (!userInfo) { return '' }
  if (userInfo.organization) { return userInfo.organization.creditCode }
  return userInfo.personId
}
/**
 * @desc  获取机构名称 个人返回姓名
 */
export function getOrgName () {
  const userInfo = getLoginUser()
  if (!userInfo) { return '' }
  if (userInfo.organization) { return userInfo.organization.name }
  return userInfo.name
}
/**
 * @desc  判断是否需要等级认证
 */
export function needAuth (authConfig) {
  const userInfo = getLoginUser()
  authConfig = authConfig || window.Z.constant.vue.getFuchiConfigValue('regionConfig.public.ucenter.auth', 'root', {})
  if (!userInfo || authConfig.show !== 'Y') return false
  const isPerson = window.Z.global.auth.isPerson()
  const isCompany = window.Z.global.auth.isCompany()
  let levelQqual
  if (isPerson) levelQqual = authConfig.personLevel
  if (isCompany) levelQqual = authConfig.companyLevel
  if (!levelQqual) return
  return (isPerson || isCompany) && userInfo.level < levelQqual
}
/**
 * @desc  将权限菜单设置到cookie里面
 */
export function setCookieMenu (menuList) {
  localStorage.setItem((window.Z.constant.systemFlag || '') + 'menu', JSON.stringify(menuList))
}
/**
 * 获取登录用户
 * @returns {*}
 */
export function getCookieMenu () {
  const list = localStorage.getItem((window.Z.constant.systemFlag || '') + 'menu')
  const menuList = list ? JSON.parse(list) : []
  AllMenuList = menuList
  console.log('缓存中的menulIS', menuList)
  return menuList
}
