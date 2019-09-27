<template>
  <div>
    <!-- 楼层区域 -->
    <div class="floor">
      <!-- 头部区域 -->
      <div class="floor-title">{{ floorTitle }}</div>

      <!-- 不规则区域 -->
      <div class="floor-irregular">
        <div class="floor-one">
          <img :src="floorData0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floorData1.image" width="100%" />
          </div>
          <div>
            <img :src="floorData2.image" width="100%" />
          </div>
        </div>
      </div>
      <!-- 规则区域 -->
      <div class="floor-regular">
        <div v-for="(item, index) in floorData.slice(3)" :key="index">
          <img v-lazy="item.image" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['floorData', 'floorTitle'],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {},
    }
  },
  created() {
  },
  watch: {
    floorData: function (val) {
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    },
  }

}
</script>

<style  scoped>
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
  border-bottom: 1px solid #bbb;
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
