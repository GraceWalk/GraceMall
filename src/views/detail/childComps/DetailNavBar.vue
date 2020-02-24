<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick"> 
      <img src="~assets/img/common/back.svg" alt="" class="back-img">
    </div>
    <div slot="center" class="center">
      <div class="info" 
        v-for="(info, key) in navBarInfo" 
        :key="key"
        :class="{active: key === currentTag}"
        @click="tagClick(key)"
        >
        {{ info }}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        navBarInfo: ['商品', '参数', '评论', '推荐'],
        currentTag: 0
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      tagClick(tag) {
        this.currentTag = tag
        this.$emit('switchTag', this.currentTag)
      }
    }
  }
</script>

<style scoped>
.center {
  display: flex;
}
.center .info {
  flex: 1;
}
.back {
  width: 100%;
  height: 100%;
}
.back-img {
  width: 20px;
  height: 20px;
  margin-top: 12px;
}
.active {
  color: var(--color-high-text)
}
</style>