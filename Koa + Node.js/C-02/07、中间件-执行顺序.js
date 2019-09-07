const koa = require('koa')
const app = new koa()
app.use(async function(ctx, next) {
  console.log('one start')
  await next()
  console.log('one end')
})
app.use(async function(ctx, next) {
  console.log('two start')
  await next()
  console.log('two end')
})
app.use(async function(ctx, next) {
  console.log('three start')
  await next()
  console.log('three end')
})
app.listen(3000)
