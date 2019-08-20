<!-- 路由二级菜单 -->
<template>
  <li class="edit-menu-subitem" :class="{'edit-menu-subitem-active': active}">
    <div class="edit-menu-subitem" @click="handleClick">submenu</div>
    <ul class="edit-menu-subitem-list no-ul" v-if="active">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import { getKey } from '@l/businessUtils'
export default {
  name: 'EditMenuSubitem',
  props: {
  },
  data () {
    let key = getKey(this)
    return {
      eventKey: key
    }
  },
  inject: ['provideClick', 'provideOpenChange', 'keysObj'],
  components: {},

  computed: {
    active () {
      return this.keysObj.openKeys.includes(this.eventKey)
    }
  },

  methods: {
    handleClick () {
      const { eventKey, keysObj: { openKeys } } = this
      let arr = openKeys.includes(eventKey) ? openKeys.filter(v => v !== eventKey) : [...openKeys, eventKey]
      this.provideOpenChange(arr)
      this.provideClick(eventKey)
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus">
</style>
