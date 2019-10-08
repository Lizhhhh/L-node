// 这是跟商品路由有关的后端接口
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

// 插入商品信息
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

// 插入商品标题
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

// 插入商品副标题
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

// 获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ ID: goodsId }).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

// 读取大类数据的接口
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec()
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

// 读取小类的数据
router.post('/getCategorySubList', async (ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId;
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})

// 根据类别获取商品列表
router.post('/getGoodsListByCategorySubId', async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId;  // 子类别ID
        let page = ctx.request.body.page;  // 当前页数
        let num = 10;  // 每页显示数量
        let start = (page - 1) * num;  // 开始位置

        const Goods = mongoose.model('Goods');
        let result = await Goods.find({ SUB_ID: categorySubId })
        .skip(start)  // 跳过第几页
        .limit(num)  // 每页显示的数据
        .exec();
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})

module.exports = router;
