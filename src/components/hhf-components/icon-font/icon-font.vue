<!-- 图标 -->
<template>
  <i
    class="hhf-icon-font"
  >
  <SvgIcon :type="icon" :class="clsMerge" :style="stlsMerge" :width="width" :height="height"/>
    <!-- <svg
    :class="clsMerge"
    :style="stlsMerge"
      class="hhf-icon-font-svg"
      aria-hidden="true"
    >
      <use :xlink:href="iconName"></use>
    </svg> -->
  </i>
</template>

<script>
import SvgIcon from './svg'
export default {
  name: 'IconFont',
  props: {
    classes: String || Array,
    icon: String,
    color: String,
    size: String,
    spin: Boolean,
    width: String,
    height: String
  },
  data () {
    return {
    }
  },

  components: {
    SvgIcon
  },

  computed: {
    clsMerge () {
      const { classes } = this
      const iCls = 'hhf-icon-font-svg'
      let cls
      if (typeof classes === 'string') {
        cls = `${classes} ${iCls}`
      } else if (Array.isArray(classes)) {
        cls = [iCls, ...classes]
      }
      return cls
    },
    stlsMerge () {
      const { color, size } = this
      return {
        color,
        fontSize: size
      }
    }
  },

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scope>
.hhf-icon-font
  display: inline-block
  font-style italic
  line-height 0
</style>
