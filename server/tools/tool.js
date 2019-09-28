/**
 * 获取url键值对
 * @param {*} url url参数 id=1&k=2&j=4
 * @returns {JSON} {id: 1, k: 2,j: 4}
 */
function getUrlKeyPair (url) {
  let obj = {}
  url.split('&').forEach(items => {
    let arr = items.split('=')
    let key = arr[0]
    let value = arr[1]
    obj[key] = value
  })
  return obj
}
/**
 * 同步延迟器
 * @param {*} time 延迟时间
 */
async function delayTime (time = 200, timer) {
  return new Promise((resolve, reject) => {
    timer = setTimeout(resolve, time)
  })
}

exports = module.exports = {
  getUrlKeyPair,
  delayTime
}
