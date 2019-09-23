
// const { returnMessage, USER_CODE } = require('../config/message')
const userModels = require('../models/user') // mysql操作\
const userService = require('../service/user') // redis操作
const { PASSWORD_SUFFIX } = require('../config')
const { PUBLIC_KEY } = require('../config/basicConfig')
const { md5, encryptRsa } = require('../lib/cypher')
const { sendRespond } = require('../lib/utils')
// const moment = require('moment')
const ROUTER = [
  {
    id: '2',
    parentId: '0',
    title: 'API开发管理',
    href: '',
    keywords: 'API开发管理',
    genre: 'list',
    component: 'ApiManagement'
  },
  {
    id: '3',
    parentId: '0',
    title: '账号管理',
    href: '',
    keywords: '账号管理',
    genre: 'menu',
    component: 'AccountManagement'
  },
  {
    id: '4',
    parentId: '3',
    title: '个人中心',
    href: '',
    keywords: '个人中心',
    genre: 'list',
    component: 'Personal'
  },
  {
    id: '5',
    parentId: '3',
    title: '用户中心',
    href: '',
    keywords: '用户中心',
    genre: 'menu',
    component: 'User'
  },
  {
    id: '6',
    parentId: '5',
    title: '用户列表',
    href: '',
    keywords: '用户列表',
    genre: 'list',
    component: 'UserList'
  },
  {
    id: '7',
    parentId: '6',
    title: '用户详情',
    href: '',
    keywords: '用户详情',
    genre: 'detail',
    component: 'UserDetail'
  },
  {
    id: '8',
    parentId: '0',
    title: '权限管理',
    href: '',
    keywords: '权限管理',
    genre: 'menu',
    component: 'AuthManagement'
  },
  {
    id: '9',
    parentId: '8',
    title: '路由管理',
    href: '',
    keywords: '路由管理',
    genre: 'list',
    component: 'RouteManagement'
  },
  {
    id: '10',
    parentId: '8',
    title: '角色列表',
    href: '',
    keywords: '路由管理',
    genre: 'list',
    component: 'RoleList'
  }

]

exports.login = async cxt => {
  let { request: { body: { account, password } } } = cxt
  if (typeof password === 'string' && password.length <= 30) {
    password = md5(password + PASSWORD_SUFFIX, 2)
    const [error, results] = await userModels.login(cxt.sql_connection, { account, password })
    if (error) {
      sendRespond({ cxt, data: error, code: 500 })
      return
    }
    if (results[0].length === 0) {
      sendRespond({ cxt, code: 4003 })
      return
    }
    const { id, account: account2, auth, roleId } = results[0][0]
    // const [error2, results2] = await userService.login(cxt.redisClient, { id, account: account2, auth, roleId })
    let date = new Date().getTime()
    const [error2, results2] = await userService.login(cxt.redisClient, { id, account: account2, auth, roleId, date })
    if (error2) {
      sendRespond({ cxt, data: error2, code: 500 })
      return
    }
    if (results2.length > 1 && results2[1][1] === 1) {
      let token = encryptRsa(`id=${id}&date=${date}`, PUBLIC_KEY)
      sendRespond({ cxt, code: 200, data: { token } })
      return
    }
  }
  sendRespond({ cxt, code: 4004 })
}
exports.getUserInfo = async cxt => {
  let data = {
    name: '胡哥',
    age: '18',
    sex: '1'
  }
  sendRespond({ cxt, data, message: 200 })
}
// 获取用户权限
exports.getUserAthority = async cxt => {
  let data = {
    list: ROUTER
  }
  sendRespond({ cxt, data, code: 200 })
}
exports.getRoute = async cxt => {
  const [error, results] = await userModels.getRoute(cxt.sql_connection)
  if (error) {
    sendRespond({ cxt, data: error, code: 500, status: 500, message: error.message })
    return
  }
  sendRespond({ cxt, data: results[0], code: 200 })
}
// 创建路由
exports.createRoute = async cxt => {
  let { request: { body: { component, parentId, title, description, genre, buttonType } } } = cxt
  const [error, results] = await userModels.createRoute(cxt.sql_connection, { component, parentId, title, description, genre, buttonType })
  console.log(results, 'create')
  if (error) {
    sendRespond({ cxt, data: error, code: 500, status: 500, message: error.message })
    return
  }
  const { insertId } = results[0]
  sendRespond({ cxt, data: { id: insertId }, message: 200 })
}
// 修改路由
exports.updateRoute = async cxt => {
  let { request: { body: { component, parentId, title, description, genre, buttonType } } } = cxt
  const [error, results] = await userModels.updateRoute(cxt.sql_connection, { component, parentId, title, description, genre, buttonType })
  console.log(results, 'update')
  if (error) {
    sendRespond({ cxt, data: error, code: 500, status: 500, message: error.message })
    return
  }
  sendRespond({ cxt, data: results[0], message: 200 })
}
