const Koa = require('koa');
const app = new Koa();
const Router = require('./components/router.js');
const router = new Router();

router.get('/404',(context, next)=>{
  context.body = 'Page not found';
  context.status = 404;
})
app
.use(router.routes())
.listen(3000);