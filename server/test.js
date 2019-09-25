const fs = require('fs')
const path = require('path')
const { encryptRsa, decryptRsa } = require('./lib/cypher')
// const { privateKey, publicKey } = createRsaKey()
// console.log(privateKey, publicKey)
// console.log(path.resolve(__dirname, './config/id_rsa.pub'))
// // fs.mkdirSync('./config/id_rsa.pub')
// // fs.mkdirSync('./config/id_rsa')
// fs.writeFile(path.resolve(__dirname, './config/id_rsa.pub'), publicKey, (err) => {
//   if (err) throw err
//   console.log('文件已被保存')
// })
// fs.writeFile(path.resolve(__dirname, './config/id_rsa'), privateKey, (err) => {
//   if (err) throw err
//   console.log('文件已被保存2')
// })

// const basicConfig = require('./config/basicConfig')
let str = 'hello word 您好啊！'
let publicKey = fs.readFileSync(path.resolve(__dirname, './config/id_rsa.pub'))
let privateKey = fs.readFileSync(path.resolve(__dirname, './config/id_rsa'))
let enData = encryptRsa(str, publicKey)
console.log(enData.replace(/2/g, 1))
// fs.writeFileSync(path.resolve(__dirname, './config/base64'), enData)
let deData = decryptRsa(enData.replace(/2/g, 1), privateKey)
console.log(deData)
// utils.js
// const crypto = require('crypto')

// // 加密方法
// const encrypt = (data, key) => {
//   // 注意，第二个参数是Buffer类型
//   return crypto.publicEncrypt(key, Buffer.from(data))
// }

// // 解密方法
// const decrypt = (encrypted, key) => {
//   // 注意，encrypted是Buffer类型
//   return crypto.privateDecrypt(key, encrypted)
// }
// const privKey = `-----BEGIN RSA PRIVATE KEY-----
// MIICXQIBAAKBgQDFWnl8fChyKI/Tgo1ILB+IlGr8ZECKnnO8XRDwttBbf5EmG0qV
// 8gs0aGkh649rb75I+tMu2JSNuVj61CncL/7Ct2kAZ6CZZo1vYgtzhlFnxd4V7Ra+
// aIwLZaXT/h3eE+/cFsL4VAJI5wXh4Mq4Vtu7uEjeogAOgXACaIqiFyrk3wIDAQAB
// AoGBAKdrunYlqfY2fNUVAqAAdnvaVOxqa+psw4g/d3iNzjJhBRTLwDl2TZUXImEZ
// QeEFueqVhoROTa/xVg/r3tshiD/QC71EfmPVBjBQJJIvJUbjtZJ/O+L2WxqzSvqe
// wzYaTm6Te3kZeG/cULNMIL+xU7XsUmslbGPAurYmHA1jNKFpAkEA48aUogSv8VFn`
// R2QuYmilz20LkCzffK2aq2+9iSz1ZjCvo+iuFt71Y3+etWomzcZCuJ5sn0w7lcSx
// nqyzCFDspQJBAN3O2VdQF3gua0Q5VHmK9AvsoXLmCfRa1RiKuFOtrtC609RfX4DC
// FxDxH09UVu/8Hmdau8t6OFExcBriIYJQwDMCQQCZLjFDDHfuiFo2js8K62mnJ6SB
// H0xlIrND2+/RUuTuBov4ZUC+rM7GTUtEodDazhyM4C4Yq0HfJNp25Zm5XALpAkBG
// atLpO04YI3R+dkzxQUH1PyyKU6m5X9TjM7cNKcikD4wMkjK5p+S2xjYQc1AeZEYq
// vc187dJPRIi4oC3PN1+tAkBuW51/5vBj+zmd73mVcTt28OmSKOX6kU29F0lvEh8I
// oHiLOo285vG5ZtmXiY58tAiPVQXa7eU8hPQHTHWa9qp6
// -----END RSA PRIVATE KEY-----
// `

// const pubKey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFWnl8fChyKI/Tgo1ILB+IlGr8
// ZECKnnO8XRDwttBbf5EmG0qV8gs0aGkh649rb75I+tMu2JSNuVj61CncL/7Ct2kA
// Z6CZZo1vYgtzhlFnxd4V7Ra+aIwLZaXT/h3eE+/cFsL4VAJI5wXh4Mq4Vtu7uEje
// ogAOgXACaIqiFyrk3wIDAQAB
// -----END PUBLIC KEY-----
// `
// const plainText = '你好，我是程序猿小卡'
// const crypted = encrypt(plainText, pubKey).toString('base64') // 加密
// console.log(Buffer.from(crypted))
// const decrypted = decrypt(Buffer.from(crypted, 'base64'), privKey) // 解密

// console.log(decrypted.toString()) // 你好，我是程序猿小卡
