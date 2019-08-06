<!-- 消息 -->
<template>
  <div class="header-message pointer flex-row flex-center">
    <a-badge :count="100" :overflowCount="99">
      <a-icon type="message" style="font-size: 22px;" />
    </a-badge>
  </div>
</template>

<script>
export default {
  name: 'HeaderMessage',

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
<style lang="stylus" scoped>
.header-message
  padding 0 10px
  color #ffffff
  transition background-color 0.2s ease-in-out
  &:hover
    $bgcolor()
</style>
