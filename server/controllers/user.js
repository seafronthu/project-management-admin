
const userModels = require('../models/user') // mysql操作\
const userService = require('../service/user') // redis操作
const { PASSWORD_SUFFIX } = require('../config')
const { PUBLIC_KEY } = require('../config/basicConfig')
const { md5, encryptRsa } = require('../lib/cypher')
const { sendRespond, redisUserInfo } = require('../lib/program')
class User {
  // 用户登录
  static async login (ctx) {
    let { request: { body: { account, password } } } = ctx
    if (typeof password === 'string' && password.length <= 30) {
      password = md5(password + PASSWORD_SUFFIX, 2) // 登录密码md5两次加密
      const [error, results] = await userModels.login(ctx.sql_connection, { account, password }) // 数据库得到用户信息
      if (error) { // 数据库错误日志收集
        sendRespond({ ctx, data: error, code: 500 })
        return
      }
      if (results[0].length === 0) { // 没有该用户
        sendRespond({ ctx, code: 4003 })
        return
      }
      const { id, account: account2, auth, roleId } = results[0][0]
      // const [error2, results2] = await userService.login(ctx.redisClient, { id, account: account2, auth, roleId })
      let date = new Date().getTime() // 用作单点登录校验同时存在redis和token中
      const [error2, results2] = await userService.login(ctx.redisClient, { id, account: account2, auth, roleId, date }) // redis储存登录信息
      if (error2) { // redis错误日志收集
        sendRespond({ ctx, data: error2, code: 500 })
        return
      }
      if (results2.length > 1 && results2[0][1] === 'OK') { // 登录成功
        let token = encryptRsa(`id=${id}&date=${date}`, PUBLIC_KEY) // 根据密钥生成token
        sendRespond({ ctx, code: 200, data: { token } })
        return
      }
    }
    sendRespond({ ctx, code: 4004 })
  }
  // 获取用户信息
  static async getUserInfo (ctx) {
    let result = await redisUserInfo(ctx) // 从redis得到用户令牌信息
    const {
      code,
      id
      // roleId,
      // auth
    } = result
    if (code !== 200) {
      sendRespond({ ctx, code })
      return
    }
    const [error2, results2] = await userModels.getUserInfo(ctx.sql_connection, { id })
    if (error2) { // redis错误日志收集
      sendRespond({ ctx, data: error2, code: 500 })
      return
    }
    if (results2[0].length === 0) { // 没有该用户
      sendRespond({ ctx, code: 4007 })
      return
    }
    const data = results2[0][0]
    sendRespond({ ctx, data })
  }
  // 获取用户权限
  static async getUserAthority (ctx) {
    let result = await redisUserInfo(ctx) // 从redis得到用户令牌信息
    const {
      code,
      // id
      roleId,
      auth
    } = result
    if (code !== 200) {
      sendRespond({ ctx, code })
      return
    }
    const [error2, results2] = await userModels.getUserAthority(ctx.sql_connection, { roleId, auth }) // 从sql中获得该用户角色下的所有路由权限
    if (error2) { // redis错误日志收集
      sendRespond({ ctx, data: error2, code: 500 })
      return
    }
    const data = results2[0]
    sendRespond({ ctx, data })
  }
  // 获取所有路由及操作
  static async getRoute (ctx) {
    let result = await redisUserInfo(ctx) // 从redis得到用户令牌信息
    const {
      code
      // id
      // roleId,
      // auth
    } = result
    if (code !== 200) {
      sendRespond({ ctx, code })
      return
    }
    const [error, results] = await userModels.getRoute(ctx.sql_connection)
    if (error) {
      sendRespond({ ctx, data: error, code: 500 })
      return
    }
    sendRespond({ ctx, data: results[0], code: 200 })
  }
  // 创建路由
  static async createRoute (ctx) {
    let result = await redisUserInfo(ctx) // 从redis得到用户令牌信息
    const {
      code
      // id
      // roleId,
      // auth
    } = result
    if (code !== 200) {
      sendRespond({ ctx, code })
      return
    }
    let { request: { body: { component, parentId, title, description, genre, buttonType } } } = ctx
    const [error, results] = await userModels.createRoute(ctx.sql_connection, { component, parentId, title, description, genre, buttonType })
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        sendRespond({ ctx, code: 252 })
        return
      }
      sendRespond({ ctx, data: error, code: 500 })
      return
    }
    const { insertId } = results[0]
    sendRespond({ ctx, data: { id: insertId }, message: 200 })
  }
  // 修改路由
  static async updateRoute (ctx) {
    let result = await redisUserInfo(ctx) // 从redis得到用户令牌信息
    const {
      code
      // id
      // roleId,
      // auth
    } = result
    if (code !== 200) {
      sendRespond({ ctx, code })
      return
    }
    let { request: { body: { component, id, title, description, genre, buttonType } } } = ctx
    const [error, results] = await userModels.updateRoute(ctx.sql_connection, { component, id, title, description, genre, buttonType })
    if (error) {
      sendRespond({ ctx, data: error, code: 500 })
      return
    }
    let data = results[0]
    const { affectedRows, changedRows } = data
    if (affectedRows > 0 && changedRows > 0) {
      sendRespond({ ctx, code: 200 })
      return
    }
    if (affectedRows > 0 && changedRows === 0) {
      sendRespond({ ctx, code: 201 })
      return
    }
    if (affectedRows === 0 && changedRows === 0) {
      sendRespond({ ctx, code: 251 })
    }
  }
}
exports = module.exports = User
