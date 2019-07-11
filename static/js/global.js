
(function () {
  // requestAnimationFrame cancelAnimationFrame 兼容设置
  var lastTime = 0
  var vendors = ['webkit', 'moz']
  for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
    window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
        window[vendors[xx] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        fn(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
})();
(function () {
  if (window.HTMLElement) {
    // 使用原型扩展DOM自定义事件
    if (!window.addEventListener || !window.removeEventListener) {
      HTMLElement.prototype.addEventListener = function (type, fn, capture) {
        var el = this
        el.attachEvent('on' + type, function (e) {
          fn.call(el, e)
        })
      }
      HTMLElement.prototype.removeEventListener = function (type, fn, capture) {
        var el = this
        el.deattachEvent('on' + type, function (e) {
          fn.call(el, e)
        })
      }
    }
  } else {
    // 如果是不支持HTMLElement扩展的浏览器
    // 通过遍历所有元素扩展DOM事件

    if (!window.addEventListener || !window.removeEventListener) {
      var elAll = document.all; var lenAll = elAll.length
      for (var iAll = 0; iAll < lenAll; iAll += 1) {
        elAll[iAll].addEventListener = function (type, fn) {
          var el = this
          el.attachEvent('on' + type, function (e) {
            fn.call(el, e)
          })
        }
        elAll[iAll].removeEventListener = function (type, fn) {
          var el = this
          el.deattachEvent('on' + type, function (e) {
            fn.call(el, e)
          })
        }
      }
    }
  }
})()
