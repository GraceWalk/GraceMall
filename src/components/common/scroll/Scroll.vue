<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number
      },
      pullUpload: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpload
      })

      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          if (this.$route.path.indexOf('/home') !== -1) {
            this.$emit('homeScroll', position)
          } else if (this.$route.path.indexOf('/detail') !== -1) {
            this.$emit('detailScroll', position)
          }
          
        })
      }

      this.scroll && this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.refresh()
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    }
  }
  
</script>

<style scoped>

</style>