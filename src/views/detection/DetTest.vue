<template>
  <div>
    <h1>测试</h1>
    <det-detail-chart-comp :codelist="list"></det-detail-chart-comp>

  </div>
</template>

<script>
import DetDetailChartComp from './DetDetailChartComp'
export default {
  data() {
    return {
      list:["0:0:0:1", "0:0:0:2"]

    }
  },
  mounted() {

  },
  methods: {

  },
  components: {
    'det-detail-chart-comp': DetDetailChartComp

  }
}
</script>

<style scoped>

</style>
