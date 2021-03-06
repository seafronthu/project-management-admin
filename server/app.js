const Koa = require('koa')
const path = require('path')
// const fs = require('fs')
const staticCache = require('koa-static-cache') // 静态资源
const bodyParser = require('koa-bodyparser') // 请求内容
const mysql = require('./lib/mysql')
const redisClient = require('./lib/redisClient')
// const Router = require('koa-router')()
const config = require('./config')
const { port } = config
const app = new Koa()
app.context.sql_connection = mysql
app.context.redisClient = redisClient
app.use(staticCache(path.join(__dirname, '../dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}))
app.use(bodyParser())
// 所有路由
app.use(require('./routes').routes())
// spa页
// app.use(Router.get('*', async (cxt, next) => {
//   console.log('gg')
//   fs.readFile(path.join(__dirname, '../dist/index.html'), 'utf-8', (err, content) => {
//     if (err) {
//       console.log('We cannot open "index.html" file.')
//     }
//     cxt.type = 'html'
//     cxt.status = 200
//     cxt.body = content
//   })
//   console.log(`http://${hostname}:${port}`)
// }).routes())
app.listen(port)
