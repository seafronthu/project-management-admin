export default class Ws {
  constructor (url, options) {
    if (!/^(ws:\/\/)/.test(url)) {
      url = `ws://${url}`
    }
    this.url = url
    this.init()
  }
  init () {
    this.webSocket = new WebSocket(this.url)
  }
  // 连接状态
  get readyState () {
    const {
      webSocket
    } = this
    // 0:CONNECTING 1:OPEN 2:CLOSING 3:CLOSED
    return webSocket.readyState
  }
  // 发送消息
  send (obj) {
    const {
      webSocket
    } = this
    webSocket.send(obj)
  }
  // 关闭
  close (code, reason) {
    const {
      webSocket
    } = this
    webSocket.close()
  }
  onMessage (callback) {
    const {
      webSocket
    } = this
    webSocket.addEventListener('message', callback)
  }
  onError (callback) {
    const {
      webSocket
    } = this
    webSocket.addEventListener('error', callback)
  }
  onClose (callback) {
    const {
      webSocket
    } = this
    webSocket.addEventListener('close', callback)
  }
}
