<!-- 路由操作 -->
<template>
  <a-row>
    <a-col :span="5">
    <a-select placeholder="请选择数据库" style="width: 100%;" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    </a-col>
    <a-col :span="1"></a-col>
    <a-col :span="4">
      <a-button type="primary" icon="plus">新建路由分组</a-button>
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

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
