
/**
 * 整理数组parentId为键名键值为该值下的数组
 * @param {Array<JSON>} arr 数组
 * @return {JSON} {0:[], 3:[]}
 */
function arrageArrToObj (arr) {
  let obj = {}
  arr.forEach((items) => {
    let parentId = items.parentId
    if (obj[parentId]) {
      obj[parentId].push(items)
    } else {
      obj[parentId] = [items]
    }
  })
  return obj
}

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
 * @param {number} times 当前对象层级
 * @param {JSON} routers 前台所有路由
 * @return {Array<JSON>} [{name,path,redirect,meta}]
 */
function arrageObjToRouterTree ({ obj, parentId = '0', routers, times = 0, way, pathRoute = {} }) {
  let arr = obj[parentId]
  let parentArr = []
  arr.forEach(items => {
    if (items.genre === 'page') {
      // const routeObj = routers[items.component] ? routers[items.component] : { // 父级路由
      //   name: items.component,
      //   path: componentNameConversion(items.component)['-'],
      //   redirect: null,
      //   meta: {}
      // }
      if (!routers[items.component]) {
        return
      }
      const routeObj = routers[items.component]
      const meta = routeObj.meta
      let id = items.id
      let routerObj = {
        name: routeObj.name,
        path: routeObj.path,
        meta: {
          ...meta,
          id: items.id,
          parentId: items.parentId,
          href: items.href, // 跳转到其它网站
          keywords: items.keywords, // 关键字用来搜索路由
          genre: items.genre, // 类型页面还是操作等等 page button tab
          delete: items.delete, // 是否软删除
          jurisdiction: items.Jurisdiction // 权限
        }
      }
      if (routeObj.redirect) {
        Object.assign(routerObj, { redirect: routeObj.redirect })
      }
      if (obj[id]) {
        // if (times === 0) {
        //   routerObj.path = '/' + routeObj.path // 祖级路由要加/
        //   routerObj.component = () => import('@business/layout')
        // } else if (times > 0) {
        routerObj.component = () => import('@business/parent-view')
        // }
        routerObj.meta.way = way ? `${way}/${routerObj.path}` : routerObj.path
        routerObj.children = arrageObjToRouterTree({ obj, parentId: id, routers, times: times + 1, way: routerObj.meta.way, pathRoute })
      } else if (items.component) {
        routerObj.meta.way = way ? `${way}/${routerObj.path}` : routerObj.path // 面包屑
        routerObj.component = routers[items.component].component
        pathRoute[routerObj.name] = routerObj // 待定
      }
      parentArr.push(routerObj)
    }
  })
  return parentArr
}
function setRouter ({ routers, authorization }) {
  if (authorization && authorization.length > 0) {
    return arrageObjToRouterTree({ obj: arrageArrToObj(authorization), parentId: '0', routers })
  }
  return []
}
export default setRouter
