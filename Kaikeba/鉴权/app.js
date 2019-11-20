const koa = require('koa');
const app = new koa();
const session = require('koa-session');

const redisStore = require('koa-redis');
const redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost');

const wrapper = require('co-redis');
// 将redis Promise化
const client = wrapper(redisClient);


app.keys = ['marron'];

const SESSION_CONFIG = {
    key: "marron rain", // 键名
    // maxAge: 86400000, // 有效期(一天)
    // httpOnly: true, // 防止js读取(保证仅对服务器有效)
    // signed: true // 签名
    store: redisStore({ client })
}

app.use(session(SESSION_CONFIG, app));

app.use(ctx => {
    // 查看redis
    redisClient.keys('*', (err, keys) => {
        keys.forEach(key => {
            redisClient.get(key, (err, val) => {
                // console.log(val);
            })
        })
    })

    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.count || 0;
    console.log(ctx.session);
    ctx.session.count = ++n;
    ctx.body = `第${n}次访问`;
});
app.listen(3000);