# Restful 学习

# 阮一峰 - RESTful API 最佳实践
- 是目前最流行的 API 设计规范, 用于 Web 数据接口的设计

# 一、URL设计
- 1.1 动词 + 宾语:
客户端发出的指令都是"动词 + 宾语"的结构,如: "GET / articles"

- 1.2 动词的覆盖
客户端发出的HTTP请求,要加上 X-HTTP-Method-Override 属性,告诉服务器使用哪一个动词覆盖POST方法.
````javascript
POST /api/Person/4 HTTP/1.1
X-HTTP-Method-Override: PUT
````

- 1.3 宾语必须是名词
宾语就是API的URL,是HTTP动词作用对象。它应该是名词,不能是动词。比如,/articles这个URL就是正确的,而下面的URL不是名词,所以是错误的。
````javascript
/getAllCars
/createNewCar
/deletewAllRedCars
````

- 1.4 复数URL
建议都用复数URL, `GET /articles/2`

- 1.5 避免多级 URL
常见的情况是,资源需要多级分类,因此很容易写出多级的URL,比如获取某个作者的某一类文章
````javascript
GET /authors/12/categories/2
````
这种URL不利于扩展,语义也不明确,往往要想一会,才能明白。
最好的做法是,除了第一级,其他级别都用查询字符串表达。
````javascript
GET /authors/12?categories=2
````
下面是另一个栗子,查询已发布的文章。你可能会设计成下面的URL
````javascript
GET /articles/published
````
查询字符串的写法明显更好
````javascript
GET /articles/published=true
````

# 二、状态码
- 2.1 状态码必须精确
客户端的每一次请求,服务器都必须给出回应。回应包括HTTP状态码和数据两部分
HTTP状态码就是一个三位数,分成五个类别
````javascript
# 1xx: 相关信息
# 2xx: 操作成功
# 3xx: 重定向
# 4xx: 客户端错误
# 5xx: 服务器错误
````

- 2.2 2xx状态码
200状态码表示操作成功,但是不同的方法可以返回更精确的状态码
````javascript
# GET: 200 OK
# POST: 201 Created
# PUT: 200 OK
# PATCH: 200 OK
# DELETE: 204 No Content
````
上面代码中, POST返回201状态码,表示生成了新的资源; DELETE返回204状态码,表示资源已经不存在。此外,202 Accepted 状态码表示服务器已经收到请求，但还未进行处理,会在未来再处理,通常用于异步操作。下面是一个栗子:
````javascript
HTTP/1.1 202 Accepted
{
  "task":{
    "href": "/api/company/job-management/jobs/2130040",
    "id": "2130040"
  }
}
````

- 2.3 3xx状态码
API用不到301状态码(永久重定向) 和 302状态码(临时重定向, 307也是这个含义),因为它们可以由应用级别返回,浏览器会直接跳转,API级别可以不考虑这两种情况。

API用到的3xx状态码,主要是303 See Other, 表示参考另一个URL。它与302和307的含义一样,也是"暂时重定向",区别在于 302和307用于GET请求,而303用于POST、PUT和DELETE请求。收到303以后,浏览器不会自动跳转,而会让用户自己决定下一步怎么办。下面是一个栗子:
````javascript
HTTP/1.1 303 See Other
Location: /api/orders/12345
````

- 2.4 4xx状态码
`4xx` 状态码表示客户端错误,主要有下面几种:
`400 Bad Request`: 服务器不能理解客户端的请求,未做任何处理。
`401 Unauthorized`: 用户未提供身份验证凭据,或没有通过身份验证。
`403 Forbidden`: 用户通过了身份验证,但是不具有访问资源所需的权限。
`404 Not Found`: 所请求的资源不存在,或不可用
`405 Method Not Allowed`: 用户已经通过身份验证, 但是所用的 HTTP 方法不在他的权限之内
`410 Gone`: 所请求的资源从这个地址转移,不再可用
`415 Unsupported Media Type`: 客户端要求的返回格式不支持。比如,API只能返回JSON格式,但客户端要求返回XML格式
`422 Unprocessable Entity`: 客户端上传的附件无法处理,导致请求失败
`429 Too Many Requeset`: 客户端的请求次数超过限额

- 2.5 5xx状态码
`5xx` 状态码表示服务器错误。一般来说,API不会向用户透露服务器的详细信息,所以只要两个状态码就够了。
`500 Internal Server Error`: 客户端请求有效,服务器处理时发生了意外
`503 Service Unavailable`: 服务器无法处理请求,一般用于网站维护状态

# 三、服务器回应
- 3.1 不要返回纯文本
API返回的数据格式,不应该是纯文本,而应该是一个JSON对象,因为这样才能返回标准的结构化数据。所以,服务器回应的HTTP头的Content-Type属性要设为application/json。

客户端请求时,也要明确告诉服务器,可以接受JSON格式,即请求的HTTP头的ACCEPT属性也要设成application/json。下面是一个栗子:
````javascript
GET /orders/2 HTTP/1.1
Accept: application/json
````

- 3.2发生错误时,不要返回200状态码
有一种不恰当的做法是,即使发生错误,也会返回200状态码,把错误信息放在数据体里面,就像下面这样
````javascript
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "failure",
  "data":{
    "error": "Excepted at least two items in list."
  }
}
````
上面代码中,解析数据体以后,才能得知操作失败。

这种错误实际上取消了状态码,这是完全不可取的。正确的做法是,状态码反应发生的错误,具体的错误信息放在数据体里面返回。下面是一个栗子:
````javascript
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "error": "Invalid payoad.",
  "details":{
    "surname": "This field is requried."
  }
}
````

- 3.3 提供链接
API的使用者未必知道,URL是怎么设计的。一个解决方法就是,在回应中,给出链接,便于下一步操作。这样的话,用户只要记住一个URL,就可以发现其它的URL。这种方法叫做HATEOAS。
举例来说,GitHub的API都在api.github.com这个域名。访问它,就可以得到其他URL。
````javascript
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