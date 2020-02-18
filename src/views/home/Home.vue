<template>
  <div>
    <nav-bar class="home-bar"><div class="center" slot="center">首页</div></nav-bar>
    <home-swiper v-if="banners.length" :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'

  import {getMultidata} from 'network/home'

  export default {
    name: 'home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        console.log(this.recommends)
      })
    }
  }
</script>

<style scoped>
.home-bar {
  background-color: var(--color-tint)
}
.home-bar .center {
  color: white
}
</style>