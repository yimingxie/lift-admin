<template>
  <div id="DetTest">
    <h1>测试</h1>
    <div>
      <monitor @selectedMoniObj="getCompMoniObj" :parentMoniObj="testMoObj"></monitor>

    </div>

    <div>
      <div id="container" style="height: 300px;width: 1000px;"></div>
      <div class="info">
          <div class="input-item">
            <div class="input-item-prepend">
              <span class="input-item-text" style="width:8rem;">请输入关键字</span>
            </div>
            <input id='tipinput' type="text" autocomplete="off">
          </div>
      </div>
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

    function addMarker(lng, lat) {
        // 创建覆盖物
        marker = new AMap.Marker({
          map: map,
          // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          content: 
          `
          <div class="point">
            <div class="point-light"></div>
            <div class="point-circle"></div>
          </div>
          `
          ,
          position: [lng, lat],
          draggable: true
        });

        marker.setMap(map)

        // 拖拽
        marker.on('dragging', function (e) {
          this.special.lng = e.lnglat.lng
          this.special.lat = e.lnglat.lat
        });

      }
    

    var marker;
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    //输入提示
    var auto = new AMap.Autocomplete({
      input: "tipinput"
    });
    AMap.event.addListener(auto, 'select', function(e){
      //TODO 针对选中的poi实现自己的功能
      console.log('e', e)
      map.setZoomAndCenter(20, [e.poi.location.lng, e.poi.location.lat]); //设置地图中心点
      addMarker(e.poi.location.lng, e.poi.location.lat)
      // placeSearch.search(e.poi.name)
    })

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

<style>
  
/* 地图marker样式 */
#DetTest .point{
  position: relative;
  width: 48px;
  height: 48px;
  margin-left: -16px;
  margin-top: -24px;
}
#DetTest .point-light{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #4272FF;
  opacity: 0.5;
  border-radius: 100%;
  animation: myScale 1.5s infinite forwards;
}
#DetTest .point-circle{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #4272FF;
  border-radius: 100%;
}

@keyframes myScale{
  0% {opacity: 0.8;transform: scale(0.1);}
  100% {opacity: 0;transform: scale(1);}
}
  
</style>

<style scoped>

</style>
