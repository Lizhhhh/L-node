const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    let url = ctx.url;

    // 使用request接受get请求
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;


    // 从ctx中直接获取get请求
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    const o = {
        url,
        req_query,
        req_querystring
    }
    ctx.body = JSON.stringify(o);
})
app.listen(3000, () => {
    console.log('server is running at port 3000!');
})