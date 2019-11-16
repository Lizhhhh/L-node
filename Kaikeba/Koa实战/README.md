# Koa实战
# 课程目标
- 掌握Koa基本用法
- 理解Koa设计思路
- 路由
- 静态文件服务
- 模板引擎
- 待添加常用中间件 bodyparse

# 生成一个koa实例
````javascript
const Koa = require("koa");
const app = new Koa();

const mid1 = async (ctx, next) => {
    ctx.body = '1';
    await next();
    ctx.body = ctx.body + ' a';
}

const mid2 = async (ctx, next) =>{
  ctx.type = 'text/html;charset=utf-8';
  ctx.body = ctx.body + ' 2';
  await next();
  ctx.body = ctx.body + ' b';
}

const mid3 = async(ctx, next)=>{
  ctx.body = ctx.body + ' 3';
  await next();
  ctx.body = ctx.body + ' c';
}

app.use(mid1);
app.use(mid2);
app.use(mid3);

app.listen(3000);
````
- 洋葱模型显示 1 2 3 c b a


# 上下文的总结