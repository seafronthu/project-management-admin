<!-- 登录 -->
<template>
  <main>
    <form class="form">
      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg
            class="spinner__circular"
            viewBox="25 25 50 50"
          >
            <circle
              class="spinner__path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="4"
              stroke-miterlimit="10"
            ></circle>
          </svg>
        </div>
      </div>
      <div class="form__content">
        <h1>Authorization</h1>
        <div class="styled-input">
          <input
            type="text"
            class="styled-input__input"
            name="nickname"
          >
          <div class="styled-input__placeholder"> <span class="styled-input__placeholder-text"><span class="letter">U</span><span class="letter">s</span><span class="letter">e</span><span class="letter">r</span><span class="letter">n</span><span class="letter">a</span><span class="letter">m</span><span class="letter">e</span></span> </div>
          <div class="styled-input__circle"></div>
        </div>
        <div class="styled-input">
          <input
            type="text"
            class="styled-input__input"
          >
          <div class="styled-input__placeholder"> <span class="styled-input__placeholder-text"><span class="letter">P</span><span class="letter">a</span><span class="letter">s</span><span class="letter">s</span><span class="letter">w</span><span class="letter">o</span><span class="letter">r</span><span class="letter">d</span></span> </div>
          <div class="styled-input__circle"></div>
        </div>
        <button
          type="button"
          class="styled-button"
        > <span class="styled-button__real-text-holder"> <span class="styled-button__real-text">Submit</span> <span class="styled-button__moving-block face"> <span class="styled-button__text-holder"> <span class="styled-button__text">Submit</span> </span> </span><span class="styled-button__moving-block back"> <span class="styled-button__text-holder"> <span class="styled-button__text">Submit</span> </span> </span> </span> </button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},
  created () {
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
@import './login.styl';
</style>
