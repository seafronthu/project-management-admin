<!-- antd的编辑菜单 -->
<template>
  <div class="edit-antd-menu">
    <a-menu
      :mode="mode"
      :theme="theme"
      @openChange="handleOpen"
      @click="handleClick"
      @select="handleSelect"
      :defaultOpenKeys="defaultOpenKeys"
      :openKeys="openKeys"
      :defaultSelectedKeys="defaultSelectedKeys"
      :selectedKeys="selectedKeys"
      class="not-select"
      style="border-right:none;"
    >
      <template v-for="items of menuData">
        <template v-if="hasChildren(items)">
          <!-- <SubItem
          v-if="isShowMenu(items)"
            :sub-menu-info="items"
            :key="items.name"
          /> -->
          <EditAntdSubmenu
            :sub-menu-info="items"
            :key="items.name"
          />
        </template>
        <template v-else>
          <a-menu-item
            :key="items.name"
            :disabled="items.disabled"
          >
            <EditAntdItem :item-data="items"/>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
// import SubItem from './sub-item.vue'
import EditAntdItem from './edit-antd-item'
import { hasChildren } from '@l/businessUtils'
import EditAntdSubmenu from './edit-antd-submenu.vue'
export default {
  name: 'EditAntdMenu',
  props: {
    mode: {
      type: String,
      default: 'inline'
    },
    theme: {
      type: String,
      default: 'light'
    },
    editStatus: {
      type: Boolean,
      default: false
    },
    menuData: Array,
    defaultSelectedKeys: Array,
    selectedKeys: Array, // 选中的menuitem
    openKeys: Array, // 展开的submenu
    cachedOpenKeys: Array // 缓存的submenu 防止菜单栏缩小的时候会自动展开二级菜单或者放大菜单栏 没有展开二级菜单
  },
  provide () {
    const { editStatus } = this
    return {
      edit: editStatus
    }
  },
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4']
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
    EditAntdItem,
    EditAntdSubmenu
  },

  computed: {
  },
  methods: {
    hasChildren: hasChildren,
    handleSelect ({ item, key, keyPath }) {
      this.$emit('trigger-seleted', { item, key, keyPath })
    },
    handleOpen (openKeys) {
      this.$emit('trigger-open', openKeys)
    },
    handleClick ({ item, key, keyPath }) {
      this.$emit('trigger-click', { item, key, keyPath })
    },
    handleEdit () {
      this.$emit('trigger-edit')
    }
  },
  created () {
  }
}
</script>
<style lang="stylus">
.edit-antd-menu
  .seat
    display inline-block
    width 15px
  .edit-antd-submenu-arrow
    position relative !important
    left 0 !important
    top -5px !important
    display inline-block
    margin-right 5px
  .edit-icon
    position absolute
    top 50%
    right 16px
    transform translateY(-50%)
</style>
