/* eslint-disable  */
let wsOriGin = window.CONFIG.ORIGIN.replace(/^http(s)?:\/\//, '')
const wsProtocol = location.protocol === 'http:' ? 'ws' : 'wss'
wsOriGin = wsProtocol + '://' + wsOriGin + '/socket/v2'
function bind (socket) {
  socket.onmessage = function (evt) {
    let data = evt.data
    // 解析数据
    try {
      data = JSON.parse(data)
    } catch (e) {}
    console.log('onmessage', data)
    // 尝试解析setting
    if (data.setting) {
      try { data.setting = JSON.parse(data.setting) } catch (e) {}
    }
    if (data.action) {
      window.Z.global.subscribe.trigger('on-socket-message-' + data.action, data)
    }
    window.Z.global.subscribe.trigger('on-socket-message-auto', data)
  }
  socket.onclose = function (evt) {
    window.Z.global.subscribe.trigger('on-socket-close', socket)
  }
}
let lastSocket
export default {
  async create (qrtoken) {
    qrtoken = qrtoken || await window.Z.api.server.sys.util.getId()
    let socketUrl = wsOriGin + `/qrcode?qrtoken=${qrtoken}`
    return new Promise((rev, rej) => {
      lastSocket = new WebSocket(socketUrl)
      bind(lastSocket)
      lastSocket.onopen = (o) => {
        rev({
          socket: lastSocket,
          qrtoken
        })
      }
      lastSocket.onerror = (e) => {
        console.log('socket error', e)
        rej(new Error())
      }
    })
  },
  sendMessage (socket, qrtoken, action, data) {
    data = JSON.stringify({
      setting: data,
      qrtoken,
      action
    })
    console.log('sendMessage', data)
    socket.send(data)
  },
  close (socket) {
    if (socket) socket.close()
  }
}
