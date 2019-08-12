const AuthManagement = {
  path: 'auth-management',
  name: 'AuthManagement',
  meta: {
    title: '权限管理'
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
export default {
  AuthManagement,
  RouteManagement
}
