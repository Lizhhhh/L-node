<template>
  <div>
    <!-- 顶部搜索 -->
    <div class="search-bar">
      <van-row>
        <van-col :span="3">
          <img :src="locationIcon" width="80%" class="location-icon">
        </van-col>
        <van-col :span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col :span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swipe-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="100%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- adbanner area -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>

    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter }}(￥{{item.mallPrice | moneyFilter }})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!-- Hot Area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- 这里需要一个list组件 -->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent.vue'
import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '@/components/component/goodsInfoComponent'
import api from '@/serviceAPI.config.js'
export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 3
      },
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [
      ],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: [],
      hotGoods: []
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    // 测试用例
    // axios
    //   ({
    //     url: api.getIndexInfo,
    //     method: 'get'
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //       this.category = response.data.data.category;
    //       this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
    //       this.bannerPicArray = response.data.data.slides;
    //       this.recommendGoods = response.data.data.recommend;
    //       this.floor1 = response.data.data.floor1;
    //       this.floor2 = response.data.data.floor2;
    //       this.floor3 = response.data.data.floor3;
    //       this.floorName = response.data.data.floorName;
    //       this.hotGoods = response.data.data.hotGoods;
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    // 请求category
    axios
      ({
        url: api.getCategoryInfo,
        method: 'get'
      })
      .then(response => {
        if (response.status === 200) {
          this.category = response.data;
        }
      })
      .catch(error => {
        console.log(error)
      })

    // 请求广告条
    axios
      ({
        url: api.getadvertesPictureInfo,
        method: 'get'
      })
      .then(response => {
        this.adBanner = response.data[0].PICTURE_ADDRESS;
      })
      .catch(error => {
        console.log(error)
      })
    // 请求轮播图
    axios
      ({
        url: api.getslidesInfo,
        method: 'get'
      })
      .then(response => {
        this.bannerPicArray = response.data;
      })
      .catch(error => {
        console.log(error)
      })
    // 请求商品推荐图
    axios
      ({
        url: api.getrecommendInfo,
        method: 'get'
      })
      .then(response => {
        this.recommendGoods = response.data;
      })
      .catch(error => {
        console.log(error)
      })

    // 获取楼层1数据
    axios
      ({
        url: api.getfloor1Info,
        method: 'get'
      })
      .then(response => {
        this.floor1 = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    // 获取楼层2数据
    axios
      ({
        url: api.getfloor2Info,
        method: 'get'
      })
      .then(response => {
        this.floor2 = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    // 获取楼层3数据
    axios
      ({
        url: api.getfloor3Info,
        method: 'get'
      })
      .then(response => {
        this.floor3 = response.data;
      })
      .catch(error => {
        console.log(error);
      })

    // 获取楼层名称
    axios
      ({
        url: api.getfloorNameInfo,
        method: 'get'
      })
      .then(response => {
        this.floorName = response.data;
        console.log(this.floorName)
      })
      .catch(error => {
        console.log(error);
      })

    // 获取热卖商品
    axios
      ({
        url: api.gethotGoodsInfo,
        method: 'get'
      })
      .then(response => {
        this.hotGoods = response.data
      })
      .catch(error => {
        console.log(error);
      })


  }

}
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  line-height: 1.3rem;
  width: 100%;
  border: 0px;
  border-bottom: 1px solid #fff;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-right: 0.3rem;
}
.swipe-area {
  padding: 1px;
  clear: both;
  max-height: 9.375rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: scroll;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.type-bar div img {
  width: 3.1rem;
  height: 3.1rem;
}
.type-bar div span {
  display: inline-block;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  color: #e5017d;
  padding: 0.2rem;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}
.recommend-body {
  border-bottom: 1px solid #eee;
  height: 148px;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  height: 100%;
  text-align: center;
  font-size: 12px;
}

/* 热卖商品 */
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>

