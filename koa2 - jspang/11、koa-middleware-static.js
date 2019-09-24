const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const static = require('koa-static');

const app = new Koa();

const staticPath = './static';
app
    .use(views(path.join(__dirname, './view'), {
        extension: 'ejs'
    }))
    .use(static(path.join(__dirname, staticPath)))
    .use(async (ctx, next) => {
        const title = 'lzhhc';
        await ctx.render('index', { title });
    })
    .listen(3000, () => {
        console.log('Server is running at http://127.0.0.1');
    })