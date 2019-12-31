<!-- 布局祖级容器 -->
<template>
  <div class="layout flex-row">
    <a-layout class="layout-container">
      <a-layout-header
        class="layout-header"
        style="top:0;left:0;"
      >
      <!-- <div @click="APP_SETCACHEROUTESLIST_MUTATE(tabNavList.filter(v => v.name !== 'ApiVersion'))">clear</div> -->
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
            <a-layout-content style="padding: 10px;">
              <transition name="page-slide-fade"
              @enter="enter"
              @after-enter="afterEnter"
              @leave="leave"
              >
                <keep-alive :include="cacheRoutesList">
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
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
// isCloseRoute判断meta中是否不允许关闭标签栏（notClose: true） isSameRoute 判断meta是否不是单页(notSinglePage: true) 并且name包括query和param都相同
import { isCloseRoute, isSameRoute, selectNavTab } from '@l/businessUtils'
import { delayExecute } from '@/tools/utils'
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
      userInfo: state => state.user.userInfo,
      cacheRoutesList: state => state.app.cacheRoutesList
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
    }
    // 缓存列表
    // cacheList () {
    //   return [...this.tabNavList.length ? this.tabNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    // }
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(1)
  //   next(vm => {
  //     console.log(2)
  //     vm.handleFirstLoading()
  //   })
  // },
  beforeRouteUpdate (to, from, next) {
    const { tabNavList } = this
    const { name, query, params, meta, path, fullPath } = to
    const newTag = {
      name,
      query,
      params,
      path,
      fullPath,
      meta: {
        ...meta,
        createTime: new Date().getTime() // 用作tab标签页的key
      } }
    if (!meta || !meta.notOpenTab) { // 是否可以打开tab标签页
      if (meta && meta.notSingleTab) { // 不是单页即多页
        if (!tabNavList.some(v => isSameRoute(v, to))) { // 不是单tab页的时候query和params也要相同
          this.APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION([...tabNavList, newTag])
        }
      } else {
        // 当query或param不同的时候需要处理缓存
        // do something ...
        let isHasTag = false // tab标签页是否存在
        let newTagArr = tabNavList.map(v => {
          if (v.name === name) {
            isHasTag = true
            return {
              ...v,
              query,
              params
            }
          }
          return v
        })
        if (!isHasTag) {
          newTagArr.push(newTag)
        }
        this.APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION([...newTagArr])
      }
    }
    const tagChecked = this.tabNavList.filter(v => isSameRoute(v, newTag))
    if (tagChecked.length === 1) {
      this.tagChecked = tagChecked[0]
    }
    next()
  },
  watch: {
    '$route': {
      handler (to, from) {
        // const { tabNavList, cacheRoutesList } = this
        const { name, meta } = to
        // if (!tabNavList.some(v => isSameRoute(v, to) && cacheRoutesList.includes(v.name))) { // 在tab页路由相同并且不在缓存中
        //   console.log('xixi')
        //   this.APP_SETCACHEROUTESLIST_MUTATE(tabNavList)
        // }

        // console.log(this.cacheRoutesList)
        let breadcrumb = config.homeName[0] === name ? [] : meta && meta.breadcrumb
        this.breadcrumbList = [...this.initBreadcrumb, ...(breadcrumb || [])]
        console.log(this.breadcrumbList)
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
    ...mapMutations(['APP_SETTABNAVLIST_MUTATE', 'APP_SETCACHEROUTESLIST_MUTATE']),
    ...mapActions(['APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION']),
    enter (el, done) {
      // 去除动画的时候出现滚动条
      document.body.style.overflow = 'hidden'
      delayExecute(500).then(() => {
        done()
      })
    // ...
      // done()
    },
    afterEnter (el) {
      document.body.style.overflow = null
    // ...
    },
    leave (el, done) {
      document.body.style.overflow = null
      done()
    },
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
      const {
        name,
        query,
        params
      } = item
      this.$router.push({ name, query, params })
    },
    // 关闭标签页
    // 操作的标签页 item  操作类型type
    handleTagClose ({ item, type, index }) {
      // console.log(item)
      const {
        fullPath,
        name
      } = item
      let { tabNavList } = this
      let beforeArr = []
      let afterArr = []
      switch (type) {
        case 'refresh':
          this.$routerReplace({ name: 'ReplacePage',
            refresh: true,
            redirect: {
              fullPath: encodeURIComponent(fullPath),
              name
            }
          })
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
      this.APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION(tabNavList)
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
      const { name, query, params, meta, path, fullPath } = this.$route
      let createTime = +new Date()
      let homeInfoArr = this.routerList.filter(v => config.homeName.includes(v.name)).map(v => ({
        ...v,
        fullPath: v.path,
        meta: {
          ...v.meta ? v.meta : {},
          createTime: --createTime
        }
      }))
      const newTag = { name,
        query,
        params,
        fullPath,
        path,
        meta: {
          ...meta,
          createTime: --createTime
        } }
      if (!homeInfoArr.some(v => v.name === name) && (!meta || !meta.notOpenTab)) {
        if (meta && meta.singleTab && !homeInfoArr.some(v => isSameRoute(v, this.$route))) {
          this.APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION([...homeInfoArr, newTag])
        } else if (!homeInfoArr.some(v => v.name === name)) {
          this.APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION([...homeInfoArr, newTag])
        }
      } else {
        this.APP_SETTABNAVLISTANDCACHEROUTESLIST_ACTION([...homeInfoArr])
      }
      const tagChecked = this.tabNavList.filter(v => isSameRoute(v, newTag))
      if (tagChecked.length === 1) {
        this.tagChecked = tagChecked[0]
      }
      this.initBreadcrumb = homeInfoArr.filter(v => config.homeName[0] === v.name).map(v => ({ name: v.name, ...v.meta, key: v.name }))
      let breadcrumb = config.homeName[0] === name ? [] : meta && meta.breadcrumb
      this.breadcrumbList = [...this.initBreadcrumb, ...(breadcrumb || [])]
      console.log(this.breadcrumbList)
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
    max-width 100%
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
    // width 100vw
    transition padding 0.15s ease-in-out
    &.layout-anim-short
      // padding-left 80px
      transition padding 0.25s cubic-bezier(0.215, 0.61, 0.355, 1)
</style>
