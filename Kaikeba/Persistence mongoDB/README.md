# 数据持久化之 mongoDB

# MongoDB基本语法
- 进入mongoDB环境
(1) vscode中点击鲸鱼
(2) 在容器(CONTAINERS)中选择对应的mongo,反键点击 attach shell
(3) 在终端中输入 mongo

- 查看数据库
````bash
show dbs
````

- 切换到数据库(若数据库不存在,则会创建)
````bash
use test
````
此时,由于没有数据而查不到(show dbs)

- 写入数据
````bash
db.fruits.save({name:'apple', price:3});
````

- 查询
栗子: 查询一个价格为3的产品
````bash
db.fruits.find({price: 3})
````

- 查询
查询所有集合
````bash
db.getCollectionNames()
````

查询fruits集合中的所有数据
````bash
db.fruits.find()
````

# node连接到mongodb
- 创建一个客户端
````javascript
const { MongoClient: MongoDB } = require("mongodb");

const client = new MongoDB(
  'mongodb://localhost:20017',
  {
  userNewUrlParser: true
  }
)

let ret = await client.connect();
````


- 连接到 "test" 数据库
````javascript
const db = client.db('test');
````

- 连接到 "fruits" 集合
````javascript
const fruits = db.collection("fruits");
````

