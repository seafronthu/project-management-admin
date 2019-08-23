// 路由二级菜单
import { getKey } from '@l/businessUtils'
import animate from '@l/animate'
export default {
  name: 'EditMenuSubmenu',
  props: {
    title: {
      type: String
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
        const propsData = v.componentOptions.propsData
        v.componentOptions.propsData = { ...propsData, ...props }
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
  },
  render () {
    const { active, title, inlineLeft, handleClick, $scopedSlots } = this
    let defaultSlot = $scopedSlots.default && this.renderChildren($scopedSlots.default())
    let rightSlot = $scopedSlots.right && $scopedSlots.right()
    const liCls = ['edit-menu-submenu', active ? 'edit-menu-submenu-active' : null]
    const iconCls = ['up-down', active ? 'active' : null]
    const menuOpenAnimation = { on: animate.transition('slide') }
    return (
      <li class={liCls}>
        <div class="edit-menu-title flex-row flex-start-center pointer" style={{ paddingLeft: inlineLeft }} onclick={handleClick}>
          <i class={iconCls} />
          <span class="flex-1 text-ellipsis">{ title }</span>
          {rightSlot}
        </div>
        <transition {...menuOpenAnimation}>
          <ul v-show={active} class="edit-menu-submenu-list no-ul">
            {defaultSlot}
          </ul>
        </transition>
      </li>
    )
  }
}
