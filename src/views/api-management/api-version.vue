<!-- api项目版本 -->
<script>
import { mapState } from 'vuex'
export default {
  name: 'ApiVersion',

  data () {
    return {
    }
  },

  components: {},

  computed: {
    ...mapState({
      tabNavList: state => state.app.tabNavList
    })
  },

  methods: {
    routeChange () {
      console.log('routeChange')
    }
  },
  mounted () {
  },
  // activated () {
  //   // console.log(1)
  // }
  render (h) {
    let directives = [
      {
        name: 'single-tab',
        value: this,
        // expression: '1 + 1'
        arg: 'ApiVersion',
        modifiers: {
          routeChange: true
        }
      }
    ]
    //  <div a={1} ></div>
    //  return <div {...props}></div>
    return <div { ...{ directives } }>111</div>
    // return <div directives={ directives: directives }>111</div>
  }
}
</script>
<style lang="stylus" scoped>
</style>
