<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
        Slide {{item}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      slide: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style  scoped>
.swiper {
  height: 7rem;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}
.swiper-slide {
  height: 6rem;
  text-align: center;
  line-height: 6rem;
}
</style>
