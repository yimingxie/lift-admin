<template>
  <div id="regMap" class="main-wrap">
    <div class="row" >
      <div class="panel" style="padding:0">
        <div class="regionArea">
          <el-cascader :filterable="true"  class="regionPicker" :options="options" v-model="form.selectedOptions" @change="handleChange" :show-all-levels="false"></el-cascader>
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
            <span class="todayHandled">今日已处理 ：13</span>
            <!-- <div class="search1" style="margin:15px 16px 0 0">
              <input class="search_input" placeholder="电梯名称/注册代码" />
              <span class="search_btn"></span>
            </div> -->
            <search-input v-model="searchKey" style="margin:15px 16px 0 0">
              <span slot="btn" class="search_btn"></span>
            </search-input>
            
          </span>
        </div>
        <div id="container" ></div>
        
        <div class="searchArea">
          <div class="circleType">
            <i class="circle"></i><span @click="selectExceptionType(0)" :class="{'active': 0 === exceptionType}">全部异常&nbsp;&nbsp;({{exceptionType}})&nbsp;</span>
            <i class="circle" style="background:#9ACF63" ></i><span @click="selectExceptionType(1)" :class="{'active': 1 === exceptionType}">预警&nbsp;&nbsp;({{exceptionType}})&nbsp;</span>
            <i class="circle" style="background:#E9CB5D"></i><span @click="selectExceptionType(2)" :class="{'active': 2 === exceptionType}">违规&nbsp;&nbsp;({{exceptionType}})&nbsp;</span>
            <i class="circle" style="background:#FF980B"></i><span @click="selectExceptionType(3)" :class="{'active': 3 === exceptionType}">故障&nbsp;&nbsp;({{exceptionType}})&nbsp;</span>
            <i class="circle" style="background:#E13429"></i><span @click="selectExceptionType(4)" :class="{'active': 4 === exceptionType}">事故&nbsp;&nbsp;({{exceptionType}})&nbsp;</span>
          </div>
        </div>
        <div class="input-item" style="position:absolute;bottom:5px">
          <input id="addOverlayGroup" type="button" class="btn" value="添加覆盖物群组"/>
          <input id="removeOverlayGroup" type="button" class="btn" value="移除覆盖物群组"/>
        </div>
        <div class="myfirst02" style="position:absolute;bottom:5px"></div>
        <div class="input-card" style="width:24rem;">
          <h4 style="color: #b24949">设置地图当前行政区</h4>
          <div class="input-item">
            <input id='city-name' placeholder="深圳市" type="text" style="margin-right:1rem;">
            <button class="btn" id="query">去指定城市</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import AMapUI from 'AMapUI'
  import Vue from 'vue'
  import { mapState, mapGetters, mapActions  } from 'vuex'
  import RadioGroup from "../../components/RadioGroup";
  import SearchInput from "../../components/SearchInput";
  let pcas = require("../../utils/citySelector/pcas-code.json")
  // 生成html 和 时间
  var MyComponent = Vue.extend({
      template: `<div class='callapce'>
      <div class='collapse-item'>
        <div class='item-hd' data-flag='0' @click="aaa(0)" style="background:#E9645D;box-shadow: rgba(169, 73, 68, 0.5) 0px 6px 10px 1px">
          <div class='infoWTitle' >困人事故</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn' style="background:#E9645D">
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </div>
      <div class='collapse-item' >
        <div class='item-hd' data-flag='1'  @click="aaa(1)" style="background:#FF980B;box-shadow: rgba(141, 91, 24, 0.5) 0px 6px 10px 1px">
          <div class='infoWTitle'>故障</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn' style="background:#FF980B">
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
        </div>
      </div>
      <div class='collapse-item' >
        <div class='item-hd' data-flag='2'  @click="aaa(2)" style="background:#FFC60B;box-shadow: rgba(143, 117, 33, 0.5) 0px 6px 10px 1px">
          <div class='infoWTitle'>违规</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn' style="background:#FFC60B">
          简化流程：设计简洁直观的操作流程；
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </div>
      <div class='collapse-item' >
        <div class='item-hd' data-flag='3'  @click="aaa(3)" style="background:#9ACF63;box-shadow: rgba(70, 120, 18,0.5) 0px 6px 10px 1px">
          <div class='infoWTitle'>预警</div>
          <div class='collapse-down'>
            <img src='down.png' class='downImg'>
          </div>
        </div>
        <div class='item-mn' style="background:#9ACF63">
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          
          <video src="/i/movie.ogg" controls="controls">
            your browser does not support the video tag
          </video>
        </div>
      </div>
      
    </div>`,
      data() {
          return {
              // <iframe src="http://www.w3school.com.cn/tags/tag_iframe.asp" width="620" height="200"></iframe>
          }
      },
      // created(){
          // Vue.nextTick(function () {
              
          // })
          // this.$nextTick(() => {
          //     // DOM 更新了
          //     console.log('type' + this.type)
          //     this.url = '/lift/gov/#/detail?id=' + this.type
          // })
      // },
      beforeCreate:function(){
          console.log("组件实例化之前执行的函数");
      },
      created:function(){
          console.log("组件实例化化完毕，但页面还未显示");
      },
      beforeMount:function(){
          console.log("组件挂载前，页面仍未展示，但虚拟dom已经配置");
      },
      mounted:function(){
        console.log('mounted')
        console.log("组件挂载后，此方法执行后，页面显示");
          /* ---------------------------------------------------------- */
        let addEvent = document.addEventListener ?
          (elem,type,listener,useCapture)=>{
            elem.addEventListener(type,listener,useCapture);
          }	:
          (elem,type,listener,useCapture)=>{
            elem.attachEvent('on'+type,listener);
          };
        let addClass = (node,className)=>{
          let current = node.className||'';
          if((' '+current+' ').indexOf(' '+className+' ')===-1){
            node.className = current?(current+' '+className):className;
          }
        }
        let delClass = (node,className)=>{
          let current = node.className||'';
          node.className = (' '+current+' ').replace(' '+className+' ',' ').trim();
        }
        let $ = selector=>{
          return [].slice.call(document.querySelectorAll(selector));
        };
        let oItemHds = $('.item-hd');
        let oItemMns = $('.item-mn');
        let oDownImgs = $('.downImg');
        
        for(let oItemHd of oItemHds){
          console.log("oItemHd:::" + oItemHd )
          // oItemHd.click{
          //   alert(a)
          // }
          oItemHd.onclick=function(){
            alert(this.getAttribute("type")); 
          }
          // addEvent(oItemHd,'click',(ev)=>{
          //   let flag = ev.currentTarget.dataset.flag;
            
          //   if(flag){
          //     console.log('flag:',flag);
          //     let oItemMn = oItemMns[flag];
          //     let oDownImg = oDownImgs[flag];
          //     let current = oItemMn.className||'';
          //     let className = 'show';
          //     for(var aaa = 0; aaa<4; aaa++ ){
          //       delClass(oItemMns[aaa],className);
          //       console.log(aaa)
          //     }
          //     if((' '+current+' ').indexOf(' '+className+' ')===-1){
          //       addClass(oItemMn,className);
          //       addClass(oDownImg,'rotate');
          //     }else{
          //       delClass(oItemMn,className);
          //       delClass(oDownImg,'rotate');
          //     }
        
          //   }
          // })
        }
        // ---------------------------------------------------------
      },
      beforeUpdate:function(){
          console.log('beforeUpdate')
          console.log("组件更新前，页面仍未更新，但虚拟dom已经配置");

      },
      updated:function(){
          console.log('updated')
          console.log("组件更新，此方法执行后，页面显示");
      },

      watch:{
          type(){
              if( this.type === 0) {
                  this.infoWindowsClass = 'infoWindowsClass1'
                  this.typeInfo = '正常运行'
              } else if(this.type === 1) {
                  this.infoWindowsClass = 'infoWindowsClass2'
                  this.typeInfo = '例行维保'
              } else if(this.type === 2) {
                  this.infoWindowsClass = 'infoWindowsClass3'
                  this.typeInfo = '故障检修'
              } else {
                  this.infoWindowsClass = 'infoWindowsClass4'
                  this.typeInfo = '事故救援'
              }
              console.log('1111111===' + JSON.stringify(this.topImgClass))
              console.log('type' + this.type)
              this.url = '/lift/gov/#/detail?id=' + this.type
          }
      },
      methods:{
        
          aaa(ev) {
            console.log('flag:',ev);
            var flag = ev
            
            let $ = selector=>{
              return [].slice.call(document.querySelectorAll(selector));
            };
            let oItemHds = $('.item-hd');
            let oItemMns = $('.item-mn');
            let oDownImgs = $('.downImg');
            let oItemMn = oItemMns[flag];
            let oDownImg = oDownImgs[flag];
            let current = oItemMn.className||'';
            let className = 'show';
            for(var aaa = 0; aaa<4; aaa++ ){
              this.delClass(oItemMns[aaa],className);
              console.log(aaa)
            }
            if((' '+current+' ').indexOf(' '+className+' ')===-1){
              this.addClass(oItemMn,className);
              this.addClass(oDownImg,'rotate');
            }else{
              this.delClass(oItemMn,className);
              this.delClass(oDownImg,'rotate');
            }
          },
          addClass(node,className){
            let current = node.className||'';
            if((' '+current+' ').indexOf(' '+className+' ')===-1){
              node.className = current?(current+' '+className):className;
            }
          },
          delClass(node,className){
            let current = node.className||'';
            node.className = (' '+current+' ').replace(' '+className+' ',' ').trim();
          },
          bbb() {
              this.ifshow = false
          }
      }
  })
  var component= new MyComponent().$mount();
  export default {
    data() {
      return {
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
        options1: [{
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
    },
    computed: {
      
    },
    mounted() {
      this.$store.dispatch('setLayout', 'admin')

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
      var map = new AMap.Map("container", {
                center: [120.061897, 30.356648], //设置中心点
                // pitch: 60,
                // rotation: -35,
                resizeEnable: true, //是否监控地图容器尺寸变化
                features: ["bg", "road", "point"], //隐藏默认楼块
                mapStyle: "amap://styles/bf8a443a1cae459d53212187f63b444c", //设置地图的显示样式
                // layers: [new AMap.TileLayer.Satellite()], //地图图层（卫星图层）    new AMap.TileLayer()
                zoom: 16 //地图显示的缩放级别
            });
      this.map = map
      //根据cityname、adcode、citycode设置地图位置
      function gotoCity() {
        var val = document.querySelector('#city-name').value; //可以是cityname、adcode、citycode
        if (!val) {
          val = "深圳市";
        }
        map.setCity(val.trim());
        // log.info(`已跳转至${val}`);
      }

      //绑定查询点击、回车事件
      document.querySelector('#query').onclick = gotoCity;
      document.querySelector('#city-name').onkeydown = function(e) {
        if (e.keyCode === 13) {
          gotoCity();
          return false;
        }
        return true;
      };
      



      ///////////////////////////////

      var markers = []; //markers数组，用于接多个图标点
                            
      var infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: component.$el,
          offset: new AMap.Pixel(162, 278),
          closeWhenClickMap:true, //点击地图关闭
          autoMove: false // 自动适配地图
      });
      funcreateMakers()
      //创建地图图标方法
      function funcreateMakers() {
          //创建地图图标方法
          // 添加makers
          map.remove(markers);
          console.log("1111111")
          infoWindow.close()
          // map.clearMap();
          // 请求数据接口
          var capitals = [
              {
                  center:[120.060824,30.357574],
                  color:'#00e921',
                  animations:'myfirst01'
              },
              {
                  center:[120.061824,30.358574],
                  color:'#fffa02',
                  animations:'myfirst02'
              },
              {
                  center:[120.062824,30.354574],
                  color:'#00e921',
                  animations:'myfirst01'
              },
              {
                  center:[120.063824,30.35974],
                  color:'#fffa02',
                  animations:'myfirst02'
              },
              {
                  center:[120.057824,30.352574],
                  color:'#00e921',
                  animations:'myfirst01'
              },
              {
                  center:[120.056824,30.354574],
                  color:'#fffa02',
                  animations:'myfirst02'
              },
              {
                  center:[120.055824,30.360574],
                  color:'#98014e',
                  animations:'myfirst03'
              },
              {
                  center:[120.071824,30.358574],
                  color:'#98014e',
                  animations:'myfirst03'
              },
              {
                  center:[120.061824,30.358574],
                  color:'#ff7d00',
                  animations:'myfirst04'
              },
              {
                  center:[120.061824,30.358574],
                  color:'#ff7d00',
                  animations:'myfirst04'
              },
          ]
          for (var i = 0, marker; i < capitals.length; i++) { // 故障检修
          // console.log("222222222")
          //   if(lnglats[i].type === 2){
          //       marker = new AMap.Marker({
          //           map: map,
          //           position: lnglats[i].position,
          //           // size: new AMap.Size(25, 34),
          //           // offset: new AMap.Pixel(-20,-38),
          //       });
          //       console.log("3333333333333")
                
          //   } else if(lnglats[i].type === 3){ // 事故救援
          //       marker = new AMap.Marker({
          //           map: map,
          //           position: lnglats[i].position,
          //           // icon: require('../../assets/images/hs/header.png'),
          //           // size: new AMap.Size(25, 34),
          //           // offset: new AMap.Pixel(-20,-38),
          //       });
                
          //   } else if(lnglats[i].type === 0){ // 正常运行
                
          //         marker = new AMap.Marker({
          //           map: map,
          //           position: lnglats[i].position,
               
          //           // icon: require('../../assets/images/hs/header.png'),
          //           // size: new AMap.Size(25, 34),
          //           // offset: new AMap.Pixel(-20,-38),
          //       });
          //   } else if(lnglats[i].type === 1){ // 例行维保
               
          //         marker = new AMap.Marker({
          //           map: map,
          //           position: lnglats[i].position,
          //           // icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
          //           // icon: require('../../assets/images/hs/header.png'),
          //           // size: new AMap.Size(25, 34),
          //           // offset: new AMap.Pixel(-20,-38),
          //       });
                
          //   }
            
          //   // 赋值，传值
          //   marker.name = lnglats[i].name
          //   marker.type = lnglats[i].type
          //   // console.log('JSON====' + JSON.stringify(lnglats[i]))
          //   // marker.options = lnglats[i].eleOptions
          //   // console.log(lnglats[i].eleOptions)
          //   // infoWindow.setContent(this.createInfoWindow(title, content.join("<br/>")));

          //   marker.on('click', markerClick);
          //   // 设置点标记的动画效果，此处为弹跳效果
          //   // marker.setAnimation('AMAP_ANIMATION_BOUNCE');

          //   // marker.emit('click', {target: marker}); // 默认打开信息窗体
          //   map.add(marker);
          //   markers.push(marker);
            //半径、层数、中心点、{填充颜色、初始透明度}

            
            // for(var i=0;i<capitals.length;i+=1){
                var text = new AMap.Text({
                    text:' ',
                    textAlign:'center',
                    verticalAlign:'middle', //middle 、bottom
                    draggable:true,
                    cursor:'pointer',
                    // angle:10,
                    style:{
                        // 'width': '10px',
                        // 'height': '10px',
                        // 'border-radius': '50%',
                        // 'border-width': 0,
                        // 'text-align': 'center',
                        // 'font-size': '12px',
                        // 'color': 'blue',
                        // 'background-color':capitals[i].color,
                        // // '-moz-box-shadow': '0px 0px 20px 2px '+capitals[i].color,
                        // 'box-shadow': '0px 0px 20px 2px '+capitals[i].color,
                        // 'animation': capitals[i].animations+' 1s infinite',
                        // // 'animation': 'myfirst 1s infinite'

                        'width': '100px',
                        'height': '100px',
                        'border': '1px solid #2b92d4',
                        'border-radius': '50%',
                        'text-align': 'center',
                        'cursor': 'pointer',
                        'margin':'150px auto',
                        'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.3)',
                        'overflow': 'hidden',
                        'background-color':'rgba(0, 0, 0, 0)',
                        // '-webkit-animation-timing-function': 'ease-in-out',
                        '-webkit-animation-name': 'myfirst02',
                        '-webkit-animation-duration': '1500ms',
                        '-webkit-animation-iteration-count': 'infinite',
                        '-webkit-animation-direction': 'alternate'
                    },
                    position: capitals[i].center
                })
                text.setMap(map);
            // }
          }
          function markerClick(e) {
            infoWindow.close()
            component.$data.type = e.target.type
            component.$data.name = e.target.name
            if(e.target.getPosition){
              infoWindow.open(map, e.target.getPosition());
            } else {
              infoWindow.open(map, e.target.getCenter());
            }
          }
          // 已完成异常 小窗口
          var markers1 = [];

          for (var i = 0; i < lnglats.length; i++) {
              // var lnglat = lnglats[i];
              // 创建点实例
              var marker = new AMap.Marker({
                  // position: new AMap.LngLat(lnglat[0], lnglat[1]),
                  position: lnglats[i].position,
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
                  extData: {
                      id: i + 1
                  }
              });

              markers1.push(marker);
          }
          // 创建覆盖物群组，并将 marker 传给 OverlayGroup
          var overlayGroups = new AMap.OverlayGroup(markers1);
          // 添加覆盖物群组
          function addOverlayGroup() {
            map.add(overlayGroups);
          }

          // 移除覆盖物群组
          function removeOverlayGroup() {

            map.remove(overlayGroups);
          }
          // 绑定事件
          document.getElementById("addOverlayGroup").onclick = addOverlayGroup;
          document.getElementById("removeOverlayGroup").onclick = removeOverlayGroup;

          
      }
      

      

      this.getToday()             

    /////////////////////////////////////
    },
    methods: {
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
        // console.log(value)
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

@keyframes myfirst01{
       0% {
        opacity: .4;
        box-shadow: 0 1px 2px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1) inset;
    }

    100% {
        opacity: 1;
        border: 1px solid rgba(59, 235, 235, 0.7);
        box-shadow: 0 1px 30px #0093df, 0 1px 20px #0093df inset;
    }
        
}
@keyframes myfirst02{
        0% {
        opacity: .4;
        box-shadow: 0 1px 2px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1) inset;
    }

    100% {
        opacity: 1;
        border: 1px solid rgba(59, 235, 235, 0.7);
        box-shadow: 0 1px 30px #0093df, 0 1px 20px #0093df inset;
    }
        
}
@keyframes myfirst03{
    0% {
        opacity: .4;
        box-shadow: 0 1px 2px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1) inset;
    }

    100% {
        opacity: 1;
        border: 1px solid rgba(59, 235, 235, 0.7);
        box-shadow: 0 1px 30px #0093df, 0 1px 20px #0093df inset;
    }
        
}
@keyframes myfirst04{
        0% {
        opacity: .4;
        box-shadow: 0 1px 2px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1) inset;
    }

    100% {
        opacity: 1;
        border: 1px solid rgba(59, 235, 235, 0.7);
        box-shadow: 0 1px 30px #0093df, 0 1px 20px #0093df inset;
    }
        
}
.myfirst02 {
    width: 100px;
    height: 100px;
    border: 1px solid #2b92d4;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    margin:150px auto;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-name: myfirst02;
    -webkit-animation-duration: 1500ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
}
</style>





