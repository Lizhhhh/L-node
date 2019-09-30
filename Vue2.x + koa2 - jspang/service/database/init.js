const mongoose = require('mongoose');
const db = 'mongodb://localhost/smile-vue'
const glob = require('glob');
const { resolve } = require('path');

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}

exports.connect = () => {
    // 连接数据库
    mongoose.connect(db);
    // 最大连接次数...
    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        // 增加数据库监听事件
        mongoose.connection.on('disconnected', (err) => {
            if (maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);
                console.log(`正在第${maxConnectTimes}次连接数据库...`);
            } else {
                reject(err);
                throw new Error('数据库出现问题,程序无法搞定,请认为修理....');
            }
        });

        mongoose.connection.on('error', () => {
            console.log('[error] 数据库出错');
            mongoose.connect(db);
        })

        mongoose.connection.once('open', () => {
            console.log('[ok] MongoDB connected successfully');
            resolve()
        })
    })
}
