<template>
  <div id="DetTest" class="clearfix">
    <!-- <div class="list">
      <h1>test</h1>
      <button @click="change">切换</button>

    </div>

    <div class="list-right">
      <component :is="currentComponent" :num="num"></component>

    </div> -->

    <div>
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>

    <div>
      <div id="main2" style="width: 600px;height:400px;"></div>
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
    this.drawChart({
      container: 'main',
      name: '名字1',
      data: [5, 20, 36, 10, 10, 20]
    })

    this.drawChart({
      container: 'main2',
      name: '名字2',
      data: [100, 300, 900, 200, 900, 1200]
    })

    

  },
  methods: {
    drawChart(obj) {
 
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(`${obj.container}`));

      // 指定图表的配置项和数据
      var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: `${obj.name}`,
              type: 'bar',
              // data: [5, 20, 36, 10, 10, 20]
              data: obj.data
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    },
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
