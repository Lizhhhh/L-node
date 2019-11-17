const Koa = require("koa");
const app = new Koa();

// 响应时间输出中间件
app.use(async (ctx, next) => {
    await next();
    // 获取响应头,印证执行顺序
    const rt = ctx.response.get('X-Response-Time');
    console.log(`输出倒计时: ${ctx.method} ${ctx.url} - ${rt}`);
});

// 响应时间统计中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('开始计时');
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('结束计时');
})

// const sleep = time => new Promise(resolve => setTimeout(resolve, time))


// 错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;

        // 触发应用层级的错误事件
        ctx.app.emit('error', error, ctx);
        console.log("中间件捕捉:", error.message);
    }
})

const mongoose = require("./models/mongoose");
const getVip = require("./middleware/get-vip");
app.use(getVip);


// 静态文件服务
const static = require("koa-static");
app.use(static(__dirname + '/public'));


// // 响应
// app.use(async ctx => {
//     // await sleep(250);
//     ctx.status = 200;
//     ctx.type = 'html';
//     ctx.body = `
//   <h1>Hello Koa</h1>
//   `
// })
const hbs = require("koa-hbs");
const helper = require('./utils/helpers');
app.use(hbs.middleware({
  viewPath: __dirname + '/views',   // 视图根目录
  defaultLayout: 'layout',    // 默认布局页面
  partialsPath: __dirname + '/views/partials',
  disableCache: true    // 开始阶段不缓存
}));


const index = require("./routes/index");
const users = require("./routes/users");
app.use(index.routes());
app.use(users.routes());


// // 捕捉错误
// app.on('error', err => {
//     // console.error("app 捕捉到了:", err.message);
//     // console.error(err);

//     // 往上层(node)抛出错误
//     throw err;
// })


app.listen(3000);