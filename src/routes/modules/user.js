const AccountManagement = {
  path: '/account-management',
  name: 'AccountManagement',
  meta: {
    title: '账号管理'
  }
}
const Personal = {
  path: '/personal',
  name: 'Personal',
  component: () => import(/* webpackChunkName: "Personal" */ '@v/account-management/personal.vue'),
  meta: {
    title: '个人中心'
  }
}
const User = {
  path: '/user',
  name: 'User',
  meta: {
    title: '用户中心'
  }
}
const UserList = {
  path: '/user-list',
  name: 'UserList',
  component: () => import(/* webpackChunkName: "UserList" */ '@v/account-management/user/user-list.vue'),
  meta: {
    title: '用户列表'
  }
}
const UserDetail = {
  path: '/user-detail',
  name: 'UserDetail',
  component: () => import(/* webpackChunkName: "UserDetail" */ '@v/account-management/user/user-detail.vue'),
  meta: {
    title: '用户详情'
  }
}

export default [AccountManagement, Personal, User, UserList, UserDetail]
