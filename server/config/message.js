const APP_CODE = {
  200: '成功',

  400: '登录验证信息错误',
  401: '登录失效',
  403: '账号或密码错误',
  500: '服务端错误'
}
const USER_CODE = {
  4001: '登录验证信息错误',
  4002: '登录失效',
  4003: '账号或密码错误',
  4004: '非法登录'
}
exports = module.exports = {
  ...APP_CODE,
  ...USER_CODE
}
