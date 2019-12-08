  // 数据库的配置文件
  const db = {
      dialect: 'mysql',
      host: 'localhost',
      database: 'test',
      username: 'root',
      password: 'example'
  };


  // 使用Sequelize库连接数据库
  const Sequelize = require('sequelize');

  // 初始化数据库连接
  app.$db = new Sequelize(db);

  // 加载模型
  app.$model = {};
  load('model', (filename, conf) => {
      app.$model[filename] = app.$db.define(filename, schema, options)
  })

  app.$db.sync()