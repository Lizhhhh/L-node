# EventLoop
- 一个循环,每一次的循环叫tick,每次循环执行的代码叫task
- v8引擎是单线程,无法同时干两件事
- 文件读取、网络I/O缓慢且具有不确定性
- 异步I/O: 要通过异步回调的方式处理
- 先同步再异步,异步放入队列等同步完成后在执行,每次循环叫一个tick(process.nextTick)

# 异步任务的区分
microtasks(微任务): 唯一,整个事件循环当中,仅存在一个; 执行为同步, 同一个事件循环中的microtask会按照队列顺序,串行执行完毕;
- process.nextTick
- promise
- Object.observe
- MutationObserver
tasks(宏任务):
- setTimeout
- setInterval
- setImmediate
- I/O
- UI渲染

# 单线程的含义:
浏览器是多进程(multi-process),一个浏览器只有一个浏览进程(Browser Process),负责管理Tabs、协调其他进程(process)和渲染进程(Render process,内存中的位图到页面的像素点上);
在Chrome中,一个Tab对于一个渲染进程,渲染进程是多线程,其中主线程负责页面的渲染、JS的执行和事件循环;前后端交互用的网络组件可以开2~6个 I/O 线程去处理

# 浏览器中的事件循环
- 执行全局Script的同步代码
- 执行microtask任务
- 从宏任务队列中取出队首一个任务
- 执行该任务
- 任务执行完毕,检查是否有微任务(有则执行,否则执行第一步)

# Node.js的Event Loop过程:
1. 执行全局Script的同步代码
2. 执行microtask微任务,先执行所有 Next Tick Queue中的所有任务,再执行Other Microtask Queue中的所有任务
3. 开始执行macrotask宏任务,共6个阶段,从第1个阶段开始执行相应每一个阶段macrotask中的**所有任务**,六个阶段: Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback  Queue -> 步骤2 -> Timers Queue...


- MacroTask包括: setTimeout、setInterval、setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering(浏览器)
- MicroTask包括:s process.nextTick(Node)、Promise.then、Object.observe、MutationObserver

# setTimeout 和 setImmediate
- setImmediate():方法用于中断长时间运行的操作,并在完成其他操作后立即运行回调函数
- setTimeout/setInterval的第二个参数取值范围是: [1, 2^31 -1],如果超过这个范围就会初始化为1,即 setTimeout(fn, 0) === setTimeout(fn, 1)

