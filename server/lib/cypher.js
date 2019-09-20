const crypto = require('crypto')
function md5 (str, times = 1, encoding = 'hex') {
  for (let i = 0; i < times; ++i) {
    const hash = crypto.createHash('md5')
    str = hash.update(str).digest(encoding)
  }
  return str
}
/**
 * 加密
 * @param {*} data
 * @param {*} key
 */
function encryptRsa (data, key) {
  // 注意，第二个参数是Buffer类型
  console.log(key, Buffer.from(data))
  return crypto.publicEncrypt(key, Buffer.from(data))
}
function decryptRsa (encryptData, key) {
  // 注意，encrypted是Buffer类型
  return crypto.privateDecrypt(key, encryptData)
}
/**
 * 创建rsa公私钥
 * @param {*} publicKeyEncoding
 * @param {*} privateKeyEncoding
 * @param {*} modulusLength
 */
function createRsaKey (publicKeyEncoding = {
  type: 'pkcs1',
  format: 'pem'
}, privateKeyEncoding = {
  type: 'pkcs1',
  format: 'pem'
  // cipher: 'aes-256-cbc',
  // passphrase: ''
}, modulusLength = 4096) {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength,
    publicKeyEncoding,
    privateKeyEncoding
  })
  return {
    privateKey, publicKey
  }
}
exports = module.exports = {
  md5,
  encryptRsa,
  decryptRsa,
  createRsaKey
}
