const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    constructor() {
        super();
    }
};



// // 1.初步使用
// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//     console.log('触发事件');
// });
// myEmitter.emit('event');

// // 2.将参数和 this 传给监听器
// const myEmitter = new MyEmitter();
// myEmitter.on('event', function(a, b) {
//     console.log(a, b, this, this === myEmitter);
// });
// myEmitter.emit('event', 'a', 'b');
// // [注]如果使用监听函数,则this将不会指向实例

// // 3.异步VS同步
// // EventEmitter以注册的顺序同步地调用所有监听器。 这样可以确保事件地正确顺序,并有助于避免竞态条件和逻辑错误。
// const myEmitter = new MyEmitter();
// myEmitter.on('event', (a, b) => {
//     setImmediate(() => {
//         console.log(`异步发生`);
//     });
// });
// myEmitter.emit('event', 'a', 'b');