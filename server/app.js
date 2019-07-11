const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const staticCache = require('koa-static-cache') // 静态资源
const bodyParser = require('koa-bodyparser') // 请求内容
const Router = require('koa-router')()
const config = require('./confg')
const { port } = config
const app = new Koa()
app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}))
app.use(bodyParser())
app.use(Router.get('*', async (cxt) => {
  fs.readFile(path.join(__dirname, '../dist/index.html'), 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }
    cxt.type = '.html'
    cxt.status = '200'
    cxt.body = content
  })
}))
app.listen(port)
