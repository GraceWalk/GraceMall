<template>
  <div>
    <detail-nav-bar class="nav-bar"/>
    <scroll class="detail-wrapper">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :baseInfo="baseInfo"/> 
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'

  import {getDetailData, BaseData} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: '',
        topImages: [],
        baseInfo: {}
      }
    },
    created() {
      this.iid = this.$route.query.iid
      getDetailData(this.iid).then(res => {
        const data = res.data.result
        console.log(data)
        //获取商品轮播图
        this.topImages = data.itemInfo.topImages
        this.baseInfo =  new BaseData(data.itemInfo, data.columns, data.shopInfo.services)
        console.log(this.baseInfo)
      })
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