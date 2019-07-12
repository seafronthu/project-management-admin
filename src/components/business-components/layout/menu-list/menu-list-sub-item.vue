<!-- 菜单栏主类目递归调用 -->
<template>
  <a-sub-menu key="sub1">
    <span slot="title">
      <a-icon :type="subMenuInfo.icon" /><span>{{subMenuInfo.title}}</span></span>
    <template v-for="items of subMenuInfo.children">
      <template v-if="isSubMenu(items)">
        <MenuListSubItem
          v-if="isShowMenu(items)"
          :sub-menu-info="items"
          :key="items.name"
        />
      </template>
      <template v-else>
        <a-menu-item
          v-if="isShowMenu(items)"
          :key="items.name"
        >
          <a-icon :type="items.icon" /><span>{{items.title}}</span></a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'MenuListSubItem',
  mixins: [mixin],
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
<style lang="stylus"></style>
