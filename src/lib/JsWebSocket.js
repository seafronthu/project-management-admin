import Ws from '@/toos/ws'
import store from '@/store'
class JsWebSocket extends Ws {
  constructor () {
    super()
    this.onError(this.storeCallback)
  }
  storeCallback (err) {
    store.dispatch('APP_ADDERRORLOG_ACTION', {
      type: 'websocket',
      code: 500,
      msg: err,
      url: this.url
    })
  }
}
const MyPlugin = {}
MyPlugin.install = function (Vue, url, options) {
  Vue.prototype.$webSocket = new JsWebSocket(url, options)
}
export default JsWebSocket
export { MyPlugin }
