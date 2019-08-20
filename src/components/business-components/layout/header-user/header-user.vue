<!-- 用户头像 -->
<template>
  <a-dropdown>
    <!-- <a class="ant-dropdown-link" href="#">
      Hover me <a-icon type="down" />
    </a> -->
    <div class="top-user flex-row flex-center pointer">
      <a-avatar
        shape="circle"
        size="default"
        class="top-user-dropdown-link"
      >{{avatarValue}}</a-avatar>
      <span class="top-user-nick">{{avatarValue}}</span>
    </div>
    <a-menu slot="overlay">
      <a-menu-item><a href="javascript:;">个人中心</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">个人设置</a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="3">
        <a
          href="javascript:;"
        >
          <a-icon type="logout" />
          <span style="padding-left: 10px;">退出登录</span>
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderUser',

  data () {
    return {
      avatarValue: '锋少'
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.top-user
  transition background-color 0.2s ease-in-out
  padding 0 10px
  &:hover
    $bgColor()
  .top-user-dropdown-link
    margin-right 5px
    $color()
    background-color #ffffff
    vertical-align middle
  .top-user-nick
    $color(#fff)
</style>
