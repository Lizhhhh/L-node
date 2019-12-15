const events = require('events');
class MyEmitter extends events {};
const myEmitter = new MyEmitter();
// 只处理一次, 避免死循环
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在前面插入一个新的监听器.
        myEmitter.on('event', () => {
            console.log('B');
        });
    }
});
myEmitter.on('event', () => {
    console.log('A');
});
myEmitter.emit('event');