<!-- 菜单 -->
<template>
  <a-layout-sider
    :class="['layout-sider',`layout-sider-${themeColor}`]"
    :trigger="null"
    :theme="theme"
    :width="width"
    :collapsible="collapsible"
    v-model="collapsed"
  >
    <Logo />
      <!-- :inlineCollapsed="collapsed" -->
    <a-menu
      mode="inline"
      :theme="theme"
      @openChange="onOpenChange"
      @click="handleRouter"
      :defaultOpenKeys="[]"
      :openKeys="openKeys"
      :defaultSelectedKeys="[]"
      :selectedKeys="selectedKeys"
      :class="['not-select',`menu-${themeColor}`]"
    >
      <template v-for="items of menuList">
        <template v-if="isSubMenu(items)">
          <!-- <SubItem
          v-if="isShowMenu(items)"
            :sub-menu-info="items"
            :key="items.name"
          /> -->
          <SubItemFunctional
            v-if="isShowMenu(items)"
            :sub-menu-info="items"
            :key="items.name"
          />
        </template>
        <template v-else>
          <a-menu-item
            v-if="isShowMenu(items)"
            :key="items.name"
          >
            <a-icon
              v-if="items.icon"
              :type="items.icon"
            /><span>{{items.title}}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import mixin from './mixin'
import Logo from '../logo'
// import SubItem from './sub-item.vue'
import SubItemFunctional from './sub-item-functional.vue'
export default {
  name: 'MenuList',
  mixins: [mixin],
  props: {
    width: String,
    themeColor: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuList: Array
  },
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      defaultSelectedKeys: [],
      selectedKeys: [], // 选中的menuitem
      openKeys: [], // 展开的submenu
      cachedOpenKeys: [], // 缓存的submenu 防止菜单栏缩小的时候会自动展开二级菜单或者放大菜单栏 没有展开二级菜单
      levelMenu: [] // 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   this.defaultSelectedKeys = [to.name]
  //   console.log(to.name, this.defaultSelectedKeys)
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   next()
  // },
  components: {
    // SubItem
    Logo,
    SubItemFunctional
  },

  computed: {
  },
  watch: {
    collapsed (bol) {
      if (bol) {
        this.cachedOpenKeys = [...this.openKeys]
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route': {
      handler (val) {
        this.handleSelected()
      },
      immediate: true
    }
  },
  methods: {
    handleSelected () {
      const {
        name,
        meta,
        meta: {
          matched
        }
      } = this.$route
      if (meta.hideMenu) { // 菜单栏是隐藏的
        this.selectedKeys = []
        this.openKeys = []
        this.cachedOpenKeys = []
        return
      }
      // 选中的menu-item
      const len = (matched && matched.length) || 0
      const openKeys = [] // 选中的sub-menu
      if (len > 1) {
        for (let i = 0; i < len - 1; ++i) {
          const items = matched[i]
          if (!items.meta || !items.meta.hideMenu) {
            openKeys.push(items.name)
          }
        }
        // 防止缩小菜单栏每次路由改变会展开二级菜单
        this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
      } else {
        this.cachedOpenKeys = openKeys
        this.openKeys = openKeys
      }
      // let vals = matched[len - 1]
      if (!meta || !meta.hideMenu) {
        this.selectedKeys = [name]
      }
    },
    onOpenChange (openKeys) {
      console.log(this.menuList)
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      // console.log(openKeys, latestOpenKey)
      // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys
      // } else {
      //   this.openKeys = latestOpenKey ? [latestOpenKey] : []
      // }
      // this.openKeys = latestOpenKey ? [latestOpenKey] : []
    },
    handleRouter ({ item, key, keyPath }) {
      this.$emit('trigger-router')
      this.$router.push({
        name: key
      })
    },
    levalMenuFunc (menuList) {
      let nodes = []
      let stack = menuList.map(v => v)
      if (menuList) {
      // 广度优先遍历BFS
        while (stack.length > 0) {
          let item = stack.shift()
          nodes.push(item.name)
          if (item.children && item.children.length > 0) {
            item.children.forEach(its => {
              stack.push(its)
            })
          }
        }
      }
    }
  },
  created () {
  }
}
</script>
<style lang="stylus">
.layout-sider
  position fixed
  left 0
  top 0
  z-index 90
  height 100vh
  box-sizing border-box
</style>
