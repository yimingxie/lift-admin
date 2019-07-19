<template>
  <div id="DetTestC1">
    <h2>DetTestC1</h2>

  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null

    }
  },
  mounted() {
    this.timer = setInterval(function() {
      console.log('c1')
    }, 1000)

  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>

</style>
