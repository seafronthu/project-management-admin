import { Error404, Login, Home } from './base'
import setRouter from '@l/routerManager'
import routers from './modules'
import store from '@/store'
const Layout = () => import(/* webpackChunkName: "layout" */'@business/layout')
const routerArr = setRouter({ routers })
store.commit('APP_ADDROUTERLIST_MUTATE', routerArr)
export default [
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
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [...routerArr]
  },
  Error404
]
