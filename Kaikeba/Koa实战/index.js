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