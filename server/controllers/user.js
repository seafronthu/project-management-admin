
const returnMessage = require('../config/message')
const userModels = require('../models/user')
const { sendRespond } = require('../lib/utils')
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
  let data = {
    token: '11111'
  }
  sendRespond({ cxt, data, message: returnMessage(200) })
}
exports.getUserInfo = async cxt => {
  let data = {
    name: '胡哥',
    age: '18',
    sex: '1'
  }
  sendRespond({ cxt, data, message: returnMessage(200) })
}
// 获取用户权限
exports.getUserAthority = async cxt => {
  let data = {
    list: ROUTER
  }
  sendRespond({ cxt, data, message: returnMessage(200) })
}
exports.getRoute = async cxt => {
  const [error, results] = await userModels.getRoute(cxt.sql_connection)
  if (error) {
    sendRespond({ cxt, data: error, code: 500, status: 500, message: error.message })
    return
  }
  sendRespond({ cxt, data: results[0], message: returnMessage(200) })
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
  sendRespond({ cxt, data: { id: insertId }, message: returnMessage(200) })
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
  sendRespond({ cxt, data: results[0], message: returnMessage(200) })
}
