const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const { url, method, headers } = req;
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
                res.end(`Server Error - 服务器错误`);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html')
                res.end(data);
            }
        })
    } else if (url === '/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify({ name: 'marron' }))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(res)
    }
})
server.listen(3000, () => {
    console.log('[server] server is running at 3000');
})
