const Router = require('koa-router');
const router = new Router();

router.get('/',async ctx => {
    // ctx.body = 'index';

    const list = [...ctx.status.vipCourse];

    await ctx.render('index');
});

module.exports = router
