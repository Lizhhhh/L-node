const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const bodyParser = require('koa-bodyparser');
const cors = require("koa2-cors");


const users = [{ id: 1, name: 'tom' }, { id: 2, name: 'jerry' }];
router.get('/', async ctx => {
    const { name } = ctx.query;
    let data = users;
    console.log(data);
    if (name) {
        data = users.filter(u => u.name === name);
    }
    ctx.body = {
        ok: 1,
        data
    }
})
router.get('/:id', async ctx => {
    console.log('GET /users/:id');
    const { id } = ctx.params;
    const data = users.find(u => u.id === id);
    ctx.body = {
        ok: 1,
        data
    }
})

const bouncer = require('koa-bouncer');
app.use(bouncer.middleware());

const val = async (ctx, next) => {

    try {
        ctx.validateBody('name')
            .required('要求提供用户名')
            .isString()
            .trim()
            .isLength(6, 16, '用户名长度应该为6~16')
        next();
    } catch (err) {
        // 处理 boncer抛出的错误
        if (err instanceof bouncer.ValidationError) {
            ctx.body = '[校验错误]' + err.message;
            return; // 返还执行权
        }
        throw err
    }

}


router.post('/', val, ctx => {
    console.log('POST /users');
    const { body: user } = ctx.request;
    user.id = users.length + 1; // 自增
    users.push(user);
    ctx.body = {
        ok: 1
    }
});
router.put('/', ctx => {
    console.log('PUT /users');
    const { body: user } = ctx.request;
    const idx = users.findIndex(u => u.id == user.id);
    if (idx > -1) {
        users[idx] = user;
    }
    ctx.body = { ok: 1 };
});
router.delete('/:id', ctx => {
    console.log('DELETE /users/:id');
    const { id } = ctx.params;
    const idx = users.findIndex(u => u.id == id);
    if (idx > -1) {
        users.splice(idx, 1);
    }
    ctx.body = {
        ok: 1,
    }
})

const upload = require('koa-multer')({ dest: './public/images' });
router.post('/upload', upload.single('file'), ctx => {
    console.log('file', ctx.req.file);
    console.log('body', ctx.req.body);

    // 写入数据库
    ctx.body = `上传成功!`;
})


app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.listen(3000, async () => {
    console.log('Server is running at http://localhost:3000');
});