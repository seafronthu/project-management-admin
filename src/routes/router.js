import { Login } from './base'
const meta = {
  /**
   * @description 当前路由id
   */
  id: '',
  /**
   * @description 父级路由id
   */
  parentId: '',
  /**
   * @description 标题
   */
  title: '',
  /**
   * @description 图标
   */
  icon: '',
  /**
   * @description 跳转到其它网站
   */
  href: '',
  /**
   * @description 关闭标签页的回调
   */
  beforeCloseName: '',
  /**
   * @description 关键字用来搜索路由
   */
  keywords: '',
  /**
   * @description 类型页面还是操作等等 page button tab
   */
  genre: '',
  /**
   * @description 是否软删除
   */
  delete: '',
  /**
   * @description 权限
   */
  jurisdiction: '',
  /**
   * @description 是否可以关闭标签页
   */
  notClosed: false,
  /**
   * @description 是否放在缓存即keep-alive
   */
  notCache: false,
  /**
   * @description 同时是否只能打开一个标签页
   */
  notSinglePage: false,
  /**
   * @description 是否隐藏菜单栏
   */
  hideMenu: false
}
Login.meta = { ...meta, ...Login.meta }
const routes = [
  Login
]
export default routes
