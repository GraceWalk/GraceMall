<template>
  <div>
    <detail-nav-bar class="nav-bar"/>
    <detail-swiper :topImages="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

  import {getDetailData} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: '',
        topImages: []
      }
    },
    created() {
      this.iid = this.$route.query.iid
      getDetailData(this.iid).then(res => {
        const data = res.data.result
        this.topImages = data.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>
.nav-bar {
  z-index: 2;
  background-color: #fff;
}
</style>