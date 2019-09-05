<!-- 顶部导航 -->
<template>
  <div class="top-head flex-row flex-between-center height-full">
    <div class="top-head-left">
      <slot name="left"></slot>
    </div>
    <div class="flex-1 height-full flex-row flex-end-stretch" style="padding: 0 15px;">
      <slot name="right"></slot>
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
  .top-head-left
    height 100%
</style>
