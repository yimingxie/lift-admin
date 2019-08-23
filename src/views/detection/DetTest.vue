<template>
  <div>
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
            <input id='tipinput' type="text">
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
          that.special.lng = e.lnglat.lng
          that.special.lat = e.lnglat.lat
        });

      }
    


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

<style scoped>

</style>
