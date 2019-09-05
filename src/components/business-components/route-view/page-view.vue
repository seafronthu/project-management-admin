<!-- 路由祖级菜单的路由用来做keep-alive -->
<template>
  <!-- <keep-alive :include="cacheList"> -->
    <router-view></router-view>
  <!-- </keep-alive> -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageView',

  data () {
    return {
    }
  },

  components: {},

  computed: {
    ...mapState({
      tabNavList: state => state.app.tabNavList
    }),
    cacheList () {
      console.log(['ParentView', ...this.tabNavList.length ? this.tabNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []])
      return ['ParentView', ...this.tabNavList.length ? this.tabNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    }
  },

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
