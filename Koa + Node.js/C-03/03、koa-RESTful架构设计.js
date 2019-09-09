const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router
  .post('/users', (ctx, next) => {
    ctx.body = '新增一位用户'
  })
  .del('/users/:id', (ctx, next) => {
    ctx.body = '删除了用户编号为id的用户'
  })
  .put('/users/:id', (ctx, next) => {
    ctx.body = '修改了用户编号为id的用户信息'
  })
  .get('users/:id', (ctx, next) => {
    ctx.body = '我是编号为id的用户信息'
  })

app.use(router.routes()).listen(3000)
