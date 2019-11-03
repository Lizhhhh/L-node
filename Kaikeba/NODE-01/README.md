# 使用内置的OS模块,查看内存占用率
````
const os = require('os');
const mem = os.freemem() / os.totalmem() * 100
console.log(`内存占用率${mem.toFixed(2)}%`);
````

# 使用第三方库查看cpu占用率
  - cpu-stat
  - npm i cpu-stat -s
````
const cpuStat = require('cpu-stat');
cpuStat.usagePercent((err, percent) => {
  console.log(`CPU占用${percent}%`);
})
````
# 根据路由读取文件然后返回
  - /index.html
````html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    Marron

</body>

</html>
````
  - /04-http.js
````javascript
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const { url, method } = req;
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end(`Server Error`);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html')
                res.end(data);
            }
        })
    }
    console.log(`method:${method}`);
})
server.listen(3000, () => {
    console.log('[server] server is running at 3000');
})
````
  - 返回json格式
````
res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
res.end(JSON.stringify({name:'marron'}))
````

# 自制express服务器
  - 对大量if...else处理路由的优化
