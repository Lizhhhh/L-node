const koa = require('koa')
const app = new koa()
const bodyParser = require('koa-bodyParser')
const Router = require('koa-router')
const router = new Router()
router.get('/', (ctx, next) => {
  ctx.type = 'html'
  let html = `
  <h1>登录</h1>
  <form method="POST" action="/">
      <p>用户名</p>
      <input name = "userName" /><br />
      <p>密码</p>
      <input name = "password" type="password" /> <br/>
      <button type="submit">submit</button>
  </form>`
  ctx.body = html
})
router.post('/', (ctx, next) => {
  let postData = ctx.request.body
  ctx.body = postData
})
app
  .use(bodyParser()) // 加载koa-bodyParser中间件
  .use(router.routes()) // 加载koa-router中间件
  .use(router.allowedMethods()) // 对异常状态码的处理
  .listen(3000)
