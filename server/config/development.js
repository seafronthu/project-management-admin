const process = require('process')
const localClient = require('./localClient')
const config = {
  env: 'development',
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9527,
  key: '', //
  PASSWORD_SUFFIX: 'current_20190912', // 加密参数
  LOGIN_EXPIRE: 10800, // 设置登录过期时间 以秒为单位
  MYSQL_HOST: localClient.MYSQL_HOST,
  MYSQL_PORT: localClient.MYSQL_PORT,
  MYSQL_USER: localClient.MYSQL_USER,
  MYSQL_PASSWORD: localClient.MYSQL_PASSWORD,
  MYSQL_DATABASE: localClient.MYSQL_DATABASE,
  REDIS_HOST: localClient.REDIS_HOST,
  REDIS_PORT: localClient.REDIS_PORT,
  REDIS_PASSWORD: localClient.REDIS_PASSWORD
}
module.exports = config
