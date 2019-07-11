const process = require('process')
const config = {
  env: 'production',
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 9527,
  mysqlurl: '',
  mongodburl: '', // 数据库地址
  redisurl: '', // redis地址
  redisport: '' // redis端口号
}
module.exports = config
