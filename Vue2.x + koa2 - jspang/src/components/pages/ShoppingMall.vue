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
        <img src="">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [
      ],
      category: [],
      adBanner: ''
    }
  },
  created() {
    // 测试用例
    axios
      ({
        url: 'https://www.easy-mock.com/mock/5d89f50298fe8f6134b63b54/smileVue/index',
        method: 'get'
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      })

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
</style>

