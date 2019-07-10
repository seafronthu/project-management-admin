import { Error404, Login } from './base'
import app from './modules/app'
const Container = () => import(/* webpackChunkName: "container" */'@business/container')
console.log(Login)
export default [
  {
    path: '/home',
    name: 'default',
    alias: '/',
    component: Container,
    meta: {
      title: '首页'
    },
    children: [...app]
  },
  Login,
  Error404
]
