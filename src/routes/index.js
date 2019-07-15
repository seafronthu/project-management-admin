import Vue from 'vue'
import Router from 'vue-router'
import allRouter from './router'
import { setTitle } from '@/lib/businessUtils'
import store from '@/store'
import config from '@/config'
const { initialPageName, notLoginPageName } = config
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...allRouter
  ]
})
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (!token && !notLoginPageName.includes(to.name)) {
    console.log('未登录')
    // 未登录，跳转的是需要登录页面
    // const name = to.name
    const path = to.path
    const query = to.query
    const params = to.params
    const url = encodeURIComponent(JSON.stringify({
      path,
      query,
      params
    }))
    next({
      name: initialPageName, // 跳转到登录页
      query: {
        url
      }
    })
  } else {
    next()
  }
})
router.afterEach(route => {
  setTitle(route.meta.title)
  // window.scrollTo(0, 0)
})
export default router
