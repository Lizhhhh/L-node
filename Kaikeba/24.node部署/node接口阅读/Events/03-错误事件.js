const events = require('events');
class MyEmitter extends events {};
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
    console.error(err);
});
myEmitter.emit('error', new Error('错误'));