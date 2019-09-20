const Redis = require('ioredis')
const config = require('../config')
const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
})
exports = module.exports = redis
