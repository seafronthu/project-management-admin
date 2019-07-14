<!--  -->
<template functional>
  <a-sub-menu :key="props.subMenuInfo.name">
    <span slot="title">
      <a-icon :type="props.subMenuInfo.icon" /><span>{{props.subMenuInfo.title}}</span>
    </span>
    <template v-for="items of props.subMenuInfo.children">
      <a-menu-item
        :key="items.name"
        v-if="!items.children"
      >
        <a-icon :type="items.icon" /><span>{{items.title}}</span>
      </a-menu-item>
      <SubItemFunctional
        v-else
        :sub-menu-info="items"
        :key="items.name"
      />
    </template>
  </a-sub-menu>
</template>

<script>
// import mixin from './mixin'
export default {
  name: 'SubItemFunctional'
  // mixins: [mixin]
}
</script>
<style lang="stylus" scoped></style>
