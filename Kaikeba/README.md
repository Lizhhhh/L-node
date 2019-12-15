# nodeJS 学习

1. NodeJS 基础
2. 网络编程
3. 持久化 - 结构化数据 - mysql
4. 持久化 - 非结构化数据 - mongodb-redis
5. Koa 实战 - 基础服务\_模板引擎
6. Koa 鉴权 - cookie - token -jwt
7. Eggjs_mvc 分层架构
8. Koa 源码解析 + Eggs
9. Koa 实战 Restful 接口
10. 部署 Linux - Ngnix - Pm2 CI DevOps

# NODE-01

- 开始时间: 2019 年 11 月 3 日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/NODE-01/README.md

# NODE-02

- 开始时间: 2019 年 11 月 3 日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/NODE-02/README.md

# NODE-03

- 开始时间: 2019 年 11 月 4 日
- 笔记: https://github.com/Lizhhhh/L-node/tree/master/Kaikeba/NODE-03/README.md

# Persistence mongoDB

- 开始时间: 2019 年 11 月 13 日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/Persistence%20mongoDB/README.md

# NODE-04

- 开始时间: 2019 年 11 月 14 日
- 笔记: https://github.com/Lizhhhh/L-node/tree/master/Kaikeba/NODE-04/README.md

# Koa 实战

- 开始时间: 2019 年 11 月 16 日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/Koa%E5%AE%9E%E6%88%98/README.md

# 鉴权

- 开始时间: 2019 年 11 月 17 日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/%E9%89%B4%E6%9D%83/README.md

# Restful

- 开始时间: 2019 年 11 月 20 日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/Restful/README.md

# Event Loop

一个循环,每次循环叫 tick,每次循环的代码叫 task

- v8 引擎单线程,无法同时干两件事
- 文件读取、网络 IO 缓慢且具有不确定性
- 要通过异步回调方式处理又称为异步 IO
- 先同步再异步,异步放入队列等同步完成后在执行,每次循环叫一个 tick

- `microtasks(微任务)`:
  唯一,整个事件循环当中,仅存在一个;执行为同步,同一个事件循环中的 microtask 会按队列顺序,串行执行完毕:

  - process.nextTick
  - promise.then
  - Object.observe
  - MutationObeserver

- `task(宏任务)`:
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI 渲染

# Egg.js 体验

- 全局安装

```javascript
// 创建项目
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i

// 启动项目
$ npm run dev
```

# 在 egg 中使用 egg-sequelize 插件

- sequelize 是与数据库操作相关的库
- 安装: `npm install --save egg-sequelize mysql2`

# 在 egg 中配置 sequelize

- 1.在 `config/plugin.js`中引入 egg-sequelize 插件,代码如下

```javascript
sequelize: {
  enable: true,
  package: 'egg-sequelize'
}
```

- 2.在`config/config.default.js`中编写 sequelize 配置

```javascript
// const userConfig 中
sequelize:{
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'test'
}
```

# 在 Model 层定义 user 的结构

- `/app/model/user.js`

```javascript
module.exports = app => {
  const { STRING } = app.Sequelize

  const User = app.model.define(
    'user',
    { name: STRING(30) },
    { timestamps: false }
  )

  // 数据库同步
  User.sync({ force: true })

  return User
}
```

- 定义数据表的结构使用`app,model.define`
- 由于在最开始引入了 Sequelize 故,可以使用 app.model.define

# 在服务层(Service)获取表,并插入数据

- `/app/service/user.js`

```javascript
const Service = require('egg').Service

class UserService extends Service {
  async getAll() {
    const User = this.ctx.model.User // 获取Model层的User表
    await User.sync({ focrce: true })
    await User.create({
      name: 'marron'
    })

    return await this.ctx.model.User.findAll()
  }
}
module.exports = UserService
```

# 在控制层(Controller)调用服务层(Service)的功能

- `/app/controller/home.js`

```javascript
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.user.getAll()
  }
}
```

- 注: `ctx.service.user.getAll()` 对应目录下 `/app/service/user`的 getAll 方法.即上面写到的`async getAll()`

# 在路由层(Router)将 URL 和方法对应

- `/app/router.js`

```javascript
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
}
```

# 使用 http 模块调用 http 请求

```javascript
const http = require('http')
http.get('http://localhost:3000')
```

# cluster(集群)

- 单个 Node.js 实例运行在单个线程中。为了充分利用多核系统,有时需要启用一组 Node.js 进程去处理负载任务.
- `cluster`模块可以创建共享服务器端口的子进程

# cpu 数量

```javascript
const numCPUs = require('os').cpus().length
```

# 判断是不是主进程

```javascript
const cluster = require('cluster')
if (cluster.isMaster);
```

# 进程的 id

```javascript
console.log(`进程id ${process.pid} `)
```

# 创建一个新的进程

```javascript
cluster.fork()
```

- 创建和 cpu 核数相等的进程

```javascript
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
for (let i = 0; i < numCPUs; i++) {
  cluster.fork()
}
```

# 工作原理

- 工作进程由 child_process.fork()方法创建,因此它们可用使用 IPC 和父进程通信,从而使各进程交替处理连接服务.
- cluster 模块支持两种分发连接的方法
- 第一种方法(循环法): 由主进程负责监听端口,接收新连接后再将连接循环分发给工作进程,在分发中使用一些内置技巧防止工作进程过载
- 第二种方法: 主进程创建监听 socket 后发送给感兴趣的工作进程,由工作进程负责直接接收连接.

# worker 类

- 继承自 <EventEmitter>
  Worker 对象包含了关于工作进程的所有公共的信息和方法。在主进程中,可用使用 cluster.workers 来获取它。在工作进程中,可用使用 cluster.worker 来获取它.

# 'disconnect'事件

```javascript
cluster.fork().on('disconnect', () => {
  // 工作进程已断开连接
})
```

# node 中,进程之间的通信

- 发送消息

```javascript
process.send({ cmd: 'notifyRequest' })
```

- 接收消息

```javascript
// 假设有多个进程
for (const id in cluster.workers) {
  cluster.workers[id].on('message', messageHandler)
}
```

# 创建一个新进程
````javascript
const cluster = require('cluster');
const work = cluster.fork();
````

# worker.disconnect()
- 在一个工作进程内,调用`worker.disconnect`方法会关闭所有的server,并等待这些
