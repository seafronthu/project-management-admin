<!-- 100%容器  -->
<template>
  <div class="container-fluid" ref="fluid" :style="styleColl">
    <a-spin :spinning="spinning" :tip="spinTip" :size="spinSize" >
      <slot></slot>
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
    }
  },
  data () {
    return {
      height: 'calc(100vh - 153px)'
    }
  },

  components: {},

  computed: {
    styleColl () {
      const {
        height,
        full
      } = this
      return full ? {
        height
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
  border-radius 3px
  .ant-spin-nested-loading
    height 100%
    .ant-spin-container
      height 100%
</style>
