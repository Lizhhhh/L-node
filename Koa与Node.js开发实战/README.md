# 什么是Node.js
Node.js是一个基于Chrome v8引擎的JavaScript运行环境。Node.js使用了一个事件驱动、非阻塞式I/O模型,使其轻量又高效。Node.js的包管理器NPM,是全球最大的开源库系统


# 运行时环境(Managed Runtime Environment)
是一个平台,它把运行在底层的操作系统和体系结构的特点抽象出来,承担了解释与翻译、堆管理(Heap Management)、垃圾回收机制(Garbage Collection)、内存分配(Memory Allocation)、安全机制(Security)等功能。在这些运行时环境中开发应用的开发者开源不用关心底层的计算机处理指令,而把更多的精力投入到更为关键的业务逻辑中去。

- 注:
1. 运行时环境使开发者能够以最小成本去创建应用
2. JavaScript运行时环境就是一个能够执行JavaScript代码的运行环境,它提供一系列以往由处理器和操作系统才能提供的功能,使得开发者能够脱离底层指令,从而更专注于业务逻辑开发

# 事件驱动
是一种事件处理的方式,这种方式同传统的数据处理方式CRUD(增加、读取、更新、删除)截然不同。
- CRUD方式的弊端主要有:
1. CRUD会直接在数据存储区进行操作,会降低响应速度和性能水平,对进程的开销过大也会限制项目的规模和可扩展性
2. 在存在大量并发用户和协作域中,对于同一数据主体的操作很可能会引起冲突
3. 在没有额外监听措施的情况下,任何节点能够获得的只有当前的状态快照,历史数据会丢失

事件驱动(Event Sourcing)定义了一种由事件驱动的数据处理方式,应用发送的所有事件都会被载入附加存储区,每一个事件都代表了一些列的数据变更。
- 事件驱动的优势:
1. 已经发生的事件是不可更改的,并且只在附加区域中存储而不影响主线程,因此对事件进行处理的操作完全可以在后台进行而不影响客户端的UI和内容展示
2. 不同的用户对同一个对象的操作不会产生冲突,因为这种数据处理方式避免了对数据本身的直接修改
3. 附加区域中存储的事件流实际上提供了一个监听机制,是开发者能够通过重演历史事件的方式来获取当前状态,进而有助于系统的测试和漏洞修复。


# 1.1.5 实战演练: 使用Node.js搭建一个HTTP Server
- 源代码: /node-server.js
- 说明:
1. `url.parse(req.url).pathname`: 获取路径
2. `server.listen(port, hostname, cb)`: 监听hostname:port的请求

# CommonJS规范的模块应包含以下几个文件
- package.json: 模块的描述性文件
- bin: 存放可执行的二进制文件
- lib: 存放JavaScript代码
- doc: 存放文档
- test: 存放单元测试用例

# package.json文件的创建
````bash
npm init
````

# package.json文件中常用的字段
1. `description`: 模块描述
2. `name`: 模块名字
3. `version`: 版本号
4. `keywords`: 关键词 (用于在npm.org中进行搜索)
5. `license`: 许可证
6. `author`: 开发者
7. `scripts`: 可用于运行的脚本命令
8. `dependencies`: 正常运行时所需的模块
9. `devDependencies`: 开发时所需的模块

# 初始化一个npm项目
````bash
npm init
````

# 启动服务器
````javascript
const koa = require('koa')
