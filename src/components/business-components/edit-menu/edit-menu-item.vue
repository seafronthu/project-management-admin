<!-- 路由菜单栏 -->
<template>
  <li class="flex-row flex-between-center edit-menu-item" :class="{'edit-menu-item-active': keysObj.selectedKeys.includes(eventKey)}">
    <div @click="handleClick">
    <span>icon</span>
    <span>item</span>
    </div>
    <div class="edit-menu-item-operate">
      <span>icon</span>
      <ul class="no-ul flex-column flex-start-stretch">
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
  },
  data () {
    let key = getKey(this)
    return {
      eventKey: key
    }
  },
  inject: ['provideClick', 'provideSelected', 'keysObj'],
  components: {},

  computed: {},

  methods: {
    handleClick () {
      const { eventKey, keysObj: { selectedKeys } } = this
      let arr = selectedKeys.includes(eventKey) ? selectedKeys.filter(v => v !== eventKey) : [...selectedKeys, eventKey]
      this.provideSelected(arr)
      this.provideClick(eventKey)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
