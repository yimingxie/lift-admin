<template>
  <div id="DetTestC2">
    <h2>DetTestC2</h2>

  </div>
</template>

<script>
export default {
  props: ['num'],
  data() {
    return {
      timer: null,
      numChild: this.num,

    }
  },
  mounted() {
    const that = this
    this.timer = setInterval(function() {
      console.log('c2')
      console.log(that.numChild)
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

  },
  // watch: {
  //   num(newVal) {
  //     console.log('ggggggggggg')
  //     this.numChild = newVal;
  //   }
  // },
}
</script>

<style scoped>

</style>
