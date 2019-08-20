<!-- 路由菜单 -->
<template>
  <ul class="edit-menu no-ul">
    <slot></slot>
  </ul>
</template>

<script>
// import Vue from 'vue'
export default {
  name: 'EditMenu',
  provide () {
    // const keysObj = Vue.observable({ selectedKeys: this.selectedKeys, openKeys: this.openKeys })
    return {
      provideClick: this.handleClick, // 点击当前的菜单栏包括展开栏
      provideOpenChange: this.handleOpenChange, // 点击展开栏
      provideSelected: this.handleSelected, // 点击菜单栏
      keysObj: this.$props
    }
  },
  props: {
    selectedKeys: {
      type: Array,
      default: () => []
    },
    openKeys: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      mark: 1
    }
  },

  components: {
  },

  computed: {},
  watch: {
  },
  methods: {
    handleOpenChange (keys) {
      this.$emit('trigger-open-change', keys)
    },
    handleClick (key) {
      this.$emit('trigger-click', key)
    },
    handleSelected (keys) {
      this.$emit('trigger-selected', keys)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
