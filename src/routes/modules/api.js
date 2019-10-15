const ApiManagement = {
  path: 'api-management',
  name: 'ApiManagement',
  meta: {
    title: 'API开发管理',
    beforeCloseName: 'closeApiManagement',
    icon: 'api'
  }
}
const ApiProject = {
  path: 'api-project',
  name: 'ApiProject',
  component: () => import(/* webpackChunkName: "ApiProject" */ '@v/api-management/api-project.vue'),
  meta: {
    title: 'API项目'
  }
}
export default {
  ApiManagement,
  ApiProject
}
