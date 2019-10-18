<!-- 选项卡导航 -->
<template>
  <div class="tab-nav">
    <!-- 关闭选项卡按钮 -->
    <div class="btn close-btn">
      <a-dropdown>
        <div class="close-link flex-row flex-center">
          <IconFont icon="clear" width="1.5em" height="1.5em" />
        </div>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="closeAll" :disabled="judgeIsCloseOtherFunc('closeAll')">
            <template v-if="judgeIsCloseOtherFunc('closeAll')">关闭所有</template>
            <a v-else href="javascript:;"
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
              v-for="(item, index) of list"
              ref="tabNavRef"
              dot
              class="tab-nav-anim"
              :key="item.name"
              height="100%"
              :color="checkedColorFunc(item)"
              :closable="judgeIsCloseCurrentdFunc(item)"
              :trigger="['contextmenu']"
              @trigger-close="handleTagClose(item, 'closeCurrent')"
              @trigger-tag-click="handleTagClick(item)"
              @trigger-menu-click="(options) => handleMenuClick(options, {item, index})"
            >
              {{getNameFunc(item)}}
              <template v-slot:menu>
                <!-- <a-menu-item
                  key="refresh"
                  :name="item"
                >
                  <a
                    href="javascript:;"
                  >刷新</a>
                </a-menu-item> -->
                <a-menu-item
                  key="closeCurrent"
                  :name="item"
                  :disabled="!judgeIsCloseCurrentdFunc(item)"
                >
                  <template v-if="!judgeIsCloseCurrentdFunc(item)">关闭当前标签页</template>
                  <a
                    v-else
                    href="javascript:;"
                  >关闭当前标签页</a>
                </a-menu-item>
                <a-menu-item
                  key="closeRight"
                  :name="item"
                  :disabled="judgeIsCloseOtherFunc('closeRight', index)"
                >
                  <template v-if="judgeIsCloseOtherFunc('closeRight', index)">关闭右侧</template>
                  <a
                    v-else
                    href="javascript:;"
                  >关闭右侧</a>
                </a-menu-item>
                <a-menu-item
                  key="closeLeft"
                  :name="item"
                  :disabled="judgeIsCloseOtherFunc('closeLeft', index)"
                >
                  <template v-if="judgeIsCloseOtherFunc( 'closeLeft', index)">关闭左侧</template>
                  <a
                    v-else
                    href="javascript:;"
                  >关闭左侧</a>
                </a-menu-item>
                <a-menu-item
                  key="closeOther"
                  :name="item"
                  :disabled="judgeIsCloseOtherFunc( 'closeOther', index)"
                >
                  <template v-if="judgeIsCloseOtherFunc( 'closeOther', index)">关闭其它</template>
                  <a
                    v-else
                    href="javascript:;"
                  >关闭其它</a>
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
import IconFont from '@hhf/icon-font'
import { isCloseRoute, isSameRoute } from '@l/businessUtils'
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
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      diverge: 0
    }
  },

  components: {
    TagButton,
    IconFont
  },

  computed: {
    translates () {
      const diverge = this.diverge
      return `translateX(${diverge}px)`
    }
  },
  watch: {
    value: {
      handler (currentV, beforeV) {
        this.chooseNavTag(currentV)
      },
      immediate: true
    }
  },
  methods: {
    // 判断是否可以关闭其它标签页 true是不能选择
    judgeIsCloseOtherFunc (type, index) {
      switch (type) {
        case 'closeRight':
          return !this.list.slice(index + 1).some(v => this.judgeIsCloseCurrentdFunc(v))
        case 'closeLeft':
          return !this.list.slice(0, index).some(v => this.judgeIsCloseCurrentdFunc(v))
        case 'closeOther':
          return !this.list.some((v, i) => i === index ? false : this.judgeIsCloseCurrentdFunc(v))
        case 'closeAll':
          return !this.list.some(v => this.judgeIsCloseCurrentdFunc(v))
      }
    },
    // 这边判断当前标签页是否可以关闭 true 可以关闭
    judgeIsCloseCurrentdFunc (item) {
      return isCloseRoute(item)
    },
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
    // 选中之后根据位置进行偏移
    chooseToMoveFunc (ele) {
      let wrapWidth = this.$refs.scrollWrap.offsetWidth
      let containerWidth = this.$refs.scrollContainer.offsetWidth
      let tagOffsetLeft = ele.offsetLeft
      let tagWidth = ele.offsetWidth
      if (wrapWidth > containerWidth) { // 内容没有超出容器宽度
        this.diverge = 0 // 不偏移
      } else if (tagOffsetLeft < -this.diverge) { // 偏移是负的绝对值大于标签offsetLeft即在可视区左边
        if (wrapWidth > tagOffsetLeft + tagWidth) { // 左边距小于容器
          this.diverge = 0
        } else {
          this.diverge = -(tagOffsetLeft + tagWidth - wrapWidth)
        }
      } else if (tagOffsetLeft + tagWidth > wrapWidth - this.diverge) { // 偏移的距离加上容器的宽度小于offsetLeft即在可视区右边
        this.diverge = -(tagOffsetLeft + tagWidth - wrapWidth)
      }
    },
    // 选中的标签页
    chooseNavTag (item) {
      if (item.name && (!item.meta || !item.meta.notOpenTab)) {
        this.$nextTick(() => {
          let tabNavRef = this.$refs.tabNavRef
          let index = this.list.findIndex(v => isSameRoute(item, v))
          let ele = tabNavRef[index].$el
          this.chooseToMoveFunc(ele)
        })
      }
    },
    // 得到标签名
    getNameFunc (item) {
      return (item && item.meta && item.meta.title) || ''
    },
    // 选中的颜色
    checkedColorFunc (item) {
      return isSameRoute(item, this.value) ? this.color : '#868686'
    },
    // 点击的标签页
    handleTagClick (item) {
      this.$emit('trigger-tag-click', item)
    },
    // 点击关闭标签页
    handleTagClose (item, type, index) {
      this.$emit('trigger-tag-close', { item, type, index })
    },
    // 点击标签页下拉菜单栏
    handleMenuClick (options, obj = {}) {
      const { item, index } = obj
      this.handleTagClose(item, options.key, index)
    }
  },

  mounted () {
    window.addEventListener('resize', this.handleResize)
  }
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
        transition color 0.2s ease-in-out
        &:hover
          $themeColor()
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
          transition all 0.5s
          margin-right 8px
</style>
