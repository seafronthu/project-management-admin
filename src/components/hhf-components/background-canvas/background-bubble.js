const _init = Symbol('init') // 私有方法
const _windowResize = Symbol('windowResize') // 私有方法
const _handleResize = Symbol('handleResize') // 私有方法
const _merge = Symbol('merge') // 私有方法
const allAttribute = {
  num: 100, // 个数
  start_probability: 0.1, // 如果数量小于num，有这些几率添加一个新的
  radius_min: 1, // 初始半径最小值
  radius_max: 2, // 初始半径最大值
  radius_add_min: 0.3, // 半径增加最小值
  radius_add_max: 0.5, // 半径增加最大值
  opacity_min: 0.3, // 初始透明度最小值
  opacity_max: 0.5, // 初始透明度最大值
  opacity_prev_min: 0.003, // 透明度递减值最小值
  opacity_prev_max: 0.005, // 透明度递减值最大值
  light_min: 40, // 颜色亮度最小值
  light_max: 70 // 颜色亮度最大值
}
class BackgroundBubble {
  constructor (options) {
    this[_merge](options)
    this.canvas = options.canvas
    this[_init]()
  }
  [_init] () {
    const canvas = this.canvas
    this.ctx = canvas.getContext('2d')
    this[_handleResize] = this[_windowResize].bind(this) // 事件中this指向
    this[_handleResize]()
    this.pi = Math.PI
    this.styleColor = this.findRandom(0, 360)
    this.allElement = []
    this.a = this[_windowResize].bind(this)
    window.addEventListener('resize', this[_handleResize])
  }
  [_merge] (options) {
    this.allAttribute = {
      ...allAttribute,
      ...options
    }
  }
  [_windowResize] () {
    const windowWidth = document.documentElement.clientWidth || document.body.clientWidth
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
    this.canvas.width = windowWidth
    this.canvas.height = windowHeight
  }
  findRandom (numOne, numTwo) {
    return Math.random() * (numTwo - numOne) + numOne
  }
  start () {
    const {
      start, styleColor, windowWidth, windowHeight, allElement, allAttribute
    } = this
    this.requestID = window.requestAnimationFrame(start.bind(this))
    this.styleColor += 0.1
    this.ctx.fillStyle = 'hsl(' + styleColor + ',100%,97%)'
    this.ctx.fillRect(0, 0, windowWidth, windowHeight)
    if (allElement.length < allAttribute.num && Math.random() < allAttribute.start_probability) {
      allElement.push(this.readyRun())
    }
    allElement.map(function (line) {
      line.to_step()
    })
  }
  readyRun () {
    const {
      findRandom, windowWidth, windowHeight, styleColor, allAttribute, ctx, pi
    } = this
    let obj = {
      to_reset: function () {
        var t = this
        t.x = findRandom(0, windowWidth)
        t.y = findRandom(0, windowHeight)
        t.radius = findRandom(allAttribute.radius_min, allAttribute.radius_max)
        t.radius_change = findRandom(allAttribute.radius_add_min, allAttribute.radius_add_max)
        t.opacity = findRandom(allAttribute.opacity_min, allAttribute.opacity_max)
        t.opacity_change = findRandom(allAttribute.opacity_prev_min, allAttribute.opacity_prev_max)
        t.light = findRandom(allAttribute.light_min, allAttribute.light_max)
        t.color = 'hsl(' + styleColor + ',100%,' + t.light + '%)'
      },
      to_step: function () {
        var t = this
        t.opacity -= t.opacity_change
        t.radius += t.radius_change
        if (t.opacity <= 0) {
          t.to_reset()
          return false
        }
        ctx.fillStyle = t.color
        ctx.globalAlpha = t.opacity
        ctx.beginPath()
        ctx.arc(t.x, t.y, t.radius, 0, 2 * pi, true)
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
    obj.to_reset()
    return obj
  }
  clearRequstId () {
    window.removeEventListener('resize', this[_handleResize])
    window.cancelAnimationFrame(this.requestID)
  }
}
export default BackgroundBubble
