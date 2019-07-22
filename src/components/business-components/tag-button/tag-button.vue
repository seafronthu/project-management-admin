<!-- 标签按钮 -->
<template>
<div :style="{height: height}">
  <a-dropdown :trigger="trigger">
    <a-tag
      class="flex-row flex-start-center not-select"
      :closable="closable"
      :style="stylesMerge"
      @close="handleClose"
      @click="handleTagClick"
    >
      <span>
        <span v-if="dot" class="dot" :style="{color: color}">●</span>
        <slot></slot>
        <!-- <a-icon type="close-circle" /> -->
      </span>
    </a-tag>
    <a-menu slot="overlay" @click="handleMenuClick">
      <slot name="menu"></slot>
    </a-menu>
  </a-dropdown>
</div>
</template>

<script>
export default {
  name: 'TagButton',

  data () {
    return {
    }
  },
  props: {
    closable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    size: {
      type: String
    },
    height: {
      type: String
    },
    trigger: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    dot: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  computed: {
    stylesMerge () {
      const { height } = this
      let wrapStyles = {}
      if (height) {
        wrapStyles = {
          lineHeight: 'normal',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItem: 'center',
          height
        }
      }
      return {
        color: this.color,
        fontSize: this.size,
        marginRight: 0,
        ...wrapStyles
      }
    }
  },

  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('trigger-close', e)
    },
    handleTagClick (e) {
      this.$emit('trigger-tag-click', e)
    },
    handleMenuClick ({ item, key, keyPath }) {
      this.$emit('trigger-menu-click', { item, key, keyPath })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.dot
  padding-right 10px
  color #eeeeee
</style>
