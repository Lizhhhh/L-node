const Koa = require('koa')
const app = new Koa()

app
  .use(async (ctx, next) => {
    const { url, method } = ctx
    if (url === '/404' && method === 'GET') {
      ctx.body = 'Page Not Found'
      ctx.status = 404
    } else {
      ctx.body = 'Default Content'
    }
    await next() // 将函数的执行权提交给下一个async 函数
  })
  .listen(4000)
