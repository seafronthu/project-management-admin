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

    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'CreateRole',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      confirmLoading: false, // 点击ok是否加载
      form: null
    }
  },

  components: {},

  computed: {},

  methods: {
    handleOk () {

    },
    cancel () {}
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
