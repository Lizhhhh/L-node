const Koa = require("koa");
const app = new Koa();

// 路由
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });

// post请求解析
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 跨域
const cors = require('koa2-cors');
app.use(cors());
router.post('*', async (ctx, next) => {
    ctx.set("Access-Control-Allow-Credentials", true);
    await next();
})
router.get('*', async (ctx, next) => {
    ctx.set("Access-Control-Allow-Credentials", true);
    await next();
})


// session
const session = require('koa-session');
app.keys = ['marron rain'];
const SESSION_CONFIG = {
    key: 'marron:session'
}
app.use(session(SESSION_CONFIG, app));

// jwt
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const secret = 'marron rain';

// jwt-token方法实现
router.post('/login-token', async ctx => {
    const { body } = ctx.request;

    // 数据库验证
    const userinfo = body.username;
    ctx.body = {
        ok: 1,
        message: '登录成功',
        user: userinfo,
        token: jwt.sign({
            data: userinfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1000,
        },secret)
    }
})

router.get('/getUser-token', jwtAuth({ secret }), async ctx => {
    const userinfo = ctx.state.user;
    ctx.body = {
        ok: 1,
        message: '获取数据成功',
        userinfo: userinfo
    }
})



router.post('/login', async ctx => {
    // 登录逻辑
    ctx.session.userinfo = "marron";
    ctx.body = {
        ok: 1,
        message: '登录成功',
    }
})
router.post('/logout', async ctx => {
    delete ctx.session.userinfo;
    ctx.body = {
        ok: 1,
        message: '退出系统'
    }
})

router.get('/getUser', require('./middleware/auth'), async ctx => {
    ctx.body = {
        ok: 1,
        message: '获取用户成功',
        userinfo: ctx.session.userinfo
    }
})


app.use(router.routes());

app.listen(3000);