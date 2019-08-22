<!-- 路由菜单栏 -->
<template>
  <li class="edit-menu-item pointer" :class="{'edit-menu-item-active': active}">
    <div @click="handleClick" class="edit-menu-title text-ellipsis flex-row flex-between-center pointer" :style="{paddingLeft: inlineLeft}">
      <span class="flex-1 text-ellipsis">{{title}}</span>
      <slot name="right"></slot>
    </div>
  </li>
</template>

<script>
import { getKey } from '@l/businessUtils'
export default {
  name: 'EditMenuItem',
  props: {
    level: {
      type: Number,
      default: 1
    },
    title: {
      type: String
    }
  },
  data () {
    let key = getKey(this)
    return {
      eventKey: key
    }
  },
  inject: ['provideClick', 'provideSelected', 'keysObj'],
  components: {},

  computed: {
    active () {
      return this.keysObj.selectedKeys.includes(this.eventKey)
    },
    inlineLeft () {
      return `${this.level * 20}px`
    }
  },

  methods: {
    handleClick () {
      const { eventKey, keysObj: { selectedKeys } } = this
      let arr = selectedKeys.includes(eventKey) ? selectedKeys.filter(v => v !== eventKey) : [...selectedKeys, eventKey]
      this.provideSelected(arr)
      this.provideClick(eventKey)
    }
  },

  mounted () {
    console.log(this.title, this.level)
  }
}
</script>
<style lang="stylus">
</style>
