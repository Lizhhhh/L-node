const router = require('koa-router')

module.exports = app => {
  router
    .get('/', async (ctx, next) => {
      ctx.response.body = `<h1>index page</h1>`
    })
    .get('/home', async (ctx, next) => {
      console.log('home')
    })
    .get('/home/:id/:name', async (ctx, next) => {
      console.log(ctx.params)
    })
    .get('/user', async(ctx, next)=>{
      console.log('user');
    })
}
