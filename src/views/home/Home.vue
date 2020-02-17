<template>
  <div>
    <!-- <nav-bar class="home-bar"><div class="center" slot="center">首页</div></nav-bar> -->
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
  // import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'

  import {getMultidata} from 'network/home'

  export default {
    name: 'home',
    components: {
      // NavBar,
      HomeSwiper
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getMultidata().then(res => {
        this.banners = res.banner.list
        this.recommends = res.recommend.list
        console.log(this.banners)
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