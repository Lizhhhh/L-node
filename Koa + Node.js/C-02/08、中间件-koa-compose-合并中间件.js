const koa = require('koa');
const app = new koa()
const compose = require('koa-compose')
async function middleware1(ctx, next) {
  console.log('start middleware1')
  await next()
  console.log('end middleware1')
}
async function middleware2(ctx, next) {
  console.log('start middleware2')
  await next()
  console.log('end middleware2')
}
async function middleware3(ctx, next) {
  console.log('start middleware3')
  await next()
  console.log('end middleware3')
}
const all = compose([middleware1, middleware2, middleware3])
app.use(all)
app.listen(3000)
