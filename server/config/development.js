const process = require('process')
const localSql = require('./localSql')
const config = {
  env: 'development',
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9527,
  key: '', //
  PASSWORD_SUFFIX: 'current_20190912',
  MYSQL_HOST: localSql.MYSQL_HOST,
  MYSQL_PORT: localSql.MYSQL_PORT,
  MYSQL_USER: localSql.MYSQL_USER,
  MYSQL_PASSWORD: localSql.MYSQL_PASSWORD,
  MYSQL_DATABASE: localSql.MYSQL_DATABASE,
  mongodburl: '', // 数据库地址
  redisurl: '', // redis地址
  redisport: '' // redis端口号
}
module.exports = config
