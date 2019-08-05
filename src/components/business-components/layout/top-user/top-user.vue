<!-- 用户头像 -->
<template>
    <a-dropdown>
      <!-- <a class="ant-dropdown-link" href="#">
      Hover me <a-icon type="down" />
    </a> -->
    <div class="top-user height-full flex-row flex-center pointer">
      <a-avatar
        shape="circle"
        size="default"
        class="top-user-dropdown-link"
      >{{avatarValue}}</a-avatar>
      <span class="top-user-nick">{{avatarValue}}</span>
    </div>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-divider />
      <a-menu-item key="3">
        <a-icon type="logout" />
        <span>退出登录</span>
      </a-menu-item>
      </a-menu>
    </a-dropdown>
</template>

<script>
export default {
  name: 'TopUser',

  data () {
    return {
      avatarValue: '锋少'
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.top-user
  transition background-color 0.2s ease-in-out
  padding 0 15px;
  &:hover
    $bgcolor()
  .top-user-dropdown-link
    margin-right 5px
    $color()
    background-color #ffffff
    vertical-align middle
  .top-user-nick
    $color(#fff)
</style>
