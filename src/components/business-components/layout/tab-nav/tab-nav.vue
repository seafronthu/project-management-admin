<!-- 选项卡导航 -->
<template>
  <div class="tab-nav">
    <!-- 关闭选项卡按钮 -->
    <div class="btn close-btn">
      <a-dropdown>
        <div class="close-link flex-row flex-center">
          <a-icon type="close-circle" />
        </div>
        <a-menu slot="overlay">
          <a-menu-item>
            <a
              href="javascript:;"
              key="closeAll"
            >关闭所有</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <!-- 选项卡 -->
    <div class="main">
      <a-button
        icon="caret-left"
        class="btn left-btn flex-row flex-center"
        @click="scrollFunc(200)"
      >
        <!-- <a-icon type="caret-left" /> -->
      </a-button>
      <a-button
        icon="caret-right"
        class="btn right-btn flex-row flex-center"
        @click="scrollFunc(-200)"
      >
        <!-- <a-icon type="caret-right" /> -->
      </a-button>
      <!-- 选项卡容器 -->
      <div
        class="wrap"
        ref="scrollWrap"
        @DOMMouseScroll.stop.prevent="handleScroll"
        @mousewheel.stop.prevent="handleScroll"
      >
        <div
          class="container"
          ref="scrollContainer"
          :style="{transform: translates}"
        >
          <transition-group
            name="tab-nav-anim"
            tag="div"
            class="flex-row flex-start-center height-full"
          >
            <!-- <transition-group name="list-complete-demo" tag="div"> -->
            <TagButton
              v-for="item of list"
              dot
              class="tab-nav-anim"
              :key="item.name"
              height="100%"
              :color="checkedColorFunc(item.name)"
              closable
              :trigger="['contextmenu']"
              @trigger-close="handleTagClose(item)"
              @trigger-tag-click="handleTagClick(item)"
              @trigger-menu-click="handleMenuClick"
            >
              {{getNameFunc(item)}}
              <template v-slot:menu>
                <a-menu-item
                  key="closeCurrent"
                  :name="item"
                >
                  <a href="javascript:;">关闭当前标签页</a>
                </a-menu-item>
                <a-menu-item
                  key="closeRight"
                  :name="item"
                >
                  <a href="javascript:;">关闭右侧</a>
                </a-menu-item>
                <a-menu-item
                  key="closeLeft"
                  :name="item"
                >
                  <a href="javascript:;">关闭左侧</a>
                </a-menu-item>
                <a-menu-item
                  key="closeOther"
                  :name="item"
                >
                  <a href="javascript:;">关闭其它</a>
                </a-menu-item>
              </template>
            </TagButton>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagButton from '@business/tag-button'
export default {
  name: 'TabNav',
  props: {
    list: { // tag列表
      type: Array,
      default: () => []
    },
    color: { // 选中tag颜色
      type: String,
      default: '#08a678'
    },
    value: { // 选中tag
      type: String
    }
  },
  data () {
    return {
      tagList: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      diverge: 0
    }
  },

  components: {
    TagButton
  },

  computed: {
    translates () {
      const diverge = this.diverge
      console.log('computed', `translateX(${diverge}px)`)
      return `translateX(${diverge}px)`
    }
  },

  methods: {
    // 滚轮事件(禁止触发原生事件，mac上左滑会返回上一页)
    handleScroll (e) {
      var type = e.type
      let detail = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        if (e.wheelDelta) {
          detail = e.wheelDeltaX ? e.wheelDeltaX : e.wheelDeltaY || e.wheelDelta
        } else {
          detail = -(e.detail || 0) * 40
        }
      }
      this.scrollFunc(detail)
    },
    // 滚动距离
    scrollFunc (offset) {
      console.log(offset)
      console.log(this.diverge + offset)
      let wrapWidth = this.$refs.scrollWrap.offsetWidth
      let containerWidth = this.$refs.scrollContainer.offsetWidth
      if (offset > 0) { // 往左偏移
        this.diverge = Math.min(0, this.diverge + offset) // 内容在右边的时候往左偏移累加偏移量
      } else {
        if (wrapWidth < containerWidth) { // 内容超出容器宽度
          if (this.diverge < wrapWidth - containerWidth) { // 在最左边的时候
            this.diverge = this.diverge // 不偏移
          } else {
            this.diverge = Math.max(this.diverge + offset, wrapWidth - containerWidth) // 当到达最右边的时候取祖级容器和父级容器的差值
          }
        } else {
          this.diverge = 0 // 没有超出容器不偏移
        }
      }
    },
    chooseToMoveFunc () {
      let wrapWidth = this.$refs.scrollWrap.offsetWidth
      let containerWidth = this.$refs.scrollContainer.offsetWidth
      if (wrapWidth > containerWidth) { // 内容没有超出容器宽度
        this.diverge = 0 // 不偏移
      } else {

      }
    },
    // 得到标签名
    getNameFunc (item) {
      return (item && item.meta && item.meta.title) || ''
    },
    // 选中的颜色
    checkedColorFunc (name) {
      console.log(this.value, 'value', name, this.color)
      return this.value === name ? this.color : ''
    },
    // 点击的标签页
    handleTagClick (item) {
      this.$emit('trigger-tag-click', item)
    },
    // 点击关闭标签页
    handleTagClose (item) {
      this.$emit('trigger-tag-close', item)
    },
    handleMenuClick ({ item, key, keyPath }) {
      console.log({ item, key, keyPath })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.tab-nav
  position relative
  border-top 1px solid #f0f0f0
  border-bottom 1px solid #f0f0f0
  padding 0
  height 40px
  background #F0F0F0
  .btn
    position absolute
    background-color #ffffff
    top 0
    height 100%
    cursor pointer
    &.close-btn
      right 0
      width 32px
      .close-link
        width 100%
        height 100%
    &.left-btn
      left 0
    &.right-btn
      right 32px
  .main
    > .btn
      padding 0 6px
    .wrap
      position absolute
      left 28px
      right 61px
      top 0
      bottom 0
      overflow hidden
      box-shadow 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset
      .container
        position absolute
        height 100%
        padding 2px 0 2px 8px
        overflow visible
        transition transform 0.3s ease-out
        .tab-nav-anim
          transition all 1s
          margin-right 8px
</style>
