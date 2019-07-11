<!--  -->
<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import BackgroundBubble from './background-bubble.js'
export default {
  name: 'BackgroundBubble',

  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {
    this.BackgroundBubble = new BackgroundBubble({
      canvas: this.$refs['canvas']
    })
    this.BackgroundBubble.start()
  },
  beforeDestroy () {
    this.BackgroundBubble.clearRequstId()
  }
}
</script>
<style lang="stylus" scoped>
</style>
