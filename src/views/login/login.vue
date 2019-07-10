<!-- 登录 -->
<template>
  <div class="login">
    <div class="login-form">
      <!-- 账号 -->
      <div>
    <a-alert
      v-if="visible"
      message="Alert Message Text"
      type="success"
      closable
      :afterClose="handleClose"
    />
  </div>
      <div class="login-input login-account">
        <a-input placeholder="账号" v-model="account" ref="accountInput">
          <a-icon slot="prefix" type="user" />
          <a-icon v-if="account" slot="suffix" type="close-circle" @click="emitEmpty('account')" />
        </a-input>
        <div class="login-tip">
          <span></span>
        </div>
      </div>
      <!-- 密码 -->
      <div class="login-input login-password">
        <a-input placeholder="密码" v-model="password" ref="passwordInput">
          <a-icon slot="prefix" type="user" />
          <a-icon v-if="password" slot="suffix" type="close-circle" @click="emitEmpty('password')" />
        </a-input>
      </div>
  </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: 'Login',

  data () {
    return {
      visible: false,
      account: '',
      password: ''
    }
  },

  components: {},

  computed: {},

  methods: {
    handleEmpty (name) {
      this.$refs[`${name}Input`].focus()
      this[name] = ''
    }
  },

  mounted () {
    setTimeout(() => { this.visible = true }, 2000)
  }
}
</script>
<style lang="stylus" scoped>
.login
  .login-form
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-color #ffffff
    width 368px
    box-shadow 1px 1px 1px 1px rgba(0, 0, 0, 0.3)
</style>
