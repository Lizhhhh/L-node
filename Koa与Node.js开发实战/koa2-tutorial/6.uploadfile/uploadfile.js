const koa = require('koa');
const app = new koa();
const router = new require('koa-router')();
const multer = require('koa-multer');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');
const fs = require('fs');

// nunjucks的配置
app.use(nunjucks({
    ext: 'html',
    path: __dirname,
    nunjucksConfig: {
        trimBlocks: true
    }
}));

// upload的配置
const upload = multer({
    dest: 'uploads/'
});

const types = upload.single('avatar');
router.get('/upload', async (ctx, next) => {
    await ctx.render('upload')
})

router.post('/profile', types, async  (ctx, next) => {
    const { originalname, path: out_path, mimetype} = ctx.req.file;
    let newName = out_path + path.parse(originalname).ext;
    let err = fs.renameSync(out_path, newName);
    let result;
    if(err){
      result = JSON.stringify(err);
    } else {
      result = `<h1>upload success</h1>`;
    }
    ctx.body = result;
});

app.use(router.routes());

app.listen(3000, async () => {
    console.log('Server is running at http://localhost:3000');
})