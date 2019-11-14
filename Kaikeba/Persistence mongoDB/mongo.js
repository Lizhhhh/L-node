(async () => {
    const { MongoClient: MongoDB } = require("mongodb");

    // 创建一个客户端
    const client = new MongoDB(
        'mongodb://localhost:27017', {
            userNewUrlParser: true
        }
    )

    let ret;

    // 创建连接
    ret = await client.connect();

    // db代表test数据库
    const db = client.db('test');

    // fruits代表集合
    const fruits = db.collection('fruits');

    // // 添加文档(相当于mysql里面的一条数据记录)
    // ret = await fruits.insertOne({
    //     name: '芒果',
    //     price: 20.1
    // });

    // console.log('insert:', JSON.stringify(ret));

    // // 查询数据
    // ret = await fruits.findOne();
    // console.log('find:', ret);

    // // 更新文档
    // ret = await fruits.update({ name: '芒果' }, {
    //     $set: {
    //         name: '苹果'
    //     }
    // })

    // 删除文档
    // 删除所有文档
    // ret = await fruits.deleteMany();

    // 删除一条文档
    // ret = await fruits.deleteMany();
})()