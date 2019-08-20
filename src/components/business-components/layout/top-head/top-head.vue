<!-- 顶部导航 -->
<template>
  <div class="top-head flex-row flex-between-center height-full">
    <div class="logo-container">
      <div class="logo" />
    </div>
    <div class="flex-1 height-full flex-row flex-end-stretch" style="padding: 0 15px;">
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
  height 45px
  line-height 35px
  background-color #008678
  .logo-container
    width 200px
    height 100%
    padding 5px 10px
    .logo
      height 100%
      background rgba(255, 255, 255, 0.2)
</style>
