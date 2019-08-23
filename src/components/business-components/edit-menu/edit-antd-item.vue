<!-- 菜单栏 -->
<template>
  <span>
    <template v-if="edit">
      <i class="ant-menu-submenu-arrow edit-antd-submenu-arrow"></i>
      <a-icon
        type="bars"
        class="edit-icon"
      />
      <span>{{itemData.title}}</span>
    </template>
    <template v-else>
      <a-icon :type="itemData.icon" />
      <span>{{itemData.title}}</span>
    </template>
  </span>
</template>

<script>
export default {
  name: 'EditAntdItem',
  props: {
    itemData: Object
  },
  data () {
    return {
    }
  },
  inject: ['edit'],
  components: {},

  computed: {},

  methods: {},

  mounted () {
    console.log(this.edit, '1111')
  }
}
</script>
<style lang="stylus" scoped></style>
