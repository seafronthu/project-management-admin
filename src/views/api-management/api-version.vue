<!-- api项目版本 -->
<template>
  <ContainerFluid
    full
    :spinning="spinning"
    class="api-project"
    scroll-background-color="white">
    <template slot:header>
      <a-form>
        <a-row :gutter="24">
          <a-col
            :md="5"
            :sm="24"
          >
            <a-form-item>
              <a-input placeholder="请输入项目名称" />
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item>
              <a-button type="primary">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </template>
    <template></template>
  </ContainerFluid>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ApiVersion',

  data () {
    return {
      spinning: true,
      vers: 11111
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
    console.log('api-version 缓存了吗？')
  }
  // activated () {
  //   // console.log(1)
  // }
  // render (h) {
  //   let directives = [
  //     {
  //       name: 'single-tab',
  //       value: this,
  //       // expression: '1 + 1'
  //       arg: 'ApiVersion',
  //       modifiers: {
  //         routeChange: true
  //       }
  //     }
  //   ]
  //   //  <div a={1} ></div>
  //   //  return <div {...props}></div>
  //   return <div { ...{ directives } }>111</div>
  //   // return <div directives={ directives: directives }>111</div>
  // }
}
</script>
<style lang="stylus" scoped>
</style>
