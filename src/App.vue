<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mixin } from '@l/mixin'
export default {
  mixins: [mixin],
  data () {
    return {
      abc: {}
    }
  },
  components: {
  },
  created () {
  }
}
</script>

<style lang="stylus">
#app
  height 100%
  width 100%
  // font-family 'Avenir', Helvetica, Arial, sans-serif
  // -webkit-font-smoothing antialiased
  // -moz-osx-font-smoothing grayscale
  // text-align center
  // color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
