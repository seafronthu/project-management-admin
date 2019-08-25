<!-- 路由管理 -->
<template>
  <ContainerFluid
    class="bg-color-f"
    full
  >
    <div class="route-management flex-column flex-start-stretch height-full">
      <div class="route-management-top"></div>
      <div class="route-management-container flex-row flex-start-stretch flex-1">
        <div class="left-menu flex-column flex-start-stretch">
        <a-input-search style="margin-bottom: 8px" placeholder="Search" />
        <div class="left-menu-container flex-column flex-start-stretch flex-1">
          <h4 class="title">路由分组</h4>
          <div class="left-menu-content flex-1">
          <EditAntdMenu
            :edit-status ="true"
            :menu-data="arrageData"
            @trigger-open="handleOpen"
            @trigger-click="handleClick"
            @trigger-select="handleSelect"
            :defaultOpenKeys="defaultOpenKeys"
            :openKeys="openKeys"
            :defaultSelectedKeys="defaultSelectedKeys"
            :selectedKeys="selectedKeys"
          />
          </div>
        </div>
        </div>
        <div class="right-container flex-1">
          <EditRoute/>
        </div>
      </div>
    </div>
  </ContainerFluid>
</template>

<script>
import { mapState } from 'vuex'
import { EditAntdMenu } from '@business/edit-menu'
import { arrageDataToTree } from '@l/businessUtils'
import EditRoute from './components/edit-route'
export default {
  data () {
    return {
      defaultOpenKeys: [],
      openKeys: [],
      defaultSelectedKeys: [],
      selectedKeys: []
    }
  },
  name: 'RouteManagement',
  computed: {
    ...mapState({
      authorizationList: state => state.app.authorizationList
    }),
    arrageData () {
      let arr = this.authorizationList.map(v => {
        let obj = { ...v }
        obj.name = obj.component
        return obj
      })
      return arrageDataToTree(arr, '0')
    }
  },
  components: {
    EditAntdMenu,
    EditRoute
  },
  methods: {
    handleOpen (openKeys) {
      this.openKeys = openKeys
    },
    handleClick ({ item, key, keyPath }) {
      // console.log({ item, key, keyPath })
    },
    handleSelect ({ item, key, keyPath }) {
      console.log({ item, key, keyPath })
    }
  }
}
</script>
<style lang="stylus" scoped>
.route-management
  padding 15px
  .route-management-top
    height 50px
  .route-management-container
    .left-menu
      padding 10px 0
      width 400px
      .left-menu-container
        border 1px solid #dcdcdc
        overflow hidden
        height 0
        .left-menu-content
          height 0
          overflow-x hidden
          overflow-y auto
      .title
        text-align left
        font-weight bold
        padding 0 10px
        height 40px
        margin-bottom 0
        line-height 40px
        border-bottom 1px solid #dcdcdc
    .right-container
      padding-left 15px;
  .route-management-edit
    display none
  .edit-menu
    .edit-menu-title
      &:hover
        .route-management-edit
          display block

</style>
