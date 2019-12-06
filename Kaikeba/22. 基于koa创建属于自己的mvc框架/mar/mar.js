const koa = require('koa');
const Router = require('koa-router');

class Mar {
    constructor(conf) {
        this.$app = new koa(conf); // 相当于app
        this.$router = new Router();
        this.service = new Service(this);
        this.controller = new Controller(this);
        this.router = new Router(this);
    }

    listen(port) {
        this.koa.listen(port, async () => {
            console.log(`[mar]Server is running at http://localhost:${port}`);
        })
    }
}

class Router {
    constructor(app) {
        const { controller, $router, $app } = app;
    }
}
class Controller {
    constructor(app) {
        const { service } = app;
        console.log('controller:', service.test());
    }
    test() {
        return 'Controller for Router'
    }
}
class Service {
    constructor(app) {
        console.log('Service:', app);
    }
    test() {
        return 'Service for Controller'
    }
}

module.exports = Mar