// 这是跟商品路由有关的后端接口
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('../data_json/newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            console.log(value);
            let newGoods = new Goods(value);
            newGoods.save()
                .then(() => {
                    saveCount++;
                    console.log('成功' + saveCount);
                })
                .catch(error => {
                    console.log(MediaStreamErrorEvent);
                })
        })
    })
    ctx.body = '开始导入数据';
})

router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data);
            let saveCount = 0;
            const Category = mongoose.model('Category');
            data.RECORDS.map((value, index) => {
                let newCategory = new Category(value);
                newCategory.save()
                    .then(() => {
                        saveCount++;
                        console.log('插入成功' + saveCount);
                    })
                    .catch(error => {
                        console.log('插入失败' + error);
                    })
            })
        }
    })
    ctx.body = "开始导入数据"
})

router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data);
            let saveCount = 0;
            const CategorySub = mongoose.model('CategorySub');
            data.RECORDS.map((value, index) => {
                let newCategory = new CategorySub(value);
                newCategory.save()
                    .then(() => {
                        saveCount++;
                        console.log('插入成功' + saveCount);
                    })
                    .catch(error => {
                        console.log('插入失败' + error);
                    })
            })
        }
    })
    ctx.body = '数据插入中...';
})
module.exports = router;
