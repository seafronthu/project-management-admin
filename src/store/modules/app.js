import config from '@/config'
import {
  getLocalStorage,
  setLocalStorage
} from '@l/businessUtils'
import {
  arrageRouterToMenu
} from '@l/menuManager'
const {
  menuStorage, tabNavStorage, authorizationStorage
} = config
export default {
  state: {
    errorList: [], // 日错误志列表
    menuList: getLocalStorage(menuStorage) || [], // 菜单列表
    tabNavList: getLocalStorage(tabNavStorage) || [], // 标签页列表
    authorizationList: getLocalStorage(authorizationStorage) || [] // 权限列表
  },
  mutations: {
    // 错误日志列表添加
    APP_ADDERRORLOG_MUTATE (state, error) {
      state.errorList.unshift(error)
    },
    // 添加菜单
    APP_ADDMENULIST_MUTATE (state, router) {
      let menuList = arrageRouterToMenu(router)
      state.menuList = menuList
      setLocalStorage(menuStorage, menuList)
    },
    // 添加标签页
    APP_ADDTABNAVLIST_MUTATE (state) {

    }
    // 添加路由权限列表

  },
  actions: {
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
