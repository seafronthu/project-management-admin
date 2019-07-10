let placeholders = document.querySelectorAll('.styled-input__placeholder-text')
let inputs = document.querySelectorAll('.styled-input__input')
placeholders.forEach(function (el, i) {
  let value = el.innerText; let html = ''
  for (let iteratorVal1 = value, _isArray = Array.isArray(iteratorVal1), _i = 0, iteratorVal = _isArray ? iteratorVal1 : iteratorVal1[Symbol.iterator](); ;) {
    let _ref
    if (_isArray) {
      if (_i >= iteratorVal.length) break
      _ref = iteratorVal[_i++]
    } else {
      _i = iteratorVal.next()
      if (_i.done) break
      _ref = _i.value
    }
    let w = _ref
    if (!value) value = '&nbsp;'
    html += '<span class="letter">' + w + '</span>'
  }
  el.innerHTML = html
})
inputs.forEach(function (el) {
  let parent = el.parentNode
  el.addEventListener('focus', function () {
    parent.classList.add('filled')
    placeholderAnimationIn(parent, true)
  }, false)
  el.addEventListener('blur', function () {
    if (el.value.length) return
    parent.classList.remove('filled')
    placeholderAnimationIn(parent, false)
  }, false)
})
function placeholderAnimationIn (parent, action) {
  let act = action ? 'add' : 'remove'
  let letters = parent.querySelectorAll('.letter')
  letters = [].slice.call(letters, 0)
  if (!action) letters = letters.reverse()
  letters.forEach(function (el, i) {
    setTimeout(function () {
      let contains = parent.classList.contains('filled')
      if ((action && !contains) || (!action && contains)) return
      el.classList[act]('active')
    }, 50 * i)
  })
}
setTimeout(function () {
  document.body.classList.add('on-start')
}, 100)
setTimeout(function () {
  document.body.classList.add('document-loaded')
}, 1800)
