const http = require('http');

class Mar {
    constructor() {
        console.log('Mar ok');
    }
    use(cb) {
        this.callback = cb;
    }
    listen(...args) {
        const server = http.createServer((req, res) => {
            this.callback(req, res);
        });
        server.listen(...args)
    }
}

module.exports = Mar