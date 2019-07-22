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
      return hasChildren(items)
    }
  }
}
