<!-- 二级头 -->
<template>
    <div class="second-head flex-row flex-start-center">
      <a class="trigger" href="javascript: void 0">
        <a-icon
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="handleCollapsed"
        />
      </a>
      <HeadBreadcrumb @trigger-click="handleRouter" :list="breadcrumbList"/>
    </div>
</template>

<script>
import HeadBreadcrumb from './head-breadcrumb'
export default {
  name: 'SecondHead',
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

  computed: {},

  methods: {
    handleCollapsed () {
      this.$emit('trigger-collapse', !this.collapsed)
    },
    handleRouter (name) {
      this.$emit('trigger-router', name)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.second-head
  .trigger
    font-size 18px
    line-height 48px
    padding 0 24px
    cursor pointer
    // transition color 0.3s
    // &:hover
    //   color #1890ff
</style>
