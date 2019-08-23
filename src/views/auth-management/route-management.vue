<!-- 路由管理 -->
<template>
  <ContainerFluid
    class="bg-color-f route-management"
    full
  >
    <div class="flex-row flex-start-stretch">
      <div class="left-menu">
        <h4 class="title">路由分组</h4>
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
      <div class="right-container flex-1"></div>
    </div>
  </ContainerFluid>
</template>

<script>
import { mapState } from 'vuex'
import { EditAntdMenu } from '@business/edit-menu'
import { arrageDataToTree } from '@l/businessUtils'
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
      console.log(arrageDataToTree(arr, '0'))
      return arrageDataToTree(arr, '0')
    }
  },
  components: {
    EditAntdMenu
  },
  methods: {
    handleOpen (openKeys) {
      this.openKeys = openKeys
    },
    handleClick ({ item, key, keyPath }) {
      console.log(11)
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
  .left-menu
    width 300px
    border 1px solid #dcdcdc
    .title
      text-align left
      font-weight bold
      padding 0 10px
      height 40px
      line-height 40px
      border-bottom 1px solid #dcdcdc
  .route-management-edit
    display none
  .edit-menu
    .edit-menu-title
      &:hover
        .route-management-edit
          display block
</style>
