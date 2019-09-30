const BASEURL = "http://localhost:3000/";
const LOCALURL = 'http://localhost:3001/';
const URL = {
    getIndexInfo: BASEURL + 'index',
    getCategoryInfo: BASEURL + 'getCategoryInfo',
    getadvertesPictureInfo: BASEURL + 'advertesPicture',
    getslidesInfo: BASEURL + 'slides',
    getrecommendInfo: BASEURL + 'recommend',
    getfloor1Info: BASEURL + 'floor1',
    getfloor2Info: BASEURL + 'floor2',
    getfloor3Info: BASEURL + 'floor3',
    getfloorNameInfo: BASEURL + 'floorName',
    gethotGoodsInfo: BASEURL + 'hotGoods',
    registerUser: LOCALURL + 'user/register',
    login: LOCALURL + 'user/login'
}

module.exports = URL;
