import { Login, Home } from './base'
const Layout = () => import(/* webpackChunkName: "layout" */'@business/layout')
const routes = [
  Login,
  {
    path: '/home',
    name: 'Default',
    alias: '/',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [Home]
  }
]
export default routes
