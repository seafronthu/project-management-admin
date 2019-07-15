import { Error404, Login, Home } from './base'
import setRouter from '@l/routerManager'
import routers from './modules'
import store from '@/store'
const Layout = () => import(/* webpackChunkName: "layout" */'@business/layout')
const routerArr = setRouter({ routers })
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
if (routerArr.length > 0) {
  store.commit('APP_ADDROUTERLIST_MUTATE', routerArr)
  routes.push({
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [...routerArr]
  })
}
routes.push(Error404)
export default routes
