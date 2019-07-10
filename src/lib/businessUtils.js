
/**
 * 判断是否有属性children
 * @param {JSON} item  对象
 * @return {boolean}
 */
function hasChildren (item) {
  return item.children && item.children.length > 0
}
export {
  hasChildren
}
