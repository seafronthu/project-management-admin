
const returnMessage = require('../config/message')
const ROUTER = [
  {
    id: '1',
    parentId: '0',
    title: '首页',
    href: '',
    keywords: '牛皮牛皮',
    genre: 'page',
    component: 'Home'
  },
  {
    id: '2',
    parentId: '0',
    title: 'API开发管理',
    href: '',
    keywords: 'API开发管理',
    genre: 'page',
    component: 'ApiManager'
  },
  {
    id: '3',
    parentId: '0',
    title: '账号管理',
    href: '',
    keywords: '账号管理',
    genre: 'page',
    component: 'AccountManagement'
  },
  {
    id: '4',
    parentId: '3',
    title: '个人中心',
    href: '',
    keywords: '个人中心',
    genre: 'page',
    component: 'Personal'
  },
  {
    id: '5',
    parentId: '3',
    title: '用户中心',
    href: '',
    keywords: '用户中心',
    genre: 'page',
    component: 'User'
  },
  {
    id: '6',
    parentId: '5',
    title: '用户列表',
    href: '',
    keywords: '用户列表',
    genre: 'page',
    component: 'UserList'
  },
  {
    id: '7',
    parentId: '5',
    title: '用户详情',
    href: '',
    keywords: '用户详情',
    genre: 'page',
    component: 'UserDetail'
  }
]
function sendRespond ({ cxt, data, statusCode = 200, message = '成功！', contentType = 'json' }) {
  cxt.type = contentType
  cxt.body = JSON.stringify({
    code: statusCode,
    data,
    message
  })
  cxt.status = statusCode
}
exports.login = async cxt => {
  let data = {
    token: '11111'
  }
  console.log('进来了')
  sendRespond({ cxt, data, message: returnMessage(200) })
  console.log(cxt)
}
// 获取用户权限
exports.getUserAthority = async cxt => {
  console.log('奇怪')
  let data = {
    list: ROUTER
  }
  sendRespond({ cxt, data, message: returnMessage(200) })
}
