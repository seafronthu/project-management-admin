const Redis = require('ioredis')
const config = require('../config')
const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
})
redis.on('connect', m => {
  console.log(m)
})
redis.on('error', m => {
  console.log(m)
})
exports = module.exports = redis
