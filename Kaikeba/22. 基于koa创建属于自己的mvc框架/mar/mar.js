const koa = require('koa');
const koaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');

class Mar {
    constructor(conf) {
        this.$app = new koa(conf); // 相当于app
        this.$router = new koaRouter();
        this.service = new Service(this);
        this.controller = new Controller(this);
        this.router = new Router(this);
    }

    listen(port) {
        this.$app.listen(port, async () => {
            console.log(`[mar]Server is running at http://localhost:${port}`);
        })
    }
}

class Router {
    constructor(app) {
        const { controller, $router, $app } = app;
        $router.get('/', controller.index);
        $app.use($router.routes());
    }
}
class Controller {
    constructor(app) {
        const { service } = app;
        console.log('service:', service.test());
        Controller.prototype.service = service;
    }
    test() {
        return 'Controller for Router'
    }
    async index(ctx) {
        const service = Controller.prototype.service;
        ctx.body = await service.index();
    }
}
class Service {
    constructor(app) {
        console.log('Service: ok');
    }
    test() {
        return 'Service for Controller'
    }
    async index() {
        return {
            name: 'marron',
            age: 18,
            remarks: `forever 18`
        }
    }
}

module.exports = Mar