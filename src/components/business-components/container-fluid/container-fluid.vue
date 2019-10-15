<!-- 100%容器  -->
<template>
  <div class="container-fluid" ref="fluid" :style="{height: full ? height : null}">
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
    }
  },
  data () {
    return {
      height: 'calc(100% - 20px)'
    }
  },

  components: {},

  computed: {},

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
  background-color #ffffff
  border-radius 3px
  transition box-shadow 0.3s ease-in-out
  margin 10px 0
  &:hover
    box-shadow 0 0 10px 0 rgba(0,0,0,0.1)
  .ant-spin-nested-loading
    height 100%
    .ant-spin-container
      height 100%
</style>
