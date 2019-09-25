import {
  arrageArrToObj
} from './businessUtils'
import {
  PageView,
  ParentView
} from '@business/route-view'

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
function arrageObjToRouterTree ({
  obj,
  parentId = 0,
  routers,
  times = 0,
  breadcrumb,
  peerRouting = [],
  parentRoute = {
    meta: {}
  }
}) {
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
      // parentRoute.meta.detail = true
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
        Object.assign(routerObj, {
          redirect: routeObj.redirect
        })
      }
      const {
        name,
        meta: {
          icon,
          title
        },
        component // 路由组件
      } = routerObj
      let breadcrumbObj = {
        title,
        icon,
        key: name
      }
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
        routerObj.component = component || (times === 0 ? PageView : ParentView)
        // }
        obj[id].forEach(its => {
          let genre = its.genre
          let buttonType = its.buttonType
          if (genre === 'button' && buttonType !== 'other') { // 按钮权限 增删改
            let buttonArray = routerObj.meta[buttonType]
            if (Array.isArray(buttonArray)) {
              routerObj.meta[buttonType].push(its.component)
            } else {
              routerObj.meta[buttonType] = [its.component]
            }
          } else if (genre === 'detail') {
            routerObj.meta['select'] = true
          }
        })
        routerObj.children = arrageObjToRouterTree({
          obj,
          parentId: id,
          routers,
          times: times + 1,
          breadcrumb: routerObj.meta.breadcrumb,
          peerRouting,
          parentRoute: routerObj
        })
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
/**
 * 合并路由
 * @param {{backstageRoutes:JSON, frontstageRoutes: JSON}} {backstageRoutes 后台路由, frontstageRoutes 前台路由}
 * @returns {JSON} 返回合并的路由数据
 */
function backFrontRoutesConcat ({
  backstageRoutes,
  frontstageRoutes
}) {
  let arr = []
  let objRoute = arrageArrToObj(backstageRoutes) // 以parentId为键名的JSON对象
  backstageRoutes.forEach((items, index) => {
    if (items.genre === 'MENU' || items.genre === 'LIST' || items.genre === 'DETAIL') {
      if (!frontstageRoutes[items.component]) {
        return
      }
      // 合并前后端路由
      let route = frontstageRoutes[items.component]
      let meta = route.meta || {}
      let routeObj = {
        name: route.name,
        path: route.path,
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
        component: route.component
      }
      // 每个路由塞进按钮权限
      if (objRoute[items.id]) {
        objRoute[items.id].forEach(its => {
          let genre = its.genre
          let buttonType = its.buttonType
          if (genre === 'BUTTON' && buttonType !== 'OTHER') { // 按钮权限 增删改
            let buttonArray = routeObj.meta[buttonType]
            if (Array.isArray(buttonArray)) {
              routeObj.meta[buttonType].push(its.component)
            } else {
              routeObj.meta[buttonType] = [its.component]
            }
          }
        })
      }
      arr.push(routeObj)
    }
  })
  return arr
}
/**
 * 合并整理路由
 * @param {{backstageRoutes:JSON, frontstageRoutes: JSON}} {backstageRoutes 后台路由, frontstageRoutes 前台路由}
 * @returns {JSON} 返回合并的路由数据
 */
function arrageRoutes ({
  backstageRoutes,
  frontstageRoutes,
  parentId = 0
}) {
  let routeConcatArr = backFrontRoutesConcat({
    backstageRoutes,
    frontstageRoutes
  })
  console.log(routeConcatArr)
  let tempArr = routeConcatArr.map(v => ({ ...v })) // 浅拷贝数据 防止叠加path
  return routeConcatArr.map(v => {
    // 面包屑
    let breadcrumb = [{
      id: v.meta.id,
      notBreadcrumb: v.meta.notBreadcrumb,
      path: v.path,
      parentId: v.meta.parentId,
      title: v.meta.title,
      icon: v.meta.icon,
      key: name
    }]
    let copyTempArr = tempArr.map(v => ({ ...v })) // 再浅拷贝数据 防止操作copyTempArr影响每次循环没有还原数据
    let i = 0
    let j = 0 // breadcrumb
    // console.log(tempArr)
    while (i < copyTempArr.length) {
      let item = copyTempArr[i]
      if (breadcrumb[j].parentId === item.meta.id) {
        const {
          path,
          name,
          component,
          meta: {
            title,
            icon,
            id,
            parentId,
            notBreadcrumb
          }
        } = item
        breadcrumb.unshift({
          id,
          name,
          notBreadcrumb,
          path,
          component,
          parentId,
          title,
          icon,
          key: name
        })
        copyTempArr.splice(i, 1)
        i = 0
        continue
      }
      i++
    }
    v.meta.matched = breadcrumb
    v.path = `/${breadcrumb.map(v => v.path).join('/')}`
    v.meta.breadcrumb = breadcrumb.filter(v => !v.notBreadcrumb)
    return v
  }).filter(v => v.meta.genre !== 'menu') // 最后过滤父级菜单（前面没有过滤是因为需要做breadcrumb和path）
}
/**
 * 整理成树状menu
 * @param {{frontstageRoutes: Array, menuArrangement: JSON, parentId: Number}} {frontstageRoutes: 前端路由, menuArrangement: 整理后的后端路由, parentId: 父级id}
 * @returns {JSON[]}
 */
function arrageMenuTree ({
  frontstageRoutes,
  menuArrangement,
  parentId = 0
}) {
  let arr = menuArrangement[parentId]
  let parentArr = []
  arr.forEach(items => {
    // 合并菜单
    if (items.genre === 'MENU' || items.genre === 'LIST' || items.genre === 'DETAIL') {
      // const routeObj = routers[items.component] ? routers[items.component] : { // 父级路由
      //   name: items.component,
      //   path: componentNameConversion(items.component)['-'],
      //   redirect: null,
      //   meta: {}
      // }
      // parentRoute.meta.detail = true
      const routeObj = frontstageRoutes[items.component] || {}
      const meta = routeObj.meta || {}
      if (!meta || !meta.hideMenu) {
        let id = items.id
        let menu = {
          name: items.component, // 整个项目用name跳转路由而不是path因为path是可变的，如果路由的父级改变，path会重写
          query: items.query || routeObj.query || {},
          params: items.params || routeObj.params || {},
          icon: items.icon || meta.icon || '',
          href: items.href || meta.href || '',
          title: items.title || meta.title || '',
          redirect: items.redirect || meta.redirect
        }
        if (menuArrangement[id]) {
          let children = arrageMenuTree({
            menuArrangement,
            frontstageRoutes,
            parentId: id
          })
          if (children.length > 0) {
            menu.children = children
          }
        }
        parentArr.push(menu)
      }
    }
  })
  return parentArr
}
function arrageMenu ({
  backstageRoutes,
  frontstageRoutes,
  parentId = 0
}) {
  return arrageMenuTree({
    frontstageRoutes,
    menuArrangement: arrageArrToObj(backstageRoutes),
    parentId
  })
}
function setRouter ({
  routers,
  authorization,
  peerRouting
}) {
  if (authorization && authorization.length > 0) {
    return arrageObjToRouterTree({
      obj: arrageArrToObj(authorization),
      parentId: 0,
      routers,
      peerRouting
    })
  }
  return []
}
export {
  setRouter, // 树级路由有弊端（暂时不用，eg：当父级和子级路由都是页面级的时候，子级不能显示）
  arrageRoutes,
  arrageMenu
}
