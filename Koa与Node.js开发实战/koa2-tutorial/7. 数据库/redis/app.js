const Koa = require('koa');
const app = new Koa();


// 使用session
const session = require('koa-session');
app.keys = ['some secret hurr']; // 签名Cookie的密钥
const CONFIG = {
    ket: 'myAppSessKey',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true
}
app.use(session(CONFIG, app));

// 使用redis
const redis = require('redis');   // 引入node_redis库
const client = redis.createClient(6379, '127.0.0.1');   // 连接本地Redis服务器
const {promisify} = require('util');    // 引入promisify
const hgetallAsync = promisify(client.hgetall).bind(client);
app.keys = ['some secret hurr'];
const store = {
  get: async(key, maxAge) =>{
    return await hgetallAsync(key)
  },
  set: async (key, sess, maxAge) =>{
    client.hmset(key, sess);
  },
  destroy: async (key) =>{
    client.hdel(key)
  }
}


app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0; // 初始化用户的访问次数
    ctx.session.views = ++n;
    ctx.body = `${n} views`;
})


app.listen(3000);