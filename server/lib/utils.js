const CODE = require('../config/message')
/**
 * 异步函数补货错误信息
 * @param {*} asyncFunc promise函数
 * @param  {...any} arg promise函数的参数
 */
async function errorCaptured (asyncFunc, ...arg) {
  try {
    let res
    if (Object.prototype.toString.call(asyncFunc) === '[object Promise]') {
      res = await asyncFunc
    } else {
      res = await asyncFunc(...arg)
    }
    return [null, res]
  } catch (err) {
    console.log(asyncFunc.toString(), arg, err, 'err')
    return [err, null]
  }
}
/**
 * 请求返回值
 * @param {JSON} {cxt: JSON, data: JSON, code: Number} 对象
 */
function sendRespond ({ cxt, data = {}, code = 200, status = 200, message, contentType = 'json' }) {
  console.log(cxt.type, 1)
  cxt.type = contentType
  cxt.status = status
  cxt.body = JSON.stringify({
    code,
    data,
    message: message || CODE[code]
  })
}
// function overTime (cxt, { timeout = 20000 }) {
//   let timer = setTimeout(() => {

//   }, timeout)
// }
exports.errorCaptured = errorCaptured
exports.sendRespond = sendRespond
