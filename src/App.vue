<template>
  <div id="app">
    <HhfImage style="width: 200px;height:200px;position: absolute; z-index: 1000" :src="abc.src" />
    <router-view/>
  </div>
</template>
<script>
import { mixin } from '@l/mixin'
import HhfImage from '@hhf/image'
export default {
  mixins: [mixin],
  data () {
    return {
      abc: {}
    }
  },
  components: {
    HhfImage
  },
  created () {
    setTimeout(() => {
      this.abc = {
        src: 'http://seafront.top/afdsanfdsjad.png'
      }
    }, 2000)
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
