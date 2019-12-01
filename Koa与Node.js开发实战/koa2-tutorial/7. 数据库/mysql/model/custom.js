const Sequelize = require('sequelize');
const sequelize = new Sequelize('custom', 'root', 'example', {
  dialect:'mysql'
});
// 定义Customer模型
const Customer = sequelize.define('customer',{
  id:{
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM(['男','女']),
    allowNull: false
  },
  address:{
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  country:{
    type: Sequelize.STRING
  },
  city: {
    type:Sequelize.STRING
  }
});
