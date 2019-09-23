const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello koa-router';
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo pages';
    })

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server is ruinning at http://127.0.0.1:3000');
})