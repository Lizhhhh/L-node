const Sequelize = require('sequelize')
const sequelize = new Sequelize('koa-sql', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql'
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected')
  })
  .catch(err => {
    console.error('Connect failed')
  })
const Project = sequelize.define('project', {
  // 定义Project 模型
  name: {
    // 定义 name 字段
    type: Sequelize.STRING, // 定义类型为 String
    allowNull: false, // 不能为空
    unique: true // 必须唯一, 不允许重复
  },
  data: {
    type: Sequelize.DATE, // 定义 data 字段
    defaultValue: Sequelize.NOW // 默认值为当前时间
  }
})
