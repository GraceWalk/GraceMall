<template>
  <div class="tab-control">
    <div class="tab-control-item" 
    v-for="(item, key) in titles" :key="key" 
    :class="{active: key === currentKey}"
    @click="setCurrentKey(key)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentKey: 0
      }
    },
    methods: {
      setCurrentKey(key) {
        this.currentKey = key
        this.$emit('tabClick', key)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    width: 100vw;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text)
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text)
  }
</style>