<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .nav-bar .left, .nav-bar .right {
    width: 60px;
  }
  .nav-bar .center {
    flex: 1
  }
</style>