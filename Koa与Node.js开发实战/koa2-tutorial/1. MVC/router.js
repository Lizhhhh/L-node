const router = new require('koa-router')();
const HomeController = require('./controller/home');
module.exports = (app) => {
    router.get('/', HomeController.index);
    router.get('/home', HomeController.home);
    router.get('/home/:id/:name', HomeController.homeParams);
    router.get('/user', HomeController.user)
    router.post('/user/login', HomeController.login);
    app.use(router.routes()).use(router.allowedMethods());
}