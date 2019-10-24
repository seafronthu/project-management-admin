const { errorCaptured } = require('../lib/utils')
// 登录
exports.login = async (connection, { account, password }) => {
  let conc = await connection
  return errorCaptured(conc.execute.bind(conc), `SELECT a.id, a.account, a.auth, b.roleId from USER a LEFT JOIN USER_GROUP b on a.id = b.userId WHERE a.account="${account}" AND a.password="${password}" AND a.tag=0`) // await connection.execute
}
// 获取用户信息
exports.getUserInfo = async (connection, { id }) => {
  let conc = await connection
  return errorCaptured(conc.execute.bind(conc), `SELECT * FROM USER WHERE id=${id} AND tag=0`) // await connection.execute
}
// 获取用户权限
exports.getUserAthority = async (connection, { auth, roleId }) => {
  let conc = await connection
  if (auth === 'superAdministrator') {
    return errorCaptured(conc.execute.bind(conc), `SELECT * FROM ROUTE WHERE tag=0`)
  }
  return errorCaptured(conc.execute.bind(conc), `SELECT a.* FROM ROUTE_GROUP a 
  INNER JOIN ROUTE b
  ON a.routeId = b.id
  WHERE a.roleId=${roleId} AND a.tag=0 AND b.tag=0`)
}
// 获取路由
exports.getRoute = async (connection) => {
  let conc = await connection
  return errorCaptured(conc.execute.bind(conc), `SELECT * from ROUTE WHERE tag=0`) // await connection.execute
}
// 创建路由
exports.createRoute = async (connection, { component, parentId, title, description, genre, type }) => {
  let conc = await connection
  // 防止重新引用丢失调用对象conc.execute.bind(conc)
  return errorCaptured(conc.execute.bind(conc), `INSERT ROUTE (component, parentId, title, description, genre, type) VALUES ("${component}", "${parentId}", "${title}", "${description}", "${genre}", "${type}")`) // await connection.execute
}
// 更新路由
exports.updateRoute = async (connection, { component, id, title, description, genre, type }) => {
  let conc = await connection
  // 防止重新引用丢失调用对象conc.execute.bind(conc)
  return errorCaptured(conc.execute.bind(conc), `UPDATE ROUTE SET component="${component}", title="${title}", description="${description}", genre="${genre}", type="${type}" WHERE id=${id}`)
}
