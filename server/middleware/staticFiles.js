module.exports = ({ path, gzip = false }) => {
  return (cxt, next) => {
    const url = cxt.request.url
    if (isFile(url)) {

    }
  }
}
function isFile (url) {
  return /\.(js|css|json|txt|html|ico|svg|zip|png|jpg)$|/.test(url)
}
