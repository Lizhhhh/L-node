const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Mar {
    constructor() {
        console.log('Mar ok');
    }
    use(cb) {
        this.callback = cb;
    }
    listen(...args) {
        const server = http.createServer((req, res) => {
            const ctx = this.createContext(req, res);
            // this.callback(req, res);
            this.callback(ctx);
            // 响应
            res.end(ctx.body);
        });
        server.listen(...args)
    }

    // 构建上下文
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx
    }

}

module.exports = Mar