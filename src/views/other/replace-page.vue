<!-- 刷新页面 -->
<script>
export default {
  name: 'ReplacePage',
  beforeCreate () {
    const {
      query,
      params: {
        redirect
      }
    } = this.$route
    // this.$router.push({ path: decodeURIComponent(redirect) })
    this.$routerReplace({
      path: decodeURIComponent(redirect),
      query
    })
  },
  render (h) {
    return {}
  }
}
</script>
