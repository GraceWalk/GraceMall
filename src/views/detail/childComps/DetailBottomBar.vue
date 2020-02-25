<template>
  <div class="bottom-bar">
    <div class="left-bar">
      <div class="services">
        <img class="icon" src="~assets/img/detail/cs.svg"/>
        <span class="text">客服</span>
      </div>
      <div class="shop">
        <img class="icon" src="~assets/img/detail/shop.svg"/>
        <span class="text">店铺</span>
      </div>
      <div class="collect">
        <img class="icon" src="~assets/img/detail/collect.svg"/>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right-bar">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar'
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    z-index: 3;
    box-shadow: 0 0 3px 1px rgba(197, 197, 197, 0.534);
    background-color: #fff;
  }
  .left-bar {
    display: flex;
    width: 40%;
  }
  .left-bar > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .left-bar .text {
    font-size: 13px;
  }
  .left-bar .icon {
    display: block;
    width: 20px;
    height: 24px;
  }
  .right-bar {
    display: flex;
    align-items: center;
    width: 60%;
  }
  .right-bar .cart,
  .right-bar .buy {
    flex: 1;
    height: 34px;
    font-size: 13px;
    color: white;
    line-height: 37px;
    text-align: center;
  }
  .right-bar .cart{
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
    background: linear-gradient(to right, rgb(250, 198, 57), rgb(255, 177, 9));
  }
  .right-bar .buy {
    margin-right: 4%;
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
    background: linear-gradient(to right, rgb(250, 102, 57), rgb(255, 58, 9));
  }
  
</style>