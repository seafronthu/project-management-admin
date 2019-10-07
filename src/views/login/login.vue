<!-- 登录 -->
<template>
  <div class="login">
    <BackgroundBubble />
    <div class="login-form">
      <div class="login-header">
        <Pokemon classes="pikachu" />
      </div>
      <ul class="login-container">
        <li>
          <h5 class="title">
            <i>L</i>
            <i>O</i>
            <i>G</i>
            <i>I</i>
            <i>N</i>
          </h5>
        </li>
        <li class="login-alert">
          <a-alert
            v-if="visible"
            message="Alert Message Text"
            type="success"
            closable
          />
        </li>
        <!-- 账号 -->
        <li class="login-input login-account">
          <a-input
            placeholder="账号"
            v-model="account"
            ref="accountInput"
          >
            <a-icon
              slot="prefix"
              type="user"
            />
            <a-icon
              v-if="account"
              slot="suffix"
              type="close-circle"
              @click="emitEmpty('account')"
            />
          </a-input>
          <div class="login-tip">
            <span></span>
          </div>
        </li>
        <!-- 密码 -->
        <li class="login-input login-password">
          <a-input
          type="password"
            placeholder="密码"
            v-model="password"
            ref="passwordInput"
          >
            <a-icon
              slot="prefix"
              type="lock"
            />
            <a-icon
              v-if="password"
              slot="suffix"
              type="close-circle"
              @click="emitEmpty('password')"
            />
          </a-input>
          <div class="login-tip">
            <span></span>
          </div>
        </li>
        <li class="login-remember">
          <a-checkbox>自动登录</a-checkbox>
        </li>
        <li class="login-btn">
          <a-button
            type="primary"
            size="large"
            block
            @click="handleLogin"
          >登录</a-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BackgroundBubble from '@hhf/background-canvas/background-bubble.vue'
import Pokemon from '@hhf/pokemon'
import { mapActions } from 'vuex'
export default {
  name: 'Login',

  data () {
    return {
      visible: false,
      account: '',
      password: ''
    }
  },

  components: {
    Pokemon,
    BackgroundBubble
  },

  computed: {},

  methods: {
    ...mapActions(['USER_LOGIN_ACTION']),
    handleEmpty (name) {
      this.$refs[`${name}Input`].focus()
      this[name] = ''
    },
    handleLogin () {
      const {
        account,
        password
      } = this
      this.USER_LOGIN_ACTION({ account, password }).then(res => {
        if (res.code === 200) {
          location.href = '/home'
        }
      })
    }
  },

  mounted () {
    setTimeout(() => { this.visible = true }, 2000)
  }
}
</script>
<style lang="stylus" scoped>
.login
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow hidden
  .login-form
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-color #ffffff
    width 400px
    border-radius 5px
    box-shadow 0px 0px 10px 1px rgba(0, 0, 0, 0.3)
    .login-header
      position absolute
      left 0
      top -234px
      right 0
      margin 0 auto
      transform translate(0, -100%)
    .login-container
      position relative
      z-index 1
      padding 0 20px
      background-color #ffffff
      border-radius 5px
      overflow hidden
      list-style none
      margin 0
      .title
        text-align center
        font-size 40px
        height 40px
        line-height 40px
        font-weight bold
        margin-bottom 0
        margin-top 20px
        i
          display inline-block
          line-height 40px
        i:first-child
          color #08a678
        i:nth-child(2)
          color #f50
        i:nth-child(3)
          color #108ee9
        i:nth-child(4)
          color #fa8c16
        i:nth-child(5)
          color #722ed1
      .login-alert
        height 40px
      .login-tip
        height 30px
      .login-remember
        margin-bottom 30px
      .login-btn
        margin-bottom 30px
</style>
