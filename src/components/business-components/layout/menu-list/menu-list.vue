<!-- 菜单 -->
<template>
  <div>
    <a-menu
      mode="inline"
      :theme="theme"
      @openChange="onOpenChange"
      @click="handleRouter"
      :defaultOpenKeys="[]"
      :openKeys="openKeys"
      :defaultSelectedKeys="[]"
      :selectedKeys="selectedKeys"
      class="not-select"
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
            <a-icon :type="items.icon" /><span>{{items.title}}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import mixin from './mixin'
// import SubItem from './sub-item.vue'
import SubItemFunctional from './sub-item-functional.vue'
export default {
  name: 'MenuList',
  mixins: [mixin],
  props: {
    theme: String
  },
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      defaultSelectedKeys: [],
      selectedKeys: [], // 选中的menuitem
      openKeys: [] // 展开的submenu
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
    SubItemFunctional
  },

  computed: {
  },
  watch: {
    '$route': {
      handler () {
        this.handleSelected()
      },
      immediate: true
    }
  },
  methods: {
    handleSelected () {
      const {
        name,
        matched,
        meta
      } = this.$route
      if (meta.hideMenu) { // 菜单栏是隐藏的
        return
      }
      // 选中的menu-item
      const len = matched.length
      const openKeys = [] // 选中的sub-menu
      if (len > 1) {
        for (let i = 1; i < len - 1; ++i) {
          const items = matched[i]
          if (!items.meta || !items.meta.hideMenu) {
            openKeys.push(items.name)
          }
        }
        this.openKeys = openKeys
        let vals = matched[len - 1]
        if (!vals.meta || !vals.meta.hideMenu) {
          this.selectedKeys = [name]
        }
      }
    },
    onOpenChange (openKeys) {
      this.openKeys = openKeys
      // const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      //   this.openKeys = openKeys
      // } else {
      //   this.openKeys = latestOpenKey ? [latestOpenKey] : []
      // }
    },
    handleRouter ({ item, key, keyPath }) {
      this.$router.push({
        name: key
      })
    }
  },
  created () {
  }
}
</script>
<style lang="stylus"></style>
