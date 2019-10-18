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
const ApiVersion = {
  path: 'api-version',
  name: 'ApiVersion',
  component: () => import(/* webpackChunkName: "ApiVersion" */ '@v/api-management/api-version.vue'),
  meta: {
    title: 'API版本',
    hideMenu: true
  }
}
export default {
  ApiManagement,
  ApiProject,
  ApiVersion
}
