import { arrageArrToObj } from './businessUtils'

/**
 * 把类似驼峰的MyUserInfo 转换成 my-user-info 和 my_user_info
 * @param {string} name 传入的名字
 * @return {JSON} 全部转成小写并且在原先大写字母前加-和_（除了首字母）
 */
// function componentNameConversion (name) {
//   const firstLetter = name.slice(0, 1).toLocaleLowerCase()
//   const word = name.slice(1)
//   return {
//     '-': firstLetter + word.replace(/[A-Z]+/g, letter => `-${letter.toLocaleLowerCase()}`),
//     '_': firstLetter + word.replace(/[A-Z]+/g, letter => `_${letter.toLocaleLowerCase()}`)
//   }
// }
/**
 * 把arrageArrToObj整理的对象变成tree形
 * @param {JSON} obj arrageArrToObj整理的对象
 * @param {number} parentId 父级id
 * @param {JSON} routers 前台所有路由
 * @param {number} times 当前对象层级
 * @param {JSON} parentRoute 父级路由用于把tab对象放进去（当页面需要对tab处理权限的时候使用，产品需求(灬ꈍ ꈍ灬)）
 * @return {Array<JSON>} [{name,path,redirect,meta}]
 */
function arrageObjToRouterTree ({ obj, parentId = '0', routers, times = 0, breadcrumb, peerRouting = [], parentRoute = { meta: {} } }) {
  let arr = obj[parentId]
  let parentArr = []
  arr.forEach(items => {
    if (items.genre === 'menu' || items.genre === 'list' || items.genre === 'detail') {
      // const routeObj = routers[items.component] ? routers[items.component] : { // 父级路由
      //   name: items.component,
      //   path: componentNameConversion(items.component)['-'],
      //   redirect: null,
      //   meta: {}
      // }
      if (!routers[items.component]) {
        return
      }
      parentRoute.meta.detail = true
      const routeObj = routers[items.component]
      const meta = routeObj.meta
      let id = items.id
      let routerObj = {
        name: routeObj.name,
        path: routeObj.path,
        meta: {
          id: items.id,
          parentId: items.parentId,
          title: items.title,
          description: items.description, // 描述用来搜索路由
          // href: items.href, // 跳转到其它网站
          // keywords: items.keywords, // 关键字用来搜索路由
          genre: items.genre, // 路由类型 menu菜单（一般父级路由）list列表 detail详情 tab 5button
          buttonType: items.buttonType, // 其他other 按钮类型 insert增 delete删 update改 export导出 import导入
          tag: items.tag, // 是否软删除
          jurisdiction: items.jurisdiction, // 权限
          ...meta
        },
        component: routeObj.component
      }
      if (routeObj.redirect) {
        Object.assign(routerObj, { redirect: routeObj.redirect })
      }
      const {
        name,
        meta: {
          icon,
          title
        },
        component // 路由组件
      } = routerObj
      let breadcrumbObj = { title, icon, key: name }
      if (component) { // 面包屑 父类不能给name代表不能路由跳转（判断是否前台是否有路由组件）
        breadcrumbObj.name = name
      } else { // 表示父类不是页面
        routerObj.redirect = '/404'
      }
      routerObj.meta.breadcrumb = breadcrumb ? [...breadcrumb, breadcrumbObj] : [breadcrumbObj]
      if (obj[id]) {
        // if (times === 0) {
        //   routerObj.path = '/' + routeObj.path // 祖级路由要加/
        //   routerObj.component = () => import('@business/layout')
        // } else if (times > 0) {
        routerObj.component = component || (() => import('@business/parent-view'))
        // }
        obj[id].forEach(its => {
          let genre = its.genre
          let buttonType = its.buttonType
          if (genre === 'button' && buttonType !== 'other') {
            routerObj.meta[buttonType] = true // 按钮权限 增删改
          } else if (genre === 'detail') {
            routerObj.meta['select'] = true
          }
        })
        routerObj.children = arrageObjToRouterTree({ obj, parentId: id, routers, times: times + 1, breadcrumb: routerObj.meta.breadcrumb, peerRouting, parentRoute: routerObj })
      } else if (items.component) {
        routerObj.component = routeObj.component
        peerRouting.push(routerObj) // 同级路由
      }
      parentArr.push(routerObj)
    }
    //  else if (items.genre === 'tab') {
    //   if (Array.isArray(parentRoute.meta.tab)) {
    //     parentRoute.meta.tab.push(items)
    //   } else {
    //     parentRoute.meta.tab = [items]
    //   }
    // }
  })
  return parentArr
}
function setRouter ({ routers, authorization, peerRouting }) {
  if (authorization && authorization.length > 0) {
    return arrageObjToRouterTree({ obj: arrageArrToObj(authorization), parentId: '0', routers, peerRouting })
  }
  return []
}
export default setRouter
