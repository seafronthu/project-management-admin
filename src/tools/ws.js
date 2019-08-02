/**
 * websocket
 * @param {*} url 连接地址
 * @param {JSON} {reconnect: 重连次数, delay: 重连延迟时间}
 */
function Ws (url, { reconnectTimes = 0, reconnectDelay = 0 }) {
  if (this instanceof Ws) {
    return new Ws(url, { reconnectTimes, reconnectDelay })
  }
  if (!url) {
    throw new TypeError('The url is required ')
  }
  if (!/^(ws:\/\/)/.test(url)) {
    url = `ws://${url}`
  }
  this.reconnectTimes = reconnectTimes
  this.reconnectDelay = reconnectDelay
  this.activeCloseureStatus = false // 是否为主动关闭 默认不是
  this.url = url
  this.init()
}
const listensArr = ['open', 'message', 'error']
// 初始化
Ws.prototype.init = function () {
  this.webSocket = new WebSocket(this.url)
  listensArr.forEach(v => {
    this.webSocket.addEventListener(v, this[v].bind(this))
  })
  this.webSocket.addEventListener('close', this.closed)
  return this
}
Ws.prototype.cbk = function (key) {
  return this[key] || function () {}
}
// 监听函数
listensArr.forEach(key => {
  Ws.prototype[key] = function () {
    this.cbk(`on${key}`).apply(this, arguments)
    return this
  }
})
// 报错关闭一定会触发
Ws.prototype.closed = function () {
  const {
    reconnectTimes,
    activeCloseureStatus,
    reconnect,
    reconnectDelay,
    cbk
  } = this
  cbk('onclose').apply(this, arguments)
  if (!activeCloseureStatus && reconnectTimes > 0) {
    clearTimeout(this.timer)
    this.timer = null
    this.timer = setTimeout(reconnect.bind(this), reconnectDelay)
  }
}
const eventsArr = ['send', 'close']
// 操作
let operation = {
  close (code, reason) {
    this.activeCloseureStatus = true
    this.webSocket.close(code, reason)
  },
  send (data) {
    try {
      this.webSocket.send(data)
    } catch (err) {
      this.cbk('onerror').apply(this, err)
    }
  }
}
eventsArr.forEach(key => {
  Ws.prototype[key] = function () {
    let args = arguments
    operation[key].apply(this, args)
    return this
  }
})
Object.defineProperty(Ws.prototype, 'readyState', {
  get () {
    const type = this.webSocket.readyState
    switch (type) {
      case 0:
        return 'CONNECTING'
      case 1:
        return 'OPEN'
      case 2:
        return 'CLOSING'
      case 3:
        return 'CLOSED'
      default:
        return 'NOTCONNECT'
    }
  }
})
Ws.prototype.reconnect = function () {
  if (this.readyState === 'CONNECTING' || this.readyState === 'OPEN') {
    return
  }
  this.init()
}
export default Ws
