<template>
  <div>
    <detail-nav-bar class="nav-bar" @switchTag="toPosition" ref="navbarComp"/>
    <scroll class="detail-wrapper" ref="showComp" :probe-type="3" @detailScroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :baseInfo="baseInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-show-info :show="detailInfo" @imgLoad="refresh"/>
      <detail-params-info :params="itemParams" ref="paramsComp"/>
      <detail-comment-info :comment="commentInfo" ref="commentComp"/>
      <recommend-list :goods="recommendList" ref="recommendComp"/>
    </scroll>
    <detail-bottom-bar @cartClick="addToCart"/>
  </div>
</template>

<script>
  import {debounce} from 'common/utils'
  import Scroll from 'components/common/scroll/Scroll'
  import RecommendList from 'components/content/goodsList/GoodsList'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailShowInfo from './childComps/DetailShowInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetailData, getRecommend, BaseData} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      Scroll,
      RecommendList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailShowInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    data() {
      return {
        iid: '',
        topImages: [],
        baseInfo: {},
        shopInfo: {},
        detailInfo: {},
        imgRefresh: '',
        itemParams: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        themeTopYsFunc: '',
        currentTag: 0
      }
    },
    created() {
      this.iid = this.$route.query.iid
      getDetailData(this.iid).then(res => {
        const data = res.data.result
        //获取商品轮播图
        this.topImages = data.itemInfo.topImages
        //获取商品基础信息
        this.baseInfo =  new BaseData(data.itemInfo, data.columns, data.shopInfo.services)
        //获取商家信息
        this.shopInfo = data.shopInfo
        //获得商品展示信息
        this.detailInfo = data.detailInfo
        //获得商品参数信息
        this.itemParams = data.itemParams
        //获得商品用户评价信息
        this.commentInfo = data.rate.list[0]
      })
      //获取推荐数据
      getRecommend().then(res => {
        this.recommendList = res.data.data.list
      })

    },
    mounted() {
      this.imgRefresh = debounce(this.$refs.showComp.refresh, 100)
      this.themeTopYsFunc = debounce(this.getThemeTopYs, 100)
    },
    methods: {
      refresh() {
        this.imgRefresh()
        this.themeTopYsFunc()

      },
      getThemeTopYs() {
        this.themeTopYs = [0]
        this.themeTopYs.push(this.$refs.paramsComp.$el.offsetTop)
        this.themeTopYs.push(this.$refs.commentComp.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommendComp.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      toPosition(index) {
        this.$refs.showComp.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        const pArray = this.themeTopYs
        for (let i = 0; i < pArray.length - 1; i++) {
          if (this.currentTag !== i && (-position.y >= pArray[i] && -position.y < pArray[i + 1])) {
            this.currentTag = i
            this.$refs.navbarComp.currentTag = this.currentTag
          }
        }
      },
      addToCart() {
        const detail = {}
        detail.iid = this.iid
        detail.price = this.baseInfo.title
        detail.img = this.topImages[0]
        detail.desc = this.detailInfo.desc
        this.$store.commit('addToCart', detail)
      }
    }
  }
</script>

<style scoped>
.nav-bar {
  z-index: 3;
  background-color: #fff;
}
.detail-wrapper {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 44px;
  left: 0;
  z-index: 2;
  background-color: #fff;
}
</style>