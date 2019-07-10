const ApiManager = {
  path: '/api-manager',
  name: 'ApiManager',
  component: () => import(/* webpackChunkName: "ApiManager" */ '@v/api-manager/api-manager.vue'),
  meta: {
    title: 'API开发管理'
  }
}
export default [ApiManager]
