const controllers = require('../controllers/user')
// 登录
let login = {
  method: 'post',
  path: '/user/login',
  middleware: controllers.login
}
// 获取用户信息
let getUserInfo = {
  method: 'get',
  path: '/user/getUserInfo',
  middleware: controllers.getUserInfo
}
// 获取用户权限
let getUserAthority = {
  method: 'get',
  path: '/user/getUserAthority',
  middleware: controllers.getUserAthority
}
// 创建路由
let getRoute = {
  method: 'get',
  path: '/user/getRoute',
  middleware: controllers.getRoute
}
// 创建路由
let createRoute = {
  method: 'post',
  path: '/user/createRoute',
  middleware: controllers.createRoute
}
// 修改路由
let updateRoute = {
  method: 'put',
  path: '/user/updateRoute',
  middleware: controllers.updateRoute
}
module.exports = [login, getUserInfo, getUserAthority, getRoute, createRoute, updateRoute]
