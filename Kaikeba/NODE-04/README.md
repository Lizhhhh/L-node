# 处理上下文代码的两个阶段
## 1.进入执行上下文
### 执行上下文的3个属性:
- 变量对象(Variable Object, VO)
- 作用域链(Scope chain)
- this
### 进入执行上下文需要做的3件事:
1. 确定变量对象
如何确定变量对象?
- 首先确定函数的形参
变量对象的一个属性,其属性名就是形参的名字,其值就是实参的值;对于没有传递的参数,其值为undefined
- 其次确定函数的声明
其属性名和值都是函数对象创建出来的;如果变量对象已经包含了相同名字的属性,则替换它
- 最后确定变量声明
其属性名为变量名,其值为undefined;如果变量名和已经声明的函数名或者函数的参数名相同,则不影响已经存在的属性.


2. 确定作用域链




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


# 进程
操作系统最小执行单位,一个进程占用一个端口.一个进程可以包含多个线程.多个线程之间可以实现并发.

# 浏览器
- 浏览器是多进程,一个浏览器只有一个主进程:负责管理Tabs、协调其他进程和渲染进程(Render Process),将内存中的位图(bitMap)绘制到页面的像素(pixel)上
- 在Chrome中,一个Tab对应一个渲染进程,渲染进程是多线程(multi-thread),其中:主线程(main thread)负责页面渲染(GUI render engine,用户图形界面渲染引擎)、执行JS(JS engine) 和 event loop
- 求后端网络服务之间,可以开 2~6个 I/O 线程去平行处理


# 浏览器中的事件循环的位置
- 以Chrome浏览器为例:
Chrome浏览器(现在)是多进程,其中,每个Tabs都是一个独立的进程.每个Tabs又是多线程的,其中的主线程负责:
1. 页面渲染(GUI render engine)
2. 执行JS (JS engine)
3. event loop

- 即: event loop 位于每个进程中主线程的主线程中
