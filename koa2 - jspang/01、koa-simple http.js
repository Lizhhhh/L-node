const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'Hello Koa2'
});

app.listen(3000, () => {
    console.log('app is running at port 3000');
})