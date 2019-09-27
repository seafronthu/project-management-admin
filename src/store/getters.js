
import { arrageMenu, arrageRoutes } from '@l/arrangeAuthManage'
import routes from '@/routes/modules'
import { Home } from '@/routes/base'
const getters = {
  menuList: state => {
    const list = arrageMenu({
      backstageRoutes: state.app.authorizationList,
      frontstageRoutes: { Home, ...routes },
      parentId: 0
    })
    return list
  },
  routerList: state => {
    let baseRouterList = state.app.baseRouterList
    const routeList = arrageRoutes({
      backstageRoutes: state.app.authorizationList,
      frontstageRoutes: routes
    })
    let routerMerge = [...routeList, ...baseRouterList]
    let tabNavList = []
    routerMerge.forEach(v => {
      if (v.meta && v.meta.notClosed) { // 默认添加不能关闭的标签页
        tabNavList.push(v)
      }
    })
    state.app.tabNavList = tabNavList
    return routeList
  }
}
export default getters
