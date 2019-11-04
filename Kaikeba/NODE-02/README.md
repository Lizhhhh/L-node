# 网络编程 http https http2 websocket

- 掌握 HTTP 协议
- 掌握 http 服务使用
- 掌握前后通信技术 ajax、websoket 等
- 能解决常见 webwenti: 跨域、session
- 实战一个爬虫程序
- 利用多种方式实现实时聊天程序
- 了解 https
- 了解 http2

# HTTP 常见状态码

- 1xx: 指示信息 -- 表示请求已接收, 继续处理
- 2xx: 成功 -- 表示请求已被成功接收、理解、接受
- 3xx: 重定向 -- 要完成请求必须进行进一步的操作
- 4xx: 客户端错误 -- 请求有语法错误或请求无法实现
- 5xx: 服务器端错误 -- 服务器未能实现合法的请求

常见状态代码、状态描述、说明:

- 200 OK // 客户端请求成功
- 400 Bad Request // 客户端请求有语法错误,不能被服务器所理解
- 401 Unauthorized // 请求未经授权,这个状态代码必须和 WWW-Authenticate 报头域一起使用
- 403 Forbidden // 服务器收到请求,但是拒绝提供服务
- 404 Not Found // 请求资源不存在, eg: 输入了错误的 URL
- 500 Internal Server Error // 服务器发生不可预期的错误
- 503 Server Unavailable // 服务器当前不能处理客户端的请求,一段时间后可能回复正常

# HTTP 头部详解

- HTTP 消息由客户端到服务器的请求和服务器到客户端的响应组成。请求消息和响应消息都是由开始行(请求行或状态行),消息报头(可选),空行(CRLF 的行),消息正文(可选)组成
- HTTP 消息包头包括普通报头、请求报头、响应报头、实体报头
- 每一个报头域都是由 名字 + ":" + 空格 + 值 组成,消息报头域的名字是大小写无关的

# 普通报头

- 在普通报头中,有少数报头域用于所有的请求和响应消息,但并不用于被传输的实体,只用于传输的消息
- eg:
- Cache-Control 用于指定缓存指令,缓存指令是单向的(响应中出现的缓存指令在请求中未必会出现),且是独立的(一个消息的缓存指令不会影响另一个消息处理的缓存机制),HTTP1.0 使用的类似的报头域为 Pragma.
- 请求时的缓存指令包括: no-cache (用于指示请求或响应消息不能缓存) 、 no-store、max-age、max-stale、min-fresh、only-if-cached;
- 响应时的缓存指令包括: public、 private、 no-cache、no-store、no-transform、 must-revalidate、 proxy-revalidate、 max-age、 s-maxage.

- eg: 为了指示 IE 浏览器 (客户端) 不要缓存页面, 服务器端的 node.js 程序可以编写如下:
- response.setHeader("Cache-Control","no-cache");
- 这句话将在发送的响应消息中设置普通报头域: Cache-Control: no-cache

- Date 普通报头域表示消息产生的日期和时间

# 请求报头

- 允许客户端向服务器端传递请求的附加信息以及客户端自身的信息
- 常用的请求头部

- Accept
- 用于指定客户端接受哪些类型的信息.
- Accept: image/gif, 表明客户端希望接受 GIF 图像格式的资源;
- Accept: text/html, 表面客户端希望接受 html 文本
- Accept-Charset: 用于指定客户端接收的字符集
- Accept-Encoding: 用于指定可接受的内容编码
- Accept-Language: 用于指定一种自然语言 (Accept-Language:zh-ch)
- Authorization: 用于证明客户端有权查看某个资源.401(未授权)
- Host: 用于指定被请求的 Internet 主机和端口号,它通常从 HTTP URL 中提取出来

# 跨域解决方案(总结)

1. [Server]加上如下报头

```
res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8080');
```

2. [Client]使用 axios 时,加上如下报头

```javascript
const res = await axios.get('/users', {
  headers: {
    'X-Token': '栗子'
  }
})
```

- 此时的 ajax 请求是非简单请求,需要在服务器端设置预检请求,具体如下:
```javascript
else if (method === "OPTIONS" && url === "/users") {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
        "Access-Control-Allow-Headers": "X-Token,Content-Type",
        "Access-Control-Allow-Methods": "PUT"
    });
    res.end();
}
```

# 正向代理与反向代理(不是很清楚)
  - 正向代理:靠近客户端,将客户的请求收集起来,代理的是静态资源
  - 反向代理:靠近Server端

# 同源中有cookie,跨域中无cookie解决方案
  - 允许携带cookie信息
````javascript
// [server]
// 预检options 和 /users 接口中均需添加
res.setHeader('Access-Control-Allow-Credentials', 'true');

// 设置cookie
res.setHeader('Set-Cookie', 'cookie1=va222');

// 观察cookie
console.log('cookie', req.headers.cookie)
````
````javascript
// [client]
axios.defaults.withCredentials = true
````

# 实战一个爬虫(简单版)
原理: 服务端模拟客户端发送请求到目标服务器页面内容并解析,获取其中关注部分的数据
  - spider.js
````javascript
const originRequest = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function request(url, cb){
  const options = {
    url: url,
    encoding: null
  };
  originRequest(url, options, cb);
}
for(let i = 100553; i< 100563; i++){
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, (err, res, body)=>{
    const html = iconv.decode(body, 'gb2312');
    const $ = cheerio.load(html);
    console.log($('.title_all h1').text());
  });
}
````

# IM服务器的实现[Http]
原理: 客户端通过ajax方式发送数据给http服务器,服务器缓存消息,其他客户端通过轮询方式查询最新数据并更新列表
  - /NODE-02/IM-http/index.html
````html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>

<body>
    <div id="app">
        <input v-model="message">
        <button v-on:click="send">发送</button>
        <button v-on:click="clear">清空</button>
        <div v-for="item in list">{{item}}</div>
    </div>


    <script>
        const host = 'http://localhost:3000';
        const app = new Vue({
            el: "#app",
            data: {
                list: [],
                message: 'Hello Vue!'
            },
            methods: {
                send: async function() {
                    let res = await axios.post(host + '/send', {
                        message: this.message
                    })
                    this.list = res.data
                },
                clear: async function() {
                    let res = await axios.post(host + '/clear')
                    this.list = res.data
                }
            },
            mounted: function() {
                setInterval(async () => {
                    const res = await axios.get(host + '/list');
                    this.list = res.data;
                }, 1000);
            }
        })
    </script>
</body>
</html>
````
  - /NODE-02/IM-http/index.js
````javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

const list = ['ccc', 'ddd'];

app.get('/', (req, res) => {
    // cors(req, res);
    res.sendFile(path.resolve('./index.html'));
})

app.get('/list', (req, res) => {
    // cors(req, res);
    res.end(JSON.stringify(list))
})

app.post('/send', (req, res) => {
    // cors(req, res);
    list.push(req.body.message);
    res.end(JSON.stringify(list))
})

app.post('/clear', (req, res) => {
    // cors(req, res);
    list.length = 0;
    res.end(JSON.stringify(list))
})

app.listen(3000, () => {
    console.log(`[Server] server is running at http://localhost:3000 `);
})


function cors(req, res) {
    // res.setHeader("Content-Type", "text/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader("Access-Control-Allow-Headers", "X-Token,Content-Type");
}
````

# IM服务器的实现[Soket.IO]
 - 安装: npm install --save socket.io
 - Socket.IO库特点
   + 源于HTML5标准
   + 支持优雅降级: WebSocket、WebSoket over FLASH、XHR Polling、XHR Multipart Streaming、Forever Iframe、JSONP Polling
````javascript
// IM服务器的实现[Soket.IO]
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', async (soket) => {
    console.log('a user conneted');

    // 响应某用户发送消息
    soket.on('chat message', async (msg) => {
        console.log('chat message: ' + msg);

        // 广播给所有人
        io.emit('chat message', msg);
        // 广播给除了发送者外所有人
        // socket.broadcast.emit('chat message', msg);
    });

    soket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(3000, async () => {
    console.log('listening on *:3000');
})
````
````html
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Socket.IO chat</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
    <script src="http://libs.baidu.com/jquery/2.1.1/jquery.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font: 13px Helvetica, Arial;
        }

        form {
            background: #000;
            padding: 3px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }

        form input {
            border: 0;
            padding: 10px;
            width: 90%;
            margin-right: 0.5%;
        }

        form button {
            width: 9%;
            background: rgb(130, 224, 255);
            border: none;
            padding: 10px;
        }

        #messages {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        #messages li {
            padding: 5px 10px;
        }

        #message li:nth-child(odd) {
            background: #eee;
        }
    </style>
</head>

<body>
    <ul id="message"></ul>
    <form action="">
        <input id="m" autocomplete="off" />
        <button>Send</button>
    </form>
    <script>
        $(function() {
            var socket = io();
            $("form").submit(function(e) {
                e.preventDefault();
                socket.emit('chat message', $('#m').val());
                $('#m').val("");
                return false;
            });

            socket.on('chat message', function(msg) {
                $('#message').append($("<li>").text(msg));
            });
        })
    </script>

</body>

</html>
````

# Http2
 - 多路复用 - 雪碧图、多域名CDN、接口合并
  + 官方演示 - https://http2.akamai.com/demo
  + 多路复用允许同时通过单一的 HTTP/2 连接发起多重的请求 - 响应消息; 而HTTP/1.1协议中, 浏览器客户端在同一时间,针对统一域名下的请求有一定数量限制.超过限制数目的请求会被阻塞**
 - 首部压缩
  + http/1.x 的header 由于cookie和 user agent很容易膨胀,而且每次都要重复发送. http/2 使用encoder来减少需要传输的header大小, 通讯双方各自cache一份header fields表,既避免了重复header的传输,又减少了需要传输的大小.高效的压缩算法可以很大的压缩header,减少发送包的数量从而降低延迟
 - 服务端推送
  + 在HTTP/2中,服务器可以对客户端的一个请求发送多个响应.例如:在一个请求中,请求的资源是 index.html,服务器可能会同时响应index.html、logo.jpg以及css和js文件,因为它知道客户端会用到这些东西.这相当于在一个HTML文档内集合了所有资源
