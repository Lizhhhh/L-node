const HomeService = require('../service/home');
module.exports = {
    index: async (ctx, next) => {
        ctx.body = `<h1>index page</h1>`;
    },
    home: async (ctx, next) => {
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.body = `<h1>HOME page</h1>`;
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params);
        ctx.body = `<h1>Home page ${ctx.params.id}/${ctx.params.name}</h1>`;
    },
    user: async (ctx, next) => {
        ctx.body =
            `
      <form action="/user/login" method="post">
      <input name="name" type="text" placeholder="请输入用户名: ikcamp" />
      <br/>
      <input name="password" type="text" placeholder="请输入密码: 123456" />
      <br/>
      <button>GoGoGo</button>
      </form>
      `
    },
    login: async (ctx, next) => {
        let { name, password } = ctx.request.body;
        let data = await HomeService.login(name, password);
        ctx.body = data;
    }
}