<template>
  <div id="regMap" class="main-wrap">
    <div class="row" >
      <div class="panel" style="padding:0">
        <div class="regionArea">
          <el-cascader :filterable="true" class="regionPicker" :options="options" v-model="form.selectedOptions" @change="handleChange" :show-all-levels="false"></el-cascader>
          <el-select v-model="value" placeholder="请选择" class="regionPicker" >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <radio-group :items="periods" :value.sync="period" ><span slot="label">处理进度：</span></radio-group>
          <span class="today">
            <span class="todayHandled" @click="vvv(233)">今日已处理 ：13</span>
            <!-- <div class="search1" style="margin:15px 16px 0 0">
              <input class="search_input" placeholder="电梯名称/注册代码" />
              <span class="search_btn"></span>
            </div> -->
            <search-input v-model="searchKey" style="margin:15px 16px 0 0">
              <span slot="btn" class="search_btn"></span>
            </search-input>
            
          </span>
        </div>
        <!-- 使用自定义组件 -->
        <!-- <Loading></Loading> -->
        <div id="container" ></div>
        
        <!-- <tab></tab> -->
        <div class="searchArea">
          <div class="circleType">
            <i class="circle"></i><span @click="selectExceptionType(0)" :class="{'active': 0 === exceptionType}">全部异常&nbsp;&nbsp;20&nbsp;</span>
            <i class="circle" style="background:#9ACF63" ></i><span @click="selectExceptionType(1)" :class="{'active': 1 === exceptionType}">预警&nbsp;&nbsp;(10)&nbsp;</span>
            <i class="circle" style="background:#E9CB5D"></i><span @click="selectExceptionType(2)" :class="{'active': 2 === exceptionType}">违规&nbsp;&nbsp;(5)&nbsp;</span>
            <i class="circle" style="background:#FF980B"></i><span @click="selectExceptionType(3)" :class="{'active': 3 === exceptionType}">故障&nbsp;&nbsp;(2)&nbsp;</span>
            <i class="circle" style="background:#E13429"></i><span @click="selectExceptionType(4)" :class="{'active': 4 === exceptionType}">事件&nbsp;&nbsp;({{exceptionType}})&nbsp;</span>
          </div>
        </div>
        <!-- <div class="input-item" style="position:absolute;bottom:5px">
          <input id="addOverlayGroup" type="button" class="btn" value="添加覆盖物群组"/>
          <input id="removeOverlayGroup" type="button" class="btn" value="移除覆盖物群组"/>
        </div>
        <div class="input-card" style="width:24rem;">
          <h4 style="color: #b24949">设置地图当前行政区</h4>
          <div class="input-item">
            <input id='city-name' placeholder="深圳市" type="text" style="margin-right:1rem;">
            <button class="btn" id="query">去指定城市</button>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <el-button @click="show3 = !show3">Click Me</el-button>
    <div>
      

      <div style="margin-top: 20px; ">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">el-collapse-transition</div>
            <div class="transition-box">el-collapse-transition</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <el-button @click="show3 = !show3">Click Me</el-button> -->

  </div>
</template>

<script>
  import AMapUI from 'AMapUI'
  import Vue from 'vue'
  import { mapState, mapGetters, mapActions  } from 'vuex'
  import RadioGroup from "../../components/RadioGroup";
  import SearchInput from "../../components/SearchInput";
  // import tab from "../../components/tab";
  let pcas = require("../../utils/citySelector/pcas-code.json")
  var $this = this    // 当前组件对象
  // 生成html 和 时间
  var MyComponent = Vue.extend({
      template: `
      <div>
       <el-collapse-transition>
       
        <tab :activeIndex.sync="activeIndex">
          <div slot="first"><div>基本11信息{{id}}</div></div>
          <div slot="second"><div>事件{{id}}</div></div>
          <div slot="third"><div>故障{{id}}</div></div>
          <div slot="fourth"><div>违规{{id}}</div></div>
          <div slot="fifth"><div>预警{{id}}</div></div>
        </tab>
       
      </el-collapse-transition>
       </div>
        `,
      data() {
        return {
          activeIndex: 0,
          id:''
        }
      },
      watch:{
        id(){
          console.log('id：：：' + this.id)
          this.activeIndex = 0
          // console.log("activeIndex==" + this.activeIndex)
        }
      },
      mounted:function(){
        // console.log('$this=' + JSON.stringify($this))
        // this.$emit("vvv", "1")
      },
      
      methods:{
        handleClick(tab, event) {
          // console.log(tab, event);
        },
        hello:function() {
          console.log('$this=' + JSON.stringify($this))
          //点击事件 使用 组件对象
        }
      }
  })
  var infoWindowComponent= new MyComponent().$mount();
  export default {
    data() {
      return {
        show3: true,
        searchKey:'',
        exceptionType:0,
        periods: [
          { label: '全部', value: 1 },
          { label: '待诊断', value: 7 },
          { label: '已派单', value: 30 },
          { label: '作业中', value: 365 }
        ],
        period:1,
        options: [],
        form: {
          city : '',
          area : '',
          minarea : '',
          selectedOptions: ["44","4403"],//地区筛选数组
        },
        map:'',
        today:'',
        input:'',
        options1: [
          {
          value: '1',
          label: '今天'
          }, {
            value: '0',
            label: '昨天'
          }, {
            value: '3',
            label: '过去三天'
        }],
        value: '1'
      }
    },
    components: {
      'radio-group': RadioGroup,
      'search-input': SearchInput,
      // 'tab': tab,
    },
    mounted() {
      // this.$message("warning")
      $this = this
      this.getToday()     // 获取当前日期
      // 区域选择 省-市数据
      for(var y in pcas){
        // this.options[y].code = pcas[y].code
        var row = {}
        row.value = pcas[y].code
        row.label = pcas[y].name
        row.children = []
        this.options.push(row)
        // this.options[y].name = pcas[y].name
        for(var z in pcas[y].children){
          var child = {}
          child.value = pcas[y].children[z].code;
          child.label = pcas[y].children[z].name;
          // console.log('abc' + JSON.stringify(child))
          this.options[y].children.push(child);
          // this.options[y].children[z].name = pcas[y].children[z].name
          // this.options[y].children[z].code = pcas[y].children[z].code
          // console.log('abc' + JSON.stringify(this.options))
          // console.log('aaa' + JSON.stringify(this.options[y].children[z]))
          // console.log('zzz---' + z);
        }
      }
      // 区域选择 省-市数据 end 

      ///////////////////////////////


      var _this = this
      this.map = new AMap.Map('container', {
        // resizeEnable: true,
        center: [114.053267,22.520914],
        // mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
        zoom: 20, //设置地图的缩放级别
        features: ['bg', 'road', 'building', 'point'],
        // showLabel: false //不显示地图文字标记
      });
      _this.map.on('click', function(e) {
        _this.map.clearInfoWindow( )
      });
      // AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView',"AMap.MapType"],function(){
      //   var aaa = new AMap.ToolBar({
      //     // offset:AMap.Pixel(200,100)
      //     offset: new AMap.Pixel(0, 40),
      //   })
      //   _this.map.addControl(aaa);
      //   // aaa.zoomchanged()
      //   _this.map.addControl(new AMap.MapType({
      //     // position:{top:"150px",right:"100px"}
      //     defaultType:0 //使用2D地图
      //   }));
      //   _this.map.addControl(new AMap.OverView({
      //     isOpen: true,
      //   }));
      // })
      //根据cityname、adcode、citycode设置地图位置
      function gotoCity() {
        var val = document.querySelector('#city-name').value; //可以是cityname、adcode、citycode
        if (!val) {
          val = "深圳市";
        }
        _this.map.setCity(val.trim());
        // log.info(`已跳转至${val}`);
      }

      //绑定查询点击、回车事件
      // document.querySelector('#query').onclick = gotoCity;
      // document.querySelector('#city-name').onkeydown = function(e) {
      //   if (e.keyCode === 13) {
      //     gotoCity();
      //     return false;
      //   }
      //   return true;
      // };
      
      var markers = []; //markers数组，用于接多个图标点
      var shadowMarkers = [];
      var infoContent = "<tab></tab>"
      var infoWindow = new AMap.InfoWindow({
          isCustom: true,  // 使用自定义窗体
          autoMove: true, // 是否自动调整窗体到视野内
          content: infoWindowComponent.$el,
          offset: new AMap.Pixel(20, -20),
          anchor: 'top-left', // 设置锚点方位
          // closeWhenClickMap:true //点击地图关闭
          
      });
      
      funcreateMakers()
      //创建地图图标方法
      function funcreateMakers() {
        //创建地图图标方法
        // 添加makers
        
        infoWindow.close()
        
        infoWindow.on('close', function(event) {
          aaa() // 重新绘制makers
        });

        _this.map.clearMap();
        
        // 请求数据接口
        var lnglats = [
          {
            id: 1,
            lat_lon:[114.053267,22.520914],
            diagn_code : 1,
				    status : 0
          }, {
            id: 2,
            lat_lon:[114.052867,22.520914],
            diagn_code : 1,
				    status : 0
          }, {
            id: 3,
            lat_lon:[114.053167,22.521084],
            diagn_code : 0,
				    status : 0
          }, {
            id: 4,
            lat_lon:[114.052967,22.521084],
            diagn_code : 0,
				    status : 0
          }, {
            id: 5,
            lat_lon:[114.053167,22.520744],
            diagn_code : 0,
				    status : 0
          }, {
            id: 6,
            lat_lon:[114.052967,22.520744],
            diagn_code : 0,
				    status : 0
        }]

        // '<div class="custom-content-marker">' +
        //   '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
        //   '   <div class="close-btn" onclick="clearMarker(' + i +')">X</div>' +
        //   '</div>';

        // 绘制makers
        function aaa(){
          // 清空地图上所有maker
          _this.map.remove(markers);
          _this.map.remove(shadowMarkers);
          markers = []
          shadowMarkers = [];  

          for (var i = 0, marker; i < lnglats.length; i++) { // 故障检修
            if(lnglats[i].diagn_code === 1){
              var markerContent = '<span class="huanPic huanPicYe">'
              
            } else {
              var markerContent = '<span class="huanPic huanPicPu">' 
            }
            
            var marker = new AMap.Marker({
              content: markerContent,  // 自定义点标记覆盖物内容
              position:  lnglats[i].lat_lon, // 基点位置
              // offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
              offset: new AMap.Pixel(1,4), // 设置点标记偏移量
              anchor:'center', // 设置锚点方位
              zIndex: 2,
              topWhenClick: true
            });
            var shadowMarker =
              '<div class="shadowMarker">' +
              '</div>';
            var shadowMarker = new AMap.Marker({
              content: shadowMarker,  // 自定义点标记覆盖物内容
              position:  lnglats[i].lat_lon, // 基点位置
              // offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
              offset: new AMap.Pixel(1,18), // 设置点标记偏移量
              anchor:'center', // 设置锚点方位
              zIndex: 1
            });
            var circleMarker = new AMap.CircleMarker({
              center:lnglats[i].lat_lon,
              radius:20,//3D视图下，CircleMarker半径不要超过64px
              strokeColor:'#f56c6c',
              strokeWeight:5,
              strokeOpacity:1,
              fillColor:'rgba(0,0,255,0)',
              fillOpacity:0.5,
              zIndex:10,
              bubble:true,
              cursor:'pointer',
              clickable: true
            })
            // 赋值，传值
            marker.id = lnglats[i].id
            marker.name = lnglats[i].name
            marker.diagn_code = lnglats[i].diagn_code

            //鼠标点击marker弹出自定义的信息窗体
            // marker.on('click', markerClick);
            AMap.event.addListener(marker, 'click', markerClick);

            // _this.map.add(circleMarker)
            markers.push(marker);
            shadowMarkers.push(shadowMarker);
            _this.map.add(markers);
            _this.map.add(shadowMarkers);
          }
        }
        aaa()
        function clearMarker(index){
          this.markers[index].setMap(null);
          this.markers.splice(index, 1)
        }
        function markerClick(e) {
          // console.log("aaa" + markers.length)
          
         
          // _this.markers.setMap(null);
          // console.log("markers==" + markers)
          
          aaa()  // 重新绘制makers

          
          for (var i = 0, marker; i < lnglats.length; i++) {
            // markers[i].setMap(null);
            var orContent = markers[i].getContent()
            if(markers[i].id === e.target.id){
              
              // console.log("aaa" + orContent)
              var markerContent = '' +
              '<div class="custom-content-marker">' +
                orContent +
              '</div>';
              // console.log("aaa" + markerContent)
              markers[i].setzIndex(3)
            } else {
              var markerContent = orContent
            }
            //  else if (markers[i].id === e.target.id && lnglats[i].diagn_code !== 1){
            //   var markerContent = '' +
            //   '<div class="custom-content-marker">' +
            //   '   <span class="huanPicPu bigger">' +
            //   '</div>';
            // }
            markers[i].setContent(markerContent)
            
          }
          console.log(e.target.id)
          
          infoWindow.close()
          infoWindowComponent.$data.id = e.target.id
          infoWindowComponent.$data.diagn_code = e.target.diagn_code
          if(e.target.getPosition){
            infoWindow.open(_this.map, e.target.getPosition());
          } else {
            infoWindow.open(_this.map, e.target.getCenter());
          }
        }


        // -----------------------分隔线--- 添加覆盖物群组---------------------------------
        // 已完成异常 小窗口
        var markers1 = [];

        for (var i = 0; i < lnglats.length; i++) {
            // var lnglat = lnglats[i];
            // 创建点实例
            var marker = new AMap.Marker({
                // position: new AMap.LngLat(lnglat[0], lnglat[1]),
                position: lnglats[i].lat_lon,
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
                extData: {
                  id: i + 1
                }
            });

            markers1.push(marker);
        }
        // 创建覆盖物群组，并将 marker 传给 OverlayGroup
        // var overlayGroups = new AMap.OverlayGroup(markers1);
        // // 添加覆盖物群组
        // function addOverlayGroup() {

        //   _this.map.add(overlayGroups);
        // }

        // // 移除覆盖物群组
        // function removeOverlayGroup() {

        //   _this.map.remove(overlayGroups);
        // }
        // // 绑定事件
        // document.getElementById("addOverlayGroup").onclick = addOverlayGroup;
        // document.getElementById("removeOverlayGroup").onclick = removeOverlayGroup;

          
      }
      

      /////////////////////////////////////
    },
    methods: {
      vvv(index){
        console.log("aaa=" + index)
      },
      selectExceptionType(type){
        this.exceptionType = type
      },
     
      getToday(){
        var myDate = new Date();
        myDate.getYear();        //获取当前年份(2位)
        var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
        var date = myDate.getDate();        //获取当前日(1-31)
        this.today = year + '-' + month + '-' + date
      },
      // 切换地区选择器
      handleChange(value){
        console.log("11111:::"+ value)
        this.form.city = this.myAddressCity(this.form.selectedOptions[0])
        // this.form.city = this.form.selectedOptions[0];
        this.form.area = this.myAddressarea(this.form.selectedOptions[1])
        this.form.minarea = this.myAddressMinarea(this.form.selectedOptions[2])
        console.log('ddddd=====' + JSON.stringify(this.form))
        if (!this.form.area) {
          this.form.area = "深圳市";
        }
        this.map.setCity(this.form.area.trim());

      },
      myAddressCity:function(value){
        for(var y in pcas){
          if(pcas[y].code == value){
            return value = pcas[y].name
          }
        }
      },
      myAddressarea:function(value){
        for(var y in pcas){
          for(var z in pcas[y].children){
            if(pcas[y].children[z].code == value && value!=undefined){
              return value = pcas[y].children[z].name;
            }
          }
        }
      },
      myAddressMinarea:function(value){
        for(var y in pcas){
          for(var z in pcas[y].children){
            for(var i in pcas[y].children[z].children){
              if(pcas[y].children[z].children[i].code == value && value!=undefined){
                return value = pcas[y].children[z].children[i].name
              }
            }
          }
        }
      },
    }
    
  }
</script>
<style lang="stylus">
@import '../../assets/stylus/utilities'
@import '../../assets/stylus/colors'
#regMap 
  #container 
    width: 100%;
    margin: 0px;
    height: 620px;
    border-radius: 0 0 10px 10px
   
  
  p.my-desc 
    margin: 5px 0;
    line-height: 150%;
  
  .input-card 
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: .25rem;
    width: 22rem;
    border-width: 0;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.75rem 1.25rem;
  
  .infoWindows 
    background: #000
  
  /* ////////////////////////////////////////////////////// */
  .callapce
    // padding:20px;
    // border:1px solid #ebeef5;
    border-radius:4px;
    --down-lh:48px; 
    --img-down:12px;
  
  .collapse-item
    background-color: #fff;
    color: #303133;
    font-size: 13px;
    text-align: justify;
  
  // .collapse-item:first-child
  //   border-top: 1px solid #ebeef5;
  
  .item-hd
    position:relative;
    height: var(--down-lh);
    line-height: var(--down-lh);
    cursor: pointer;
    padding 5px 20px
    color #fff
    font-size 16px

  
  .item-hd .infoWTitle
    display:inline-block;
  
  .item-hd .collapse-down
    float: right;
    display:inline-block;
    margin-right: 8px;
  
  .item-hd .downImg
    width:var(--img-down);
    height:var(--img-down);
    vertical-align: middle;
    transform:rotate(-90deg);
    transition: all .3s linear;
  
  .item-hd .downImg.rotate
    transform: rotate(0);
  
  .item-mn
    overflow:hidden;
    max-height: 0;
    box-sizing: border-box;
    font-size: 13px;
    color: #303133;
    /* transition: all .3s ease-in-out; */
    transition: all .3s linear;
    background: #ddacac;
  
  .show
    /* 这里max-height设置一个足够大的数，但不能太大 */
    transition-timing-function: linear;
    max-height:200px;
    padding-bottom: 20px;
  .regionArea
    // absolute top 10px left 20px
    position relative
    z-index 99
    // size 100% 50px
    border-radius: 10px 10px 0 0
    width 100%
    background white
    vertical-align middle
    -webkit-box-shadow: 0 2px 6px 0 rgba(114,124,245,0.5);
    box-shadow: 0 2px 6px 0 rgba(114,124,245,0.5);
    .regionPicker
      width 122px
      margin 10px
    .today
      color #000
      font-size 14px
      absolute right 20px
  .searchArea
    absolute top 60px
    width 100%
    padding 10px 20px
    box-sizing border-box
    font-size 0
    #searchLift_input
      width: 257px;
      height: 38px
      padding-left 10px
      box-shadow: 0 2px 6px 0 rgba(114,124,245,0.5);
    #searchLift
      size 60px 40px
      background #3370ff
      color #ffffff
      font-size 16px
      box-shadow: 0 2px 6px 0 rgba(114,124,245,0.5);
      &:hover 
        cursor pointer
    .circleType
      absolute top 22px left 20px
      font-size 14px
      .circle
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        background: #4272FF;
        margin-right: 5px;
        box-shadow: 0 2px 6px 0 rgba(114,124,245,0.5);
      span 
        margin-right 20px
        cursor pointer
        &.active
          color blue
  
  .todayHandled
    float right
    border: 1px solid #D8DDDF;
    border-radius: 8px
    margin 15px 6px 0 0
    padding 4.5px 16px


// ==============================
.custom-content-marker {
    
    .huanPic{
      size 66px 65px 
      &:hover {
        transform scale(1)
      }
    }
    // position: relative;
    // width: 40px;
    // size: 55px;
    // transition: transform .2s;
    // -moz-transition: transform .2s; /* Firefox 4 */
    // -webkit-transition: transform .2s; /* Safari 和 Chrome */
    // -o-transition: transform .2s; /* Opera */ 

    // -webkit-animation-timing-function: ease-in-out;
    // -webkit-animation-name: myfirst03;
    // -webkit-animation-duration: 1500ms;
    // -webkit-animation-iteration-count: infinite;
    // -webkit-animation-direction: alternate;
}
// .custom-content-marker1{
//   position: relative;
//   width: 50px;
//   height: 50px;
// }
// .custom-content-marker:hover{
//   transform scale(1.2)
// }
// .custom-content-marker img {
//     width: 100%;
//     height: 100%;
// }

// .custom-content-marker .close-btn {
//     position: absolute;
//     top: -6px;
//     right: -8px;
//     width: 15px;
//     height: 15px;
//     font-size: 12px;
//     background: #ccc;
//     border-radius: 50%;
//     color: #fff;
//     text-align: center;
//     line-height: 15px;
//     box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
// }

// .custom-content-marker .close-btn:hover{
//     background: #666;
// }
.huanPic{
  display inline-block
  size 40px 35px
  &:hover {
    transform scale(1.2)
  }
}
.huanPicYe{
  background url("../../assets/images/hs/12.png") no-repeat 
  background-size:100% auto; 
}
.huanPicPu{
  background url("../../assets/images/hs/13.png") no-repeat
  background-size:100% auto;
}
.bigger{
  transform scale(1.5)
}
.shadowMarker{
  size 22px 5px
  // -moz-box-shadow:4px 0px 20px #333333; -webkit-box-shadow:4px 0px 20px #333333; box-shadow:4px 0px 20px #333333;
  // background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  // background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  // background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  // background: linear-gradient(to right, red , blue); /* 标准的语法（必须放在最后） */
  //  background: darkgrey

  // border:2px solid darkslategray;

  // box-shadow: darkgrey 0px 0px 30px 7px ;//边框阴影
  background: -webkit-radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* Firefox 3.6 - 15 */
  background: radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* 标准的语法（必须放在最后） */
}
@keyframes myfirst03{
    0% {
        opacity: .4;
    }

    100% {
        opacity: 1;
    }
        
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>





