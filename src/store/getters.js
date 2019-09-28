
import { arrageMenu, arrageRoutes } from '@l/arrangeAuthManage'
import routes from '@/routes/modules'
const getters = {
  menuList: state => {
    let baseRouterList = state.app.baseRouterList
    const list = arrageMenu({
      backstageRoutes: state.app.authorizationList,
      frontstageRoutes: { ...baseRouterList, ...routes },
      parentId: 0
    })
    return list
  },
  routerList: state => {
    let baseRouterList = state.app.baseRouterList
    const routeList = arrageRoutes({
      backstageRoutes: state.app.authorizationList,
      frontstageRoutes: { ...baseRouterList, ...routes }
    })
    // let routerMerge = [...routeList]
    // let tabNavList = []
    // routerMerge.forEach(v => {
    //   if (v.meta && v.meta.notClosed) { // 默认添加不能关闭的标签页
    //     tabNavList.push(v)
    //   }
    // })
    // state.app.tabNavList = tabNavList
    return routeList
  }
}
export default getters
