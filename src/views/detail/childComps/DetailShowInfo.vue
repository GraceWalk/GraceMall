<template>
  <div class="show" v-if="Object.keys(show).length">
    <div class="item" v-for="(item, index) in show.detailImage" :key="index">
      <div class="start"></div>
      <div class="item-desc">{{ item.key }}</div>
      <div class="end"></div>
      <img v-for="(img, index) in item.list" :key="index" :src="img" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShowInfo',
    props: {
      show: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
  .show {
    border-bottom: 5px solid #f2f5f8;
  }
  .item {
    margin: 20px 0;
  }
  .item-desc {
    clear: both;
    margin: 10px 0;
    font-size: 16px;
    color: #000;
    text-align: center;
  }
  .start, .end {
    position: relative;
    width: 70px;
    height: 1px;
    background-color: #000;
  }
  .start {
    margin-left: 20px;
    float: left;
  }
  .end {
    margin-right: 20px;
    float: right;
  }
  .start::before,
  .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #333;
  }
  .start::before {
    left: 0px;
    top: -2px;
  }
  .end::after {
    right: 0px;
    top: -2px;
  }
  img {
    width: 100%;
  }
</style>