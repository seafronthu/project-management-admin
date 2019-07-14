<!-- 布局祖级容器 -->
<template>
  <div class="layout flex-row">
    <a-layout class="layout-container">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo" />
        <MenuList :menu-list="menuList"/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          <transition :name="transitionName">
            <keep-alive :include="cacheList">
              <router-view />
            </keep-alive>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MenuList from './menu-list'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',

  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    ...mapGetters(['menuList'])
  },

  watch: {
  },
  components: {
    MenuList
  },

  methods: {
  },
  created () {
    // window.addEventListener('popstate', (e) => {
    //   console.log(e)
    // })
    // document.body.classList.add('bgcolor-f2')
  },
  mounted () {
    console.log(this)
  },
  beforeDestroy () {
    // document.body.classList.remove('bgcolor-f2')
  }
}
</script>
<style lang="stylus" scoped>
.layout
  height 100%
  .layout-container
    height 100%
  .trigger
    font-size 18px
    line-height 64px
    padding 0 24px
    cursor pointer
    transition color 0.3s
    &:hover
      color #1890ff
  .logo
    height 32px
    background rgba(255, 255, 255, 0.2)
    margin 16px
</style>
