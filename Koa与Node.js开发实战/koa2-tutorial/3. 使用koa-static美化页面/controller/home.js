const HomeService = require('../service/home');
const nunjucks = require('koa-nunjucks-2');
module.exports = {
    index: async (ctx, next) => {
        await ctx.render('home/index', { title: 'Marron欢迎您!' });
    },
    home: async (ctx, next) => {
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.body = `<h1>HOME page</h1>`
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params);
        ctx.body = `<h1>Home page ${ctx.params.id}.${ctx.params.name}</h1>`;
    },
    user: async (ctx, next) => {
        await ctx.render('home/login', {
            btnName: 'GoGoGo'
        })
    },
    login: async (ctx, next) => {
        let params = ctx.request.body;
        let name = params.name;
        let password = params.password;
        let res = await HomeService.login(name, password);
        if (res.status === '-1') {
            await ctx.render('home/login', res.data);
        } else {
            ctx.state.title = '个人中心';
            await ctx.render('home/success', res.data);
        }
    }
}