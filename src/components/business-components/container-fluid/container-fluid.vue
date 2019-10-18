<!-- 100%容器  -->
<template>
<div class="container-fluid" :style="containerStyle">
  <slot name="header"></slot>
  <a-spin :spinning="spinning" :tip="spinTip" :size="spinSize" >
    <div class="container-fluid-scroll" :style="scrollStyle">
        <slot></slot>
    </div>
  </a-spin>
</div>
</template>

<script>
export default {
  name: 'ContainerFluid',
  props: {
    full: {
      type: Boolean,
      default: false
    },
    spinning: {
      type: Boolean,
      default: false
    },
    spinTip: {
      type: String,
      default: 'Loading……'
    },
    spinSize: {
      type: String,
      default: 'large'
    },
    overflowY: {
      type: Boolean,
      default: false
    },
    scrollBackgroundColor: String
  },
  data () {
    return {
      height: 'calc(100vh - 153px)'
    }
  },

  components: {},

  computed: {
    containerStyle () {
      const {
        height,
        full
      } = this
      return full ? {
        height
      } : null
    },
    scrollStyle () {
      return this.full ? {
        overflowY: 'auto',
        backgroundColor: this.scrollBackgroundColor
      } : null
    }
  },

  methods: {},

  created () {
  },
  mounted () {
    // const height = this.$refs['fluid'].offsetHeight
    // this.height = `${height}px`
  }
}
</script>
<style lang="stylus">
.container-fluid
  display flex
  flex-flow column nowrap
  .ant-spin-nested-loading
    height 100%
    .ant-spin-container
      height 100%
  .container-fluid-scroll
    border-radius 3px
    height auto
    max-height 100%
    flex 1
</style>
