const ApiManagement = {
  path: 'api-management',
  name: 'ApiManagement',
  component: () => import(/* webpackChunkName: "ApiManagement" */ '@v/api-management/api-management.vue'),
  meta: {
    title: 'API开发管理',
    beforeCloseName: 'closeApiManagement',
    icon: 'api'
  }
}
export default {
  ApiManagement
}
