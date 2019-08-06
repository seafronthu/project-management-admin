<!-- 全屏 -->
<template>
  <div
    class="full-screen pointer flex-row flex-center"
    v-if="isSupportFullSceenMode"
    @click="handleFullscreen"
  >
    <a-tooltip placement="bottom" @mouseenter="show = true" @mouseleave="show = false" :visible="show" :title="isDocumentInFullScreenMode ? '退出全屏' : '全屏'" arrowPointAtCenter>
      <a-icon
        type="fullscreen-exit"
        v-if="isFull"
      />
      <a-icon
        type="fullscreen"
        v-else
      />
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: 'FullScreen',

  data () {
    let isFull = this.isDocumentInFullScreenMode()
    return {
      isFull,
      show: false
    }
  },

  components: {},

  computed: {
    isSupportFullSceenMode () {
      return document.fullscreenEnabled || document.mozFullScreenEnabled
    }
  },

  methods: {
    isDocumentInFullScreenMode () {
      // 过去由F11触发的那种浏览器全屏模式和HTML5中内容的全屏模式是不一样的
      return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
    },
    handleFullscreen () {
      if (this.isFull) {
        document.exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.documentElement.mozCancelFullScreen
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen = document.documentElement.requestFullscreen || document.documentElement.webkitCancelFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.msRequestFullscreen
        document.documentElement.requestFullscreen()
      }
    },
    handleKeydown (e) {
      console.log(this)
      // e.preventDefault()
      // if (e.key.toLowserCase() === 'f11') {
      //   this.handleFullscreen()
      // }
    }
  },

  mounted () {
    document.onfullscreenchange = (event) => {
      // 解决放到缩小的时候气泡还存在问题
      this.show = false
      this.isFull = this.isDocumentInFullScreenMode()
    }
    document.addEventListener('keydown', (e) => {
      if (e.key) {
        if (e.key.toLowerCase() === 'f11' || e.key.toLowerCase() === 'f12') {
          e.preventDefault()
        }
        return
      }
      if (e.code) {
        if (e.code.toLowerCase() === 'f11' || e.key.toLowerCase() === 'f12') {
          e.preventDefault()
        }
        return
      }
      if (e.keyCode === 122 || e.keyCode === 123) {
        e.preventDefault()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.full-screen
  padding 0 10px
  color #ffffff
  font-size 25px
  transition background-color 0.2s ease-in-out
  &:hover
    $bgcolor()
</style>
