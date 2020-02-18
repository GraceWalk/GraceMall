<template>
  <div class="recommends">
    <div class="recommends-item" v-for="(item, key) in recommends" :key="key">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommends {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  padding: 10px 0 20px 0;
  border-bottom: 7px solid #e4e4e4;
}
.recommends-item {
  font-size: 12px;
  text-align: center;
}
.recommends-item img {
  display: block;
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
}
</style>