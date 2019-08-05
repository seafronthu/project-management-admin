<!-- 布局祖级容器 -->
<template>
  <div class="layout flex-row">
    <a-layout class="layout-container">
      <a-layout-header class="layout-header">
        <TopHead>
            <TopUser/>
        </TopHead>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          :trigger="null"
          collapsible
          v-model="collapsed"
          theme="green"
        >
          <MenuList :collapsed="collapsed" theme="green" :menu-list="menuList" />
        </a-layout-sider>
        <a-layout>
          <a-layout-content style="background-color:#f5f7f9">
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
            <!-- <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"> -->
            <a-layout-content>
              <transition :name="transitionName">
                <keep-alive>
                  <router-view />
                </keep-alive>
              </transition>
            </a-layout-content>
          </a-layout-content>
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
import TopUser from './top-user'
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
    TopUser
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
  height 100%
  .layout-header
    padding 0
    height 45px
    line-height 35px
  .layout-container
    height 100%
</style>
