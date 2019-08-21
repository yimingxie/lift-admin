<template>
  <div>
    <h1>测试</h1>
    <div>
      <monitor @selectedMoniObj="getCompMoniObj" :parentMoniObj="testMoObj"></monitor>

    </div>

  </div>
</template>

<script>
// import DetDetailChartComp from './DetDetailChartComp'
import Monitor from '../../components/Monitor'
export default {
  data() {
    return {
      testMoObj: []
    }
  },
  mounted() {
    this.getCompMoniObj()
    setTimeout(() => {
      this.testMoObj = [0, 1, 0]
    }, 2000)

  },
  methods: {
    getCompMoniObj(val) {
      console.log('父组件', val)
    }

  },
  components: {
    'monitor': Monitor

  }
}
</script>

<style scoped>

</style>
