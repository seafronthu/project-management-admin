
import {
  arrageRouterToMenu
} from '@l/menuManager'
import setRouter from '@l/routerManager'
import routers from '@/routes/modules'
setRouter({ routers })
const getters = {
  menuList: (state, getters) => {
    const list = arrageRouterToMenu(getters.routerList)
    return list
  },
  routerList: state => {
    let peerRouting = []
    let baseRouterList = state.app.baseRouterList
    const List = setRouter({ routers, authorization: state.app.authorizationList, peerRouting })
    let routerMerge = [...peerRouting, ...baseRouterList]
    let tabNavList = []
    routerMerge.forEach(v => {
      if (v.meta && v.meta.notClosed) { // 默认添加不能关闭的标签页
        tabNavList.push(v)
      }
    })
    state.app.tabNavList = tabNavList
    return List
  }
}
export default getters