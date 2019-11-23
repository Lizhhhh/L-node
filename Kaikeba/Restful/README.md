# Restful 学习

# 阮一峰 - RESTful API 最佳实践

- 是目前最流行的 API 设计规范, 用于 Web 数据接口的设计

# 一、URL 设计

- 1.1 动词 + 宾语:
  客户端发出的指令都是"动词 + 宾语"的结构,如: "GET / articles"

- 1.2 动词的覆盖
  客户端发出的 HTTP 请求,要加上 X-HTTP-Method-Override 属性,告诉服务器使用哪一个动词覆盖 POST 方法.

```javascript
POST /api/Person/4 HTTP/1.1
X-HTTP-Method-Override: PUT
```

- 1.3 宾语必须是名词
  宾语就是 API 的 URL,是 HTTP 动词作用对象。它应该是名词,不能是动词。比如,/articles 这个 URL 就是正确的,而下面的 URL 不是名词,所以是错误的。

```javascript
/getAllCars
/createNewCar
/deletewAllRedCars
```

- 1.4 复数 URL
  建议都用复数 URL, `GET /articles/2`

- 1.5 避免多级 URL
  常见的情况是,资源需要多级分类,因此很容易写出多级的 URL,比如获取某个作者的某一类文章

```javascript
GET / authors / 12 / categories / 2
```

这种 URL 不利于扩展,语义也不明确,往往要想一会,才能明白。
最好的做法是,除了第一级,其他级别都用查询字符串表达。

```javascript
GET /authors/12?categories=2
```

下面是另一个栗子,查询已发布的文章。你可能会设计成下面的 URL

```javascript
GET / articles / published
```

查询字符串的写法明显更好

```javascript
GET / articles / published = true
```

# 二、状态码

- 2.1 状态码必须精确
  客户端的每一次请求,服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分
  HTTP 状态码就是一个三位数,分成五个类别

```javascript
# 1xx: 相关信息
# 2xx: 操作成功
# 3xx: 重定向
# 4xx: 客户端错误
# 5xx: 服务器错误
```

- 2.2 2xx 状态码
  200 状态码表示操作成功,但是不同的方法可以返回更精确的状态码

```javascript
# GET: 200 OK
# POST: 201 Created
# PUT: 200 OK
# PATCH: 200 OK
# DELETE: 204 No Content
```

上面代码中, POST 返回 201 状态码,表示生成了新的资源; DELETE 返回 204 状态码,表示资源已经不存在。此外,202 Accepted 状态码表示服务器已经收到请求，但还未进行处理,会在未来再处理,通常用于异步操作。下面是一个栗子:

```javascript
HTTP/1.1 202 Accepted
{
  "task":{
    "href": "/api/company/job-management/jobs/2130040",
    "id": "2130040"
  }
}
```

- 2.3 3xx 状态码
  API 用不到 301 状态码(永久重定向) 和 302 状态码(临时重定向, 307 也是这个含义),因为它们可以由应用级别返回,浏览器会直接跳转,API 级别可以不考虑这两种情况。

API 用到的 3xx 状态码,主要是 303 See Other, 表示参考另一个 URL。它与 302 和 307 的含义一样,也是"暂时重定向",区别在于 302 和 307 用于 GET 请求,而 303 用于 POST、PUT 和 DELETE 请求。收到 303 以后,浏览器不会自动跳转,而会让用户自己决定下一步怎么办。下面是一个栗子:

```javascript
HTTP/1.1 303 See Other
Location: /api/orders/12345
```

- 2.4 4xx 状态码
  `4xx` 状态码表示客户端错误,主要有下面几种:
  `400 Bad Request`: 服务器不能理解客户端的请求,未做任何处理。
  `401 Unauthorized`: 用户未提供身份验证凭据,或没有通过身份验证。
  `403 Forbidden`: 用户通过了身份验证,但是不具有访问资源所需的权限。
  `404 Not Found`: 所请求的资源不存在,或不可用
  `405 Method Not Allowed`: 用户已经通过身份验证, 但是所用的 HTTP 方法不在他的权限之内
  `410 Gone`: 所请求的资源从这个地址转移,不再可用
  `415 Unsupported Media Type`: 客户端要求的返回格式不支持。比如,API 只能返回 JSON 格式,但客户端要求返回 XML 格式
  `422 Unprocessable Entity`: 客户端上传的附件无法处理,导致请求失败
  `429 Too Many Requeset`: 客户端的请求次数超过限额

- 2.5 5xx 状态码
  `5xx` 状态码表示服务器错误。一般来说,API 不会向用户透露服务器的详细信息,所以只要两个状态码就够了。
  `500 Internal Server Error`: 客户端请求有效,服务器处理时发生了意外
  `503 Service Unavailable`: 服务器无法处理请求,一般用于网站维护状态

# 三、服务器回应

- 3.1 不要返回纯文本
  API 返回的数据格式,不应该是纯文本,而应该是一个 JSON 对象,因为这样才能返回标准的结构化数据。所以,服务器回应的 HTTP 头的 Content-Type 属性要设为 application/json。

客户端请求时,也要明确告诉服务器,可以接受 JSON 格式,即请求的 HTTP 头的 ACCEPT 属性也要设成 application/json。下面是一个栗子:

```javascript
GET /orders/2 HTTP/1.1
Accept: application/json
```

- 3.2 发生错误时,不要返回 200 状态码
  有一种不恰当的做法是,即使发生错误,也会返回 200 状态码,把错误信息放在数据体里面,就像下面这样

```javascript
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "failure",
  "data":{
    "error": "Excepted at least two items in list."
  }
}
```

上面代码中,解析数据体以后,才能得知操作失败。

这种错误实际上取消了状态码,这是完全不可取的。正确的做法是,状态码反应发生的错误,具体的错误信息放在数据体里面返回。下面是一个栗子:

```javascript
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "error": "Invalid payoad.",
  "details":{
    "surname": "This field is requried."
  }
}
```

- 3.3 提供链接
  API 的使用者未必知道,URL 是怎么设计的。一个解决方法就是,在回应中,给出链接,便于下一步操作。这样的话,用户只要记住一个 URL,就可以发现其它的 URL。这种方法叫做 HATEOAS。
  举例来说,GitHub 的 API 都在 api.github.com 这个域名。访问它,就可以得到其他 URL。

`````javascript
{
  ...
  "feed_url":"https://api.github.com/feeds",
  "followers_url":"https://api.github.com/user/followers",
  "following_url":"https://api.github.com/user/following{/target}",
  "gists_url":"https://api.github.com/gists{/gist_id}",
  "hub_url":"https://api.github.com/hub",
  ...
}
上面的会应中,挑一个URL访问,又可以得到别的URL。对于用户来说,不需要记住URL设计,只要从api.github.com一步步查找就可以了。

HATEOAS的格式没有统一规定,上面栗子中,GitHub将它们与其他属性放在一起。更好的做法应该是,将相关链接与其他属性分开
````javascript
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "In progress",
  "links": {[
    {"rel": "cancel","method": "delete","href": "/api/status/12345"},
    {"rel": "edit", "method": "put", "href": "/api/status/12345"}
  ]}
}
`````

# Koa 实战 - Restful API 及常见任务

- 编写 RESTful API
  - 掌握 Koa 中编写 Restful 风格 API
  - 掌握 Koa 中文件上传、表单验证、图形验证码、发送短信等常见任务
- 文件上传
- 表单验证
- 图形验证码
- 发送短信
- 注册案例

# 解决跨域问题

```javascript
const cors = require('koa2-cors')
app.use(cors())
```

# 文件上传

- 前端代码

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
/>
<div id="app">
  <el-upload
    class="avatar-uploader"
    action="http://localhost:3000/users/upload"
    :show-file-list="false"
    :on-success="handleUploadSuccess"
    :before-upload="beforeUploadUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</div>
<script>
  var app = new Vue({
    el: "#app",
    data(){
      return :{
        imageUrl: ""
      };
    },
    methods: {
      handleUploadSuccess(res, file){
        this.$message.success("上传头像成功");
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeUploadUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 /1024 < 2;

        if(!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if(!isLt2M){
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      }
    }
  })
</script>
```

```javascript
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router({prefix,"/users"});
const cors = require("koa2-cors");

const __ROOTDIR__ = "./public/images";
const upload = require("koa-multer")({dest: __ROOTDIR__});

app.use(cors());

router.post("/upload", upload.single("file"), ctx=>{
  ctx.body ="上传成功";
  console.log("file", ctx.req.file);
  console.log("body", ctx.req.body);
})
```
# 表单验证
- 安装
````bash
npm i -S koa-bouncer
````
- 配置: app.js
````javascript
// 为koa上下文扩展一些校验方法
const bouncer = require('koa-bouncer');
app.use(bouncer.middleware());
````
- 基本使用:
````javascript
const val = async (ctx, next) =>{
  try {
    // 校验开始
    ctx
    .validateBody("name")
    .required("要求提供用户名")
    .isString()
    .trim()
  }
}
````
