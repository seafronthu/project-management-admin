<!-- api项目修改 -->
<template>
  <a-modal
    title="Basic Modal"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form>
      <a-form-item
        label='唯一识别码'
        v-bind="col"
      >
        <a-input
          v-model="fields.id"
          disabled
        />
      </a-form-item>
      <a-form-item
        label='项目名称'
        v-bind="col"
      >
        <a-input v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'name is required!' }],
              }
            ]" />
      </a-form-item>
      <a-form-item
        label='项目类型'
        v-bind="col"
      >
        <a-input v-decorator="[
              'type',
              {
                rules: [{ required: true, message: 'type is required!' }],
              }
            ]" />
      </a-form-item>
      <a-form-item
        label='描述'
        v-bind="col"
      >
        <a-textarea
          v-decorator="[
              'description',
              {
                rules: [{ required: true, message: 'description is required!' }],
              }
            ]"
          placeholder="Autosize height with minimum and maximum number of lines"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'ApiProjectEdit',
  model: {
    prop: 'visible',
    event: 'trigger-change'
  },
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

  components: {},

  computed: {},

  methods: {
    handleOk () {
      this.handleClose()
    },
    handleCancel () {
      this.handleClose()
    },
    handleClose () {
      this.$emit('trigger-change', false)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped></style>
