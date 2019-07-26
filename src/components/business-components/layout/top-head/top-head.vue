<!-- 顶部导航 -->
<template>
  <div class="top-nav">
    <!-- collapsed按钮 -->
    <a href="javascript: void 0">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="handleCollapsed"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'TopHead',
  props: {
    collapsed: Boolean
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    handleCollapsed () {
      this.$emit('trigger-collapse', !this.collapsed)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.top-nav
  .trigger
    font-size 18px
    line-height 64px
    padding 0 24px
    cursor pointer
    transition color 0.3s
    &:hover
      color #1890ff
</style>
