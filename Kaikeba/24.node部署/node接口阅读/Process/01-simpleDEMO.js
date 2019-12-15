process.on('beforeExit', (code) => {
    console.log(`进程 beforeExit 事件的代码: ${code}`);
});

process.on('exit', (code) => {
    console.log(`进程 exit 事件的代码: ${code}`);
})

console.log(`此消息最新显示`);