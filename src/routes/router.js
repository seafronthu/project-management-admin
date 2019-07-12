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
    name: 'default',
    alias: '/',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [Home]
  },
  ...routerArr,
  Error404
]
