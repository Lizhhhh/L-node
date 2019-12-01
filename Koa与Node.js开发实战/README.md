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
const koa = require('koa');
const app = new koa();
app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000');
});
````

# ctx.request
- 获取路径、请求对象、请求字符串
````javascript
const koa = require('koa');
const app = new koa();
app.use(async ctx=>{
  ctx.response.body = {
    url: ctx.request.url,
    query: ctx.request.query,
    querystring: ctx.request.querystring
  }
});
app.listen(3000)
````
- 获取post请求
````javascript
const koa = require('koa');
const app = new koa();
app.use(async ctx=>{
  let postdata = '';
  ctx.req.on('data', data =>{
    postdata += data;
  })
  ctx.req.on('end', ()=>{
    ctx.response.body = postdata;
    console.log(postdata);
  });
});
app.listen(3000);
````
- 通过 koa-bodyparser 中间件来获取POST请求的参数
````javascript
const koa = require('koa');
const app = new koa();
app.use(async ctx =>{
  if(ctx.request.method === 'POST'){
    console.log('post');
  } else if (ctx.request.method === 'GET'){
    if(ctx.request.path !== '/'){
      ctx.response.type = 'html';
      ctx.response.body = '<a href="/">Go To Index</a>';
    } else {
      ctx.response.body = 'Hello World!'
    }
  }
});
app.listen(3000);
````

# 响应的状态码
`ctx.response.status = 200`

# 请求的类型
`ctx.request.accepts`

# 响应的类型
`ctx.response.type`

# 自制简易的koa-router
- 定义一个Router类,并导出
- 初始化,设置一个空的路由数组
````javascript
class Router{
  constructor(){
    this._routes = [];
  }
}
````
- 设计get方法.
- 调用是. router.get(url, handler).其中router是类Router的实例
````javascript
get(url, handler){
  this._routes.push({
    url,
    method:'GET',
    handler
  });
}
````
- 激活路由
- 调用方法: `app.use(router.routes())`
- 从_routes中找到对应的路由处理器,并执行.若没有,进行下面处理
````javascript
routes(){
  return astnc (ctx, next) =>{
    const {method, url} = ctx;
    const matchedRouter = this._routes.find(r => r.method === method && r.url === url);
    if(matchedRouter && matchedRouter.handler){
      await matchedRouter.handler(ctx, next);
    } else {
      await next();
    }
  }
}
````

# 使用all()方法来设置头部
````javascript
router.all('/*', async(ctx, next)=>{
  ctx.set("Access-Control-Allow-Origin", "https://www.cctalk.com");
  await next();
})
````

# HTTP/1.0在HTTP/0.9的基础上做出了大量改进
- 1.增加了访问不同对象类型的功能(新增传输图像、视频、二进制文件)
- 2.新增POST、PUT、HEAD、DELETE、LINK等命令
- 3.新增头部信息: User-Agent、Accept、Last-Modified、Content-Type

# HTTP/1.1在HTTP/1.0的基础上又做了大量改变
- 1.默认使用持久连接(Persistent Connection)的机制
- 2.引入管道方式(Pipelining)支持多请求发送
- 3.请求头增加host字段,使一台物理服务器中可以存在多个虚拟主机,共享同一IP地址
- 4.响应头增加Transfer-Encoding字段,引入了chunked分块传输编码机制
- 5.增加Cache-Control头域,缓存机制更加灵活强大
- 6.新增多种请求方法:OPTIONS、TRACE、CONNECT等
- 7.新增24个HTTP状态码: 如203、205、206、303、305、306、307

# URI
- Uniform Resource Identifier(统一资源标识符)
- A Uniform Resource Identifier is a compact sequence of characters that identifies an abstract or physical resource
- 统一资源标识符是一个紧凑的字符序列,用于标识抽象或物理资源

# 常见的HTTP状态码
- 100:继续,继续响应剩余部分,进行提交请求,如已完成,可忽略
- 200:成功,服务成功处理请求
- 301:永久移动,请求资源已永久移动至新位置
- 302:临时移动,请求资源临时移动至新位置
- 304:未修改,请求的资源对比上次未被修改,响应中不包含资源内容
- 401:未授权,要求身份验证
- 403:禁止,请求被拒绝
- 404:未找到,服务器未找到请求需要的资源
- 500:服务器内部错误,服务器遇到错误,无法完成请求
- 503:服务器不可以,临时服务过载,无法处理请求

# 常见的请求方法
- `HTTP/0.9`:只支持唯一的GET请求
- `HTTP/1.0`:新增POST、PUT、HEAD、DELETE、LINK
- `HTTP/1.1`:新增OPTIONS、TRACE、CONNECT

# 常见的HTTP首部字段
- `User-Agent`: HTTP客户端程序的信息
- `Last-Modified`: 资源的最后修改日期和时间
- `Content-Length`: 实体主体的大小,单位为字节
- `Content-Encoding`: 实体主体使用的编码方式,如gzip、compress、deflate、identity等
- `Content-Type`: 实体主体的媒体类型,如image/png、application/x-javascript、text/html等
- `Expires`: 实体主体过期的日期和时间
- `Set-Cookie`: 开始状态管理使用的Cookie信息
- `Cookie`: 服务器接受到的Cookie信息
- `Cache-Control`: 控制缓存的行为,如public、private、no-cache等
- `ETag`: 资源的匹配信息
- `Vary`: 代理服务器缓存的管理信息
- `Server`: HTTP服务器的安装信息

# HTTP/2
于2015年5月正式推出,以"Request for Comments:7540"(征求修改意见书,编号7540)正式发表

- 采用二进制该格式传输数据
之前的HTTP/1.*均采用文本格式传输数据,而HTTP/2则选择了使用二进制格式传输数据。在HTTP/2中,基本的协议单位是帧,每个数据流均以消息形式发送,消息由一个或多个帧组合而成。帧的内容包括:长度(Length)、类型(Type)、标记(Flags)、保留字段(R)、流标识符(Stream Identifier)和帧主体(Frame Payload)

- 多路复用
在HTTP/1.0中,如果需要并发多个请求,则必须创建多个TCP连接,并且浏览器对于单个域名的请求有相应的数量限制,一般为6个。其连接无法被复用的问题,一直被开发人员所诟病。
之后,在HTTP/1.1中,引入了流水线(Pipelining)技术,但先添的FIFO(First Input First Output,先进先出)机制导致当前请求的执行依赖于上一个请求执行的完成,容易引起报头堵塞(Head-of-line blocking),并没有从根本上解决问题.
HTTP/2重新定义了底层的HTTP语义映射,允许在同一个连接上使用请求和响应双向数据流。至此,同一个域名只需要占用一个TCP连接,通过数据流(Stream),以帧为基本协议单位,从根本上解决了这个问题,避免了因频繁创建连接产生的延迟,减少了内存消耗,提升使用性能

- 流的优先级
在HTTP/2中可以为每个流(Stream)设置优先级,高优先级的流会被服务优先处理返回给客户端,同时,流的优先级允许根据场景的不同进行动态改变。客户端可以在流中设置优先级帧来改变流的优先级

- 首部压缩
在HTTP/1.*时代,前端性能优化法则中出现过一条建议---禁止滥用Cookie,同时建议将静态资源迁移到独立的域名上,其中一个关键的优化点是压缩请求头部大小。随着Web站点功能越来越复杂,主域名下被各种各样的业务加入五花八门的Cookie,对于一般的图片、样式、脚本等资源无须再后端了解其与用户特征相关的信息(如Cookie),而客户端频繁地发送此类数据产生了极大地浪费.
HTTP/2引入HPACK压缩首部数据。由于HPACK压缩引入了索引表概念,包含静态表和动态表。再同一个请求上产生的响应越多,表的累积会越全面,压缩效果会越好。因此,针对已经迁入HTTP/2的站点,要合理分布域名并申请SSL(Secure Socket Layer,安全套接层)证书。因为在HTTP/2下判断是否使用同一个连接分为2种情况:一种是对于相同域名下的资源,默认使用同一个连接;另外一种是对于不同域名的资源,需要判断IP地址是否相同,或者是否有相同的SSL整数

- 服务器推送
在HTTP/2出现以前,用户打开浏览器输入网址,请求一个具体的HTML文档,浏览器在解析HTML后,开始逐步请求对应的脚本、样式、图片等静态资源。而HTTP/2的服务器推送特性,使服务器主动推送与当前请求相关的内容成为可能。例如,可以在请求该HTML文档的同时,一并推送与之相关联的静态资源文件,达到性能优化的目的。同时,服务器推送遵循同源策略,可以被浏览器缓存,实现多页面共享缓存资源.

# 路由GET方法参数问题
- 获取类似"http://localhost:3000?name=marron"的参数
````javascript
router.get('/', async (ctx, next)=>{
  console.log(ctx.request.query);
  console.log(ctx.request.quertstring);
});
````

- 获取类似"http://localhost:/3000/12/marron"的参数
````javascript
router.get('/', async (ctx, next)=>{
  console.log(ctx.params.id,ctx.params.name)
})
````

# MVC
- 目的: 实现动态的程序设计,简化程序后续的修改和扩展过程,并且使模块能够被复用.采用分层的思想来降低耦合度,从而使系统更加灵活,扩展性更强

三次架构(3-Tier Architecture): 是一个分层式架构设计理念,如有必要,也可以分为多层。分层的设计理念契合了"高内聚低耦合"的思想,在软件体系架构设计中最常见、也是最重要的一种结构。通常意义上的三层架构是将整个业务应用划分为界面层(User Interface Layer)、业务逻辑层(Business Logic Layer)、数据访问层(Data Access Layer)。

- 数据访问层: 主要用于对非原始数据进行操作。也就是说,在这一层种进行对数据库而非对数据的操作,为业务逻辑层或表示层提供数据服务。
- 业务逻辑层: 主要用于对具体问题进行操作。这一层是对数据业务进行逻辑处理。如果说数据层是积木,那么逻辑层就是对这些积木进行搭建。
- 界面层: 展示客户的界面。这是位于最外层、离用户最近的部分,主要负责展示数据及接收用户输入的数据。


# Nunjucks语法介绍
一般情况下,模板引擎都需要具备以下功能: 变量、逻辑表达式、循环、layout、include、宏和扩展等.

# 1.文件扩展名
Nunjucks支持用任意扩展名来命名模板文件,但Nunjucks社区还是推荐使用'.njk'为后缀进行命名

# 2.变量
变量会从模板文件运行时的上下文获取,如果需要显示一个变量,代码如下:
`{{username}}`
模板文件运行时,会从上下文对象中查找username属性,然后显示。模板语法也支持像JavaScript一样获取变量的属性(可使用点操作符或中括号操作符),代码如下:
````javascript
{{foo.bar}}
{{foo["bar"]}}
````
如果变量的值为undefined或null将不予显示,引用的对象为undefined或null也是如此,

# 3.注释
在Nunjucks模板语法中,可以使用语法`{# 注释内容 #}`来编写注释,注释不会被编译,示例代码如下:
````javascript
{# Loop through all the users #}
{% for user in users %}...{% endfor %}
````
模板文件运行后只会渲染第2行的文本内容。

# 4.标签
标签是一些特殊的区块,应用标签可以对模板执行一些操作。Nunjucks包含一些内置的标签,同时也支持自定义标签。
- if标签
if为分支语句,与JavaScript中的if语句类似,代码如下:
````javascript
{% if variable %}
    It is true
{% endif %}
如果variable已经被定义且为true,则会显示"It is true",否则什么也不显示。
注意: 这里并非布尔值,和JavaScript的处理是一样的。
````javascript
{% if hungry %}
    I am hungry!
{% elif tired %}
    I am tired!
{% else %}
    I am good!
{% endif %}
````

- for标签
for可以用来遍历数组和对象。假设遍历如下数组:
````javascript
var items = [{ title: "foo", id: 1}, { title: "bar", id:2 }];
`````
对应的模板代码如下:
````javascript
<h1>Posts</h1>
<ul>
{% for item in items %}
  <li>{{ item.title }}</li>
{% else %}
  <li>This would display if the 'item' collection were empty</li>
{% endfor %}
</ul>
上面的示例通过for循环调用items数组中的每个元素,并将对应元素的title属性显示出来。如果items是空数组,则会渲染else语句中的内容。

- macro(宏)标签
宏: 定义可复用的内容,类似于编程语言中的函数,示例代码如下:
````javascript
{% macro field(name, value='', type='text') %}
<div class="field">
<input type="{{ type }}" name="{{ name }}" value="{{ value | escape }}" />
</div>
{% endmacro %}
````
接下来就可以把field当作函数一样使用了,代码如下:
````javascript
{{ field('user') }}
{{ field('pass', type='password') }}
````

- Extends/Block标签
Extends用来指定模板继承,被指定的模板为父级模板。Block(区块)定义了模板片段并标识一个名字,在模板继承中使用。父级模板可指定一个区块,子模板覆盖这个区块。Extends标签和Block标签相互搭配,在模板继承场景中经常会被用到。在实战项目中,经常需要设定一个固定的公用模板Layout,然后开发人员再创建一个业务级的模板文件,并把Layout继承过来。公用模板文件layout.html的示例代码如下:
````html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {% block head %}
    <link rel="stylesheet">
    {% endblock %}
</head>
<body>
    {% block header %}
    <h1>this is header</h1>
    {% endblock %}
    {% block body %}
    <h1>this is body</h1>
    <% endblock %>
    <% block footer %>
    <h1>this is footer</h1>
    <% endblock %>
    <% block content %>
    <script>
    // this is place for javascript
    </script>
    {% endblock %}
</body>
</html>
````
Layout文件中的代码指定了大体的视图布局结构,并定义了5个模板,分别命名为Head、Header、Body、Footer、Content。Header和Footer是公用的,因此基本不变。业务代码的修改需要再Body内容体中进行,业务样式表和业务脚本分别在头部Head和底部Content中引入。

# Nunjucks在Koa中的应用
- app.js
````javascript
const koa = require('koa');
const app = new koa();
const router = require('./router')
const nunjucks = require('koa-nunjuncks-2');
app.use(nunjucks({
  ext: 'html',  // 指定视图文件默认后缀
  path: path.join(__dirname, 'views'),  // 指定视图目录
  nunjucksConfig:{
    trimBlocks: true   // 开启转义,防止XSS
  }
}))
````
注: 配置要在router前面
- 使用 (ctx.render(path))
- /controller/home.js
````javascript
user: async (ctx, next) =>{
  await ctx.render('home/login',{
    btnName: 'GoGoGo'
  })
}
````

# MVC结构分析
- `app.js`:主要进行了一些配置
- `router.js`:将路由和路由的处理函数联系在一起
- `controller/home.js`:进行简单的逻辑处理
- `service/home.js`:为controller服务,进行更深一级的处理

# 理清MVC的历程:
- 当我打开浏览器输入`http://localhost:3000`时,
- `router.js`会根据配置好的规则,找到对应的时间处理器`HomeController.index`
- `HomeController.index`会调用`Nunjucks`渲染的模板给浏览器渲染出来

# content-type
- 有服务器返回,指定返回的类型.
- 浏览器会根据这个类型进行响应的渲染.
- 栗子: `content-type: text/html`: 浏览器会将其渲染成html页面

# koa-json
- 把数据挂载到响应体body上,同时告知客户端数据类型是JSON,客户端就会按照JSON格式来解析
````javascript
ctx.set('Content-Type', 'application/json');
ctx. body = JSON.stringify(json);
````

# 中间件的管理
- 文件middleware/index.js用来集中调用所有的中间件
````javascript
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const miSend = require('./mi-send');

module.exports = app =>{
  app.use(staticFiles(path.resolve(__dirname, '../public')));
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig:{
      trimBlocks: true
    }
  }));
  app.use(bodyParser());
  app.use(miSend());
}
````
- 在app.js增加对中间件的引用
````javscript
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const middleware = require('./middleware');
middleware(app);
router(app);
app.listen(3000, async () =>{
  console.log('Server is running at http://localhost:3000');
});
````

# 使用koa-multer实现文件上传
````javascript
const koa = require('koa');
const multer = require('koa-multer');
const app = koa();
app.use(multer({dest: './uploads'}));
app.listen(3000);
````
- 参数说明:
`dest`: 用来设置上传文件的存储地址,若省略,则存储在内存中

# 上传文件的基本配置
- upload.single(filename)
接收一个fieldname参数命名的文件,文件信息保存在req.files中,关键代码如下:
````javascript
<input name='avatar' type='file' />  // 视图代码
router.post('/profile', upload.single('avatar'));  // 应用代码
````
- upload.array(fieldname[,maxCount])
接收一个fieldname参数命名的文件数组。通过配置maxCount来限制上传的最大数量,文件信息保存在req.files

# 数据库
数据库就是存储、管理数据的仓库,它提供了对数据的检索、存储、多用户共享访问的能力,并且设法使数据的冗余度尽可能小。主要具备以下特点:
- `数据共享`: 数据库中的数据可以同时被多人查询和写入
- `减少数据冗余度`: 实现了数据共享,从而避免了文件的复制,降低了数据冗余度
- `数据独立`: 数据库中的数据与业务是独立的
- `数据一致性和可维护性`: 数据库中的数据应当保持一致,以防止数据丢失和越权使用。在同一周期内,既能允许对数据实现多路存取,也能防止用户之间的数据操作互相影响
- `故障恢复`: 可以及时发现故障和修复故障,从而防止数据被破坏

# Sequelize介绍
- 为了快捷开发,社区出现了一系列的ORM(Object Relational Mapping)类库
- ORM的字面意思为对象关系映射,它提供了概念性的、易于理解的模型化数据的方法。通过ORM,可以降低操作数据库的成本。开发者不需要通过编写SQL脚本来操作数据库,直接通过访问对象的方式来查询、更新数据。这样做极大地提升了开发效率,降低了开发门槛。缺点也很明显,不够高效
- 在Node.js中,一般采用Sequelize这个ORM类库来操作数据库.
````javascript
const Sequelize = require('sequelize');
const sequelize = new Sequelize('databaseName', 'userName', 'password', {
  host:'localhost',  // 数据库服务地址
  dialect: 'mysql'   // SQL语言类型
});
sequelize.authenticate().then(()=>{
  console.log('Connected');
}).catch(err=>{
  console.error('Connect failed');
})
````

- 使用docker创建一个数据库.
使用`docker-compose.yml`写配置文件如下:
````yml
version: '3.1'
services:
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MTSQL_ROOT_PASSWORD: example
    ports:
      - 3306:3306
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
````
使用如下命令生成docker
````bash
docker-compose up
````
# 连接数据库
````javascript
const Sequelize = require('sequelize');
const sequelize = new Sequelize('数据库名称','用户名(默认:root)','密码(docker-compose.yml中设置的)', {
  host:'localhost',
  dialect: 'mysql'
});
sequelize.authenticate().then(()=>{
  console.log('Connected');
})
.catch(err=>{
  console.error('Connect failed', err);
})
````

# 定义模型
- 常用
````javascript
const Category = sequelize.define('category', {
  id: Sequelize.UUID,   // 定义id字段,类型为UUID
  name: Sequelize.STRING    // 定义name字段,类型为String
})
````
- 给模型加约束条件
````javascript
const Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING,   // 定位类型为String
    allowNull: false,   //不能为空
    unique： true   // 必须唯一,不允许重复
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW     // 设置为当前时间
  }
})
````

- 给字段定义Getter和Setter方法:
````javascript
const Custom = sequelize.define('custom', {
  name: {
    type: Sequelize.STRING,
    get(){
      const title = this.getDataValue('title');
      return `${this.getDataValue('name')} (${titile}) `
    }
  },
  title: {
    title: Sequelize.STRING,
    set (val) {
      this.setDataValue('title', val.toUpperCase())
    }
  }
})
````

# 查询数据
- 查询所有
`await Product.findAll()`

- 查询name和data字段
`await Project.findAll({ attributes: ['name', 'date'] })`

# 在使用一个库的时候,可以先把库的方法包装以下,变成自己的库


# 使用Mongoose对MongoDB进行操作
````javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{
})
````

# Mongoose中的Schema
- 定义Schema `categorySchema`
````javascript
const categorySchema = new mongoose.Schema({
  name:String,
  description: String,
  createdAt:{
    type: Date,
    default: Date.now
  }
});
````
- 通过model方法获得该模型
````javascript
const Category = mongoose.model('Category', categorySchema);
````
- 实例化一个新的对象来新增数据
````javascript
const category = new Category({
  name: 'test',
  description: 'test category'
});
````
- 通过save方法,保持对象到数据库中
````javascript
category.save(err=>{
  if(err){
    console.error(err);
    return
  }
  console.log('saved');
})
````
- 直接通过模型的Create方法
````javascript
Category.create({
  name:'test',
  description: 'test category'
}, (err, category)=>{
  if(err){
    console.error(err);
  } else {
    console.log(category)
  }
});
````

- 通过find方法,查询name='test'的结果
````javascript
Category.find({
  name:'test'
}, (err, res) =>{
  if(err){
    console.error(err)
  } else{
    console.log(res);
  }
});
````
- 删除数据
````javascript
Category.remove({
  name:'test'
}).then(()=>{
})
````
- 更新数据
````javascript
Category.update({
  name:'test'
},{
  name:'test1',
  description: 'test1'
}).thenm(()=>{

})
````

# Redis
- 可用作数据库、高速缓存和消息队列代理。
- 非常适合处理那些短时间内被高频访问但又不需要长期访问的简单数据存储
- 栗子: 用户的登录信息或游戏中的数据
- 会把数据存储在内存中,但是也可以持久化到硬盘上

# 会话控制
- `Session`: HTTP是一种无状态的协议,本身无法标识一次特定的会话,Session是一种保存会话信息的实现方式,有了Session,不同用户登录购物网站之后就能看到各自购物车中的商品了.
- Session中的数据是保存在服务器端的
- 在服务器端有很多种存储方式,既可以直接保存在内存内,也可以保存在Redis、MongoDB、MySQL等数据库中,甚至可以保存在普通的文件中
- Session中的数据一般都是短时间内高频访问的,需要保证性能,所以比较好的方式是内存配合Redis做一个持久化.
- 内存访问的性能是最好的,但数据易丢失.
- 在Redis中做一个备份,当内存中数据丢失的时候,就可以从redis中恢复数据!

# 客户端的会话控制
- 客户端通过Cookie来保存Session的一个唯一标识
- 通常是一个ID,通过这个ID可以匹配服务器端完整的Session数据
