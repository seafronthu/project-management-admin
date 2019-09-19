const redis = require('redis')
const config = require('../config')
const client = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
})
client.on('error', function (err) {
  console.log('Error ' + err)
})
exports = module.exports = client
