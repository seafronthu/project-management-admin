<!-- 路由操作 -->
<template>
  <a-row type="flex" :gutter="24">
    <a-col
      :md="8"
      :sm="11"
      :xs="24"
    >
    <div class="margin-bottom-12">
      <a-select
        placeholder="请选择数据库"
        style="width: 100%;"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option
          value="disabled"
          disabled
        >Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
    </div>
    </a-col>
    <a-col
      :md="8"
      :sm="11"
      :xs="24"
    >
    <div class="margin-bottom-12">
      <a-button
        type="primary"
        icon="plus"
        @click="handleAdd"
      >新建路由分组</a-button>
    </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'RouteOperation',

  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    handleChange () {},
    handleAdd () {
      this.$emit('trigger-add')
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped></style>
