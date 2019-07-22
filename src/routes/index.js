import Vue from 'vue'
import Router from 'vue-router'
import allRouter from './router'
import { setTitle } from '@/lib/businessUtils'
import { Error404, Home } from './base'
import notification from 'ant-design-vue/es/notification'
import 'nprogress/nprogress.css' // progress bar style
import NProgress from 'nprogress' // progress bar
import store from '@/store'
import config from '@/config'
const Layout = () => import(/* webpackChunkName: "layout" */'@business/layout')
let addErr = 0
function toRouter (to) {
  const path = to.path
  const query = to.query
  const params = to.params
  const url = encodeURIComponent(JSON.stringify({
    path,
    query,
    params
  }))
  return url
}
const { initialPageName, notLoginPageName } = config
NProgress.configure({ showSpinner: false }) // NProgress Configuration
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...allRouter
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (notLoginPageName.includes(to.name)) {
    next()
    NProgress.done()
  } else if (!token) {
    next({
      name: initialPageName, // 跳转到登录页
      query: {
        url: toRouter(to)
      }
    })
    NProgress.done()
  } else {
    if (store.getters.routerList.length === 0) {
      store.dispatch('USER_GETUSERINFO_ACTION').then(res => {
        if (res.code === 200) {
          store.dispatch('APP_GETUSERATHORITYAPI_ACTION', [Home]).then(res => {
            if (res.code === 200 && store.getters.routerList.length > 0) {
              const routerList = [
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
                  children: [...store.getters.routerList]
                }, Error404]
              router.addRoutes(routerList)
              ++addErr
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              console.log(to)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
              NProgress.done()
            }
          })
        } else if (res.code === 400 || res.code === 401) {
          notification.error({
            message: '错误',
            description: res.message
          })
          store.dispatch('USER_LOGOUT_ACTION').then(() => {
            next({
              name: initialPageName, // 跳转到登录页
              query: {
                url: toRouter(to)
              }
            })
            NProgress.done()
          })
        }
      })
    } else {
      if (!addErr) {
        console.log(404)
        router.addRoutes([Error404])
        ++addErr
      }
      next()
      NProgress.done()
    }
  }
})
router.afterEach(route => {
  setTitle(route.meta.title)
  // window.scrollTo(0, 0)
})
export default router
