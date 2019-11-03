module.exports.getState = () => {
    const os = require('os');
    const cpuStat = require('cpu-stat');
    // 使用os查看内存占用率
    const mem = os.freemem() / os.totalmem() * 100;
    console.log(`内存占用率${mem.toFixed(2)}%`);

    // 使用cpu-stat库查看cpu占用率
    cpuStat.usagePercent((err, percent) => {
        console.log(`CPU占用${percent}%`);
    })
}