<!-- 错误存储 -->
<template>
  <div class="error-store pointer flex-row flex-center">
    <a-badge dot>
    <IconFont icon="bug" width="1.8em" height="1.8em" color="#ffffff" />
    </a-badge>
  </div>
</template>

<script>
import IconFont from '@hhf/icon-font'
export default {
  name: 'ErrorStore',

  data () {
    return {
    }
  },

  components: {
    IconFont
  },

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.error-store
  padding 0 10px
  transition background-color 0.2s ease-in-out
  &:hover
    $bgcolor()
</style>
