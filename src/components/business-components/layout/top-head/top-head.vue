<!-- 顶部导航 -->
<template>
  <div class="top-head flex-row flex-between-center">
    <div class="logo" />
    <div class="flex-1">
      <slot></slot>
    </div>
    <!-- collapsed按钮 -->
  </div>
</template>
<script>
export default {
  name: 'TopHead',
  props: {
  },
  data () {
    return {
    }
  },

  components: {
  },

  methods: {
  },

  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.top-head
  background-color #108ee9
  .logo
    width 168px
    height 32px
    background rgba(255, 255, 255, 0.2)
    margin 16px
</style>
