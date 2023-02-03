const validator = {
  require: {
    method: function (val) {
      return val !== '' && val != null
    },
    message: function (key) {
      return '该字段不能为空'
    }
  },
  required: {
    method: function (val) {
      return val !== '' && val != null
    },
    message: function (key) {
      return '该字段不能为空'
    }
  },
  number: {
    method: function (val, param) {
      return /^-?\d+(\.\d+)?$/.test(val)
    },
    message: function (key, param) {
      return '该字段必须是数字'
    }
  },
  max: {
    method: function (val, param) {
      return val - 0 <= param
    },
    message: function (key, param) {
      return '该字段不能大于' + param
    }
  },
  maxNumber: {
    method: function (val, param) {
      return val - 0 <= param
    },
    message: function (key, param) {
      return '该项数字不能大于' + param
    }
  },
  minNumber: {
    method: function (val, param) {
      return val - 0 >= param
    },
    message: function (key, param) {
      return '该项数字不能小于' + param
    }
  },
  min: {
    method: function (val, param) {
      return val - 0 >= param
    },
    message: function (key, param) {
      return '该字段不能小于' + param
    }
  },
  isEmail: {
    method: function (val, param) {
      return /^[^@]+@[^@.]+(\.[^@.]+)+$/.test(val)
    },
    message: function (key, param) {
      return '该字段需要是正确的邮箱格式'
    }
  },
  isMobile: {
    method: function (val, param) {
      return /^1\d{10}$/.test(val)
    },
    message: function (key, param) {
      return '该字段需要是正确的手机号码'
    }
  },
  isInt: {
    method: function (val, param) {
      return /^-?\d+$/.test(val)
    },
    message: function (key, param) {
      return '该字段需要是整数'
    }
  },
  credit: {
    method: function (val, param) {
      return /^[0-9A-Z]{18}$/.test(val)
    },
    message: function (key, param) {
      return '长度为18位的组织身份识别代码'
    }
  },
  postal: {
    method: function (val, param) {
      return /^[1-9][0-9]{5}$/.test(val)
    },
    message: function (key, param) {
      return '邮政编码格式不正确'
    }
  },
  industryCode: {
    method: function (val, param) {
      return /^[A-Z]\d{4}$/.test(val)
    },
    message: function (key, param) {
      return '行业代码格式不正确'
    }
  }
}

/*
* 遍历规则数组进行验证
*
* */
function validate (type, key, val, param) {
  if (type in validator) {
    if (!validator[type].method(val, param)) {
      return validator[type].message(key, param, val)
    }
  }
}
/*
* 获取校验规则
*
* */
function getValidate (type, val, param) {
  if (type in validator) {
    return validator[type].method(val, param)
  }
}

/*
 * 用于验证参数有效性
 * 针对require
 * */
function validateOne (rule, val, key) {
  let message = validate('require', key, val)
  if (rule.require) {
    if (message) {
      return rule.requiredMessage || rule.message || message
    }
  }
  if (!message) {
    message = ''
    for (const type in rule) {
      if (type === 'require' || !rule[type]) { continue }
      message = validate(type, key, val, rule[type])
      if (message) {
        message = rule[type + 'Message'] || rule.message || message
        break
      }
    }
    return message
  }
}

/*
 * 用于验证参数有效性
 * 针对required
 * */
function validateRequired (rule, val, key) {
  let message = validate('required', key, val)
  if (rule.required) {
    if (message) {
      return rule.requiredMessage || rule.message || message
    }
  }
  if (!message) {
    for (const type in rule) {
      if (type === 'required') { continue }
      message = validate(type, key, val, rule[type])
      if (message) {
        message = rule[type + 'Message'] || rule.message || message
        break
      }
    }
    return message
  }
}

function validatorMethod (rules, params) {
  let message
  for (const key in rules) {
    message = validateOne(rules[key], params[key], key)
    if (message) { break }
  }
  return {valid: !message, message: message}
}

function ruleAdd (key, data) {
  validator[key] = data
}

/*
 *
 * 针对pdf 表单的校验
 * */
function pdfValidate (data) {
  if (!data || (typeof data !== 'object')) { return true }
  let valid = true
  let message
  if (data.merged === 1) { return true }
  if (Array.isArray(data)) {
    data.forEach(a => {
      const newValid = pdfValidate(a)
      valid = valid && newValid
    })
    return valid
  } else {
    data.valid = true
    for (const item in data) {
      if (data[item] && (typeof data[item] === 'object')) {
        const newValid = pdfValidate(data[item])
        valid = valid && newValid
      }
    }
    if (!valid) { return valid }
    message = validateOne(data, data.value)
    data.valid = !message
    data.validMessage = message
    return !message
  }
}

function elementValidate (rule, val, call) {
  const msg = validateRequired(rule, val)
  if (msg) {
    call(new Error(msg))
  } else {
    call()
  }
}

let passwordSystem
let passwordPlaceholder

function validPassword (val, isAdminAccount) {
  if (!val) {
    return '密码不能为空'
  }
  if (passwordSystem.minLen > val.length) {
    return '密码长度最少' + passwordSystem.minLen + '位'
  }
  if (passwordSystem.character === 'Y') {
    if (!/[a-zA-Z]/.test(val)) {
      return '密码必须包含字母'
    }
  }
  if (isAdminAccount) {
    if (!/[a-z]/.test(val) || !/[A-Z]/.test(val)) {
      return '密码必须包含大小写字母'
    }
  }
  if (passwordSystem.digit === 'Y') {
    if (!/\d/.test(val)) {
      return '密码必须包含数字'
    }
  }
  if (passwordSystem.special === 'Y' || isAdminAccount) {
    const reg = /[`~!@#$%^&*()_+\-=[\]\\{}|;':",./<>?]/
    if (!reg.test(val)) {
      return '密码必须包含特殊字符'
    }
  }
  const reg = /^[a-zA-Z0-9`~!@#$%^&*()_+\-=[\]\\{}|;':",./<>?]+$/
  if (!reg.test(val)) {
    return '密码不能输入非法字符'
  }
  return true
}

function getPasswordPlaceholder () {
  return passwordPlaceholder
}

function creditRule (rule, value, callback) {
  const reg = /(^[0-9A-Z]{15}$)|(^[0-9A-Z]{18}$)/
  if (!value) {
    callback(new Error('统一社会信用代码不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('长度为18位的统一社会信用代码'))
  } else {
    callback()
  }
}

function init () {
  return window.Z.global.subscribe.ready('global-config-init-data', initData => {
    passwordSystem = {
      minLen: 8,
      digit: 'Y',
      character: 'Y'
    }
    let placeholder = `密码不能少于${passwordSystem.minLen}位，且包含`
    if (passwordSystem.digit === 'Y') {
      placeholder += '数字和'
    }
    if (passwordSystem.special === 'Y') {
      placeholder += '特殊字符和'
    }
    if (passwordSystem.character === 'Y') {
      placeholder += '字母和'
    }
    passwordPlaceholder = placeholder.slice(0, -1)
  })
}

const method = {
  validateOne,
  validateRequired,
  validatorMethod,
  ruleAdd,
  pdfValidate,
  elementValidate,
  validPassword,
  init,
  getPasswordPlaceholder,
  creditRule,
  getValidate
}
export default method
