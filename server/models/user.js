const { errorCaptured } = require('../lib/utils')
// 登录
exports.login = async (connection, { account, password }) => {
  let conc = await connection
  return errorCaptured(conc.execute.bind(conc), `SELECT * from USER WHERE account="${account}" AND password="${password}" AND tag=0`) // await connection.execute
}
// 获取路由
exports.getRoute = async (connection) => {
  let conc = await connection
  return errorCaptured(conc.execute.bind(conc), `SELECT * from ROUTE WHERE tag=0`) // await connection.execute
}
// 创建路由
exports.createRoute = async (connection, { component, parentId, title, description, genre, buttonType }) => {
  let conc = await connection
  // 防止重新引用丢失调用对象conc.execute.bind(conc)
  return errorCaptured(conc.execute.bind(conc), `INSERT ROUTE (component, parentId, title, description, genre, buttonType) VALUES ("${component}", "${parentId}", "${title}", "${description}", "${genre}", "${buttonType}")`) // await connection.execute
}
// 更新路由
exports.updateRoute = async (connection, { component, id, title, description, genre, buttonType }) => {
  let conc = await connection
  // 防止重新引用丢失调用对象conc.execute.bind(conc)
  return errorCaptured(conc.execute.bind(conc), `UPDATE ROUTE SET component="${component}", title="${title}", description="${description}", genre="${genre}", buttonType="${buttonType}" WHERE id=${id}`)
}
