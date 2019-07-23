/**
 * 判断对象类型
 * @param {*} obj
 * @param {String|Array} type
 */
export const judgementTypeTool = (obj, type) => {
  const objType = Object.prototype.toString.call(obj).replace(/^(\[object )|(\])$/g, '').toLocaleLowerCase()
  if (type === void 0) {
    return objType
  }
  const typeType = Object.prototype.toString.call(type).replace(/^(\[object )|(\])$/g, '').toLocaleLowerCase()
  if (typeType === 'string') {
    return objType === type
  }
  if (typeType === 'array') {
    return type.includes(objType)
  }
}
/**
 * 判断两个对象是否相同
 * @param {JSON|Array} obj1
 * @param {JSON|Array} obj2
 */
export const isSameObjTool = (obj1, obj2) => {
  if (judgementTypeTool(obj1, 'object')) {
    let arr = Object.keys(obj1)
    for (let i = 0; i < arr.length; ++i) {
      let key = arr[i]
      let items1 = obj1[key]
      let items2 = obj2[key]
      if (!isSameObjTool(items1, items2)) {
        return false
      }
    }
  } else if (judgementTypeTool(obj1, 'array')) {
    for (let i = 0; i < obj1.length; ++i) {
      let items1 = obj1[i]
      let items2 = obj2[i]
      if (!isSameObjTool(items1, items2)) {
        return false
      }
    }
  } else {
    if (obj1 !== obj2) {
      return false
    }
  }
  return true
}
