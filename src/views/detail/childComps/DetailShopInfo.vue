<template>
  <div class="shop" v-if="Object.keys(shop).length">
    <div class="head">
      <img :src="shop.shopLogo" alt="">
      <span>{{ shop.name }}</span>
    </div>
    <div class="middle-bar">
      <div class="left-bar">
        <div class="sells">
          <div class="num">{{ shop.cSells | getSells }}</div>
          <div class="name">总销量</div>
        </div>
        <div class="goods">
          <div class="num">{{shop.cGoods }}</div>
          <div class="name">全部宝贝</div>
        </div>
      </div>
      <div class="right-bar">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{ item.score }}</td>
            <td class="desc" :class="{'desc-better': item.isBetter}">{{ item.isBetter ? '高' : '低' }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="to-shop"><a :href="shop.shopUrl">进店逛逛</a></div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    getSells(num) {
      return `${(num/10000).toFixed(1)}万`
    }
  }
};
</script>

<style scoped>
  .shop {
    margin-top: 26px;
    border-bottom: 5px solid #f2f5f8;
  }
  .head {
    display: flex;
    height: 40px;
    margin-left: 14px;
  }
  .head img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px 2px rgba(238, 238, 238, 0.644);
  }
  .head span {
    padding-left: 8px;
    line-height: 40px;
  }

  .middle-bar {
    display: flex;
    margin: 20px 0 12px 0;
    font-size: 12px;
    color: #000;
  }
  .middle-bar .left-bar,
  .middle-bar .right-bar {
    flex: 1;
  }
  .middle-bar .left-bar {
    display: flex;
    align-items: center;
  }
  .middle-bar .left-bar .sells,
  .middle-bar .left-bar .goods {
    height: 42px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
  .middle-bar .left-bar .sells .num,
  .middle-bar .left-bar .goods .num {
    font-size: 18px;
  }
  .middle-bar .left-bar .goods {
    border-right: 1px solid rgb(199, 199, 199);
  }
  .middle-bar .right-bar table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 68px;
    margin-left: 28px;
  }
  .middle-bar .right-bar td {
    padding-right: 10px;
  }
  .middle-bar .right-bar .score {
    color: green;
    width: 34px;
  }
  .middle-bar .right-bar .desc {
    padding: 1px;
    color: white;
    background-color: green;
  }
  .middle-bar .right-bar .score-better {
    color: red;
  }
  .middle-bar .right-bar .desc-better {
    background-color: red;
  }
  .to-shop {
    width: 140px;
    height: 28px;
    margin: 0 auto;
    margin-bottom: 30px;
    border-radius: 12px;
    background-color: rgb(237, 237, 240);
    font-size: 14px;
    line-height: 28px;
    text-align: center;
  }
</style>