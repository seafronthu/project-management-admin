<!-- 菜单 -->
<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
      @openChange="onOpenChange"
      @click="handleRouter"
      :defaultSelectedKeys="defaultSelectedKeys"
      :defaultOpenKeys="defaultOpenKeys"
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
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      defaultSelectedKeys: [],
      defaultOpenKeys: []
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

  methods: {
    handleSelected () {
      const {
        name,
        matched
      } = this.$route
      this.defaultSelectedKeys = [name] // 选中的menu-item
      const len = matched.length
      const defaultOpenKeys = [] // 选中的sub-menu
      if (len > 1) {
        for (let i = 0; i < len - 1; ++i) {
          defaultOpenKeys.push(matched[i].name)
        }
        this.defaultOpenKeys = defaultOpenKeys
      }
    },
    onOpenChange (openKeys) {

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
    this.handleSelected(this.$route.name)
  }
}
</script>
<style lang="stylus"></style>
