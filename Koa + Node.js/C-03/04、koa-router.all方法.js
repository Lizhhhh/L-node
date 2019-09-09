const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router
.get('/',async (ctx, next)=>{
  ctx.response.body = '<h1>index page</h1>';
  await next();
})
.all('/',async (ctx, next)=>{
  console.log('match "all" method ');
  await next();
})

app
.use(router.routes())
.listen(3000)