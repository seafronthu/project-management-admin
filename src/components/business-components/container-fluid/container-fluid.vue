<!-- 100%容器  -->
<template>
  <div class="container-fluid" :style="{height: full ? 'calc(100% - 20px)': null}" >
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
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus">
.container-fluid
  background-color #ffffff
  border-radius 3px
  transition box-shadow 0.3s ease-in-out
  margin 10px
  &:hover
    box-shadow 0 0 10px 0 rgba(0,0,0,0.1)
</style>
