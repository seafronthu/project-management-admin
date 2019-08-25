<!-- 100%容器  -->
<template>
  <div class="container-fluid" ref="fluid" :style="{height: full ? height : null}" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContainerFluid',
  props: {
    full: {
      type: Boolean,
      default: false
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
</style>
