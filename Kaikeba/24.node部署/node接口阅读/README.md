# events(事件触发器)
大多数 Node.js 核心API 构建于惯用的异步事件驱动架构,其中某些类型的对象(又称触发器, Emitter)会触发命名事件来调用函数(又称监听器, Listener)

# EventEmitter类
- 由 events 模块定义:
````javascript
const EventEmitter = require('events');
````
- 当新增监听器时,会触发`newListener`事件
- 当移出已存在的监听器时,会触发`removeListener`

