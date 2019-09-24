# 安装
  + http://www.mongodb.com

# 启动 mongoDB 服务器
```
mongod
```

# 连接 mongoDB
```
mongo
```

# 查看 数据库
  + 须启动服务器并连接
  + 显示数据库
```
show dbs
```

# 查看 版本
  + 须启动服务器并连接
```
db.version()
```

# 切换并使用数据库
  + use + '数据库名称'
```
use admin
```

# 查看当前数据库下的集合
  + mongoDB中的存储结构: 数据库 -> 集合 -> 文件
```
show collections
```

# 查看当前数据库
  + 当前正在使用哪个数据库
```
db
```

# 数据库的增删改查(命令行)
  - MongoDB的存储结构: 库 -> 集合 -> 文件
  - 向user集合插入 ({"name": "lzhhc"})
```
use user
db.user.insert({"name":"lzhhc"})
```
  - 查看集中的数据
  - 查看user集合中的全部数据
```
db.user.find()
```
  - 查找user集合中的第一条数据
```
db.user.findOne()
```
  - 文件的更新
  - 给user集合中,{"name":"lzhhc"}的文件添加一个age属性,值为18
```
db.user.update({"name":"lzhhc"},{"name":"lzhhc","age":"18"})
```
  - 文件的属性更新
  - 将上面的元素,年龄改为19
  - 使用 $set
```
db.user.update({"name":"lzhhc"},{"$set":{age:19}})
```
  - 文件的删除
  - 删除{"name":"lzhhhh1"}
```
db.user.remove({"name":"lzhhhh1"})
```
  - 文件中某个属性的删除
  - 如删除 age属性
  - 使用 $unset
```
db.user.update({"name":"lzhhc"},{"$unset":{age:''}})
```
  - 集合的删除
  - 删除 user 集合
```
db.user.drop()
```
  - 库的删除
  - 删除 user 库
```
db.dropDatabase()
```
  - 批量插入(效率高:1000条数据80ms, 循环插入10000条:2785ms)
  - 往 log 集合中插入
```
db.log.insert([
  {"id":1},
  {"id":2},
  {"id":3}
])
```
  - 将集合中某个文件的年龄-2
  - $inc
```
db.user.update({"name":'lzhhhh1'},{"$inc":{age:-2}})
```
  - 给集合中所有文件添加一个新属性:interest
  - $set + multi
```
db.user.update({},{"$set":{"interest":[]}},{multi: true})
```
  - 将小王的年龄改为20
  - 如果存在,则修改, 若不存在,则新增
  - upsert
```
db.user.update({"name":"Mr Wang"},{"$set":{"age":20}},{upsert:true})
```

# 使用 mongo 命令启动 js 脚本
  - 使用 log 库
  - 等价于 shell 使用 use log
```
const db = connect('log');
```
  - 往login集合中写入数据
  - 写入以下代码
  - 使用 mongo 01、mongo-goTask.js 启动
```
const name = 'lzhhc';
const time = Date.parse(new Date());
const jsonDatabase = {"name":name,"time":time};
const db = connect("log");

db.login.insert(jsonDatabase);
print('[demo]':log print success');
```

# $push
  - 给小王的interest里面添加一个draw
```
db.workmate.update({"name":"xiaowang"},{"$input":{"interest":"draw"}})
```
  - 在小王的第4个技能下添加一个skill.skillFour:"draw"
```
db.workmate.update({"name":"xiaowang"}.{"$input":{"skill.skillFour":"draw"}})
```

# $ne
  - 无则添加,有则不添加
  - 给小王添加一个interest:'palygame',没有则添加,有则不添加
```
db.workmate.update({"name":"xiaowang",interest:{"$ne":"game"}},{"$input":{interest:"playgame"}})
```

# $addToSet
  - 如果小王有interest:'readBook'则不添加,
  - 如果小王无interset:'readBook',则添加
```
db.workmate.update({"name":"xiaowang"},{$addToSet:{interest:"readBook"}})
```

# $each
  - 给小王添加兴趣组
  - ['Singing','Dancing','Coding']
```
const interestArr = ['Singing','Dancing','Coding'];
db.workmate.update({"name":"xiaowang"},{$addToSet:{interest:{$each:interestArr}}})
```

# $pop
  -  1: 从数组末端进行删除
  - -1: 从数组开头开始删除
```
db.worker.update({name:'xiaowang'},{$pop:{interest:1}})
```

# $set
  - 数组的定位修改
  - 将lzhhhh1的第2个技能改为wps
```
db.worker.update({name:'lzhhhh1'},{$set:{"skill.1":"wps"}});
```



