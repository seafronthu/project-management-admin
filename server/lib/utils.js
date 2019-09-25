
const fs = require('fs')
const path = require('path')
const moment = require('moment')
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
    console.log(asyncFunc)
    collectLog({
      message: err,
      collectFile: __filename,
      collectFunc: asyncFunc.toString() // 内置函数或bing返回的函数返回的字符串为function () { [native code] }
    })
    return [err, null]
  }
}

/**
 * 同步延迟器
 * @param {*} time 延迟时间
 */
async function delayTime (time = 200, timer) {
  return new Promise((resolve, reject) => {
    timer = setTimeout(resolve, time)
  })
}

function collectLog ({
  message, // 日志信息
  collectFile = '', // 收集日志方法的文件（包括地址）
  collectFunc = '',
  saveDirectory = path.resolve(__dirname, '../logs'), // 储存日志目录
  saveFileName = 'log' // 储存日志文件文件名
}) {
  let str = `collectFile: ${collectFile}\r\ncollectFunc: ${collectFunc}\r\ntime: ${moment().format('YYYY-MM-DD HH:mm:ss')}\r\n\r\n`
  if (message instanceof Error) {
    saveFileName += '-error-'
    str = `code: ${message.code}\r\nmessage: ${message.message}\r\nstack: ${message.stack}\r\n` + str
  } else {
    saveFileName += '-'
    str = `message: ${message}\r\n` + str
  }
  let saveFile = `${saveFileName}${moment().format('YYYYMMDD')}.txt`
  let pathFile = path.resolve(saveDirectory, saveFile)
  fs.writeFileSync(pathFile, str, {
    flag: 'a'
  }, function (err) {
    if (err) throw err
    console.log('文件已被保存')
  })
}
// function overTime (ctx, { timeout = 20000 }) {
//   let timer = setTimeout(() => {

//   }, timeout)
// }
exports = module.exports = {
  errorCaptured,
  delayTime,
  collectLog
}
