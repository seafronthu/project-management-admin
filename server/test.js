var redis = require('redis')
var client = redis.createClient()

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on('error', function (err) {
  console.log('Error ' + err)
})

// while (len < 10) {
//   len ++
//   client.set('string key', len, redis.print)
// }
client.info(function (err, res) {
  console.log(err)
  console.log(res)
})
// client.set('string key', 'string val', redis.print)
// client.get('string key', redis.print)
// client.hset('hash key', 'hashtest 1', 'some value', redis.print)
// client.hmset(['hash key', 'hashtest 2', 'some other value', 'hashtest 3', 'some third value'], redis.print)
// client.hgetall('hash key', function (err, replies) {
//   console.log(err)
//   console.log(replies)
// })
client.hkeys('hash key', function (err, replies) {
  if (err) {
    console.log(err)
    return
  }
  console.log(replies.length + ' replies:')
  replies.forEach(function (reply, i) {
    console.log('    ' + i + ': ' + reply)
  })
  client.quit()
})
