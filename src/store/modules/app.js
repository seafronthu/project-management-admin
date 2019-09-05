
import {
  getUserAthorityApi
} from '@/api'
export default {
  state: {
    device: null, // 设备
    errorList: [], // 日错误志列表
    // menuList: getLocalStorage(menuStorage) || [], // 菜单列表
    tabNavList: [], // 选项卡导航
    authorizationList: [], // 权限列表
    baseRouterList: [] // 默认路由
  },
  // getters: {
  //   menuList: (state, getters, rootState) => {
  //     return arrageRouterToMenu(state.routerList)
  //   }// 菜单列表
  // },
  mutations: {
    // 切换设备
    APP_TOGGLEDEVICE_MUTATE (state, device) {
      state.device = device
    },
    // 错误日志列表添加
    APP_ADDERRORLOG_MUTATE (state, error) {
      state.errorList.unshift(error)
    },
    // 添加选项卡导航
    APP_SETTABNAVLIST_MUTATE (state, list) {
      state.tabNavList = list
      // if (!state.tabNavList.some(v => v.name === item.name)) {
      //   state.tabNavList.push(item)
      // }
    },
    // 删除选项卡导航
    APP_REMOVETABNAVLIST_MUTATE (state, name) {
      state.tabNavList = state.tabNavList.filter(v => v.name !== name)
    },
    // 添加默认路由
    APP_ADDBASEROUTERLIST_MUTATE (state, list) {
      state.baseRouterList = list
    },
    // 添加路由权限列表
    APP_ADDUSERATHORITYAPI_MUTATE (state, authRouter) {
      state.authorizationList = authRouter
    }
  },
  actions: {
    // 获取权限列表
    async APP_GETUSERATHORITYAPI_ACTION ({ state, commit }, baseRouterList) {
      try {
        const res = await getUserAthorityApi()
        if (res.code === 200) {
          const authRouter = res.data.list
          commit('APP_ADDBASEROUTERLIST_MUTATE', baseRouterList) // 添加默认路由
          commit('APP_ADDUSERATHORITYAPI_MUTATE', authRouter) // 添加权限路由
        }
        return res
      } catch (err) {
        console.log(err)
      }
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
