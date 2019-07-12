export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'project-management-admin',
  /**
   * @description Cookie中储存的键名
   */
  cookieTokenName: 'project-management-admin-token',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 30,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  /**
   * @description 公钥
   */
  publicKey: '',
  /**
   * @description 私钥
   */
  privateKey: '',
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '',
    pro: 'http://api.seafronthu.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'Home',
  /**
   * @description 初始页为登录页
   */
  initialPageName: 'Login',
  /**
   * @description 一些不用登陆的页面
   */
  notLoginPageName: ['Login'],
  /**
   * @description 路由localStorage名字
   */
  routerStorage: 'api-admin-routes',
  /**
   * @description 路由localStorage名字
   */
  menuStorage: 'api-admin-menu',
  /**
   * @description 打开的标签页窗口缓存
   */
  tabNavStorage: 'api-admin-tabNav',
  /**
   * @description 用户权限列表
   */
  authorizationStorage: 'api-admin-authorization',
  /**
   * @description 需要加载的插件
   */
  plugins: {
    'tips': {
      isOff: true // 是否开启
    }
  }
}
