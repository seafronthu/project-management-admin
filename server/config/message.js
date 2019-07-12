const CODE = {
  '200': '成功',

  '400': '登录验证信息错误',
  '401': '登录失效',
  '402': '账号或密码错误'
}
function returnMessage (code) {
  return CODE[code]
}
module.exports = returnMessage
