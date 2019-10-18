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
  console.log(obj1, obj2)
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
/**
 * 获取当前对象对父级定位对象的距离
 * @param {*} selfEle 当前对象
 * @param {*} parentsEle 父级定位对象如果没有祖级dom
 */
function getParentsOffsetTop (selfEle, parentsEle) {
  parentsEle = parentsEle || document.documentElement || document.body // 祖级dom
  let parentEle = selfEle.offsetParent // 父级dom
  let distance = selfEle.offsetTop
  if (parentEle === parentsEle || parentEle === null) {
    return distance
  }
  return distance + getParentsOffsetTop(parentEle, parentsEle)
}
/**
 * 异步函数补货错误信息
 * @param {*} asyncFunc promise函数
 * @param  {...any} arg promise函数的参数
 */
async function errorCaptured (asyncFunc, ...arg) {
  try {
    let res = await asyncFunc(...arg)
    return [null, res]
  } catch (err) {
    return [err, null]
  }
}
export {
  getParentsOffsetTop,
  errorCaptured
}
