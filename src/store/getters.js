
import { arrageMenu, arrageRoutes } from '@l/arrangeAuthManage'
import routes from '@/routes/modules'
const getters = {
  menuList: state => {
    const list = arrageMenu({
      backstageRoutes: state.app.authorizationList,
      frontStageRoutes: routes,
      parentId: 0
    })
    return list
  },
  routerList: state => {
    let baseRouterList = state.app.baseRouterList
    const routeList = arrageRoutes({
      backstageRoutes: state.app.authorizationList,
      frontStageRoutes: routes
    })
    let routerMerge = [...routeList, ...baseRouterList]
    let tabNavList = []
    routerMerge.forEach(v => {
      if (v.meta && v.meta.notClosed) { // 默认添加不能关闭的标签页
        tabNavList.push(v)
      }
    })
    console.log(routeList)
    state.app.tabNavList = tabNavList
    return routeList
  }
}
export default getters
