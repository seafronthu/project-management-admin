<!-- 路由菜单栏 -->
<template>
  <li class="flex-row flex-between-center edit-menu-item pointer" :style="{paddingLeft: inlineLeft}" :class="{'edit-menu-item-active': active}">
    <div @click="handleClick" class="edit-menu-item-title text-ellipsis flex-1 pointer">
      <span>itemitemitemitemitemitemitemitem</span>
    </div>
    <div class="edit-menu-item-operate">
      <span>icon</span>
      <ul class="no-ul flex-column flex-start-stretch" v-show="false">
        <li>添加</li>
        <li>编辑</li>
        <li>删除</li>
        </ul>
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
    console.log(this)
  }
}
</script>
<style lang="stylus">
.edit-menu-item
  padding-right 10px
  .edit-menu-item-title
    height 40px
    line-height 40px
</style>
