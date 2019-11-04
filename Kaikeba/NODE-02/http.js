const http = require('http');
const fs = require('fs');

http
    .createServer((req, res) => {
        const { method, url } = req;
        console.log('method:', method, 'url:', url);
        if (method === "GET" && url === '/') {
            fs.readFile('./index.html', (err, data) => {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            })
        } else if (method === "GET" && url === '/users') {
            cors(req, res);
            res.end(JSON.stringify({ name: '奇怪的栗子', age: 18 }));
        }
        // 预检请求
        else if (method === "OPTIONS" && url === "/users") {
            cors(req, res);
            res.end();
        }
    })

    .listen(3000, () => {
        console.log('[server] Server is running at http://localhost:3000');
    })

function cors(req, res) {
    res.setHeader("Content-Type", "text/json");
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader("Access-Control-Allow-Headers", "X-Token,Content-Type");
    res.setHeader('Set-Cookie', 'cookie1=va222;');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log(req.headers.cookie);
}