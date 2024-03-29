const koa  = require('koa');
const app = new koa();
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');


app.use(nunjucks({
    ext: 'html',  // 指定视图文件后缀
    path: path.join(__dirname, 'views'),   // 指定视图的目录
    nunjucksConfig: {
        trimBlocks: true
    }
}));
app.use(staticFiles(path.resolve(__dirname, "./public"),{
  maxage: 30 * 24 * 60 * 60 *1000
}));
app.use(bodyParser());


router(app);
app.listen(3000,async ()=>{
  console.log('Server is running at http://localhost:3000');
})