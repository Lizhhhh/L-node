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
              <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 楼层区域 -->
    <div class="floor">
      <!-- 不规则区域 -->
      <div class="floor-irregular">
        <div class="floor-one">
          <img :src="floor1_0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floor1_1.image" width="100%" />
          </div>
          <div>
            <img :src="floor1_2.image" width="100%" />
          </div>
        </div>
      </div>
      <!-- 规则区域 -->
      <div class="floor-regular">
        <div v-for="(item, index) in floor1.slice(3)" :key="index">
          <img v-lazy="item.image" width="100%" />
        </div>
      </div>
    </div>

    <!-- swiper 体验 -->
    <!-- <swiperDefault></swiperDefault> -->
    <!-- swiper 带分页器 -->
    <!-- <swiperDefault2></swiperDefault2> -->
    <!-- swiper 竖直滑动 -->
    <!-- <swiperDefault3></swiperDefault3> -->
    <!-- swiper 区域滚动效果 -->
    <!-- <swiperText></swiperText> -->

  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import swiperDefault from '../swiper/swiperDefault.vue'
import swiperDefault2 from '../swiper/swiperDefault2.vue'
import swiperDefault3 from '../swiper/swiperDefault3.vue'
import swiperText from '../swiper/swiperText.vue'
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
      floor1_0: {},
      floor1_1: {},
      floor1_2: {}
    }
  },
  created() {
    // 测试用例
    // axios
    //   ({
    //     url: 'https://www.easy-mock.com/mock/5d89f50298fe8f6134b63b54/smileVue/index',
    //     method: 'get'
    //   })
    //   .then(response => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       this.category = response.data.data.category;
    //       this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
    //       this.bannerPicArray = response.data.data.slides;
    //       this.recommendGoods = response.data.data.recommend;
    //       this.floor1 = response.data.data.floor1;
    //       this.floor1_0 = this.floor1[0];
    //       this.floor1_1 = this.floor1[1];
    //       this.floor1_2 = this.floor1[2];
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    // 请求category
    axios
      ({
        url: 'http://localhost:3000/category',
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
        url: 'http://localhost:3000/advertesPicture',
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
        url: 'http://localhost:3000/slides',
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
        url: 'http://localhost:3000/recommend',
        method: 'get'
      })
      .then(response => {
        this.recommendGoods = response.data;
      })
      .catch(error => {
        console.log(error)
      })

    // 获取楼层数据
    axios
      ({
        url: 'http://localhost:3000/floor1',
        method: 'get'
      })
      .then(response => {
        this.floor1 = response.data;
        this.floor1_0 = this.floor1[0];
        this.floor1_1 = this.floor1[1];
        this.floor1_2 = this.floor1[2];
      })
      .catch(error => {
        console.log(error);
      })



    //


  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperDefault2,
    swiperDefault3,
    swiperText
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
.floor-irregular {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-irregular div {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 10rem;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-regular {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.floor-regular div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floor-regular div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
</style>

