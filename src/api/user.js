import HttpReq from '@l/http'
// 登录
function loginApi (data) {
  return HttpReq.jsonPost({
    url: 'user/login',
    data,
    notLogin: true
  })
}
// 获取用户权限
function getUserAthorityApi (data) {
  return HttpReq.urlGet({
    url: 'user/getUserAthority',
    data
  })
}
export {
  loginApi, // 登录
  getUserAthorityApi // 获取用户权限
}
