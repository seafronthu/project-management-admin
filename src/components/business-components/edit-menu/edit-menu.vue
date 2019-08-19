<!-- 路由菜单 -->
<template>
  <ul class="route-menu">
    <slot :selectedKeys="selectedKeys" :openKeys="openKeys"></slot>
  </ul>
</template>

<script>
export default {
  name: 'EditMenu',
  provide () {
    return {
      provideClick () {
        console.log(this.mark)
      }
    }
  },
  props: {
    selectedKeys: {
      type: Array,
      default: () => []
    },
    openKeys: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      mark: 1
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
