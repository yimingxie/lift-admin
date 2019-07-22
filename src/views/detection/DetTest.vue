<template>
  <div id="DetTest" class="clearfix">
    <div class="list">
      <h1>test</h1>
      <button @click="change">切换</button>

    </div>

    <div class="list-right">
      <component :is="currentComponent" :num="num"></component>

      <!-- <div v-if="currentComponent=='DetTestC2'">
        <DetTestC2 :num="num"></DetTestC2>
      </div>
      <div v-else>
        <DetTestC1></DetTestC1>


      </div> -->





    </div>


  </div>
</template>

<script>
import DetTestC1 from './DetTestC1'
import DetTestC2 from './DetTestC2'
export default {
  data() {
    return {
      currentComponent: 'DetTestC2',
      num: 'pppppppppppp',
    }
  },
  mounted() {

  },
  methods: {
    change() {
      if (this.currentComponent == 'DetTestC2') {
        console.log(1111111111111)
        this.num = 'CCCCCCCCCC11111'
        this.currentComponent = 'DetTestC1'
      } else if (this.currentComponent == 'DetTestC1') {
        console.log(22222222222222)
        this.num = 'CCCCCCCCCC22222'
        this.currentComponent = 'DetTestC2'
      }
      
    }

  },
  components: {
    DetTestC1,
    DetTestC2,

  }
}
</script>

<style lang="stylus" scoped>
#DetTest{
  .list{
    float: left;
    width: 200px;
    height: 300px;
    background: yellow;
  }
  .list-right{
    float left
    width: 200px;
    height: 300px;
    background: red;
  }

}

</style>
