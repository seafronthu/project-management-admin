const process = require('process')
const config = {
  env: 'development',
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9527,
  key: '', //
  mysqlurl: '',
  mongodburl: '', // 数据库地址
  redisurl: '', // redis地址
  redisport: '' // redis端口号
}
module.exports = config
