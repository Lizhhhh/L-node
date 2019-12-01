const koa = require('koa');
const app = new koa();
const router = new require('koa-router')();
const bodyParser = require('koa-bodyparser');
const {
    getCourseList,
    getCourseById,
    addCourse,
    updateCourse,
    removeCourse
} = require('./db');

const {
    connect,
    close
} = require('./conn');


const JSON_MIME = 'application/json';

router.get('/course', async ctx => {
    ctx.type = JSON_MIME;
    ctx.body = {
        status: 0,
        data: await getCourseList()
    }
});

router.get('/course/:id', async ctx => {
    ctx.type = JSON_MIME;
    ctx.body = {
        status: 0,
        data: await getCourseById(ctx.params.id)
    }
});

router.post('/course', async ctx => {
    ctx.type = JSON_MIME;
    await addCourse(ctx.body);
    ctx.body = {
        status: 0
    }
});

router.put('/course/:id', async ctx => {
    await updateCourse(ctx.params.id, ctx.body);
    ctx.body = {
        status: 0
    }
});

router.delete('/course/:id', async ctx => {
    await removeCourse(ctx.params.id);
    ctx.body = {
        status: 0
    }
})

app.use(async (ctx, next) => {
    await connect()
    await next()
    await close()
})


app.use(bodyParser());
app.use(router.routes());
app.listen(3000, async () => {
    console.log('Server is running at http://localhost:3000');
})