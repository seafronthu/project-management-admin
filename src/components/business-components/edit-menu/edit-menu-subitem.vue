<!-- 路由二级菜单 -->
<script>
import { getKey } from '@l/businessUtils'
export default {
  name: 'EditMenuSubitem',
  props: {
    title: {
      type: String,
      default: 'submenusubmenusubmenusubmenusubmenusubmenusubmenu'
    },
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
  inject: ['provideClick', 'provideOpenChange', 'keysObj'],
  components: {},

  computed: {
    active () {
      return this.keysObj.openKeys.includes(this.eventKey)
    },
    inlineLeft () {
      return `${this.level * 20}px`
    }
  },

  methods: {
    handleClick () {
      const { eventKey, keysObj: { openKeys } } = this
      let arr = openKeys.includes(eventKey) ? openKeys.filter(v => v !== eventKey) : [...openKeys, eventKey]
      this.provideOpenChange(arr)
      this.provideClick(eventKey)
    },
    renderChildren (children) {
      let props = {
        level: this.level + 1
      }
      return children.map(v => {
        v.componentOptions.propsData = { ...props }
        return v
      })
    }
  },
  created () {
    // this.$slots.default.forEach(v => {
    //   v.
    // })
  },
  mounted () {
    console.log(this)
  },
  render () {
    const { active, title, inlineLeft, handleClick, $scopedSlots } = this
    let defaultSlot = this.renderChildren($scopedSlots.default())
    console.log(defaultSlot)
    return (
      <li class="edit-menu-subitem" class={{ 'edit-menu-subitem-active': active }}>
        <div class="edit-menu-subitem-title flex-row flex-start-center pointer" style={{ paddingLeft: inlineLeft }} onclick={handleClick}>
          <i class="up-down" class={ active ? 'active' : null } />
          <span class="flex-1 text-ellipsis">{ title }</span>
          <a-icon type="bars" />
        </div>
        { active ? <ul class="edit-menu-subitem-list no-ul">
          {defaultSlot}
        </ul> : null }
      </li>
    )
  }
}
</script>
<style lang="stylus">
.edit-menu-subitem
  .edit-menu-subitem-title
    padding-right 10px
    height 40px
    line-height 40px
</style>
