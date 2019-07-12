import config from '@/config'
import {
  getUserAthorityApi
} from '@/api'
import {
  getLocalStorage,
  setLocalStorage
} from '@l/businessUtils'
import {
  arrageRouterToMenu
} from '@l/menuManager'
const {
  tabNavStorage, authorizationStorage
} = config
export default {
  state: {
    errorList: [], // 日错误志列表
    routerList: [], // 路由
    // menuList: getLocalStorage(menuStorage) || [], // 菜单列表
    tabNavList: getLocalStorage(tabNavStorage) || [], // 标签页列表
    authorizationList: getLocalStorage(authorizationStorage) || [] // 权限列表
  },
  getters: {
    menuList: (state, getters, rootState) => arrageRouterToMenu(state.routerList) // 菜单列表
  },
  mutations: {
    // 错误日志列表添加
    APP_ADDERRORLOG_MUTATE (state, error) {
      state.errorList.unshift(error)
    },
    // 添加路由列表
    APP_ADDROUTERLIST_MUTATE (state, router) {
      state.routerList = router
    },
    // 添加标签页
    APP_ADDTABNAVLIST_MUTATE (state) {

    },
    // 添加路由权限列表
    APP_ADDUSERATHORITYAPI_MUTATE (state, authRouter) {
      state.authorizationList = authRouter
      setLocalStorage(authorizationStorage, authRouter)
    }
  },
  actions: {
    // 获取权限列表
    async APP_GETUSERATHORITYAPI_ACTION ({ state, commit }, router) {
      const res = await getUserAthorityApi()
      if (res.code === '200') {
        const authRouter = res.data.list
        commit('APP_ADDUSERATHORITYAPI_MUTATE', authRouter)
      }
      return res
    },
    // 添加错误日志
    async APP_ADDERRORLOG_ACTION ({ rootState, commit }, info) {
      const { user: { userId, userName, userHeadImage } } = rootState
      let data = {
        ...info,
        userId,
        time: new Date().getTime(),
        userName,
        userHeadImage
      }
      commit('APP_ADDERRORLOG_MUTATE', data)
    }
  }
}
