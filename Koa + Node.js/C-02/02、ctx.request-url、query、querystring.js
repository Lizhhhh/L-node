const koa = require('koa')
const app = new koa()
app.use(async (ctx) => {
  ctx.response.body = {
    url: ctx.request.url, // 获取请求的url
    query: ctx.request.query, // 获取解析的查询字符串
    querystring: ctx.request.querystring // 获取原始查询字符串
  }
})
app.listen(3000)
