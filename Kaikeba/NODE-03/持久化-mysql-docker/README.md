# node.js 中实现持久化的多种方法

- 文件系统 fs
- 数据库
  - 关系型数据库-mysql
  - 文档型数据库-mongodb
  - 键值对数据库-redis

# 文件系统数据库

- 代码路径: /NODE-03/持久化-mysql-docker/fsdb.js
- 函数说明:
- [1] get:

```javascript
function get(key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    cosnole.log(json[key])
  })
}
```

读取 ./db.json 中的键为 key 的对象

- [2] set
  首先读取 ./db.json 中的文件,若文件不存在则赋予 {}
  将值写入 ./db.json 文件中

```javascript
function set(key, value) {
  fs.readFile('./db.json', (err, data) => {
    const json = data ? JSON.parse(data) : {}
    json[key] = value
  })
  fs.writeFile('/db.json', JSON.stringfy(json), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('写入成功! ')
    }
  })
}
```

# mysql 数据库

- [1] 首先配置 docker 环境
  采用 docker-compose 方法
  源码: /test-mysql/docker-compose.yml

```yml
version: '3.1'
services:
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    ports:
      - 3307:3306
  adminer:
    image: adminer
    restart: always
    ports:
      - 8081:8080
```

- [2] 打开浏览器 localhost:8081
  (1)登录管理页面
  (2)创建新数据库 mar-mysql

- [3] 写如下配置文件连接数据库
  源码: /test-mysql/mysql2.js
  部分代码说明:
  (1) 连接数据库

```javascript
const mysql = require('mysql2/promise')
const config = {
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'mar-mysql'
}

// 创建连接
const connection = await mysql.createConnection(config)
```

(2) 创建表

```javascript
let ret = await connection.execute(
  `
  CREATE TABLE IF NOT EXISTS test(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id)
  )
  `
)
```

(3) 插入数据

```javascript
let ret = await connection.execute(
  `
  INSERT INTO test (message) VALUE(?)
  `,
  ['abc']
)
```

(4) 查询

```javascript
const [rows] = await connection.execute(`
SELECT * FROM test
`)
```

# 使用 Sequelize 方式连接 mysql

- 源代码: /NODE-03/持久化-mysql-docker/mysql2.js
- [1] 连接

```javascript
const Sequelize = require('sequelize')

const sequelize = new Sequelize('mar-mysql', 'root', 'example', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false
})
```

- [2] 定义模型

```javascript
const Fruit = sequelize.define('Fruit', {
  name: { type: Sequelize.STRING(20), allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false },
  stock: { type: Sequelize.INTEGET, defaultValue: 0 }
})

let ret = await Fruit.sync()
```

# Sequelize 常用参数说明:

- force:true
  强制刷新

```javascript
const Fruit = sequelize.define('Fruit', {
  name: { type: Sequelize.STRING(20), allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false },
  stock: { type: Sequelize > INTERGER, defaultValue: 0 }
})
// 每次都创建一个新表
let ret = await Fruit.sync({
  force: true
})
```

- timestamps: false
  不要时间戳

```javascript
const options = {
  timestamps: false
}
const Fruit = sequelize.define(
  'Fruit',
  {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  },
  options
)
```

- Getters & Setters
  用于定义伪属性或映射到数据库字段的保护属性
  (1) 放在 name 属性上

```javascript
const Fruit = sequelize.define('Fruit', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      const fname = this.getDataValue('name')
      const price = this.getDataValue('price')
      const stock = this.getDataValue('stock')
      return `${fname}(价格: ￥${price} 库存: ${stock}kg)`
    }
  }
})
```

(2) 放在 options 中:

```javascript
const options = {
  timestamps: false,
  // 读取的时候会加kg
  getterMethods: {
    amount() {
      return this.getDataValue('stock') + 'kg'
    }
  },
  // 写入的时候会去除掉 kg
  setterMethods: {
    amount(val) {
      const idx = val.indexOf('kg')
      const v = val.slice(0, idx)
      this.setDataValue('stock', v)
    }
  }
}
```

- 校验: 可以通过校验功能验证模型字段格式、内容,校验会在 create、update 和 save 时自动运行

```javascript
const Fruit = sequelize.define('Fruit', {
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
    get() {
      const fname = this.getDataValue('name')
      const price = this.getDataValue('price')
      const stock = this.getDataValue('stock')
      return `${fname}(价格: ￥${price} 库存: ${stock}kg)`
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: '价格字段请输入数字' },
      min: { args: [0], msg: '价格字段必须大于0' }
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: { msg: '库存字段请输入数字' }
    }
  }
})
```

- 模型扩展: 可添加模型实例方法或类方法扩展模型
  (1) 类方法: 判断是否为热带水果

```javascript
Fruit.classify = function(name) {
  // 定义热带水果数组
  const tropicFruits = ['香蕉', '芒果', '椰子']
  // 如果在数组中,则返回"热带水果", 否则返回 "其他水果"
  return tropocFruits.includes(name) ? '热带水果' : '其他水果'
}

// 使用该方法
;['香蕉', '草莓'].forEach(f => {
  console.log(`${f}是${Fruit.classify(f)}`)
})
```

(2) 实例方法: 返回总体价格

```javascript
Fruit.prototype.totalPrice = function(count) {
  return (this.price * count).toFixed(2)
}

// 使用实例方法
Fruit.findAll().then(f => {
  const [f1] = f;
  console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`)
})
```
