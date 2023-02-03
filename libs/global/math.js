/**
 * @file 整合数学计算，防止浮点数
 */
/**
 * 加法
 * @param {Number} a 参数
 * @param {Number} b 参数
 * @returns {number}
 * @private
 */
function _sum (a, b) {
  a += ''
  b += ''
  const length = Math.max((a.split('.')[1] || '').length, (b.split('.')[1] || '').length)
  if (length === 0) { return (a - 0) + (b - 0) }
  const num = Math.pow(10, length)
  return ((a * num + b * num) / num).toFixed(length) - 0
}

/**
 * 加法 防止浮点数 支持多个参数
 * @returns {number}
 */
export function sum () {
  let num = 0;
  [].slice.call(arguments).forEach(a => {
    num = _sum(num, a)
  })
  if (isNaN(num)) { return '' }
  return num
}

/**
 * 减法
 * @param {Number} a 参数
 * @param {Number} b 参数
 * @returns {number}
 * @private
 */
function _diff (a, b) {
  a += ''
  b += ''
  const length = Math.max((a.split('.')[1] || '').length, (b.split('.')[1] || '').length)
  if (length === 0) { return a - b }
  const num = Math.pow(10, length)
  return ((a * num - b * num) / num).toFixed(length) - 0
}

/**
 * 减法 防止浮点数 支持多个参数
 * @returns {Number}
 */
export function diff () {
  let num;
  [].slice.call(arguments).forEach(a => {
    if (num === undefined) {
      num = a
    } else {
      num = _diff(num, a)
    }
  })
  if (isNaN(num)) { return '' }
  return num
}

/**
 * 乘法
 * @param {Number} a 参数
 * @param {number} b 参数
 * @returns {number}
 * @private
 */
function _multi (a, b) {
  a += ''
  b += ''
  const lengthA = (a.split('.')[1] || '').length
  const lengthB = (b.split('.')[1] || '').length
  const numA = Math.pow(10, lengthA)
  const numB = Math.pow(10, lengthB)
  return (((a * numA) * (b * numB)) / (numA * numB)).toFixed(lengthA + lengthB) - 0
}

/**
 * 乘法 防止浮点数 支持多个参数
 * @returns {number}
 */
export function multi () {
  let num = 1;
  [].slice.call(arguments).forEach(a => {
    num = _multi(num, a)
  })
  if (isNaN(num)) { return '' }
  return num
}

/**
 * 自动补全小数，默认2位数
 * @param {Number} number 数字
 * @param {Number} digit 小数位数
 * @param {Number|String} defaultValue=null number为空时的默认返回值
 * @param {Object} more 更多配置
 * @returns {Number|String}
 */
export function fixedNumber (number, digit, defaultValue = null, more) {
  digit = digit || getMoneyLength()
  if (more && more.replaceZero && (number === 0 || number === '0')) { return more.replaceZero }
  if (!number && defaultValue) { return defaultValue }
  return Number(number).toFixed(digit) + ((more && more.suffix) || '')
}

/**
 * 根据数字生成多个连续的数字区间
 * @param {Number} number
 * @param {Boolean} piece=true 是否返回对象结构
 * @returns {Array}
 */
export function diffArray (number, piece = true) {
  const ceil = Math.ceil(number / 5)
  const len = (ceil + '').length
  let minStepNumber
  if (ceil < 10) {
    minStepNumber = 10
  } else {
    const minLen = Math.max(len - ((ceil + '')[0] >= 2 ? 1 : 2), 1)
    minStepNumber = Math.ceil(ceil / Math.pow(10, minLen)) * Math.pow(10, minLen)
  }
  const stepArr = [0, 1 * minStepNumber, 2 * minStepNumber, 3 * minStepNumber, 4 * minStepNumber, 5 * minStepNumber]
  if (piece) {
    const pieces = []
    stepArr.forEach((a, i) => {
      const data = {
        min: a,
        max: stepArr[i + 1]
      }
      if (isNaN(data.max)) { delete data.max }
      pieces.push(data)
    })
    return pieces
  }
  return stepArr
}

/**
 * 获取金额显示长度
 */
export function getMoneyLength () {
  const moneyConfig = window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.money', '', 'root')
  let moneyLength
  if (typeof moneyConfig === 'object') { moneyLength = moneyConfig.length } else { moneyLength = moneyConfig }
  return (moneyLength || 2) - 0
}
