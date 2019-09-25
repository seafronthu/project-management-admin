import { getToken, setToken, removeToken } from '@/lib/businessUtils'
import {
  loginApi,
  getUserInfoApi
} from '@/api'
export default {
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    // 设置用户信息
    USER_SETUSERINFO_MUTATE (state, data) {
      const userInfo = state.userInfo
      state.userInfo = {
        ...userInfo,
        ...data
      }
    },
    // 设置token
    USER_SETTOKEN_MUTATE (state, token) {
      state.token = token
      if (!token) {
        removeToken()
      } else {
        setToken(token)
      }
    }
  },
  actions: {
    // 获取用户信息
    async USER_GETUSERINFO_ACTION ({ commit, state }) {
      try {
        let res = await getUserInfoApi()
        if (res.code === 200) {
          const data = res.data
          commit('USER_SETUSERINFO_MUTATE', data)
        }
        return res
      } catch (err) {
        console.log(err)
      }
    },
    // 登录
    async USER_LOGIN_ACTION ({ commit, dispatch }, { account, password }) {
      const res = await loginApi({
        account,
        password
      })
      if (res.code === 200) {
        commit('USER_SETTOKEN_MUTATE', res.data.token)
      }
      return res
    },
    // 登出去除相关信息
    async USER_LOGOUT_ACTION ({ state, commit }) {
      commit('USER_SETTOKEN_MUTATE', '')
      commit('CLEARSTATE_MUTATE')
      // location.href = `${location.href.split('#')[0]}#/login` // 登录页
      return {}
    }
  }
}
