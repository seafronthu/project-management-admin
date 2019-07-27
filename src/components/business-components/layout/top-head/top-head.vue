<!-- 顶部导航 -->
<template>
  <div class="top-nav flex-row flex-between-center">
    <div class="flex-row flex-start-center">
      <a href="javascript: void 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="handleCollapsed"
        />
      </a>
      <HeadBreadcrumb @trigger-click="handleRouter" :list="breadcrumbList"/>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
    <!-- collapsed按钮 -->
  </div>
</template>
<script>
import HeadBreadcrumb from './head-breadcrumb'
import { setTimeout } from 'timers'
export default {
  name: 'TopHead',
  props: {
    collapsed: Boolean,
    breadcrumbList: Array
  },
  data () {
    return {
    }
  },

  components: {
    HeadBreadcrumb
  },

  methods: {
    handleCollapsed () {
      this.$emit('trigger-collapse', !this.collapsed)
    },
    handleRouter (name) {
      this.$emit('trigger-router', name)
    }
  },

  mounted () {
    setTimeout(() => {
      console.log(this.breadcrumbList)
    }, 2000)
  }
}
</script>
<style lang="stylus" scoped>
.top-nav
  .trigger
    font-size 18px
    line-height 64px
    padding 0 24px
    cursor pointer
    // transition color 0.3s
    // &:hover
    //   color #1890ff
</style>
