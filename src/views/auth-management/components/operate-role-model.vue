<!-- 创建角色 -->
<template>
  <a-modal
      title="创建角色"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
    <a-form>
      <a-form-item label='唯一识别码' v-bind="col">
        <a-input
        v-model="fields.id"
        disabled
        />
      </a-form-item>
      <a-form-item label='角色名称' v-bind="col">
        <a-input
        v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'name is required!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='描述' v-bind="col">
        <a-input
        v-decorator="[
              'description',
              {
                rules: [{ required: true, message: 'description is required!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='可创建角色数' v-bind="col">
        <a-input
        v-decorator="[
              'createRoleNum',
              {
                rules: [{ required: true, message: 'createRoleNum is required!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='可创建用户数' v-bind="col">
        <a-input
        v-decorator="[
              'createUserNum',
              {
                rules: [{ required: true, message: 'createUserNum is required!' }],
              }
            ]"
        />
      </a-form-item>
      <a-form-item label='菜单' v-bind="col">
        <ChangeOperationAuth v-model="checkedKeys" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import ChangeOperationAuth from './change-operation-auth'
export default {
  name: 'OperateRole',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      confirmLoading: false, // 点击ok是否加载
      form: null,
      checkedKeys: [],
      col: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    }
  },

  components: {
    ChangeOperationAuth
  },

  computed: {},

  methods: {
    handleOk () {
      this.checkedKeys = ['0-0-0']
      console.log(this.checkedKeys)
    },
    handleCancel () {}
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
