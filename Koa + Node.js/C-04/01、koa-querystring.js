const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router
  .get('/home', async (ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    await next()
    ctx.response.body = '<h1>Home Page</h1>'
  })
  .get('/home/:id/:name', async (ctx, next) => {
    console.log('get 2 ', ctx.params)
    ctx.response.body = '<h1>Home page /:id/:name</h1>'
    await next()
  })
app.use(router.routes()).listen(3000)
