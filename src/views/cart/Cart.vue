<template>
  <div class="cart">
    <nav-bar><div class="center" slot="center">购物车({{$store.state.details.length}})</div></nav-bar>
    <scroll class="content" ref="scrollComp">
      <div  class="detail" 
          v-for="(detail, index) in $store.state.details" 
          :key="index"
          :iid="detail.iid">
        <img class="select" 
            :class="{'checked': detail.isChecked}"
            src="~assets/img/cart/selected.svg" 
            @click="detailChecked(detail.iid)">
        <img class="detail-img" :src="detail.img" alt="">
        <div class="info">
          <div class="title">{{ detail.title }}</div>
          <div class="price-box">
            <span class="price">{{ detail.price | showPrice }}</span>
            <div class="count-box">
              <div class="minus" @click="minusCount(detail.iid)">-</div>
              <div class="count">{{ detail.count }}</div>
              <div class="add" @click="addCount(detail.iid)">+</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="counter-box">
      <div class="select-all" @click="detailCheckedAll">
        <img class="select" 
            :class="{'checked': $store.state.allSelected}"
            src="~assets/img/cart/selected.svg" >
        <span>全选</span>
      </div>
      <div class="total-box">
        <div class="totalPrice">合计: ￥{{ showTotalPrice || 0}}</div>
        <div class="count">结算</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { CHECK_ALL } from 'store/mutation-type'
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: 'cart',
    components: {
      NavBar,
      Scroll
    },
    data() {
      return {
      }
    },
    activated() {
      this.$refs.scrollComp.refresh()
    },
    computed: {
      showTotalPrice() {
        return this.$store.state.details.reduce((acc, obj) => {
          if (obj.isChecked) {
            return acc + obj.price * obj.count
          } else {
            return acc
          }
        }, (0)).toFixed(2)
      }
    },
    filters: {
      showPrice(price) {
        return '￥ ' + price
      }
    },
    methods: {
      minusCount(iid) {
        this.$store.dispatch('changeCount', {iid, do: 'minus'})
      },
      addCount(iid) {
        this.$store.dispatch('changeCount', {iid, do: 'add'})
      },
      detailChecked(iid) {
        this.$store.dispatch('reverseCheck', {iid})
      },
      detailCheckedAll() {
        this.$store.commit(CHECK_ALL)
      }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart .content {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 93px;
    left: 0;
    overflow: hidden;
    background-color: #f3f3f3;
  }
  .detail {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 95%;
    height: 128px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;
  }
  .cart .select {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid rgb(151, 149, 149);
  }
  .cart .select.checked {
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
  }
  .detail .detail-img {
    display: block;
    width: 72px;
    border-radius: 5px;
  }
  .detail .info {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
  }
  .detail .info .title {
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price-box {
    display: flex;
    justify-content: space-between;
    line-height: 18px;
  }
  .price-box .price {
    color: var(--color-high-text);
  }
  .count-box {
    display: flex;
  }
  .count-box .count {
    border-radius: 2px;
    background-color: #f3f3f3;
    width: 35px;
    text-align: center;
  }
  .count-box .minus,
  .count-box .add {
    width: 20px;
    text-align: center;
    font-size: 18px;
  }
  .counter-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    z-index: 10;
    height: 44px;
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
  }
  .counter-box .select-all {
    display: flex;
    align-items: center;
    height: 44px;
    margin-left: 20px;
    font-size: 15px;
  }
  .counter-box .total-box {
    display: flex;
  }
  .counter-box .total-box .totalPrice {
    height: 32px;
    margin-right: 12px;
    line-height: 32px;
  }
  .counter-box .total-box .count {
    width: 100px;
    height: 32px;
    margin-right: 20px;
    background: linear-gradient(to right, rgb(250, 102, 57), rgb(255, 58, 9));
    border-radius: 18px;
    color: white;
    text-align: center;
    line-height: 32px;
  }
</style>