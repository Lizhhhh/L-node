const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const process = require('process');
console.log(`numCpu: ${numCPUs}`)

// 保存子进程
const workers = {};
if (cluster.isMaster) {
    // 主进程(进来一定会走主进程)
    cluster.on('death', function(worker) {
        // 监听进程的死亡
        workers[worker.pid] = cluster.fork();
    })
    // 初始化开启和CPU数量一致的进程
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork(); // 创建一个进程
        workers[worker.pid] = worker; // 保存当前进程(worker.pid,相当于开启的进程的id)
    }

} else if (cluster.isWorker) {
    // 子进程
    // 工作分支
    const app = require('./app');
    app.use(async (ctx, next) => {
        // 子进程的id号 ${cluster.worker.id}
        console.log(`Worker ${cluster.worker.id}, PID ${process.pid}`);
        next();
    })
    app.listen(3000);
}

// 当主进程终止
process.on(`SIGTERM`, function() {
    for (var pid in workers) {
        process.kill(pid); // 关闭所有小弟
    }
    process.exit(0); // 退出主进程
});

require('./test');