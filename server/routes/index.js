const Router = require('koa-router')
const fs = require('fs')
const router = new Router()
const fileNameArr = fs.readdirSync(__dirname) // 出现其他模块的时候不用手动添加
const excludeArr = ['index.js'] // 排除模块
let routes = []
for (let i = 0; i < fileNameArr.length; ++i) {
  const key = fileNameArr[i]
  if (excludeArr.includes(key)) {
    continue
  }
  routes = routes.concat(require(`./${key}`))
}
routes.forEach(v => {
  router[v.method](v.path, v.middleware)
})
module.exports = router
