const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    // 创建一个工作进程
    const worker = cluster.fork();
    let timeout;

    // 子进程监听 'listening'标识
    worker.on('listening', (address) => {
        // 发送 'shutdown'标识
        worker.send('shutdown');
        worker.disconnect(); //  断开连接
        timeout = setTimeout(() => {
            worker.kill(); // 2秒后关掉改子进程
        }, 2000);
    });

    // 子进程监听 'disconnect'标识
    worker.on('disconnect', () => {
        // 清除掉定时器
        clearTimeout(timeout);
    });
} else if (cluster.worker) {
    const net = require('net');
    const server = net.createServer((socket) => {
        // 连接永远不会结束./
    });
    server.listen(8000);

    process.on('message', (msg) => {})
}