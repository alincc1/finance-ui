function unbind (el) {
  delete el.oldAutoData
  clearTimeout(el.__timer)
  el.removeEventListener('click', el.__onClick)
}

function timer (el, time) {
  el.isTiming = true
  el.disabled = true
  el.style.cursor = 'not-allowed'
  el.classList.add('is-disabled')
  if (isNaN(time)) { time = 60 }

  function _timer () {
    if (time > 0) {
      val(el, time + '秒后获取')
      time--
      el.__timer = setTimeout(_timer, 1000)
    } else {
      val(el, el.autoTitle)
      el.disabled = false
      el.style.cursor = 'pointer'
      el.classList.remove('is-disabled')
      el.isTiming = false
    }
  }
  _timer()
}

function val (el, text) {
  if (text === undefined) {
    return (el.textContent || el.value || '').trim()
  } else {
    el.textContent = text
    el.value = text
  }
}

// 发送短信验证码
function initSms (el, building, context) {
  el.oldAutoData = building.value
  el.oldModifiers = building.modifiers
  el.autoTitle = building.title || el.autoTitle || val(el) || '获取验证码'
  // 请求中 或者倒计时中时 不重新改变标题
  if (!(el.isSending || el.isTiming)) { val(el, el.autoTitle) }
  if (!el.__isOnClick) {
    el.__isOnClick = true
    el.__onClick = () => {
      if (el.isSending || el.isTiming) { return }
      const data = el.oldAutoData
      const modifiers = el.oldModifiers
      let params = {}
      // 真实发送短信提示
      const smsSendNotice = window.Z.service.robot.common.enumConfig.getValue('regionConfig.public.system.config', 'root', {}).smsSendNotice === 'Y'
      if (smsSendNotice) {
        const smsNameKey = 'server.notsms'
        window.Z.api.server.sys.fuchiConfig.search({
          key: smsNameKey
        }).then(res => {
          const data = res.list.find(item => item.key === smsNameKey)
          if (data) {
            const value = data.value
            if (value === 'N') {
              return window.Z.global.message.confirm('当前会真实发送短信，是否继续？').then(() => {
                doSend()
              })
            }
          }
          doSend()
        })
      } else {
        doSend()
      }
      function doSend () {
        console.log('data-----', data)
        const verifyCodeKey = data.verifyCodeKey || 'verifyCode'
        const mobileKey = data.mobileKey || 'mobile'
        const emailKey = data.emailKey || 'email'
        data.form[verifyCodeKey] = ''
        console.log('data', data)
        // this.$set(data,.form, verifyCodeKey, '')
        if (modifiers.notValid) {
          params.account = data.form[mobileKey] || data.form[emailKey]
        } else {
          let msg
          if (data.isEmail) {
            msg = window.Z.service.utils.validate.validateRequired({
              required: true,
              isEmail: true,
              message: '请输入有效的邮箱'
            }, data.form[emailKey])
            params.account = params.email = data.form[emailKey]
            params.type = 'email'
          } else {
            msg = window.Z.service.utils.validate.validateRequired({
              required: true,
              isMobile: true,
              message: '请输入有效的手机号'
            }, data.form[mobileKey])
            params.account = params.mobile = data.form[mobileKey]
            params.type = 'mobile'
          }
          if (msg) {
            return window.Z.global.message.error(msg)
          }
        }
        el.isSending = true
        // let platformApi = window.Z.constant.isMatrix ? 'matrix' : (window.Z.constant.isMonitor ? 'monitor' : 'server')
        const smsApi = data.smsApi || window.Z.api[window.Z.constant.platformApi || 'server'][window.Z.constant.platformApi === 'monitor' ? 'upms' : 'uc'].ucenter
        if (data.smsApi) {
          params.accountName = data.form.bankUserName
          params.accountNo = data.form.bankAccount
          params.id = data.form.id || window.Z.global.auth.getLoginUser().personId
          params.idType = data.form.idType || '0'
        }
        if (data.params) {
          params = {
            ...data.params,
            ...data.form
          }
        }
        smsApi[data.sendType || 'sendActiveCode'](params).then(res => {
          el.isSending = false
          if (res && res !== 'OK' && res !== 'ok') {
            // 银行卡校验的特殊处理
            if (data.sendType === 'signApply') {
              if (res.msgCode !== '0000') {
                return window.Z.global.message.error(res.msgData)
              }
              if (res.transStatus !== '0000') {
                return window.Z.global.message.error(res.transInfo)
              }
            }
            if (res && typeof res === 'string') { data.form[verifyCodeKey] = res }
            if (res.reqSn) { data.form.reqSn = res.reqSn }
            if (res.orderNo || res.tradeNo) {
              data.form.orderNo = res.orderNo
              data.form.tradeNo = res.tradeNo
            }
          }
          timer(el, data.time || 60)
        }).catch(e => {
          el.isSending = false
        })
      }
    }
    el.addEventListener('click', el.__onClick)
  }
}

export default {
  smsCode: {
    inserted (el, building, vnode) {
      initSms(el, building, vnode.context)
    },
    componentUpdated (el, building, vnode) {
      initSms(el, building, vnode.context)
    },
    unbind (el) {
      unbind(el)
    }
  }
}
