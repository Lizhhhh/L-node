const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
client.on('error', async (err) => {
    console.log(`[Error]: ${err}`);
})

client.set('name', 'marron', redis.print);
client.get('name', async (err, value) => {
    if (err) throw err;
    console.log('Name: ' + value);
});

// 以下等价于 `client.hmset('marron', 'item', 'koaDemo', 'chapter', 'redisDemo')`
// 存储对象
client.hmset('marron', {
    'item': 'koaDemo',
    'chapter': 'redisDemo'
});

// 取出一个对象
client.hgetall('marron', async (err, obj) => {
    console.log(obj);
});

// 获取key
client.hkeys('marron', async (err, replies) => {
    replies.forEach((reply, i) => {
        console.log(i + ":" + reply);
    });
})

// 用List存储数据
client.lpush('marron1', 'koa', redis.print)
client.lpush('marron1', 'redisDemo', redis.print);
client.lrange('marron1', 0, -1, async (err, items) => {
    if (err) throw err;
    items.forEach(async (item, i) => {
        console.log(item);
    })
})