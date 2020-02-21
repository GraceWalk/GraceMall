<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="(item, key) in banners" :key="key">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isImgLoad: 0
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad() {
        if (!this.isImgLoad++) {
          this.$emit('imgLoad')
        }
      }
    }

  }
</script>

<style scoped>
</style>