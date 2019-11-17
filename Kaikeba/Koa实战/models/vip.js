const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    url: String,
    poster: String,
    icon: String,
    description: String,
    cooperation: [String]
});

const model = mongoose.model("vip", schema);

// 测试数据
async function testdata() {
    await model.deleteMany();
    await model.insertMany([{
            name: "web全栈架构师",
            poster: "https://img.kaikeba.com/web_vip.png",
            icon: "https://img.kaikeba.com/web_menu.png",
            description: "授课深度对标百度T6-T7,进入BAT等一线大厂,QAQ",
            cooperation: [
                "https://img.kaikeba.com/baidu.png",
                "https://img.kaikeba.com/toutiao.png"
            ]
        },
        {
            name: "Python爬虫商业项目班",
            url: "/vip-course/python",
            poster: "https://img.kaikeba.com/python_vip_new.png",
            icon: "https://img.kaikeba.com/python_menu.png",
            description: "授课深度对标百度T6-T7,进入BAT等一线大厂,QAQ",
            cooperation: [
                "https://img.kaikeba.com/baidu.png",
                "https://img.kaikeba.com/toutiao.png"
            ]
        }
    ]);
}

testdata();

module.exports = model;