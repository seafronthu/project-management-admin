import store from '@/store'
function install (vm) {
  vm.prototype.$routerPush = function (options) {
    const {
      refresh = false,
      name,
      query,
      params,
      onComplete = function () {},
      onAbort = function () {}
    } = options
    if (refresh) {
      let {
        baseRouterList,
        cacheRoutesList
      } = store.state.app
      const route = baseRouterList[name]
      if (route && route.meta && route.meta.notSingleTab) {
        // do something
      } else {
        store.commit('APP_SETCACHEROUTESLIST_MUTATE', cacheRoutesList.filter(v => v !== name))
      }
      // 用于清除缓存之后重新渲染
      setTimeout(() => {
        this.$router.push({
          name,
          query: {
            ...query,
            refresh: +new Date()
          },
          params
        }, onComplete, onAbort)
      }, 5)
      return
    }
    this.$router.push({
      name,
      query,
      params
    })
  }
  vm.prototype.$routerReplace = function (options) {
    const {
      refresh = false,
      name,
      query = {},
      path,
      redirect,
      params = {},
      onComplete = function () {},
      onAbort = function () {}
    } = options
    if (refresh) {
      let {
        baseRouterList,
        cacheRoutesList
      } = store.state.app
      const route = baseRouterList[name]
      if (route && route.meta && route.meta.notSingleTab) {
        // do something
      } else {
        if (redirect && redirect.fullPath) {
          store.commit('APP_SETCACHEROUTESLIST_MUTATE', cacheRoutesList.filter(v => v !== redirect.name))
          params.redirect = redirect.fullPath
        } else {
          store.commit('APP_SETCACHEROUTESLIST_MUTATE', cacheRoutesList.filter(v => v !== name))
        }
      }
      // 用于清除缓存之后重新渲染
      setTimeout(() => {
        this.$router.replace({
          name,
          path,
          query,
          params
        }, onComplete, onAbort)
      }, 5)
      return
    }
    this.$router.replace({
      name,
      path,
      query,
      params
    })
  }
}
export default install
