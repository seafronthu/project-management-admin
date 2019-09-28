const AuthManagement = {
  path: 'auth-management',
  name: 'AuthManagement',
  meta: {
    title: '权限管理',
    icon: 'team'
  }
}
const RouteManagement = {
  path: 'route-management',
  name: 'RouteManagement',
  component: () => import(/* webpackChunkName: "RouteManagement" */ '@v/auth-management/route-management.vue'),
  meta: {
    title: '路由管理'
  }
}
const RoleList = {
  path: 'role-list',
  name: 'RoleList',
  component: () => import(/* webpackChunkName: "RoleList" */ '@v/auth-management/role-list.vue'),
  meta: {
    title: '角色列表'
  }
}
const RoleDetail = {
  path: 'role-detail',
  name: 'RoleDetail',
  component: () => import(/* webpackChunkName: "RoleDetail" */ '@v/auth-management/role-detail.vue'),
  meta: {
    title: '角色详情',
    hideMenu: true
  }
}
export default {
  AuthManagement,
  RouteManagement,
  RoleList,
  RoleDetail
}
