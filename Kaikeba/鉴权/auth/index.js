const koa = require("koa");
const router = require('koa-router')();
const static = require('koa-static');
const app = new koa();
const axios = require("axios");
const querystring = require("querystring");

app.use(static(__dirname + '/'));
const config = {
    client_id: '9ffe8aeafb6a5b1469b9',
    client_secret: 'd25a747d52f74e98303f1bff0a8714fc8488c221'
}

router.get('/github/login', async (ctx) => {
    var dataStr = (new Date()).valueOf();
    // 重定向到认证接口,并配置参数
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;


    // 转发到授权服务器
    ctx.redirect(path);
})
router.get('/github/callback', async (ctx) => {
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    let res = await axios.post('https://github.com/login/oauth/access_token', params);
    const access_token = querystring.parse(res.data).access_token;
    res = await axios.get('https://api.github.com/user?access_token=' + access_token);
    console.log(res.data);
    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src='${res.data.avatar_url} alt=""' />
  `
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);