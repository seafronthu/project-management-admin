<!-- 布局祖级容器 -->
<template>
  <div class="layout flex-row">
    <a-layout class="layout-container">
      <a-layout-header
        class="layout-header"
        style="top:0;left:0;"
      >
        <TopHead>
          <FullScreen />
          <ErrorStore />
          <HeaderMessage />
          <HeaderUser />
        </TopHead>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :trigger="null"
          collapsible
          v-model="collapsed"
          theme="green"
          class="layout-sider"
        >
          <!-- <a-drawer
            :placement="left"
            :closable="false"
            @close="onClose"
            :visible="visible"
          > -->
            <MenuList
              :collapsed="collapsed"
              theme="green"
              :menu-list="menuList"
            />
          <!-- </a-drawer> -->
        </a-layout-sider>
        <a-layout
          class="layout-anim"
          :class="{'layout-anim-short': collapsed}"
        >
          <a-layout-header
            class="layout-header layout-anim layout-nav-tag"
            style="background-color:#ffffff;"
            :class="{'layout-anim-short': collapsed}"
          >
            <secondHead
              :collapsed="collapsed"
              @trigger-router="handleRouter"
              :breadcrumb-list="breadcrumbList"
              @trigger-collapse="(state)=> collapsed = state"
            />
            <TabNav
              :list="tabNavList"
              :value="tagChecked"
              @trigger-tag-click="handleTagClick"
              @trigger-tag-close="handleTagClose"
            />
          </a-layout-header>
          <a-layout style="padding-top:88px;">
            <!-- <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"> -->
            <a-layout-content>
              <transition :name="transitionName">
                <keep-alive>
                  <router-view />
                </keep-alive>
              </transition>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MenuList from './menu-list'
import TabNav from './tab-nav'
import TopHead from './top-head'
import SecondHead from './second-head'
import HeaderUser from './header-user'
import ErrorStore from './error-store'
import FullScreen from './full-screen'
import HeaderMessage from './header-message'
import { mapGetters, mapState, mapMutations } from 'vuex'
// isCloseRoute判断meta中是否不允许关闭标签栏（notClose: true） isSameRoute 判断meta是否不是单页(notSinglePage: true) 并且name包括query和param都相同
import { isCloseRoute, isSameRoute, selectNavTab } from '@l/businessUtils'
import config from '@/config'
export default {
  name: 'Layout',

  data () {
    return {
      collapsed: false,
      tagChecked: {}, // 当前选中的标签页
      breadcrumbList: [] // 面包屑
    }
  },
  computed: {
    ...mapState({
      tabNavList: state => state.app.tabNavList
    }),
    ...mapGetters(['menuList'])
  },

  watch: {
    '$route': {
      handler (to, from) {
        const { tabNavList } = this
        const { name, query, params, meta } = to
        const newTag = { name, query, params, meta }
        if (!tabNavList.some(v => v.name === name)) {
          this.APP_SETTABNAVLIST_MUTATE([...tabNavList, newTag])
        }
        this.tagChecked = newTag
        let breadcrumb = to.meta && to.meta.breadcrumb
        this.breadcrumbList = [{ name: config.homeName, key: config.homeName, icon: 'home', title: '首页' }, ...(breadcrumb || [])]
      },
      immediate: true
    }
  },
  components: {
    MenuList,
    TabNav,
    TopHead,
    SecondHead,
    HeaderUser,
    ErrorStore,
    FullScreen,
    HeaderMessage
  },

  methods: {
    ...mapMutations(['APP_SETTABNAVLIST_MUTATE']),
    // 当关闭标签页的时候跳转页面
    goToPageFunc (list, route, item) {
      let router = selectNavTab(list, route, item)
      if (isSameRoute(router, this.$route)) {
        this.tagChecked = { ...router } // 为了触发偏移事件（组件TabNav有监听事件）
        return
      }
      this.$router.push(router)
    },
    // 点击标签页
    handleTagClick (item) {
      this.$router.push({ name: item.name })
    },
    // 关闭标签页
    // 操作的标签页 item  操作类型type
    handleTagClose ({ item, type, index }) {
      let { tabNavList } = this
      let beforeArr = []
      let afterArr = []
      switch (type) {
        case 'closeCurrent':
          tabNavList = tabNavList.filter(v => !isSameRoute(item, v))
          break
        case 'closeAll':
          tabNavList = tabNavList.filter(v => !isCloseRoute(v))
          break
        case 'closeLeft':
          beforeArr = tabNavList.slice(0, index)
          afterArr = tabNavList.slice(index)
          beforeArr = beforeArr.filter(v => !isSameRoute(item, v) && !isCloseRoute(v))
          tabNavList = [...beforeArr, ...afterArr]
          break
        case 'closeRight':
          beforeArr = tabNavList.slice(0, index)
          afterArr = tabNavList.slice(index)
          afterArr = afterArr.filter(v => isSameRoute(item, v) || !isCloseRoute(v))
          tabNavList = [...beforeArr, ...afterArr]
          break
        case 'closeOther':
          tabNavList = tabNavList.filter(v => isSameRoute(item, v) || !isCloseRoute(v))
          break
      }
      this.APP_SETTABNAVLIST_MUTATE(tabNavList)
      this.goToPageFunc(tabNavList, this.$route, item)
    },
    handleResize () {
      this.tagChecked = { ...this.tagChecked }// 为了触发偏移事件（组件TabNav有监听事件）
    },
    handleRouter (name) {
      this.$router.push({ name })
    }
  },
  created () {
    // window.addEventListener('popstate', (e) => {
    //   console.log(e)
    // })
    // document.body.classList.add('bgcolor-f2')
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    // document.body.classList.remove('bgcolor-f2')
  }
}
</script>
<style lang="stylus" scoped>
.layout
  min-height 100vh
  overflow-x hidden
  .layout-container
    padding-top 45px
    background-color #f5f7f9
  .layout-header
    padding 0
    height auto
    line-height normal
    position fixed
    width 100%
    z-index 91
    &.layout-nav-tag
      left 0
      top 44px
      z-index 89
  .layout-sider
    position fixed
    left 0
    top 0
    z-index 90
    height 100vh
    box-sizing border-box
    padding-top 45px
  .layout-anim
    padding-left 200px
    width 100vw
    transition padding 0.15s ease-in-out
    &.layout-anim-short
      padding-left 80px
      transition padding 0.25s cubic-bezier(0.215, 0.61, 0.355, 1)
</style>
