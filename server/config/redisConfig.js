
const project = 'project_management_admin'
const user = {
  login: 'user_login' // 用户登录信息
}
const app = { ...user }
for (let key in app) {
  app[key] = `${project}_${app[key]}`
}
// client.set('user_vip_1')
exports = module.exports = { ...app }
