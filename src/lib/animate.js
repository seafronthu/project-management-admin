
const animate = (function () {
  const behavior = {
    slide () {
      return {
        beforeEnter: function (el) {
          // el.style.opacity = 0
          // el.style.height = '0px'
        },
        enter: function (el, done) {
          const height = el.offsetHeight
          el.style.height = '0px'
          el.style.opacity = 0
          console.log(height)
          Velocity(el, { opacity: 1, height: `${height}px` }, { duration: 100, complete: done })
        },
        afterEnter (el, done) {
          el.style.height = null
          el.style.opacity = null
        },
        leave: function (el, done) {
          Velocity(el, { opacity: 0, height: '0px' }, { duration: 100, complete: done })
        },
        afterLeave (el) {
          el.style.height = null
          el.style.opacity = null
        }
      }
    }
  }
  return {
    transition (name) {
      return behavior[name] && behavior[name]()
    },
    addAnimation (name, opt) {
      behavior[name] = function () {
        return opt
      }
    }
  }
})()
export default animate
