const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
    .get('/', async (ctx, next) => {
        if (ctx.cookies.name) {
            ctx.body = ctx.cookies.get('name');
        } else {
            ctx.body = 'no cookie'
        }
    })
    .get('/index', async (ctx, next) => {
        ctx.cookies.set(
            'name', 'lzhhc', {
                domain: '127.0.0.1',
                path: '/index',
                maxAge: 1 * 1000 * 60 * 60 * 24,
                expires: new Date('2019-12-31'),
                httpOnly: false,
                overwrite: false
            }
        );
        ctx.body = 'cookie is ok'
    })

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log('server is running at 3000');
    });

