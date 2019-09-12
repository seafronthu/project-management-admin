const crypto = require('crypto')
function md5 (str, times = 1, encoding = 'hex') {
  for (let i = 0; i < times; ++i) {
    const hash = crypto.createHash('md5')
    str = hash.update(str).digest(encoding)
  }
  return str
}
console.log(md5('a', 2))
