<template>
  <div class="cart">
    <nav-bar><div class="center" slot="center">购物车({{$store.state.details.length}})</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'cart',
    components: {
      NavBar
    }
  }
</script>

<style scoped>
.cart {
  height: 100vh;
}
</style>