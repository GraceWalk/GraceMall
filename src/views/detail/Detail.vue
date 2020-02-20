<template>
  <div>
    商品信息
  </div>
</template>

<script>
  import {getDetailData} from 'network/detail'

  export default {
    name: 'Detail',
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

<style>

</style>