const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // 主进程的id: ${process.pid}
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // 监听进程的退出
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.createServer((req, res) => {
        Math.random > 0.5 ? a() : '';
        res.writeHead(200);
        res.end(`Hello World by process:${process.pid}`);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}