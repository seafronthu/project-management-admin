import Cookies from 'js-cookie'
import config from '@/config'
import moment from 'moment'
import {
  isSameObjTool
} from '@/tools/utils'
const {
  cookieTokenName,
  cookieExpires,
  title
} = config
/**
 * 设置token
 * @param {string} token 登录信息的token
 */
function setToken (token) {
  Cookies.set(cookieTokenName, token, {
    expires: cookieExpires || 1
  })
}
/**
 * 获取token
 * @returns {string|boolean} 返回token或false
 */
function getToken () {
  const token = Cookies.get(cookieTokenName)
  if (token) return token
  return false
}
/**
 * 移除token
 */
function removeToken () {
  Cookies.remove(cookieTokenName)
}
/**
 * 动态设置页面title
 * @param {string|void} pageTitle 页面title
 */
function setTitle (pageTitle) {
  document.title = pageTitle ? `${title} - ${pageTitle}` : title
}

/**
 * 判断是否有属性children
 * @param {JSON} item  对象
 * @return {boolean}
 */
function hasChildren (item) {
  return !!(item.children && item.children.length > 0)
}
/**
 * 键值对塞到浏览器缓存中
 * @param {string} name  对象名称
 * @param {number} day  相差天数
 */
function setLocalStorage (name, value, day) {
  if (day === void 0) {
    localStorage.setItem(name, JSON.stringify({
      value
    }))
    return
  }
  const expires = moment.utc().add(day, 'days').format()
  localStorage.setItem(name, JSON.stringify({
    value,
    expires
  }))
}
/**
 * 从缓存中获取name的值
 * @param {string} name  对象名称
 * @return {boolean|string|array|JSON}
 */
function getLocalStorage (name) {
  let item = localStorage.getItem(name)
  if (!item) return false
  const {
    value,
    expires
  } = JSON.parse(item)
  if (!expires || moment().isBefore(expires)) {
    return value
  }
  removeLocalStorage(name)
  return false
}
/**
 * 从缓存中移除name的值
 * @param {string} name  对象
 * @return {boolean|string|array|JSON}
 */
function removeLocalStorage (name) {
  localStorage.removeItem(name)
}
/**
 * 是否可以关闭当前路由 true可以关闭
 * @param {object} item  拥有meta的对象
 * @return {boolean}
 */
function isCloseRoute (item) {
  return !item.meta || !item.meta.notClosed
}
/**
 * 判断路由是否相等
 * @param {object} item  拥有meta的对象
 * @return {boolean}
 */
function isSameRoute (comparedRoute, compareRoute) {
  let param1 = comparedRoute.params || {}
  let query1 = comparedRoute.query || {}
  let name1 = comparedRoute.name
  let param2 = compareRoute.params || {}
  let query2 = compareRoute.query || {}
  let name2 = compareRoute.name
  // let openTab = !comparedRoute.meta || !comparedRoute.meta.notOpenTab // 判断可以打开标签页
  return name1 === name2 && isSameObjTool(param1, param2) && isSameObjTool(query1, query2)
}
/**
 * 选中那个标签页
 * @param {Array} list 标签页列表
 * @param {JSON} route 路由
 * @param {JSON|undefined} item 当前操作的标签页 不存在的时候为全部关闭
 * @returns {JSON} 返回路由对象
 */
function selectNavTab (list, route, item) {
  if (item) {
    const routeIndex = list.findIndex(v => isSameRoute(route, v))
    if (~routeIndex) {
      return route
    }
    const itemIndex = list.findIndex(v => isSameRoute(item, v))
    if (~itemIndex) {
      return item
    }
  }
  const len = list.length
  if (len > 0) {
    return list[len - 1]
  }
  return {
    path: '/'
  }
}

function getKey (vm) {
  let key = vm.key
  if (vm.$vnode) {
    key = vm.$vnode.key
  }
  return key
}

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
      obj[parentId].push({ ...items })
    } else {
      obj[parentId] = [{ ...items }]
    }
  })
  return obj
}
/**
 * 将数据根据父子级变成树结构
 * @param {JSON} obj 整理后的数据
 * @return {Array<JSON>} obj 整理后的数据
 */
function arrageObjToTree (obj, parentId = '0') {
  let arr = []
  let parentArr = obj[parentId]
  if (parentArr && parentArr.length > 0) {
    parentArr.forEach(v => {
      let idArr = obj[v.id]
      if (idArr && idArr.length > 0) {
        v.children = arrageObjToTree(obj, v.id)
      }
      arr.push(v)
    })
  }
  return arr
}
/**
 * 将数据变成树结构
 * @param {Array<JSON>} arr 数组数据[{parentId, id}]
 * @return {Array<JSON>} obj 整理后的数据 [{parentId, id, children}]
 */
function arrageDataToTree (arr, parentId = '0') {
  return arrageObjToTree(arrageArrToObj(arr), parentId)
}
function gradeChildren (list) {
  let nodes = []
  if (list) {
    let stack = list.map(v => v)
    // 广度优先遍历BFS
    let len = stack.length
    let l = len
    let lev = 0 // level
    let cur = 0 // 当前数组下标
    // 当前下标小于数组长度的时候
    while (cur < l) {
      let item = stack[cur]
      // 当前level小标下 未存在数组则增加一个小标数组，存在就添加一个数据
      if (nodes[lev]) {
        nodes[lev].push(item.name)
      } else {
        nodes[lev] = [item.name]
      }
      ++cur
      if (item.children && item.children.length > 0) {
        item.children.forEach(its => {
        // 核心 有子级就增加到栈中，并且长度加一
          stack.push(its)
          ++l
        })
      }
      // 当前数组下标 超出上一个数组的长度即为认定下一个level 那么level加1 长度与当前数据长度相同
      if (cur >= len) {
        ++lev
        len = l
      }
    }
  }
  return nodes
}
export {
  setToken, // 设置token
  getToken, // 获取token
  removeToken, // 移除token
  setTitle, // 设置title
  hasChildren, // 判断是否有属性children
  setLocalStorage, // 键值对塞到浏览器缓存中
  getLocalStorage, // 从缓存中获取name的值
  removeLocalStorage, // 从缓存中移除name的值
  isCloseRoute, // 是否可以关闭当前路由
  isSameRoute, // 判断路由是否相等
  selectNavTab, // 选中那个标签页
  getKey, // 得到子组件上的key值
  arrageArrToObj, // 整理数组parentId为键名键值为该值下的数组
  arrageObjToTree, // 将数据根据父子级变成树结构
  arrageDataToTree, // 将[{parentId, id}]数据转成树结构
  gradeChildren // 将树级结构的数据分级成二维数组
}
