<!-- 头部面包屑 -->
<template>
  <a-breadcrumb class="not-select">
    <a-breadcrumb-item v-for="(items, index) of list" :key="items.key" class="weight-bold">
      <a v-if="(index === 0 && list.length > 1) || (index !== list.length - 1 && items.name)" href="javascript: void 0;" @click="handleClick(items.name)">
        <a-icon :type="items.icon" />
        <span class="margin-left-4">{{items.title}}</span>
      </a>
      <template v-else>
        <a-icon v-if="items.icon" :type="items.icon" />
        <span>{{items.title}}</span>
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'HeadBreadcrumb',
  props: {
    list: Array
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    handleClick (name) {
      this.$emit('trigger-click', name)
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
</style>
