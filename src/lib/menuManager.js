
import { hasChildren } from './businessUtils'
/**
 * 把arrageObjToRouterTree整理好的数组变成menu
 * @param {Array<JSON>} list arrageObjToRouterTree整理好的数组
 * @return {Array<JSON>} [{icon, href, name, meta}]
 */
function arrageRouterToMenu (list) {
  let result = []
  list.forEach(items => {
    if (!items.meta || !items.meta.hideMenu) {
      let obj = {
        query: items.query || '',
        params: items.params,
        icon: items.meta.icon || '',
        href: items.meta.href,
        name: items.name,
        meta: items.meta,
        title: items.meta.title
      }
      if (hasChildren(items)) {
        const childrenList = arrageRouterToMenu(items.children || [])
        if (childrenList.length > 0) { // 有些子级不需要展示的在菜单栏（为了防止详情页展示出来）
          obj.children = childrenList
        }
      }
      result.push(obj)
    }
  })
  return result
}
export {
  arrageRouterToMenu
}
