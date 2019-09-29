const redisKey = require('../config/redisKey')
// const { errorCaptured } = require('../lib/utils')
const { getUrlKeyPair } = require('../tools/tool')
const CODE = require('../config/message')
const { decryptRsa } = require('./cypher')
const { PRIVATE_KEY } = require('../config/basicConfig')
/**
 * 请求返回值
 * @param {JSON} {ctx: JSON, data: JSON, code: Number} 对象
 */
function sendRespond ({ ctx, data = {}, code = 200, status = 200, message, contentType = 'json' }) {
  ctx.type = contentType
  ctx.status = status
  ctx.body = JSON.stringify({
    code,
    data,
    message: message || CODE[code]
  })
}
/**
 * 校验用户是否登录
 * @param {*} redis
 * @param {{token: String}} {token: 加密令牌}
 * @returns {{code: Number, data: [JSON,undefined]}}
 */
async function redisUserInfo (ctx) {
  const redis = ctx.redisClient
  const token = ctx.headers['token']
  let data = decryptRsa(token, PRIVATE_KEY)
  if (!data) { // 非法令牌
    return {
      code: 4006
    }
  }
  let urlObj = getUrlKeyPair(data)
  let { id, date } = urlObj
  const keyName = `${redisKey.login}_${id}`
  // let hgetVal = await redis.hget(keyName, 'id')
  // let time = await redis.ttl(keyName)
  // let hkeysVal = await redis.hkeys(keyName)
  let hkeysVal = await redis.hkeys(keyName)
  if (hkeysVal.length === 0) { // 登录失效
    return {
      code: 4002
    }
  }
  let hmgetVal = await redis.hmget(keyName, hkeysVal)
  let infoObj = {}
  hkeysVal.forEach((item, index) => {
    infoObj[item] = hmgetVal[index]
  })
  if (infoObj.date.toString() !== date.toString()) { // 账号被顶下
    return {
      code: 4005
    }
  }
  return {
    code: 200,
    ...infoObj
  }
  // let hgetVal1 = await redis.hget('keyName', 'id') // null
  // let time1 = await redis.ttl('keyName') // -2
  // let hmgetVal1 = await redis.hmget('keyName', ['id', 'date'])// [null, null]
  // let hkeysVal1 = await redis.hkeys('keyName') // []
}
exports = module.exports = {
  sendRespond,
  redisUserInfo
}
