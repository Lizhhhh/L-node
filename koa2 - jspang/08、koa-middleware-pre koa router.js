const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
// 路由前缀
// const router = new Router({
//     prefix: '/lzhhc'
// });

// 子路由
const home = new Router();
const page = new Router();
home.get('/lzhhc', async (ctx) => {
    ctx.body = 'home lzhhc'
})
page.get('/lzhhc', async (ctx) => {
    ctx.body = 'page lzhhc'
})

// 父路由挂载子路由
const router = new Router();
router
    .use('/home', home.routes(), home.allowedMethods())
    .use('/page', page.routes(), page.allowedMethods())


app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log('server is running at http://127.0.0.1:3000')
    })