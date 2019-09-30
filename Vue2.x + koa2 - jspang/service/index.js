const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const Router = require('koa-router');

app.use(bodyParser());
app.use(cors());


let user = require('./appApi/user.js');
let goods = require('./appApi/goods.js');
let router = new Router();

router
    .use('/user', user.routes())
    .use('/goods', goods.routes())


// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());



(async () => {
    await connect();
    initSchemas();
})()


app.use(async (ctx) => {
    ctx.body = '<h1>Hello koa2</h1>'
})

app.listen(3001, () => {
    console.log('[Server] staring at port 3001');
})
