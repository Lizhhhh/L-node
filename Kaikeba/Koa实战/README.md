# Koa 实战

# 课程目标

- 掌握 Koa 基本用法
- 理解 Koa 设计思路
- 路由
- 静态文件服务
- 模板引擎
- 待添加常用中间件 bodyparse

# 生成一个 koa 实例

```javascript
const Koa = require('koa')
const app = new Koa()

const mid1 = async (ctx, next) => {
  ctx.body = '1'
  await next()
  ctx.body = ctx.body + ' a'
}

const mid2 = async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8'
  ctx.body = ctx.body + ' 2'
  await next()
  ctx.body = ctx.body + ' b'
}

const mid3 = async (ctx, next) => {
  ctx.body = ctx.body + ' 3'
  await next()
  ctx.body = ctx.body + ' c'
}

app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(3000)
```

- 洋葱模型显示 1 2 3 c b a

# 上下文的总结

ctx
.req Node 的 request
.res Node 的 response
.response koa 的 response
.request koa 的 request
.state 推荐命名空间,用于中间件传递信息和前端视图
.app 应用程序引用

# 自定义睡眠函数

```javascript
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
```

# 使用路由

- /Koa 实战/routes/index.js

```javascript
const Router = require('koa-router')
const router = new Router()

router.get('/', ctx => {
  ctx.body = 'index'
})

module.exports = router
```

- /Koa 实战/routes/users.js

```javascript
const Router = require('koa-router')
const router = new Router(prefix, '/users')

router.get('/', ctx => {
  ctx.body = 'user'
})

module.exports = router
```

- 使用: /Koa 实战/index.js

```javascript
const index = require('./routes/index')
const users = require('./routes/users')
app.use(index.routes())
app.use(users.routes())
```

- 说明:

1. `new Router(prefix, '/users')`: 是给请求的路径加一个请求前缀,即 url 请求 '/users',在本地只需使用 `app.get('/')`即可
2. 使用时,先导入,然后使用'koa-router'的固定语法`app.use(xxx.routes())`来将自己的模块变为中间件

# 静态文件服务

- 使用 koa-static 中间件

```javascript
const static = require('koa-static')
app.use(static(__dirname + 'public'))
```

# 模板引擎:

- npm i koa-hbs@next -S

```javascript
const hbs = require('koa-hbs')
app.use(
  hbs.middleware({
    viewPath: __dirname + '/views', // 视图根目录
    defaultLayout: 'layout', // 默认布局页面
    partialsPath: __dirname + '/views/partials',
    disableCache: true // 开始阶段不缓存
  })
)
```

- 参数说明:

1. `viewPath: __dirname + '/views'`: 定义了视图的根目录为 '/views'
2. `defaultLayout: 'layout'`: 会将 /views/layout.hbs 作为默认布局
3. `router.get('/', async ctx=>{await ctx.render('index')})`: 表示,用/views/index.hbs 代替 /views/layout.hbs 中的 '{{body}}'

# 监听 users 路由,并使用 koa-hbs 渲染

- node 后端监听 'localhost:3000/users'

```javascript
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })

router.get('/', async ctx => {
  await ctx.render('users', {
    title: '用户列表',
    subTitle: 'handlers语法',
    isShow: true,
    username: 'Jerry',
    users: [
      { username: 'tom', age: 20 },
      { username: 'jerry', age: 21 }
    ]
  })
})

module.exports = router
```

- 说明:

1. `await ctx.render("users", params)`: 使用 users.hbs 代替 layout 中的{{body}}部分
2. 能够使用`await ctx.render`的原因是,做了如下配置:

```javascript
const hbs = require('koa-hbs')
app.use(
  hbs.middleware({
    viewPath: __dirname + '/views',
    defaultLayout: 'layout',
    partialsPath: __dirname + 'views/partials',
    disableCache: true
  })
)
```

# hbs 模板引擎常用语法说明

- 1.插值语句

```html
<h1>{{subTitle}}</h1>
```

- 2.HTML

```html
<p>{{ htmlStr }}</p>
```

- 3.条件语句

```html
{{#if bool}}
<!-- if语句 -->
{{else}}
<!-- else语句 -->
{{/if}}
```

- 4. 循环语句

```html
<ul>
  {{#each users}}
  <li>{{username}} - {{age}}</li>
  {{/each}}
</ul>
```

# 扩展 hbs 功能

- 给 hbs 添加时间规范化功能
- 使用 moment 库
- 配置
- /Koa 实战/utils/helpers.js

```javascript
const hbs = require('koa-hbs')
const moment = require('moment')

hbs.registerHelper('date', (date, pattern) => {
  try {
    return moment(date).format(pattern)
  } catch (err) {
    return ''
  }
})
```

- /Koa 实战/index.js

```javascript
const helper = require('./utils/helpers')
```

- 使用
- /Koa 实战/views/users.hbs

```html
<li>{{username}} - {{age}} - {{date birth: 'YYYY/MM/DD' }}</li>
```

- 说明:

1. 遇到{{date birth}}时, 会去上下文寻找`hbs.registerHelper`方法注册的 date 处理事件
2. 将 birth 数据和方法传入.

# 数据库连接测试
- mongoose 连接, ./models/mongoose.js

```javascript
const mongoose = require('mongoose');

// 1.连接
mongoose.connect("mongodb://localhost:27017/test",{
  useNewUrlParser: true
});
const conn = mongoose.connection;
conn.on("error", ()=>console.error("连接数据库失败"));
conn.once("open", ()=>console.log("连接数据库成功"));
```
- 说明:
1. `mongodb://localhost:27017/test`: 指明了mongoDB的地址,和具体是连接test库
2. `conn.on('error')`: 监听error事件,后面是一个回调函数

# 创建vip表规则
````javascript
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  url: String,
  poster: String,
  icon: String,
  description: String,
  cooperation: [String]
});
const model = mogoose.model("vip", schema);
````
