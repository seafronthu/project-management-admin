<!-- 路由管理 -->
<template>
  <ContainerFluid class="bg-color-f route-management" full>
    <div class="flex-row flex-start-stretch">
      <div class="left-menu">
        <h4 class="title">路由分组</h4>
        <EditMenu
          @trigger-open-change="handleOpenChange"
          :openKeys="openKeys"
          :selectedKeys="selectedKeys"
        >
          <EditMenuItem
            key="item-2"
            title="itemitemitemitemitemitem"
          >
            <template v-slot:right>
            <a-dropdown>
              <a-icon type="bars" />
              <a-menu slot="overlay">
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">3rd menu item</a-menu-item>
              </a-menu>
            </a-dropdown>
            </template>
          </EditMenuItem>
          <EditMenuSubitem
            key="subitem-1"
            title="subitemsubitemsubitemsubitem"
          >
            <EditMenuItem
              key="item-3"
              title="itemitemitemitemitemitem111"
            >
            <template v-slot:right>
              <a-dropdown>
                <a-icon type="bars" />
                <a-menu slot="overlay">
                  <a-menu-item key="1">1st menu item</a-menu-item>
                  <a-menu-item key="2">2nd menu item</a-menu-item>
                  <a-menu-item key="3">3rd menu item</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
            </EditMenuItem>
            <template v-slot:right>
              <a-dropdown>
                <a-icon type="bars" />
                <a-menu slot="overlay">
                  <a-menu-item key="1">1st menu item</a-menu-item>
                  <a-menu-item key="2">2nd menu item</a-menu-item>
                  <a-menu-item key="3">3rd menu item</a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </EditMenuSubitem>
        </EditMenu>
      </div>
      <div class="right-container flex-1"></div>
    </div>
  </ContainerFluid>
</template>

<script>
import { EditMenu, EditMenuSubitem, EditMenuItem } from '@business/edit-menu'
export default {
  data () {
    return {
      selectedKeys: [],
      openKeys: []
    }
  },
  name: 'RouteManagement',
  components: {
    EditMenu,
    EditMenuSubitem,
    EditMenuItem
  },
  methods: {
    handleOpenChange (keys) {
      console.log(keys)
      this.openKeys = keys
    },
    handleSelected (keys) {
      this.selectedKeys = keys
    }
  }
}
</script>
<style lang="stylus" scoped>
.route-management
  .left-menu
    width 240px
    border 1px solid #dcdcdc
    .title
      text-align left
      font-weight bold
      padding 0 10px
      height 40px
      line-height 40px
      border-bottom 1px solid #dcdcdc
</style>
