const Sequelize = require('sequelize');
const sequelize = new Sequelize('marron', 'root', 'example', {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false
});
sequelize.authenticate().then(() => {
    console.log('Connected');
}).catch(err => {
    console.log('[Connect failed]:', err);
});

