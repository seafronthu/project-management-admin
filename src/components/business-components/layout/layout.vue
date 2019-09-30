<!-- 布局祖级容器 -->
<template>
  <div class="layout flex-row">
    <a-layout class="layout-container">
      <a-layout-header
        class="layout-header"
        style="top:0;left:0;"
      >
        <TopHead>
          <template #left>
            <Logo v-if="!isMobile" />
          </template>
          <template #right>
            <FullScreen />
            <ErrorStore />
            <HeaderMessage />
            <HeaderUser :info="userInfo"/>
          </template>
        </TopHead>
      </a-layout-header>
      <a-layout>
        <a-drawer
          v-if="isMobile"
          wrapClassName="layout-drawer"
          placement="left"
          :closable="false"
          @close="handleClose"
          :visible="collapsed"
        >
            <MenuList
            theme-color="green"
              :width="siderWidth"
              :collapsed="false"
              :collapsible="true"
              @trigger-router="handleMenuSelect"
              :menu-list="menuList"
            />
        </a-drawer>
          <MenuList
            v-else
            theme-color="green"
            :width="siderWidth"
            :collapsed="collapsed"
            :collapsible="true"
            :menu-list="menuList"
          />
        <a-layout
          class="layout-anim"
          :class="{'layout-anim-short': collapsed}"
          :style="layoutLeft"
        >
          <a-layout-header
            class="layout-header layout-anim layout-nav-tag"
            style="background-color:#ffffff;"
            :class="{'layout-anim-short': collapsed}"
            :style="layoutLeft"
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
              <transition name="page-slide-fade">
                <keep-alive :include="cacheList">
                  <router-view/>
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
import Logo from './logo'
import HeaderMessage from './header-message'
import { deviceMixin } from '@l/mixin'
import { mapGetters, mapState, mapMutations } from 'vuex'
// isCloseRoute判断meta中是否不允许关闭标签栏（notClose: true） isSameRoute 判断meta是否不是单页(notSinglePage: true) 并且name包括query和param都相同
import { isCloseRoute, isSameRoute, selectNavTab } from '@l/businessUtils'
import config from '@/config'
export default {
  name: 'Layout',
  mixins: [deviceMixin],
  data () {
    return {
      collapsed: false,
      siderWidth: '256px', // menu和左边距大小
      tagChecked: {}, // 当前选中的标签页
      initBreadcrumb: [],
      breadcrumbList: [] // 面包屑
    }
  },
  computed: {
    ...mapState({
      tabNavList: state => state.app.tabNavList,
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['menuList', 'routerList']),
    layoutLeft () {
      let paddingLeft
      if (!this.isMobile) {
        paddingLeft = this.collapsed ? '80px' : this.siderWidth
        return { 'padding-left': paddingLeft }
      }
      return null
    },
    // 是否是其它设备（除了手机和台式之外的设备）
    isOtherDevice () {
      return !this.isMobile && !this.isDesktop
    },
    // 缓存列表
    cacheList () {
      return [...this.tabNavList.length ? this.tabNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    }
  },

  watch: {
    '$route': {
      handler (to, from) {
        if (to.name === 'ReplacePage') {
          // 刷新当前路由
          this.$router.back()
          return
        }
        const { tabNavList } = this
        const { name, query, params, meta } = to
        const newTag = { name, query, params, meta }
        if (!tabNavList.some(v => v.name === name) && !meta.notOpenTab) {
          this.APP_SETTABNAVLIST_MUTATE([...tabNavList, newTag])
        }
        this.tagChecked = newTag
        let breadcrumb = config.homeName[0] === name ? [] : meta && meta.breadcrumb
        this.breadcrumbList = [...this.initBreadcrumb, ...(breadcrumb || [])]
      }
    },
    isOtherDevice: {
      handler (val) {
        this.collapsed = val
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
    Logo,
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
        case 'refresh':
          this.$router.push({ name: 'ReplacePage' })
          return
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
    },
    // 手机端关闭menu抽屉触发
    handleClose () {
      this.collapsed = false
    },
    // 手机端点击menu触发
    handleMenuSelect () {
      if (this.isMobile) {
        this.collapsed = false
      }
    },
    // 首次加载的时候存入 tabnav 和 breadcrumbList的数据
    handleFirstLoading () {
      const { name, query, params, meta } = this.$route
      let homeInfoArr = this.routerList.filter(v => config.homeName.includes(v.name) || (v.name === name && !meta.notOpenTab))
      const newTag = { name, query, params, meta }
      this.APP_SETTABNAVLIST_MUTATE([...homeInfoArr])
      this.tagChecked = newTag
      this.initBreadcrumb = homeInfoArr.filter(v => config.homeName[0] === v.name).map(v => ({ name: v.name, ...v.meta, key: v.name }))
      let breadcrumb = config.homeName[0] === name ? [] : meta && meta.breadcrumb
      this.breadcrumbList = [...this.initBreadcrumb, ...(breadcrumb || [])]
    }
  },
  created () {
    this.handleFirstLoading()
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
<style lang="stylus">
.layout-drawer
  .ant-drawer-body
    padding 0
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
  .layout-anim
    // padding-left 200px
    width 100vw
    transition padding 0.15s ease-in-out
    &.layout-anim-short
      // padding-left 80px
      transition padding 0.25s cubic-bezier(0.215, 0.61, 0.355, 1)
</style>
