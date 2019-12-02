module.exports = () =>{
  return async (ctx, next) =>{
    try{
      await next();
      // 如果没有更改过reponse的status,则Koa默认的status是404
      if(ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
    } catch(e) {
      // 异常处理
    }
  }
}