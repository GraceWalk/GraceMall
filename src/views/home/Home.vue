<template>
  <div class="home">
    <nav-bar class="home-bar"><div class="center" slot="center">首页</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-sticky" :titles="['流行', '新款', '精选']"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getMultidata, getGoodsData} from 'network/home'

  export default {
    name: 'home',
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        }
      }
    },
    created() {
      this.getMultidata()
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')
    },
    methods: {
      getMultidata() {
        getMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getGoodsData(type) {
        const page = ++this.goods[type].page
        getGoodsData(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
        })
      }
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
.tab-sticky {
  position: sticky;
  top: 44px;
}
</style>