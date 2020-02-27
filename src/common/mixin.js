import BackTop from 'components/content/backTop/BackTop'

export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    showBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    },
    backTop() {
      this.$refs.scrollComp.scrollTo(0, 0)
    }
  }
}