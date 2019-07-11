import { Error404, Login, Home } from './base'
import config from '@/config'
import {
  getLocalStorage
  // setLocalStorage
} from '@l/businessUtils'
const { routerStorage } = config
const Layout = () => import(/* webpackChunkName: "layout" */'@business/layout')
console.log(Login)
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
  Error404
]
