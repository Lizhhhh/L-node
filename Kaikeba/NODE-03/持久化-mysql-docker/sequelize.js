(async () => {
    const Sequelize = require('sequelize');

    const sequelize = new Sequelize('mar-mysql', 'root', 'example', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    });

    // 定义模型
    const options = {
        timestamps: false,
        getterMethods: {
            amount() {
                return this.getDataValue('stock') + 'kg'
            }
        },
        setterMethods: {
            amount(val) {
                const idx = val.indexOf('kg')
                const v = val.slice(0, idx)
                this.setDataValue('stock', v)
            }
        }
    }
    const Fruit = sequelize.define("Fruit", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            get() {
                const fname = this.getDataValue("name");
                const price = this.getDataValue("price");
                const stock = this.getDataValue("stock");
                return `${fname}(价格: ￥${price} 库存: ${stock}kg)`;
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
    }, options);

    // 类方法: 判断是否为热带水果
    // Fruit.classify = function(name) {
    //     // 定义热带水果数组
    //     const tropicFruits = ["香蕉", "芒果", "椰子"];
    //     // 如果在数组中,则返回"热带水果", 否则返回 "其他水果"
    //     return tropicFruits.includes(name) ? "热带水果" : "其他水果";
    // };

    // 使用类方法
    // ['香蕉', '草莓'].forEach(f => {
    //     console.log(`${f}是${Fruit.classify(f)}`)
    // })



    let ret = await Fruit.sync({
        force: true
    });

    // 向表中插入数据
    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5
    });
    // console.log("banana:", ret);

    //  实例方法: 返回总体价格
    Fruit.prototype.totalPrice = function(count) {
        return (this.price * count).toFixed(2)
    }

    // 使用实例方法
    Fruit.findAll().then(f => {
        const [f1] = f;
        console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`);
    })


    // 查询数据
    // ret = await Fruit.findAll();
    // console.log('findAll:', JSON.stringify(ret));

    // 写入数据, 给第一个水果加重量
    // Fruit.findAll().then(fruits => {
    //     console.log("before amount:", JSON.stringify(fruits));
    //     // 修改amount,触发setterMethods
    //     fruits[0].amount = "150kg";
    //     fruits[0].save();
    //     console.log("after amount:", JSON.stringify(fruits));
    //     // 注意,数据库里面不带单位
    // })



})()