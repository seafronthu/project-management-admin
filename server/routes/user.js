const controllers = require('../controllers/user')
// 登录
let login = {
  method: 'post',
  path: '/user/login',
  middleware: controllers.login
}
// 获取用户权限
let getUserAthority = {
  method: 'get',
  path: '/user/getUserAthority',
  middleware: controllers.getUserAthority
}
module.exports = [login, getUserAthority]
