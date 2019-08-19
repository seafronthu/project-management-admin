<!-- 路由菜单栏 -->
<template>
  <li class="flex-row flex-between-center edit-menu-item">
    <div>
    <span>icon</span>
    <span>item</span>
    </div>
    <div class="edit-menu-item-operate">
      <span>icon</span>
      <ul class="no-ul flex-column flex-start-stretch">
        <li>添加</li>
        <li>编辑</li>
        <li>删除</li>
        </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: 'EditMenuItem',

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
