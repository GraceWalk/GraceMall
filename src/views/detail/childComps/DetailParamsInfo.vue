<template>
  <div class="params" v-if="Object.keys(params).length">
      <table class="rule">
        <tr v-for="(item, index) in params.rule.tables[0]" :key="index">
          <td v-for="(value, index) in item" :key="index">{{ value }}</td>
        </tr>
      </table>
      <table class="info">
        <tr v-for="(item, index) in params.info.set" :key="index">
          <td class="key">{{ item.key }}</td>
          <td class="value">{{ item.value }}</td>
        </tr>
      </table>
  </div>
</template>

<script>
  export default {
    name: 'DetailParamsInfo',
    props: {
      params: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .params {
    font-size: 14px;
    color: rgb(27, 27, 27);
    border-bottom: 5px solid #f2f5f8;
  }
  table {
    width: 90%;
    margin: 0 auto;
  }
  tr {
    display: block;
    width: 100%;
    padding: 7px 0;
    border-bottom: 1px solid rgb(218, 218, 218);
  }
  .rule td {
    width: 95px;
  }
  .rule tr:last-of-type {
    padding-bottom: 10px;
    border-bottom: 2px solid rgb(240, 240, 240);
  }
  .info  tr td:first-of-type {
    width: 80px;
  }
  .info tr td:last-of-type {
    color: var(--color-high-text)
  }
</style>