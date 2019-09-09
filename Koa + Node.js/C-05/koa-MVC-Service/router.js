const router = require('koa-router')();
const HomeController = require('./controller/home');

module.exports= (app)=>{
  router
  .get('/user',HomeController.user)
  .post('/user/login',HomeController.login);
  app
  .use(router.routes())
  .use(router.allowedMethods())
}