<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <!-- 清空购物车按钮 -->
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" plain>
        清空购物车
      </van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="lz-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="lz-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="lz-text">
          <div class="lz-goods-name">{{item.name}}</div>
          <div class="lz-control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="lz-goods-price">
          <div>
            ￥{{item.price | moneyFilter }}
          </div>
          <div>
            * {{item.count}}
          </div>
          <div class="lz-total-price">
            ￥{{item.price * item.count | moneyFilter}}
          </div>
        </div>
      </div>
    </div>
    <!-- 总价 -->
    <div class="lz-goods-totalprice">
      商品总价:￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,  // 购物车是否为空
    }
  },
  created() {
    this.getCartInfo();
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item) => {
        allMoney += item.price * item.count;
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    // 得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }

      this.isEmpty = this.cartInfo.length > 0 ? true : false;
      console.log(JSON.stringify(this.cartInfo));
    },
    // 清空购物车
    clearCart() {
      localStorage.removeItem('cartInfo');
      this.cartInfo = [];
    }
  }

}
</script>

<style  scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  text-align: center;
}
.cart-list {
  background-color: #fff;
}

.lz-row {
  display: flex;
  direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
  align-items: center;
  justify-content: center;
}
.lz-img {
  flex: 6;
}
.lz-text {
  flex: 14;
}
.lz-goods-price {
  flex: 4;
  font-size: 0.7rem;
}
.lz-total-price {
  color: red;
  font-size: 0.9rem;
}
.lz-goods-totalprice {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>
