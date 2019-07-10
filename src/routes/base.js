
const Error404 = {
  path: '*',
  name: 'Error404',
  component: () => import(/* webpackChunkName: "404" */ '@v/error/error-404.vue'),
  meta: {
    title: '404'
  }
}
const Login = {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "Login" */ '@v/login/login.vue'),
  meta: {
    title: '登录'
  }
}
export {
  Error404,
  Login
}
