const fs = require('fs')
const path = require('path')
let publicKey = fs.readFileSync(path.resolve(__dirname, './id_rsa.pub'))
let privateKey = fs.readFileSync(path.resolve(__dirname, './id_rsa'))
const config = {
  PASSWORD_SUFFIX: 'current_20190912', // 加密参数
  LOGIN_EXPIRE: 10800, // 设置登录过期时间 以秒为单位
  PRIVATE_KEY: privateKey,
  PUBLIC_KEY: publicKey
}
exports = module.exports = config
