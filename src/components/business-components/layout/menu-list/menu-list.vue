<!-- 菜单 -->
<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
      @openChange="onOpenChange"
    >
      <template v-for="items of menuList">
        <template v-if="isSubMenu(items)">
          <MenuListSubItem
          v-if="isShowMenu(items)"
            :sub-menu-info="items"
            :key="items.name"
          />
        </template>
        <template v-else>
          <a-menu-item v-if="isShowMenu(items)" :key="items.name">
            <a-icon :type="items.icon" /><span>{{items.title}}</span></a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import mixin from './mixin'
import MenuListSubItem from './menu-list-sub-item.vue'
export default {
  name: 'MenuList',
  mixins: [mixin],
  data () {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1']
    }
  },

  components: {
    MenuListSubItem
  },

  computed: {
  },

  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  },

  mounted () {}
}
</script>
<style lang="stylus"></style>
