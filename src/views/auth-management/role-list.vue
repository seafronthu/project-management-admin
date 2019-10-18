<!-- 角色列表 -->
<template>
  <ContainerFluid
    class="bg-color-f role-list"
    full
  >
  <a-card :bordered="false">
    <a-form layout="inline" class="hhf-ant-form">
      <a-row :gutter="24">
        <a-col :md="8" :sm="24">
          <a-form-item label="角色ID">
            <a-input placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="账号">
            <a-input placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item>
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 8px">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item>
            <a-button type="primary" @click="handleAdd"><a-icon type="plus" />新增</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table :columns="columns" :scroll="{ x: 800 }" :dataSource="tableData" @expand="handleExpanded" class="role-list-table">
      <template #description="{description}">
        <div class="text-ellipsis" style="width: 100px;">{{description}}</div>
      </template>
      <!-- 操作 -->
      <template #operation="record">
      <span>
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
      </template>
      <!-- 展开内容 -->
      <template #expandedRowRender="record">
      <p v-if="record.user">{{record.user}}</p>
      <div v-else class="flex-row flex-center">
        <a-spin tip="Loading..."></a-spin>
      </div>
      </template>
    </a-table>
  </a-card>
  <OperateRoleModel :visible="visible" :fields="fields"/>
  </ContainerFluid>
</template>

<script>
import OperateRoleModel from './components/operate-role-model.vue'
const columns = [
  { title: '唯一识别码', dataIndex: 'id' },
  { title: '角色名称', dataIndex: 'name' },
  { title: '描述', key: 'description', scopedSlots: { customRender: 'description' } },
  { title: '创建者', dataIndex: 'creator' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

const tableData = [
  { key: 1, id: 'admin', name: '管理员', creator: 'Jack', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.', createTime: '2019-09-04 10:43' },
  { key: 2, id: 'svip', name: '超级会员', creator: 'Mark', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.', createTime: '2019-09-04 10:43' },
  { key: 3, id: 'vip', name: '普通会员', creator: 'Linda', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.', createTime: '2019-09-04 10:43' }
]
export default {
  name: 'RoleList',

  data () {
    return {
      columns,
      tableData,
      visible: false,
      fields: {
        id: '',
        name: '',
        description: '',
        createRoleNum: '',
        createUserNum: ''
      }
    }
  },

  components: {
    OperateRoleModel
  },

  computed: {},

  methods: {
    handleAdd () {
      this.visible = true
    },
    handleExpanded (expanded, record) {
      if (expanded && !record.user) {
        let index = this.tableData.findIndex(v => v.id === record.id)
        setTimeout(() => {
          let item = this.tableData[index]
          this.tableData.splice(index, 1, { ...item, user: '我是谁' })
        }, 50000)
      }
    },
    handleEdit (record) {
      console.log(record)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
// .role-list
//   .ant-form-item
//     display flex
//     margin-bottom 12px
//     margin-right 0px
//     .ant-form-item-label
//       width auto
//       padding 0 8px 0 0
//       line-height 39.9999px
//     .ant-form-item-control-wrapper
//       flex 1 1
  // .role-list-table
  //   .ant-table-content
  //     overflow-y auto
  //     .ant-table-body
  //       min-width 800px

</style>
