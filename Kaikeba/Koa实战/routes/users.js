const Router = require('koa-router');
const router = new Router({ prefix: '/users' });

router.get('/', async ctx => {
    await ctx.render("users", {
        title: "用户列表",
        subTitle: "handlebars语法",
        isShow: true,
        username: "jerry",
        htmlStr: `
        <h1>Hi</h1>
        <p>This is paragraph of htmlStr</p>
        `,
        users: [
            { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
            { username: "jerry", age: 21, birth: new Date(1999, 3, 2) }
        ]
    });
});

module.exports = router