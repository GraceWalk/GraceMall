<template>
  <div>
    <detail-nav-bar class="nav-bar"/>
    <scroll class="detail-wrapper" ref="showComp">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :baseInfo="baseInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-show-info :show="detailInfo" @imgLoad="refresh"/>
      <detail-params-info :params="itemParams"/>
    </scroll>
  </div>
</template>

<script>
  import {debounce} from 'common/utils'
  import Scroll from 'components/common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailShowInfo from './childComps/DetailShowInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'

  import {getDetailData, BaseData} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailShowInfo,
      DetailParamsInfo
    },
    data() {
      return {
        iid: '',
        topImages: [],
        baseInfo: {},
        shopInfo: {},
        detailInfo: {},
        imgRefresh: '',
        itemParams: {}
      }
    },
    created() {
      this.iid = this.$route.query.iid
      getDetailData(this.iid).then(res => {
        const data = res.data.result
        console.log(data)
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
      })
    },
    mounted() {
      this.imgRefresh = debounce(this.$refs.showComp.refresh, 100)
    },
    methods: {
      refresh() {
        this.imgRefresh()
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
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
}
</style>