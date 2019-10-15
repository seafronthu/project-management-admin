<!-- 路由管理 -->
<template>
  <ContainerFluid
    class="bg-color-f"
    full
    :spinning="spinning"
  >
    <div class="route-management flex-column flex-start-stretch height-full">
      <div class="route-management-top">
        <RouteOperation @trigger-add="handleAdd" />
      </div>
      <div class="route-management-container flex-1">
        <a-row type="flex" :gutter="24">
          <a-col :sm="14" :lg="10" :xs="24">
          <a-input-search
            style="margin-bottom: 8px"
            placeholder="Search"
          />
          <div class="left-menu-container flex-column flex-start-stretch flex-1">
            <h4 class="title">路由分组</h4>
            <div class="left-menu-content flex-1">
              <EditAntdMenu
                :edit-status="true"
                :menu-data="arrageData"
                @trigger-open="handleOpen"
                @trigger-click="handleClick"
                @trigger-edit="handleEdit"
                @trigger-select="handleSelect"
                :defaultOpenKeys="defaultOpenKeys"
                :openKeys="openKeys"
                :defaultSelectedKeys="defaultSelectedKeys"
                :selectedKeys="selectedKeys"
              />
            </div>
          </div>
          </a-col>
          <a-col :sm="10" :lg="14" :xs="24">
            <a-spin :spinning="rightSpinning">
             <OperateRoute :fields="fields" :routeInfo="routeInfo" @trigger-change="handleRouteParamsChange" @trigger-confirm="handleConfirm" />
            </a-spin>
          </a-col>
        </a-row>
        <!-- <div class="left-menu flex-column flex-start-stretch">
        </div> -->
        <!-- <div class="right-container flex-1">

        </div> -->
      </div>
    </div>
  </ContainerFluid>
</template>

<script>
import { EditAntdMenu } from '@business/edit-menu'
import { arrageDataToTree } from '@l/businessUtils'
import OperateRoute from './components/operate-route'
import { createRouteApi, updateRouteApi, getRouteApi } from '@/api'
import RouteOperation from './components/route-operation'
export default {
  data () {
    this.spinningTimer = null
    return {
      spinning: false, // 容器加载中……
      rightSpinning: false, // 模拟加载中……（这边虽然没有请求接口，但是让用户感觉在修改）
      defaultOpenKeys: [],
      openKeys: [],
      defaultSelectedKeys: [],
      selectedKeys: [],
      routeInfo: {
        parentId: '0'
      },
      fields: {
        // component: {},
        // title: {},
        // genre: {},
        // buttonType: {},
        // description: {}
      },
      routeList: []
    }
  },
  name: 'RouteManagement',
  computed: {
    arrageData () {
      let arr = this.routeList.map(v => {
        let obj = { ...v }
        obj.name = obj.component
        obj.trigger = [
          {
            type: 'update',
            name: '修改'
          },
          {
            type: 'insert',
            name: '添加子分组'
          },
          {
            type: 'delete',
            name: '删除'
          }
        ]
        return obj
      })
      return arrageDataToTree(arr, '0')
    }
  },
  components: {
    EditAntdMenu,
    OperateRoute,
    RouteOperation
  },
  methods: {
    getRoute () {
      this.spinning = true
      getRouteApi().then(res => {
        this.spinning = false
        if (res.code === 200) {
          this.routeList = res.data
        }
      })
    },
    handleOpen (openKeys) {
      this.openKeys = openKeys
    },
    handleClick ({ item, key, keyPath }) {
      // console.log({ item, key, keyPath })
    },
    handleSelect ({ item, key, keyPath }) {
      console.log({ item, key, keyPath })
    },
    handleAdd () {
      this.routeInfo = {
        parentId: '0'
      }
      this.fields = {
        component: '',
        title: '',
        genre: '',
        buttonType: '',
        description: ''
      }
    },
    // 增加
    handleInsert ({ item, key, keyPath, itemData }) {
      this.routeInfo = {
        parentId: itemData.id,
        component: itemData.component,
        title: itemData.title
      }
      this.fields = {
        component: '',
        title: '',
        genre: '',
        buttonType: '',
        description: ''
      }
    },
    // 修改
    handleUpdate ({ item, key, keyPath, itemData }) {
      let found = this.routeList.find((element) => itemData.parentId === element.id) || { parentId: '0' }
      this.routeInfo = {
        parentId: itemData.parentId,
        id: itemData.id,
        title: found.title,
        component: found.component
      }
      this.fields = {
        component: itemData.component,
        title: itemData.title,
        description: itemData.description,
        genre: itemData.genre,
        buttonType: itemData.buttonType
      }
    },
    // 删除
    handleDelete ({ item, key, keyPath, itemData }) {

    },
    // 路由操作
    handleEdit ({ item, key, keyPath, itemData }) {
      this.rightSpinning = true
      this.spinningTimer = setTimeout(() => {
        this.rightSpinning = false
      }, 1000)
      const handleMethod = `handle${key.replace(key[0], key[0].toUpperCase())}`
      this[handleMethod]({ item, key, keyPath, itemData })
    },
    // 路由参数修改
    handleRouteParamsChange (fields) {
      this.fields = {
        ...this.fields,
        ...fields
      }
    },
    // 保存修改路由权限
    handleConfirm ({ fields, routeInfo }) {
      const { id, parentId } = routeInfo
      const { component, title, description, genre, buttonType } = fields
      let $this = this
      let typeName = id ? '修改' : '新增'
      $this.$confirm({
        title: `你确定${typeName}路由权限吗？`,
        content: '请慎重操作',
        onOk () {
          if (id) { // 修改
            return updateRouteApi({ component, title, description, genre, buttonType, id }).then(res => {
              if (res.code === 200) {
                $this.succcessUpdate({ parentId, component, title, description, genre, buttonType, id })
                $this.$message.success('修改成功！')
              } else if (res.code) {
                $this.$message.warning(res.message)
              }
            })
          } else { // 添加
            return createRouteApi({ parentId, component, title, description, genre, buttonType }).then(res => {
              if (res.code === 200) {
                $this.successInsert({ parentId, component, title, description, genre, buttonType, id: res.data.id })
                $this.$message.success('保存成功！')
              } else if (res.code) {
                $this.$message.warning(res.message)
              }
            })
          }
        },
        onCancel () {}
      })
    },
    // 成功添加
    successInsert ({ parentId, component, title, description, genre, buttonType, id }) {
      const boo = this.routeList.some(v => v.id === id)
      if (!boo) {
        this.routeList.push({ parentId, component, title, description, genre, buttonType, id })
      }
    },
    // 成功更新
    succcessUpdate ({ parentId, component, title, description, genre, buttonType, id }) {
      const index = this.routeList.findIndex(v => v.id === id)
      this.routeList.splice(index, 1, { parentId, component, title, description, genre, buttonType, id })
    }
  },
  created () {
    this.getRoute()
  },
  beforeDestroy () {
    clearTimeout(this.spinningTimer)
    this.spinningTimer = null
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.route-management
  padding 15px
  .route-management-container
    .left-menu-container
      border 1px solid #dcdcdc
      overflow hidden
      .left-menu-content
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
      padding-left 15px
  .route-management-edit
    display none
  .edit-menu
    .edit-menu-title
      &:hover
        .route-management-edit
          display block
</style>
