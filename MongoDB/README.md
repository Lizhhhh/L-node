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

# 数据库的增删改查
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
  - 文件的删除
  - 删除{"name":"lzhhhh1"}
```
db.user.remove({"name":"lzhhhh1"})
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








