import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import app from './modules/app'

Vue.use(Vuex)
// 数据初始化保存
const initData = {
  user: user.state,
  app: app.state
}
export default new Vuex.Store({
  state: {
  },
  mutations: {
    CLEARSTATE_MUTATE (state) {
      for (let key in state) {
        for (let name in state[key]) {
          state[key][name] = initData[key][name]
        }
      }
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
