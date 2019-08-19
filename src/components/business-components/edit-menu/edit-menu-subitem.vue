<!-- 路由二级菜单 -->
<template>
  <li>
    <div></div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'EditMenuSubitem',

  data () {
    return {
    }
  },
  inject: ['provideClick'],
  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
