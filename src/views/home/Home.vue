<template>
  <div class="home">
    <nav-bar class="home-bar"><div class="center" slot="center">首页</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
      class="switch-bar"
      @tabClick="switchGoods"
      ref="tabControl1"
      v-show="isfixedSwiperShow"
    />
    <scroll class="content"
        ref="scrollComp"
        :probe-type="3"
        :pullUpload="true"
        @scroll="contentScroll"
        @pullingUp="loadMore">
      <home-swiper :banners="banners" @imgLoad="getOffSetTop" />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="switchGoods"
        ref="tabControl2"
      />
      <goods-list :goods="goods[currentType].list"/>
    </scroll>

    <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getMultidata, getGoodsData} from 'network/home'
  import {debounce} from 'common/utils'

  export default {
    name: 'home',
    components: {
      NavBar,
      Scroll,

      TabControl,
      GoodsList,
      BackTop,

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
        currentType: 'pop',
        isShowBackTop: false,
        nowScrollHeight: 0,
        swiperOffSetTop: 0,
        isfixedSwiperShow: false
      }
    },
    created() {
      this.getMultidata()
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')
    },
    mounted() {
      //图片加载后完成pullUp以及refresh()
      const finishPullUp = debounce(this.$refs.scrollComp.finishPullUp, 200)
      this.$bus.$on('imgLoad', () => {
        finishPullUp()
      })
      //
    },
    activated() {
      if (this.$refs.scrollComp) {
        this.$refs.scrollComp.scroll.scrollTo(0, this.nowScrollHeight, 0)
        this.$refs.scrollComp.scroll.y = this.nowScrollHeight
        this.$refs.scrollComp.scroll.refresh()
      }
     
    },
    deactivated() {
      this.nowScrollHeight = this.$refs.scrollComp.scroll.y
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
        //两个tab-control保持同步
        this.$refs.tabControl1.currentKey = key
        this.$refs.tabControl2.currentKey = key
        //切换商品信息currentKey
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
      },
      backTop() {
        this.$refs.scrollComp.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
        this.isfixedSwiperShow = -position.y > this.swiperOffSetTop

      },
      getOffSetTop() {
        this.swiperOffSetTop = this.$refs.tabControl2.$el.offsetTop
      },

      loadMore() {
        this.getGoodsData(this.currentType)
      }
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
  }
  .home .home-bar {
    background-color: var(--color-tint)
  }
  .home .switch-bar {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .home .home-bar .center {
    color: white
  }
  .home .content {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 49px;
    left: 0;
    overflow: hidden;
  }
  .home .back-top {
    position: absolute;
    right: 8px;
    bottom: 55px;
  }
</style>