<!-- 路由管理 -->
<template>
<ContainerFluid class="bg-color-f route-management">
  <div class="flex-row flex-start-stretch">
  <div class="left-menu">
    <h4 class="title">路由分组</h4 >
    <EditMenu @trigger-open-change="handleOpenChange" :openKeys="openKeys" :selectedKeys="selectedKeys">
      <EditMenuItem key="item-1"/>
      <EditMenuSubitem key="subitem-1">
        <EditMenuItem key="item-2"/>
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
