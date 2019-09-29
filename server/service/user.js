const redisKey = require('../config/redisKey')
const basicConfig = require('../config/basicConfig')
const { errorCaptured } = require('../lib/utils')
exports.login = async (redis, { id, account, auth, roleId, date }) => {
  const keyName = `${redisKey.login}_${id}`
  var loginPromise = redis
    .multi()
    .hmset(keyName, { id, account, auth, roleId, date })
    .expire(keyName, basicConfig.LOGIN_EXPIRE)
    .exec()
  return errorCaptured(loginPromise)
}
