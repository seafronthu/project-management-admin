const config = require('../config')
const { errorCaptured } = require('../lib/utils')
const mysql = require('mysql2/promise')
const { MYSQL_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = config
async function main () {
  // get the client
  // create the connection
  const [error, connection] = await errorCaptured(mysql.createConnection, {
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    charset: 'utf8'
  })
  if (error) {
    throw error
  }
  // return connection

  // query database
  // const [rows, fields] = await connection.execute('SELECT * FROM ROUTE')
  // console.log(rows, fields)

  return connection
}
// const connection = mysql.createConnection({
//   user: MYSQL_USER,
//   password: MYSQL_PASSWORD,
//   database: MYSQL_DATABASE,
//   host: MYSQL_HOST,
//   port: MYSQL_PORT
//   // ssl: 'Amazon RDS'
// })
module.exports = main()
