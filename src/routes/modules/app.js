const Home = {
  path: '/home',
  name: 'Home',
  component: () => import(/* webpackChunkName: "Home" */ '@v/home/home.vue'),
  meta: {
    title: '首页'
  }
}
export default [Home]
