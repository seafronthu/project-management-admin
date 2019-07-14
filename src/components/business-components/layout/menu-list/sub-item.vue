<!-- 菜单栏主类目递归调用 -->
<template>
  <a-sub-menu :key="subMenuInfo.name"
    v-bind="$props"
    v-on="$listeners">
    <span slot="title">
      <a-icon :type="subMenuInfo.icon" /><span>{{subMenuInfo.title}}</span></span>
    <template v-for="items of subMenuInfo.children">
      <template v-if="isSubMenu(items)">
        <SubItem
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
import { Menu } from 'ant-design-vue'
import mixin from './mixin'
export default {
  name: 'SubItem',
  isSubMenu: true,
  mixins: [mixin],
  props: {
    ...Menu.SubMenu.props
  }
}
</script>
<style lang="stylus"></style>
