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
        
<!-- //////// -->
    <div id="outer-box">
        <div id="container" tabindex="0"></div>
        <div id="panel" class="scrollbar1">
            <ul id="myList">
            </ul>
        </div>
        <ul id="btnList">
            <li>
                <input value="美食数据" type="button" data-path="//a.amap.com/amap-ui/static/data/restaurant.json" />
            </li>
           
        </ul>
    </div>
    <!-- ////////// -->
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
  var $this = this    // 当前组件对象
  // 生成html 和 时间
  var MyComponent = Vue.extend({
      template: `<div><el-tabs v-model="activeName" class="atab" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" style="color:red;"><i class="el-icon-date"></i> 我的行程</span>
            嘻嘻嘻嘻嘻嘻嘻想
          </el-tab-pane>
          <el-tab-pane label="事故" name="second">{{activeName}}</el-tab-pane>
          <el-tab-pane label="故障" name="third">{{activeName}}</el-tab-pane>
          <el-tab-pane label="违规" name="fourth">{{activeName}}</el-tab-pane>
          <el-tab-pane label="预警" name="fifth">{{activeName}}</el-tab-pane>
        </el-tabs>
        <div v-on:click="hello()">{{id}}</div>
        </div>
        `,
      data() {
        return {
          activeName: 'first',
          id:''
        }
      },
      watch:{
        id(){
          console.log('id' + this.id)
          this.activeName = 'first'
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
    },
    mounted() {
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

     
            //创建地图
        var map = new AMap.Map('container', {
            zoom: 9
        });
          //为地图注册click事件获取鼠标点击出的经纬度坐标
        map.on('click', function(e) {
            map.clearInfoWindow( )
        });
        AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
            function(MarkerList, SimpleMarker, SimpleInfoWindow) {
                //即jQuery/Zepto
                var $ = MarkerList.utils.$;

                var defaultIconStyle = 'red', //默认的图标样式
                    hoverIconStyle = 'green', //鼠标hover时的样式
                    selectedIconStyle = 'purple' //选中时的图标样式
                ;

                var markerList = new MarkerList({
                    map: map,
                    //ListElement对应的父节点或者ID
                    // listContainer: "myList", //document.getElementById("myList"),
                    //选中后显示

                    //从数据中读取位置, 返回lngLat
                    getPosition: function(item) {
                        return item.lat_lon;
                    },
                    //数据ID，如果不提供，默认使用数组索引，即index
                    getDataId: function(item, index) {

                        return item.id;
                    },
                    getInfoWindow: function(data, context, recycledInfoWindow) {

                        if (recycledInfoWindow) {

                            recycledInfoWindow.setInfoTitle(data.name);
                            recycledInfoWindow.setInfoBody(data.address);

                            return recycledInfoWindow;
                        }

                        return new SimpleInfoWindow({
                            infoTitle: data.name,
                            infoBody: data.address,
                            offset: new AMap.Pixel(0, -37),
                      
                        });
                    },
                    //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
                    getMarker: function(data, context, recycledMarker) {

                        var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

                        if (recycledMarker) {
                            recycledMarker.setIconLabel(label);
                            return;
                        }
                        // console.log("data===" + JSON.stringify(data))
                        // return new SimpleMarker({
                        //     containerClassNames: 'my-marker',
                        //     iconStyle: defaultIconStyle,
                        //     iconLabel: label
                        // });
                        if(data.diagn_code === 1){
                          var markerContent = '<div class="huanPic huanPicYe">'
                          
                        } else {
                          var markerContent = '<div class="huanPic huanPicPu">' 
                        }
                        return  new AMap.Marker({
                          content: markerContent,  // 自定义点标记覆盖物内容
                          // offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
                          offset: new AMap.Pixel(1,4), // 设置点标记偏移量
                          anchor:'center', // 设置锚点方位
                          zIndex: 2,
                          topWhenClick: true
                        });
                    },
                    //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
                    getListElement: function(data, context, recycledListElement) {

                        var label = String.fromCharCode('A'.charCodeAt(0) + context.index);

                        //使用模板创建
                        var innerHTML = MarkerList.utils.template('<div class="poi-imgbox">' +
                            '    <span class="poi-img" style="background-image:url(<%- data.pic %>)"></span>' +
                            '</div>' +
                            '<div class="poi-info-left">' +
                            '    <h3 class="poi-title">' +
                            '        <%- label %>. <%- data.name %>' +
                            '    </h3>' +
                            '    <div class="poi-info">' +
                            '        <span class="poi-price">' +
                            '            <%= data.price %>' +
                            '        </span>' +
                            '        <p class="poi-addr"><%- data.address %></p>' +
                            '    </div>' +
                            '</div>' +
                            '<div class="clear"></div>', {
                                data: data,
                                label: label
                            });

                        if (recycledListElement) {
                            recycledListElement.innerHTML = innerHTML;
                            return recycledListElement;
                        }

                        return '<li class="poibox">' +
                            innerHTML +
                            '</li>';
                    },
                    //列表节点上监听的事件
                    // listElementEvents: ['click', 'mouseenter', 'mouseleave'],
                    //marker上监听的事件
                    markerEvents: ['click'],
                    //makeSelectedEvents:false,
                    selectedClassNames: 'selected',
                    autoSetFitView: true
                });

                window.markerList = markerList;
                // 点击事件
                markerList.on('selectedChanged', function(event, info) {

                    // checkBtnStats();
                    if (info.selected) {

                        console.log(info);

                        if (info.selected.marker) {
                            //更新为选中样式
                            info.selected.marker.setIconStyle(selectedIconStyle);
                        }

                        //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
                        if (!info.sourceEventInfo.isListElementEvent) {

                            if (info.selected.listElement) {
                                scrollListElementIntoView($(info.selected.listElement));
                            }
                        }
                    }

                    if (info.unSelected && info.unSelected.marker) {
                        //更新为默认样式
                        info.unSelected.marker.setIconStyle(defaultIconStyle);
                    }
                });
                // 移入事件
                markerList.on('listElementMouseenter markerMouseover', function(event, record) {

                    if (record && record.marker) {

                        forcusMarker(record.marker);

                        //this.openInfoWindowOnRecord(record);

                        //非选中的id
                        if (!this.isSelectedDataId(record.id)) {
                            //设置为hover样式
                            record.marker.setIconStyle(hoverIconStyle);
                            //this.closeInfoWindow();
                        }
                    }
                });
                // 移出事件
                markerList.on('listElementMouseleave markerMouseout', function(event, record) {

                    if (record && record.marker) {

                        if (!this.isSelectedDataId(record.id)) {
                            //恢复默认样式
                            record.marker.setIconStyle(defaultIconStyle);
                        }
                    }
                });

                //数据输出完成
                // markerList.on('renderComplete', function(event, records) {

                //     checkBtnStats();
                // });

                // markerList.on('*', function(type, event, res) {
                //     console.log(type, event, res);
                // });

                //加载数据
                function loadData(src, callback) {

                    // $.getJSON(src, function(data) {

                    //     markerList._dataSrc = src;
                    var lnglats = [
                    {
                      id: 1,
                      lat_lon:[114.053267,22.520914],
                      name: '新天世纪商务中心',
                      diagn_code: 1
                    }, {
                      id: 2,
                      lat_lon:[114.052867,22.520914],
                      name: '新天世纪商务中心',
                      diagn_code: 2
                    }, {
                      id: 3,
                      lat_lon:[114.053167,22.521084],
                      name: '新天世纪商务中心',
                      diagn_code: 3
                    }, {
                      id: 4,
                      lat_lon:[114.052967,22.521084],
                      name: '新天世纪商务中心',
                      diagn_code: 0
                    }, {
                      id: 5,
                      lat_lon:[114.053167,22.520744],
                      name: '新天世纪商务中心',
                      diagn_code: 3
                    }, {
                      id: 6,
                      lat_lon:[114.052967,22.520744],
                      name: '新天世纪商务中心',
                      diagn_code: 1
                  }]
                  //渲染数据
                  markerList.render(lnglats);

                    //     if (callback) {
                    //         callback(null, data);
                    //     }
                    // });
                }

                var $btns = $('#btnList input[data-path]');
                console.log("$btns" + $btns.attr('data-path'))
                

                // $('#btnList').on('click', 'input', function() {

                //     var $input = $(this),
                //         dataPath = $input.attr('data-path'),
                //         codeEval = $input.attr('data-eval');

                //     if (dataPath) {
                //         loadData(dataPath);
                //     } else if (codeEval) {
                //         eval(codeEval);
                //     }

                //     checkBtnStats();
                // });

                loadData($btns.attr('data-path'));

                function forcusMarker(marker) {
                    marker.setTop(true);

                    //不在地图视野内
                    if (!(map.getBounds().contains(marker.getPosition()))) {

                        //移动到中心
                        map.setCenter(marker.getPosition());
                    }
                }

                function isElementInViewport(el) {
                    var rect = el.getBoundingClientRect();

                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
                    );
                }

                function scrollListElementIntoView($listEle) {

                    if (!isElementInViewport($listEle.get(0))) {
                        $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
                    }

                    //闪动一下
                    $listEle
                        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                            function(e) {
                                $(this).removeClass('flash animated');
                            }).addClass('flash animated');
                }


            });
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
    transform scale(1.5)
    // position: relative;
    // width: 40px;
    height: 55px;
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
.custom-content-marker1{
  position: relative;
  width: 50px;
  height: 50px;
}
// .custom-content-marker:hover{
//   transform scale(1.2)
// }
.custom-content-marker img {
    width: 100%;
    height: 100%;
}

.custom-content-marker .close-btn {
    position: absolute;
    top: -6px;
    right: -8px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    background: #ccc;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 15px;
    box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
}

.custom-content-marker .close-btn:hover{
    background: #666;
}
.huanPic{
  display inline-block
  size 40px
  &:hover {
    transform scale(1.2)
  }
}
.huanPicYe{
  background url("../../assets/images/hs/13.png") no-repeat center
}
.huanPicPu{
  background url("../../assets/images/hs/12.png") no-repeat center
}
.selected{
  .huanPic{
    display inline-block
    size 70px
  }
  .huanPicYe{
    background url("../../assets/images/hs/13.png") no-repeat center
  }
  .huanPicPu{
    background url("../../assets/images/hs/12.png") no-repeat center
  }
}
.bigger{
  transform scale(1.5)
}
.shadowMarker{
  size 22px 6px
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
</style>





