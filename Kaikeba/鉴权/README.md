# 鉴权学习目的

- 掌握 3 种常见鉴权方式
  - Session/Cookie
  - Token
  - OAuth

# 最简单的返回 cookie

- 后端根据路由,返回 cookie 给前端.

```javascript
res.setHeader('Set-Cookie', 'cx=abc')
```

- 注:

1. `res.setHeader('Set-Cookie')`: 会出现在 HTTP 请求的 Response Headers 中
2. 浏览器识别 cookie 后,再下次请求时,会自动加上 cookie 的请求.
3. 后端要获取浏览器请求头部中的 cookie,可以使用下面方法

```javascript
console.log('cookie:', req.headers.cookie)
```

# 自己创建 Session

- 注: session 是后端的内容
- 具体思路如下:

1. 使用 session 空对象存 cookie 键值对.
2. 当第一次进入的时候,生成一个随机数 sid,通过 cookie 传递 sid,并再后端使用`session[sid] = msg`的方式,记录本次的值
3. 若非第一次进入,则需要从 cookie 中解析出 sid,进而得到该 sid 下的内容(有可能是用户信息)

```javascript
const session = {}
http
  .createServer((req, res) => {
    const sessionKey = 'sid'

    if (req.url === '/favicon.ico') {
      return
    } else {
      const cookie = req.headers.cookie
      if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('Come Back')
        console.log('cookie:', cookie)
        // 简略写法(未必具有通用性)
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\S*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', sid, session, session[sid])
      } else {
        const sid = (Math.random() * 9999999).toFixed()
        res.setHeader('Set-Cookie', `${sessionKey} = ${sid}`)
        session[sid] = { name: 'laowang' }
        res.end('hello cookie')
      }
    }
  })
  .listen(3000)
```

- 说明:

1. 浏览器首次访问,会生成 sid 保存在服务器中,并将 sid 返回给浏览器;
2. 浏览器遇到`Set-Cookie`: 后把后面的内容放到,cookie 中;
3. 再次访问相同网址时,浏览器会把 cookie 获取,传递给服务器;
4. 服务器根据 sid 进行认证,返回对应的结果

- 实现原理:

1. 服务器在接受客户端首次访问时,在服务器端创建 session,然后保存 session(我们可以将 session 保存在内存中,也可以保存在 redis 中),然后给这个 session 生成一个唯一的标识符,最后再响应头中种下这个唯一标识字符串
2. 签名,这一步通过密钥对 sid 进行签名处理,避免客户端修改 sid
3. 浏览器中收到请求响应的是时候会解析响应头,然后将 sid 保存在本地 cookie 中,浏览器在下次 http 请求的请求头中会带上该域名下的 cookie 信息
4. 服务器在接受客户端请求时会去解析请求头部 cookie 中的 sid,然后根据这个 sid 去找服务器端保存的客户端的 session,然后判断该请求头部是否合法

# koa 实现 session

- 基本用法

```javascript
const koa = require('koa')
const app = new koa()

const session = require('koa-session')

app.keys = ['marron']

const SESSION_CONFIG = {
  key: 'marron rain',
  maxAge: 86400000,
  httpOnly: true,
  signed: true
}

app.use(session(SESSION_CONFIG, app))

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return
  let n = ctx.session.coung || 0
  ctx.cession.count = ++n
  ctx.body = `第${n}次访问`
})
app.listen(3000)
```

- 说明:

1. `signed:true`: 对生成的 Value 进行 hash 算法,(把不定长的值)摘要出一个定长的字符串,并且具有血崩效应.
2. 摘要: 明文可以得出密文, 但是密文不能反编译成明文. 且密文依赖于明文, 明文一改变, 密文发生翻天覆地的变化.这样可以防篡改.
3. 血崩效应: 明文发生很小的变化,密文变化很大,这样很难破译加密的规则.
4. 常见的 hash: SHA、MD5

# redis

- 为什么使用 redis:
  在一个项目中,通过 nginx 的反向代理可能有很多的后端服务器,每个后端服务器的存储的 session 都在自己的内存中,不利用扩展和维护.
- 什么是 redis
  Redis 是一个开源（BSD 许可）的内存数据结构存储，用作数据库、缓存和消息代理。它支持数据结构，如字符串、哈希、列表、集合、带范围查询的排序集合、位图、超日志、带半径查询的地理空间索引和流。Redis 具有内置的复制、Lua 脚本、LRU 逐出、事务和不同级别的磁盘持久性，并通过 Redis Sentinel 和带有 Redis 集群的自动分区提供高可用性

# redis 的使用(第一次)

- 首先保证开启 redis(这里使用 docker)
- docker-compose.yml

```yml
version: '3.1'
services:
  redis:
    image: redis
    ports:
      - 6379:6379
```

- 运行 docker-compose.yml

```bash
docker-compose up
```

- 开启了 redis 之后,开始使用

```javascript
const redis = require('radis')

const client = redis.createClient(6379, 'localhost')

// 注意此时是存到了redis服务器中
client.set('hello', 'redis')
client.get('hello', function(err, v) {
  console.log('redis key:', v)
})
```

# 使用 redis 存储 session

```javascript
// 创建一个koa实例
const koa = require('koa')
const app = new koa()

// 引入session
const session = require('koa-session')
app.keys = ['marron']

// 创建一个Promise化的redis客户端
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
const wrapper = require('co-redis')
const client = wrapper(redisClient)

// session的配置文件
const SESSION_CONFIG = {
  key: 'marron rain',
  store: redisStore({ client })
}

app.use(session(SESSION_CONFIG, app))

app
  .use(ctx => {
    redisClient.keys('*', (err, keys) => {
      keys.forEach(key => {
        redisClient.get(key, (err, val) => {
          console.log(val)
        })
      })
    })
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第${n}次访问`
  })
  .listen(3000)
```

# koa + vue + redis 实现一个简单的登录逻辑

- /login component/login-session.html

```html
<!DOCTYPE html>

<head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>

<body>
    <div id="app">
        <div>
            <input v-model="username" />
            <input v-model="password" />
        </div>
        <div>
            <button @click="login">Login</button>
            <button @click="logout">Logout</button>
            <button @click="getUser">GetUser</button>
        </div>
        <div>
            <button @click="logs=[]">Clear Log</button>
        </div>
        <!-- 日志 -->
        <ul>
            <li v-for="(log, idx) in logs" :key="idx">
                {{log}}
            </li>
        </ul>
    </div>
    <script>
        // 这行代码很关键,请求时携带cookie
        axios.defaults.withCredentials = true;
        axios.interceptors.response.use(response => {
            app.logs.push(JSON.stringify(response.data));
            return response;
        });
        var app = new Vue({
            el: '#app',
            data: {
                username: "test",
                password: "test",
                logs: []
            },
            methods: {
                login: async function() {
                    await axios.post("http://localhost:3000/users/login", JSON.stringify({
                        username: this.username,
                        password: this.password
                    }))
                },
                logout: async function() {
                    await axios.post("http://localhost:3000/users/logout", JSON.stringify({
                        username: this.username
                    }))
                },
                getUser: async function() {
                    await axios.get("http://localhost:3000/users/getUser");
                }
            }
        });
    </script>
</body>

</html>
```

- 注:

1. `axios.defaults.withCredentials = true`: 前端发出请求时,携带 cookie
2. `axios.post(url,params)`时,params 一定要使用 JSON.stringify 转换成 JSON 格式.否则会出现请求方法为 OPTION.
3. `axios.interceptors.response.use(cb)`: 对响应的信息进行拦截处理.

- 下面搭一个最基础的后端.

```javascript
const Koa = require('koa')
const app = new Koa()

// 路由
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })

router.post('/login', async ctx => {
  ctx.body = {
    ok: 1,
    message: '登录成功'
  }
})

router.post('/logout', async ctx => {
  ctx.body = {
    ok: 1,
    message: '登出成功'
  }
})

router.post('/getUser', async ctx => {
  ctx.body = {
    ok: 1,
    message: '获取用户成功'
  }
})

app.use(router.routes())
app.listen(3000)
```

- 说明:

1. `const router = new Router({ prefix: '/users' })`: 给路由添加一个前缀,即在后面 router.post('/',cb), 处理的是 http://localhost:3000/users 路由
2. 以上的 html 是运行在 file 协议下(vscode 下使用 alt + B 快捷打开),而服务端是 http 协议.当 html 上通过 axios.post 方法请求服务器时,会发生跨域.于是下面需要添加跨域
3. 由于使用到了 POST 方法,因此,在服务端也添加上 bodyParser.(注: bodyParser 一定要放在 koa-router 前面加载)

```javascript
// post 请求解析
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 跨域
const cors = require('koa2-cors')
app.use(cors())
```

- 说明:

1. 如果您按照我的代码一步一步的敲,那么当您敲到这里,代码应该理所当然的不能运行.打开 google 浏览器,在控制台可以看见以下的一段话
2. `The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'.`:提示的很明显,就是说需要在返回头部加上一个 "Access-Control-Allow-Credentials": true 字段
3. 根据 koa2 的洋葱模型,只需在所有的路由前面加上如下代码即可

```javascript
router.post('*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  await next()
})
router.get('*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true)
  await next()
})
```

- 说明:

1. 如果您按照我的代码一步一步的敲,那么当您敲到这里基本的前后端交互算是完成了,下一步需要使用 redis 实现登录逻辑了.
2. 首先看如下代码:

```javascript
// session(配置)
const session = require('koa-session')
app.kets = ['marron rain']

const SESSION_CONFIG = {
  key: 'marron:session'
}
app.use(session(SESSION_CONFIG, app))

// session(使用)
// 改写login
router.post('/login', async ctx => {
    // 登录逻辑
    ctx.session.userinfo = "marron";
    ctx.set("Content-Type", "application/json");
    ctx.body = {
        ok: 1,
        message: '登录成功',
    }
})
router.post('/logout', async ctx => {
    delete ctx.session.userinfo;
    ctx.body = {
        ok: 1,
        message: '退出系统'
    }
})
router.get('/getUser', require('./middleware/auth'), async ctx => {
    ctx.body = {
        ok: 1,
        message: '获取用户成功',
        userinfo: ctx.session.userinfo
    }
})
```
- 说明:
1. 此时,后端可以处理 登录、登出、以及获取信息.(仅仅只是根据不同路由返回不同的信息,并未进行逻辑处理)
2. 实现简单的逻辑
 - 在处理 getUser 路由请求时,先检查一下session中是否有信息
 - 使用router.post 的第二个参数, 传入中间件.
 - /login component/middleware/auth.js
````javascript
module.exports = async (ctx, next) =>{
	if(!ctx.session.userinfo) {
		ctx.body = {
			ok: 0,
			message: '用户未登录'
		}
	} else {
		await next();
	}
}
````
- 将`router.get('/getUser')`改写如下:
````javascript
router.get('/getUser', require('./middleware/auth'), async ctx =>{
	ctx.body = {
		ok: 1,
		message: '获取用户成功',
		userinfo: ctx.session.userinfo
	}
})
````
- 说明:
1. 在执行回调函数之前,会先执行监测,检查session中是否存在userinfo信息.
2. 逻辑基本完成.但是此时的session信息只是存在内存中,并未真正实现持久化.

# Token验证:
原理:
1. 客户端使用用户名跟密码请求登录
2. 服务器收到请求, 去验证用户名与密码
3. 验证成功后, 服务器端会签发一个令牌(Token), 再把这个 Token 发给客户端
4. 客户端收到 Token 以后,可以把它存储起来, 比如放在 Cookie里或者 Local Storage 里
5. 客户端每次向服务器请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求,然后去检验客户端请求里面带着的 Token, 如果验证成功, 就像客户端返回请求的数据。

# OAuth(开放授权)
- 概述: 三方登入主要基于OAuth 2.0。OAuth 协议为用户资源的授权提供了一个安全的、开放而又简易的标准。与以往的授权方式不同之处是OAUTH的授权不会触及到用户的账号信息,即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权,因此OAUTH是安全的。

# Github OAuth登录流程:
1. 获取code: 第三方客户端
