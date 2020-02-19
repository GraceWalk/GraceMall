<template>
  <div class="home">
    <nav-bar class="home-bar"><div class="center" slot="center">首页</div></nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-sticky" 
        :titles="['流行', '新款', '精选']"
        @tabClick="switchGoods"
      />
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getMultidata, getGoodsData} from 'network/home'

  export default {
    name: 'home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
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
        },
        currentType: 'pop'
      }
    },
    created() {
      this.getMultidata()
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')
    },
    methods: {
      // 从服务器读取数据
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
      },

      // 点击事件
      switchGoods(key) {
        switch(key) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      }
    }
  }
</script>

<style scoped>
.home {
  height: 100vh;
}
.home-bar {
  background-color: var(--color-tint)
}
.home-bar .center {
  color: white
}
.tab-sticky {
  z-index: 1;
  position: sticky;
  top: 44px;
}
.content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
}
</style>