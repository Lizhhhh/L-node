(async () => {
    const mysql = require('mysql2/promise');
    const cfg = {
        host: "localhost",
        user: "root",
        password: "example", // 修改为你的密码
        database: "mar-mysql" // 确保数据库存在
    };
    // 创建连接
    const connection = await mysql.createConnection(cfg);

    // console.log('conn:', connection);

    // IF NOT EXISTS: 如果不存在就创建
    // NOT NULL AUTO_INCREMENT: 非空自增
    // PRIMARY KEY (id): 主键是id
    // 创建表
    let ret = await connection.execute(`
  CREATE TABLE IF NOT EXISTS test(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id)
  )
  `)
    console.log('ret:', ret);

    // 插入数据
    ret = await connection.execute(`
    INSERT INTO test (message) VALUE(?)
    `, ['abc']);
    console.log('insert:', ret);


    // 查询
    const [rows, fields] = await connection.execute(`
  SELECT * FROM test
  `);
    console.log('select', JSON.stringify(rows));

})()