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
        <MenuList :menu-list="menuList" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <TopHead :collapsed="collapsed" @trigger-collapse="(state)=> collapsed = state"></TopHead>
        </a-layout-header>
        <a-layout-content style="background-color:#f5f7f9">
          <TabNav :list="tabNavList" :value="tagChecked" @trigger-tag-click="handleTagClick" @trigger-tag-close="handleTagClose" />
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
  </div>
</template>

<script>
import MenuList from './menu-list'
import TabNav from './tab-nav'
import TopHead from './top-head'
import { mapGetters, mapState, mapMutations } from 'vuex'
// isCloseRoute判断meta中是否不允许关闭标签栏（notClose: true） isSameRoute 判断meta是否不是单页(notSinglePage: true) 并且name包括query和param都相同
import { isCloseRoute, isSameRoute, selectNavTab } from '@l/businessUtils'
export default {
  name: 'Layout',

  data () {
    return {
      collapsed: false,
      tagChecked: {}
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
      },
      immediate: true
    }
  },
  components: {
    MenuList,
    TabNav,
    TopHead
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
  .layout-container
    height 100%
  .logo
    height 32px
    background rgba(255, 255, 255, 0.2)
    margin 16px
</style>
