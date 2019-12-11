class Event {
    constructor() {
        this.events = {};
    }
    add(name, cb) {
        if (this.events[name]) {
            this.events[name].push(cb);
            return this; // 返回当前实例
        }
        this.events[name] = [cb];
        return this;
    }
    emit(name, ...args) {
        if (this.events[name]) {
            this.events[name].forEach(cb => {
                cb(...args);
            })
            return this;
        } else {
            console.error('[Event Error]: 该事件未注册')
        }
    }
}

let e = new Event();
e
    .add('sayHello', (err, name) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`hello ${name}`);
    })
    .emit('sayHello', '发生了错误')
    .emit('sayHello', null, 'mar~!');