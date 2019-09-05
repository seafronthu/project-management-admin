
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
const Home = {
  path: '/home',
  name: 'Home',
  component: () => import(/* webpackChunkName: "Home" */ '@v/home/home.vue'),
  meta: {
    title: '首页',
    notClosed: true
  }
}
const ReplacePage = {
  path: '/replace-page',
  name: 'ReplacePage',
  component: () => import(/* webpackChunkName: "ReplacePage" */ '@v/other/replace-page.vue'),
  meta: {
    title: '',
    notCache: true,
    notOpenTab: true
  }
}
export {
  Error404,
  Login,
  Home,
  ReplacePage
}
