const APP_CODE = {
  200: '成功',
  201: '参数未做修改',
  251: '找不到要修改的数据',
  252: '不能插入重复数据',

  // 400: '登录验证信息错误',
  // 401: '登录失效',
  // 403: '账号或密码错误',
  500: '服务端错误'
}
const USER_CODE = {
  4001: '登录验证信息错误',
  4002: '登录失效',
  4003: '账号或密码错误',
  4004: '非法登录',
  4005: '当前账户在其它地方登录',
  4006: '非法用户令牌',
  4007: '用户不存在'
}
exports = module.exports = {
  ...APP_CODE,
  ...USER_CODE
}
