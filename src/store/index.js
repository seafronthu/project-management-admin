import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
import { removeLocalStorage } from '@l/businessUtils'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
const {
  routerStorage,
  menuStorage,
  tabNavStorage,
  authorizationStorage
} = config
// const initData = {
//   user: user.state,
//   app: app.state
// }
Vue.use(Vuex)
// 数据初始化保存
export default new Vuex.Store({
  state: {
  },
  getters,
  mutations: {
    CLEARSTATE_MUTATE (state) {
      removeLocalStorage(routerStorage)
      removeLocalStorage(menuStorage)
      removeLocalStorage(tabNavStorage)
      removeLocalStorage(authorizationStorage)
      // location.href = '/login'
      // for (let key in state) {
      //   for (let name in state[key]) {
      //     state[key][name] = initData[key][name]
      //   }
      // }
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
