const koa = require('koa')
const app = new koa()
// app.use(async function(ctx, next) {
//   console.log(ctx.method, ctx.host + ctx.url)
//   await next()

//   ctx.body = 'Hello World'
// })

// 将上面打印日志的部分单独抽取出来
const logger = async function(ctx, next) {
  console.log(ctx.method, ctx.host + ctx.url)
  await next()
}

app.use(logger)
app.use(async function(ctx, next) {
  ctx.body = 'Hello World'
})

app.listen(3000)
