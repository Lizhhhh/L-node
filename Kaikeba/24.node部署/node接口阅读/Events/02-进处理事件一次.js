const events = require('events');
class MyEmitter extends events {};
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on('event', (a) => {
    console.log(++m);

})
myEmitter.emit('event');
myEmitter.emit('event');



// 使用eventEmitter.once() 可以注册最多调用一次的监听器。
// 当事件被触发时,监听器会被注销,然后调用
m = 0;
myEmitter.once('event1', (a) => {
    console.log(++m);
    if (a) {
        console.log(a);
    }
});
myEmitter.emit('event1', 'a');
myEmitter.emit('evnet1', 'b');