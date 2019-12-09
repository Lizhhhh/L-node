# nodeJS学习
  1. NodeJS基础
  2. 网络编程
  3. 持久化 - 结构化数据 - mysql
  4. 持久化 - 非结构化数据 - mongodb-redis
  5. Koa实战 - 基础服务_模板引擎
  6. Koa鉴权 - cookie - token -jwt
  7. Eggjs_mvc分层架构
  8. Koa源码解析 + Eggs
  9. Koa实战Restful接口
  10. 部署Linux - Ngnix - Pm2 CI DevOps

# NODE-01
- 开始时间: 2019年11月3日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/NODE-01/README.md

# NODE-02
- 开始时间: 2019年11月3日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/NODE-02/README.md

# NODE-03
- 开始时间: 2019年11月4日
- 笔记: https://github.com/Lizhhhh/L-node/tree/master/Kaikeba/NODE-03/README.md

# Persistence mongoDB
- 开始时间: 2019年11月13日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/Persistence%20mongoDB/README.md

# NODE-04
- 开始时间: 2019年11月14日
- 笔记: https://github.com/Lizhhhh/L-node/tree/master/Kaikeba/NODE-04/README.md

# Koa实战
- 开始时间: 2019年11月16日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/Koa%E5%AE%9E%E6%88%98/README.md

# 鉴权
- 开始时间: 2019年11月17日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/%E9%89%B4%E6%9D%83/README.md

# Restful
- 开始时间: 2019年11月20日
- 笔记: https://github.com/Lizhhhh/L-node/blob/master/Kaikeba/Restful/README.md


# Event Loop
一个循环,每次循环叫tick,每次循环的代码叫task
- v8引擎单线程,无法同时干两件事
- 文件读取、网络IO缓慢且具有不确定性
- 要通过异步回调方式处理又称为异步IO
- 先同步再异步,异步放入队列等同步完成后在执行,每次循环叫一个tick

- `microtasks(微任务)`:
唯一,整个事件循环当中,仅存在一个;执行为同步,同一个事件循环中的microtask会按队列顺序,串行执行完毕:
  - process.nextTick
  - promise.then
  - Object.observe
  - MutationObeserver

- `task(宏任务)`:
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI渲染


# Egg.js体验
- 全局安装
````javascript
// 创建项目
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i

// 启动项目
$ npm run dev
````

# 在egg中使用egg-sequelize插件
- sequelize是与数据库操作相关的库
- 安装: `npm install --save egg-sequelize mysql2`
# 在egg中配置sequelize
  - 1.在 `config/plugin.js`中引入 egg-sequelize插件,代码如下
````javascript
sequelize: {
  enable: true,
  package: 'egg-sequelize'
}
````
- 2.在`config/config.default.js`中编写sequelize配置
````javascript
// const userConfig 中
sequelize:{
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'test'
}
````

# 在Model层定义user的结构
- `/app/model/user.js`
````javascript
module.exports = app =>{
	const { STRING } = app.Sequelize;

	const User = app.model.define(
		"user",
		{	name: STRING(30) },
		{	timestamps: false}
	);

	// 数据库同步
	User.sync({ force: true });

	return User
}
````
- 定义数据表的结构使用`app,model.define`
- 由于在最开始引入了Sequelize故,可以使用app.model.define


# 在服务层(Service)获取表,并插入数据
- `/app/service/user.js`
````javascript
const Service = require('egg').Service;

class UserService extends Service {
	async getAll(){
		const User = this.ctx.model.User;		// 获取Model层的User表
		await User.sync({ 	focrce: true	});
		await User.create({
			name: 'marron'
		});

		return await this.ctx.model.User.findAll();
	}
}
module.exports = UserService;
````

# 在控制层(Controller)调用服务层(Service)的功能
- `/app/controller/home.js`
````javascript
const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index (){
		const { ctx } = this;
		ctx.body = await ctx.service.user.getAll();
	}
}
````
- 注: `ctx.service.user.getAll()` 对应目录下 `/app/service/user`的getAll方法.即上面写到的`async getAll()`

# 在路由层(Router)将URL和方法对应
- `/app/router.js`
````javascript
module.exports = app =>{
	const { router, controller } = app;
	router.get('/', controller.home.index);
}
````

