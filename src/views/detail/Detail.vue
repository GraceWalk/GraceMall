<template>
  <div>
    <detail-nav-bar/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'

  import {getDetailData} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar
    },
    data() {
      return {
        iid: ''
      }
    },
    created() {
      this.iid = this.$route.query.iid
      getDetailData(this.iid).then(res => {
        console.log(res.data)
      })
    }
  }
</script>

<style scoped>

</style>