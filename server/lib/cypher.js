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
  // 注意，第二个参数是Buffer类型 填充方式：crypto.constants.RSA_NO_PADDING, crypto.constants.RSA_PKCS1_PADDING, or crypto.constants.RSA_PKCS1_OAEP_PADDING.
  let obj = Object.prototype.toString.call(key) === '[object Object]' ? key : {
    key
  }
  let padding = obj.padding
  switch (padding) {
    case 'RSA_PKCS1_OAEP_PADDING':
      padding = crypto.constants.RSA_PKCS1_OAEP_PADDING
      break
    case 'RSA_NO_PADDING':
      padding = crypto.constants.RSA_NO_PADDING
      break
    default:
      padding = crypto.constants.RSA_PKCS1_PADDING
      break
  }
  obj.padding = padding
  return crypto.publicEncrypt(obj, Buffer.from(data)).toString('base64')
}
function decryptRsa (encryptData, key) {
  let obj = Object.prototype.toString.call(key) === '[object Object]' ? key : {
    key
  }
  let padding = obj.padding
  switch (padding) {
    case 'RSA_PKCS1_OAEP_PADDING':
      padding = crypto.constants.RSA_PKCS1_OAEP_PADDING
      break
    case 'RSA_NO_PADDING':
      padding = crypto.constants.RSA_NO_PADDING
      break
    default:
      padding = crypto.constants.RSA_PKCS1_PADDING
      break
  }
  obj.padding = padding
  // 注意，encrypted是Buffer类型
  return crypto.privateDecrypt(obj, Buffer.from(encryptData, 'base64')).toString()
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
}, modulusLength = 2048) {
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
