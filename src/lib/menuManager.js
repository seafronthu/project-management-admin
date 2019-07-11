
import { hasChildren } from './businessUtils'
/**
 * 把arrageObjToRouterTree整理好的数组变成menu
 * @param {Array<JSON>} list arrageObjToRouterTree整理好的数组
 * @return {Array<JSON>} [{icon, href, name, meta}]
 */
function arrageRouterToMenu (list) {
  let result = []
  list.forEach(items => {
    if (items.meta && items.meta.showInBread) {
      let obj = {
        icon: items.meta.icon || '',
        href: items.meta.href,
        name: items.name,
        meta: items.meta,
        title: items.meta.title
      }
      if (hasChildren(items) || (items.meta && items.meta.showChildren)) {
        obj.children = arrageRouterToMenu(items.children || [])
      }
      result.push(obj)
    }
  })
  return result
}
export {
  arrageRouterToMenu
}
