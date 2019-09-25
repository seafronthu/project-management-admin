import HttpReq from '@l/http'
// 登录
function loginApi (data) {
  return HttpReq.jsonPost({
    url: '/user/login',
    data,
    timeout: 5000,
    notLogin: true
  })
}
// 获取用户信息
function getUserInfoApi (data) {
  return HttpReq.urlGet({
    url: '/user/getUserInfo',
    data
  })
}
// 获取用户权限
function getUserAthorityApi (data) {
  return HttpReq.urlGet({
    url: '/user/getUserAthority',
    data
  })
}
// 获取路由
function getRouteApi (data) {
  return HttpReq.urlGet({
    url: '/user/getRoute',
    data
  })
}
// 创建路由
function createRouteApi (data) {
  return HttpReq.jsonPost({
    url: '/user/createRoute',
    data
  })
}
// 更新路由
function updateRouteApi (data) {
  return HttpReq.jsonPut({
    url: '/user/updateRoute',
    data
  })
}
export {
  loginApi, // 登录
  getUserInfoApi, // 获取用户信息
  getUserAthorityApi, // 获取用户权限
  getRouteApi, // 获取路由
  createRouteApi, // 创建路由
  updateRouteApi // 更新路由
}
