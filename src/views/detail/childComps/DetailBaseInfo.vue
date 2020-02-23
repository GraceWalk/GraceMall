<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length">
    <div class="title">{{ baseInfo.title }}</div>
    <div class="price">
      <span class="n-price">{{ baseInfo.price }}</span>
      <span class="o-price">{{ baseInfo.oldPrice }}</span>
      <span class="discount" v-if="baseInfo.discount">{{ baseInfo.discount }}</span>
    </div>
    <div class="other">
      <span>{{ baseInfo.columns[0] }}</span>
      <span>{{ baseInfo.columns[1] }}</span>
      <span>{{ baseInfo.services[baseInfo.services.length-1].name }}</span>
    </div>
    <div class="services">
      <span class="services-item" 
            v-for="key in baseInfo.services.length-1" 
            :key="key">
        <img :src="baseInfo.services[key-1].icon" alt="">      
        <span>{{ baseInfo.services[key-1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      baseInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .title {
    color: #222;
  }
  .price {
    margin-top: 10px;
  }
  .price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .price .o-price {
    margin-left: 5px;
    font-size: 13px;
    text-decoration: line-through;
  }
  .price .discount {
    position: relative;
    top: -7px;
    padding: 2px 5px;
    border-radius: 8px;
    margin-left: 5px;
    background-color: var(--color-high-text);
    font-size: 12px;
    color: #fff;
  }
  .other {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    border-bottom: 1px solid rgba(100, 100,100, .1);
    line-height: 30px;
    font-size: 13px;
  }
  .services {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
  }
  .services-item img {
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
  }
  .services-item span {
    font-size: 12px;
    color: #333;
  }
</style>