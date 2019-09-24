# 项目初始化
  + npm init -y

# 安装koa
```
npm install --save koa
```
  + 这里使用 --save: 因为项目在生产和开发环境中均依赖 koa

# 创建一个最简单的http服务
  + (01、simple http server.js)
```
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx)=>{
  ctx.body = 'Hello Koa2'
});

app.listen(3000,()=>{
  console.log('app is running at port 3000');
})
```
  + ctx.body: 返回给浏览器的数据

# koa的get请求参数
  + url: http://localhost:3000/getSomething?a=1
  + ctx.request.query(格式化后): {a: "1"}
  + ctx.query: {a: "1"}
  + ctx.request.querystring: "a=1"
  + ctx.querystring: "a=1"
  + ctx.url: "/getSometing?a=1"

# url请求参数
1. ctx.url: 请求的url
2. ctx.method: 请求的方法

# 返回简易的提交表单
```
const html = `
<h1>栗子 koa2 request POST</h1>
<form method = "POST" action="/">
     <p>userName</p>
     <input name="userName" /> <br/>
     <p>age</p>
     <input name="age" /> <br/>
     <p>website</p>
     <input name="webSite" /> <br/>
     <br/>
     <button type="submit">submit</button>
</form>
`
ctx.body = html;
```

# await的使用
  + await 后面可以接受一个异步的函数
  + 当后面的异步函数执行完毕后,才会返回来.


# for...of方法遍历数组,得到索引和值
```
for(let [i,v] of arr.entries()){
  console.log(i,v);
}
```

# 接受Post数据
```
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data;
            })
            ctx.req.on('end', () => {
                resolve(postdata);
            })
        } catch (error) {
            reject(error);
        }
    })
}
```

# 解析post的数据(自己实现)
```
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for (let [i, v] of queryStrList.entries()) {
        let item = v.split('=');
        queryData[item[0]] = decodeURIComponent(item[1]);
    }
    return queryData
}
```

# 使用中间件(bodyparser)实现post解析
1. cnpm install --save koa-bodyparser@3
2. 导入:
```
import bodyParser from 'koa-bodyparser'
```
3. 挂载
```
app.use(bodyParser())
```
4. 使用
```
const postData = ctx.request.body;
console.log(postData);
```


# 自己实现处理路由
```
app.use(async (ctx) => {
    const url = ctx.url;
    const html = await router(url);
    ctx.body = html;
});
```
  + 我们希望有一个router函数,根据不同的url请求,返回不同的页面
  + 下面是router函数的实现
```
async function router(url) {
    let page = '404.html';
    switch (url) {
        case '/':
            page = 'index.html';
            break;
        case '/index':
            page = 'index.html';
            break;
        case '/todo':
            page = 'todo.html';
            break;
        case '/404':
            page = '404.html';
            break;
        default:
            break;
    }
    let html = render(page);
    return html
}
```
  + render 函数:
```
const fs = require('fs');

function render(page){
  return new Promise((resolve,reject)=>{
    const pageUrl = `./pages/${page}`;
    fs.readFile(pageUrl,'binary,(err,data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data)
      }
    })
  })
}
```

# 使用中间件(koa-router)实现路由
1. 安装
```
cnpm install --save koa-router
```
2. 导入
```
const Router = require('koa-router');
```
3. 挂载 & 使用
```
const router = new Router();

router.get('/',(ctx, next)=>{
  ctx.body = 'Hello koa-router';
})

app
.use(router.routes())
.use(router.allowedMethods())
.listen(3000,()=>{
  console.log('server is running at http://127.0.0.1:3000');
})
```

# koa-router 前缀
  + prefix
```
const router = new Router({
  prefix: '/lzhhc'
})
router
.get('/',(ctx,next)=>{
  ctx.body = 'Hello lzhhc'
})

// 此时访问需要 http://127.0.0.1:3000/lzhhc
```

# 子路由挂载到父路由
```
// 子路由
const home = new Router();
const page = new Router();
home.get('/lzhhc', async (ctx) => {
    ctx.body = 'home lzhhc'
})
page.get('/lzhhc', async (ctx) => {
    ctx.body = 'page lzhhc'
})

// 父路由挂载子路由
const router = new Router();
router
    .use('/home', home.routes(), home.allowedMethods())
    .use('/page', page.routes(), page.allowedMethods())
```

# 返回 cookie
```
router
.get('/index', async (ctx, next) => {
    ctx.cookies.set(
        'name', 'lzhhc', {
            domain: '127.0.0.1',
            path: '/index',
            maxAge: 1 * 1000 * 60 * 60 * 24,
            expires: new Date('2019-12-31'),
            httpOnly: false,
            overwrite: false
        }
    );
    ctx.body = 'cookie is ok'
})
```

# 读取 cookie
```
router
.get('/', async (ctx, next) => {
    if (ctx.cookies.name) {
        ctx.body = ctx.cookies.get('name');
    } else {
        ctx.body = 'no cookie'
    }
})
```

# 模板引擎 ejs
1. cnpm install --save koa-views ejs
2. 导入&&挂载&&引用
```
const views = require('koa-views');
const path = require('path');

app
.use(views(path.join(__dirname, './view'),{
  extension:'ejs'
}))
.use(async (ctx,next)=>{
  const title = 'Hi lzhhc';
  await ctx.render('index',{title})
})
```

# 配置静态文件
1. cnpm install --save koa-static
2. 导入&&挂载&&引用
```
const static = require('koa-static');
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)))
```
   + 假设在/static 下有一张 static/2ha.jpg
   + 可以在 localhost:3000/2ha.jpg下访问到

