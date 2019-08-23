<!--  -->
<template>
  <a-sub-menu
    :key="subMenuInfo.name"
    v-bind="$props"
    v-on="$listeners"
    :disabled="subMenuInfo.disabled"
  >
    <template v-slot:title>
      <EditAntdItem :item-data="subMenuInfo"/>
    </template>
    <template
      v-if="edit === true"
      v-slot:expandIcon
    ><span></span></template>
    <template v-for="items of subMenuInfo.children">
      <a-menu-item
        :key="items.name"
        v-if="!items.children"
        :disabled="items.disabled"
      >
      <EditAntdItem :item-data="items"/>
      </a-menu-item>
      <EditAntdSubmenu
        v-else
        :sub-menu-info="items"
        :key="items.name"
      />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
import EditAntdItem from './edit-antd-item'
export default {
  name: 'EditAntdSubmenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    subMenuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  // mixins: [mixin]
  inject: ['edit'],
  components: {
    EditAntdItem
  }
}
</script>
<style lang="stylus"></style>
