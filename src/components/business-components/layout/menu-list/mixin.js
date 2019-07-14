import { hasChildren } from '@l/businessUtils'
export default {
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    subMenuInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 是否显示菜单栏
    isShowMenu (items) {
      return !items.meta || !items.meta.hideMenu
    },
    // 是否是多级菜单
    isSubMenu (items) {
      console.log('是方法', items, hasChildren(items), items.children && items.children.length > 0)
      return hasChildren(items)
    }
  }
}
