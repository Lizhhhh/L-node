# 知识点
- koa原理
- context
- 中间件
- 常见koa中间件的实现

***
# context
- koa为了能简化API,引入了上下文context概念,将原始请求对象req和响应对象res封装并挂载到context上,并且在context上设置getter和setter,从而简化操作
````javascript
// app.js
app.use(ctx =>{
  ctx.body = 'hehe'
})
````

