const BASEURL = "http://localhost:3000/";
const LOCALURL = 'http://localhost:3001/';
const URL = {
    getIndexInfo: BASEURL + 'index',
    getCategoryInfo: BASEURL + 'category',
    getadvertesPictureInfo: BASEURL + 'advertesPicture',
    getslidesInfo: BASEURL + 'slides',
    getrecommendInfo: BASEURL + 'recommend',
    getfloor1Info: BASEURL + 'floor1',
    getfloor2Info: BASEURL + 'floor2',
    getfloor3Info: BASEURL + 'floor3',
    getfloorNameInfo: BASEURL + 'floorName',
    gethotGoodsInfo: BASEURL + 'hotGoods',
    registerUser: LOCALURL + 'user/register',
    login: LOCALURL + 'user/login',
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
    getCateGoryList: LOCALURL + 'goods/getCateGoryList', // 得到大类信息
    getCateGorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
    getGoodsListByCategorySubId: LOCALURL + 'goods/getGoodsListByCategorySubId', // 得到小类商品信息
}

module.exports = URL;
