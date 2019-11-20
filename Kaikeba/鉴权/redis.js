const redis = require('redis');

const client = redis.createClient(6379, 'localhost');

client.set('hello', 'hahah');
client.get('hello', function(err, v) {
    console.log('redis key:', v);
})