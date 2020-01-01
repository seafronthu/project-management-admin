<!--  -->
<template>
  <div>
    <img ref="img" :src="src" @error="handelError" @load="handleLoad">
  </div>
</template>

<script>
export default {
  name: 'Image',
  props: {
    src: String
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    handleLoad () {
      console.log(222)
    },
    handelError () {
      console.log(111)
      this.$refs['img'].src = 'https://t11.baidu.com/it/u=4249776124,2707997686&fm=76'
      // return 'https://t11.baidu.com/it/u=4249776124,2707997686&fm=76'
    }
  },

  mounted () {
    console.log(this.src)
  }
}
</script>
<style lang="stylus" scoped>
</style>
