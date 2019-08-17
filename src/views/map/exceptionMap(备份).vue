<template>
  <div id="regMap" class="main-wrap" style="height:101%">
    <div class="row" >
      <div class="panel" style="padding:0">
        <div class="regionArea">
          <el-cascader
            ref="regionPicker"
            :filterable="true" 
            class="regionPicker" 
            :options="options" 
            v-model="form.selectedOptions" 
            @change="handleChange" 
            :show-all-levels="false"
            >
          </el-cascader>
       
          <span style="color: #D8DDDF;">|</span>
          <span style="width: 127px;overflow: hidden;display: inline-block;vertical-align: top;margin-top: 13px;">
            <a-date-picker @change="aChangePickDate" :defaultValue="moment(timeDefault, dateFormat)" :format="dateFormat" :showToday="false" placeholder="请选择日期" >
              <template slot="dateRender" slot-scope="current, today" >
                <div class="ant-calendar-date" :class="getCurrentStyle(current, today)">
                  {{current.date()}}
                </div>
              </template>
            </a-date-picker>
          </span>
          <span style="color: #D8DDDF;margin-right:17px">|</span>
          <!-- <el-date-picker

            v-model="liftListParams.triggleTime"
            type="date"
            value-format="yyyy-MM-dd"
            @change="datePickerChange"
            @focus="datePickerFocus"
            placeholder="选择日期">
          </el-date-picker> -->
          <radio-group :items="periods" :value.sync="period" >
            <span slot="label">处理进度：</span>
          </radio-group>
          
          <span class="today">
           
            <!-- <search-input v-model="searchKey" style="margin:15px 0 0 0">
              <span slot="btn" class="search_btn"></span>
            </search-input> -->
            <div style="width:320px">
              <search-code @childCode="searchLift" style="margin:15px 0 0 0"></search-code>
            </div>
          </span>
        </div>
        <!-- 使用自定义组件 -->
        <!-- <Loading></Loading> -->
        
        <!-- <div id="container" ></div> -->
        <!-- <tab></tab> -->
        <div class="searchArea">
          
          <div class="circleType">
            <i class="circle"></i><span @click="selectExceptionType(-1)" :class="{'active': -1 === exceptionType}">全部异常&nbsp;&nbsp;({{abnormalCount}})&nbsp;</span>
            <i class="circle" style="background:#4BCC8F;" ></i><span @click="selectExceptionType(3)" :class="{'active': 3 === exceptionType}">预警&nbsp;&nbsp;({{warningCount}})&nbsp;</span>
            <i class="circle" style="background:#8025FD;"></i><span @click="selectExceptionType(2)" :class="{'active': 2 === exceptionType}">违规&nbsp;&nbsp;({{violationCount}})&nbsp;</span>
            <i class="circle" style="background:#FFA90B;"></i><span @click="selectExceptionType(1)" :class="{'active': 1 === exceptionType}">故障&nbsp;&nbsp;({{faultCount}})&nbsp;</span>
            <i class="circle" style="background:#FA4F43;"></i><span @click="selectExceptionType(0)" :class="{'active': 0 === exceptionType}">事件&nbsp;&nbsp;({{accidentCount}})&nbsp;</span>
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
    <div style="padding:0 10px 24px;height: calc(100% - 87px);min-height: 408px">
      <div id="container" ></div>
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
  // import AMapUI from 'AMapUI'
  import Vue from 'vue'
  import api from 'api'
  import globalMixins from '../../utils/mixins'
  import { mapState, mapGetters, mapActions  } from 'vuex'
  import RadioGroup from "../../components/RadioGroup";
  import SearchInput from "../../components/SearchInput";
  // 查询电梯注册码
  import SearchCode from '../../components/SearchCode'
  import moment from 'moment';
  // import tab from "../../components/tab";
  let pcas = require("../../utils/citySelector/pcas-code.json")
  let $this
  // 生成html 和 时间
  var MyComponent = Vue.extend({
      template: `
      <div style="height:170px">
        <i :class="arrowImg" class="arrowImg"></i>
        <tab :activeIndex.sync="activeIndex" :titleItems="titleItems" @id="id" @date="date">

          <div v-if="elevInfo.inNum !== '0'" slot="first">
            <div class="info_num">
              {{elevInfo.inNum}}
            </div>
            <el-row class="">
              <el-col :span="6"><div class="info_title">注册代码</div></el-col>
              <el-col :span="18"><div class="info_content">{{elevInfo.regCode}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info_title">详细地址</div></el-col>
              <el-col :span="18"><div class="info_content">{{elevInfo.address}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info_title">使用单位</div></el-col>
              <el-col :span="18"><div class="info_content">{{elevInfo.userDepartment}}</div></el-col>
            </el-row>
          </div>
          <div slot="second">
            <div v-if="accident.count !== 0">
              <div style="margin-bottom:20px">
                <span class="lift_status">电梯状态</span>
                <span class="lift_time info_font12">{{ accident.diagninfo.triggleTime | dateformat('HH:mm:ss')}} </span> 
                <span class="accident_detail" @click="goToDetail">详情></span>
              </div>
              <el-row>
                <el-col :span="8" >
                  <div v-if="accident.diagninfo.extentions.box !== undefined" class="lift_font20 tac" >{{ accident.diagninfo.extentions.box.floor}}F</div>
                  
                  <div class="lift_font10 tac">被困楼层</div>
                </el-col>
                <el-col :span="8">
                  <div class="lift_font20 tac">开</div>
                  <div class="lift_font10 tac">电梯电源</div>
                </el-col>
                <el-col :span="8">
                  <div class="lift_font20 tac">关</div>
                  <div class="lift_font10 tac">电梯轿门</div>
                </el-col>
              </el-row>
            </div>
            <div v-else class="noneAlarm"> 暂无异常告警</div>
          </div>
          <div slot="third" >
            <div v-if="fault.count !==0">
              <div class="lift_row">
                <el-row v-for="(item,index) in fault.diagninfo" :key="index" class="liftRow">
                  <el-col :span="14">
                    <div class="info_content">{{item.reason}} </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="info_font12">{{processed[item.processed]}} 
                      <span class="lift_split">&nbsp;|&nbsp;</span> 
                      <span class="lift_time">{{ item.triggleTime | dateformat('HH:mm:ss')}} </span> 
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="lift_readMore" @click="goToDetail">查看更多</div>
            
            </div>
            <div v-else class="noneAlarm"> 暂无异常告警</div>
          </div>
          <div slot="fourth">
            <div v-if="violation.count !==0">
              <div class="lift_row">
                <el-row v-for="(item,index) in violation.diagninfo" :key="index" >
                  <el-col :span="14"><div class="info_content">{{item.reason}} </div></el-col>
                  <el-col :span="10">
                    <div class="info_font12">{{processed[item.processed]}} 
                      <span class="lift_split">&nbsp;|&nbsp;</span> 
                      <span class="lift_time">{{ item.triggleTime | dateformat('HH:mm:ss')}} </span> 
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="lift_readMore" @click="goToDetail">查看更多</div>
            </div>
            <div v-else class="noneAlarm"> 暂无异常告警</div>
          </div>
          <div slot="fifth">
            <div v-if="warning.count !==0">
              <div class="lift_row">
                <el-row v-for="(item,index) in warning.diagninfo" :key="index" class="liftRow">
                  <el-col :span="14"><div class="info_content">{{item.reason}} </div></el-col>
                  <el-col :span="10">
                    <div class="info_font12">{{processed[item.processed]}} 
                      <span class="lift_split">&nbsp;|&nbsp;</span> 
                      <span class="lift_time">{{ item.triggleTime | dateformat('HH:mm:ss')}} </span> 
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="lift_readMore" @click="goToDetail">查看更多</div>

            </div>
            <div v-else class="noneAlarm"> 暂无异常告警</div>
          </div>

          <div v-if="accident.count !== 0" v-text="accident.count < 100 ? accident.count : '99+'" slot="num1" class="numSign"></div>
          <div v-if="fault.count !== 0" v-text="fault.count < 100 ? fault.count : '99+'" slot="num2" class="numSign">{{fault.count}}</div>
          <div v-if="violation.count !== 0" v-text="violation.count < 100 ? violation.count : '99+'" slot="num3" class="numSign">{{violation.count}}</div>
          <div v-if="warning.count !== 0" v-text="warning.count < 100 ? warning.count : '99+'" slot="num4" class="numSign">{{warning.count}}</div>
        </tab>
       
       </div>
        `,
      // router: router,
      data() {
        return {
          titleItems:['基本信息', '事件','故障','违规','预警'],
          activeIndex: 0,
          id:0, // 等同regCode码
          type:"[0,-,-,-]", // 等同diagnCode
          elevInfo:{inNum:'0'},
          accident:{diagninfo:{extentions:{box:{floor:"000"}},reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}},
          fault :{diagninfo:{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}},
          violation: {diagninfo:{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}},
          warning :{diagninfo:{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}},
          processed:['待诊断','已完成'],
          arrowImg:'arrowImg0',
          date:'',
          regCode:0
          // authorURL:'/detection'
        }
      },
      watch:{
        id(val){
          // 		warning :预警
          //    accident:事故
          // 		fault :故障
          //    violation: 违规
          // alert(val)
          if(val !== 0){
            this.regCode = val
          }
          this.activeIndex = 0 // 每次重新点开弹窗时 初始tab都为第一个
          this.elevInfo = {inNum:'0'}
          this.accident={diagninfo:{extentions:{box:{floor:"000"}},reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}}
          this.accident = {count: 0,diagninfo:[{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}]}
          this.fault = {count: 0,diagninfo:[{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}]}
          this.violation = {count: 0,diagninfo:[{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}]}
          this.warning = {count: 0,diagninfo:[{reason: "", processed: 0, elevId: "", triggleTime: "", diagnType: 1}]}
          if(this.id !== 0){
            api.mapApi.getLiftDetails({'regCode':val,'triggleTime':this.date}).then((res) => {
              if(res.data.code === 200){
                if(res.data.data.elevInfo){
                  this.elevInfo = res.data.data.elevInfo
                }
                if(res.data.data.accident.count > 0){
                  this.accident = res.data.data.accident
                  this.accident.diagninfo.extentions = JSON.parse(res.data.data.accident.diagninfo.extensions)
                }
                if(res.data.data.fault.count > 0){
                  this.fault = res.data.data.fault
                }
                if(res.data.data.violation.count > 0){
                  this.violation = res.data.data.violation
                }
                if(res.data.data.warning.count > 0){
                  this.warning = res.data.data.warning
                }
              }
            })
          }
          // 每次请求数据完成后将id重置，重新点开弹窗时再次请求数据
          this.id = 0
        },
        type(){
          if( this.type === "[-,1,-,-]") {
            this.arrowImg = 'arrowImg1'
          } else if(this.type === "[-,-,2,-]") {
            this.arrowImg = 'arrowImg2'
          } else if(this.type === "[-,-,-,3]") {
            this.arrowImg = 'arrowImg3'
          } else if(this.type === "[0,-,-,-]") {
            this.arrowImg = 'arrowImg0'
          } else {
            this.arrowImg = 'arrowImg4'
          } 
        }
      },
      
      mounted:function(){
   
      },
      
      methods:{
        goToDetail(){
          $this.$router.push({path:'/detection-panel', query:{regCode:this.regCode}})
        },
      
      }
  })
  var infoWindowComponent= new MyComponent().$mount();
  export default {
    // mixins: [globalMixins],

    components: {
      'radio-group': RadioGroup,
      'search-input': SearchInput,
      'search-code': SearchCode,
      // 'tab': tab,
    },

    data() {
      return {
        aPickDate:[],
        dateFormat: 'YYYY-MM-DD',
        monthFormat: 'YYYY-MM',
        show3: true,
        searchKey:'',
        exceptionType:-1,
        periods: [
          { label: '全部', value: -1 },
          { label: '已完成', value: 1 },
          { label: '待诊断', value: 0 },
        ],
        period: -1,
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
        value: '1',
        lnglats:[],
        liftListParams: {
          // query : {
          triggleTime:"2019-06-21",
          areaCode:"4403",
          diagnType:-1,
          processed:-1,
          regCode:""
          // }
        },
        abnormalCount : 0,
        warningCount : 0,
        violationCount : 0,
        faultCount : 0,
        accidentCount : 0,
        searchLiftParams: {
          page: {offset: 1, limit: 10},
          query: {
            excp_type: -1,
          },
          order: 'desc'
        },
        searchMarker:[], // 搜索标记图标
        markers:[], // markers数组，用于接收多个圆环图标点
        pickedMonth:'',
        pickedYear:'',
        flagMonth: '',
        abnormalDate: []
      }
    },
    
    watch:{
      // 筛选已完成，未完成
      period(val) {
        this.liftListParams.processed = val
        this.getAllLiftPoint()
      }
    },
    computed: { 
      // 获取今天日期
      timeDefault() {
        var date = new Date(); 
        date.setTime(date.getTime()); 
        var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); 
        return s1; 
      } 
    },
    mounted() {
      // console.log(this)
      $this = this // 将this赋值给全局$this
      // this.$message("warning")
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
          
        }
      }
      var _this = this
      this.map = new AMap.Map('container', {
        // resizeEnable: true,
        center: [113.920652, 22.499146],
        // mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
        zoom: 20, //设置地图的缩放级别
        features: ['bg', 'road', 'building', 'point'],
        // showLabel: false //不显示地图文字标记
      });
      this.map.on('click', function(e) {
        _this.map.clearInfoWindow( )
      });
      // 区域选择 省-市数据 end

      // 将查询电梯列表数据的时间参数改为 今天
      this.liftListParams.triggleTime = this.timeDefault

      // 获取所有电梯点数据
      this.getAllLiftPoint()
      
      
      ///////////////////--mounted-end--//////////////////
    },
    methods: {
      moment,
      // 获取存在异常情况的日期
      getCurrentStyle (current, today) {
        var currentDate = moment(current).format('YYYY-MM-DD')
        this.pickedYear = today.year()
        this.pickedMonth = today.month() + 1
        var style = ''
        if(this.flagMonth !== this.pickedMonth){
          this.flagMonth = this.pickedMonth
          var dateParms = {
            'date':this.pickedYear + '-' + this.flagMonth
          }
          api.mapApi.getAbnormalDates(dateParms).then((res) => {
            if(res.data.code === 200 && res.data.data ){
              this.abnormalDate = res.data.data
            }
          })
        }
        this.abnormalDate.forEach(item =>{
          // var year = moment(item, 'YYYY-MM')
          // console.log("year--" + year)
          
          if (currentDate === moment(item).format('YYYY-MM-DD')) {
            style = 'redDot'
          }
          
        })
        return style
      },
      // A日历选择框改变时触发
      aChangePickDate(date, dateString){
        // console.log(date, dateString);
        this.liftListParams.triggleTime = dateString
        this.getAllLiftPoint()
      },
      
      // 日历选择框改变时触发
      // datePickerChange(val){
      //   this.getAllLiftPoint()
      // },

      // 选择特定异常状态 筛选
      selectExceptionType(type){
        this.liftListParams.diagnType = type
        this.exceptionType = type
        this.getAllLiftPoint()
      },
      // 获取地图上所有圆环点的 数据
      getAllLiftPoint(){
        api.mapApi.getAllMapLifts(this.liftListParams).then((res) => {
          
          if (res.data.code === 200 ){

            this.lnglats = []
            this.abnormalCount = res.data.data.abnormalCount
            this.warningCount = res.data.data.warningCount
            this.violationCount = res.data.data.violationCount
            this.faultCount = res.data.data.faultCount
            this.accidentCount = res.data.data.accidentCount

            //当有电梯注册代码时（有异常电梯），渲染地图上的圆环点
            if(res.data.data.elevatorInfo !== undefined){
              this.lnglats = res.data.data.elevatorInfo
              for( var i = 0 ;i< this.lnglats.length ; i++ ){
                this.lnglats[i].latLon = this.lnglats[i].latLon.split(',');
              }
              // console.log("this.lnglats===" + JSON.stringify(this.lnglats))
            }
           
            
          } else {
            this.lnglats = []
          }
          this.drawMap()
          
          // console.log("res.data.code" + res.data.data.records[0])s
        }).catch((res) => {
          
        })
      },
      
      drawMap(){

        //根据cityname、adcode、citycode设置地图位置
        var _this = this
        function gotoCity() {
          var val = document.querySelector('#city-name').value; //可以是cityname、adcode、citycode
          if (!val) {
            val = "深圳市";
          }
          _this.map.setCity(val.trim());
          // log.info(`已跳转至${val}`);
        }
        
        // var markers = []; //markers数组，用于接多个图标点
        var shadowMarkers = [];
        var infoContent = "<tab></tab>"
        var infoWindow = new AMap.InfoWindow({
          isCustom: true,  // 使用自定义窗体
          autoMove: true, // 是否自动调整窗体到视野内
          content: infoWindowComponent.$el,
          offset: new AMap.Pixel(70, -30),
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
          aaa()
          
          // 绘制makers
          function aaa(){
            // 清空地图上所有maker
            _this.map.remove(_this.markers);
            _this.map.remove(shadowMarkers);
            
            // infoWindow.close()
            // console.log("detailOnAMAP----" + JSON.stringify(_this.map.getAllOverlays()))

            _this.markers = []
            // console.log("markers=================" + _this.markers)
            shadowMarkers = [];  
            // console.log("1111===" + _this.lnglats)
            // console.log("_this.lnglats.length=====================" + _this.lnglats.length)
            for (var i = 0, marker; i < _this.lnglats.length; i++) { // 故障检修
            var diagnCode = _this.lnglats[i].diagnCode
              if(diagnCode === "[0,-,-,-]") {
                var markerContent = '<span class="huanPic huanPic0"></span>' 
              } else if(diagnCode === "[0,1,-,-]"){
                var markerContent = '<span class="huanPic huanPic01"></span>' 
              } else if(diagnCode === "[-,1,-,-]"){
                var markerContent = '<span class="huanPic huanPic1"></span>'
              } else if(diagnCode === "[0,-,2,-]"){
                var markerContent = '<span class="huanPic huanPic02"></span>' 
              } else if(diagnCode === "[-,-,2,-]"){
                var markerContent = '<span class="huanPic huanPic2"></span>' 
              } else if(diagnCode === "[0,-,-,3]"){
                var markerContent = '<span class="huanPic huanPic03"></span>' 
              } else if(diagnCode === "[-,-,-,3]"){
                var markerContent = '<span class="huanPic huanPic3"></span>' 
              } else if(diagnCode === "[0,1,2,-]"){
                var markerContent = '<span class="huanPic huanPic012"></span>' 
              } else if(diagnCode === "[-,1,2,-]"){
                var markerContent = '<span class="huanPic huanPic12"></span>' 
              } else if(diagnCode === "[0,1,2,3]"){
                var markerContent = '<span class="huanPic huanPic0123"></span>' 
              } else if(diagnCode === "[0,1,-,3]"){
                var markerContent = '<span class="huanPic huanPic013"></span>' 
              } else if(diagnCode === "[-,1,-,3]"){
                var markerContent = '<span class="huanPic huanPic13"></span>' 
              } else if(diagnCode === "[0,-,2,3]"){
                var markerContent = '<span class="huanPic huanPic023"></span>' 
              } else if(diagnCode === "[-,-,2,3]"){
                var markerContent = '<span class="huanPic huanPic23"></span>' 
              } else if(diagnCode === "[-,1,2,3]"){
                var markerContent = '<span class="huanPic huanPic123"></span>' 
              }
              // console.log("1111111111111" + "[" + markerContent +"]")
              var marker = new AMap.Marker({
                content: markerContent,  // 自定义点标记覆盖物内容
                position:  _this.lnglats[i].latLon, // 基点位置
                offset: new AMap.Pixel(1,4), // 相对于基点的偏移位置
                anchor:'center', // 设置锚点方位
                zIndex: 2,
                topWhenClick: true
              });
              var shadowMarker =
                '<div class="shadowMarker">' +
                '</div>';
              var shadowMarker = new AMap.Marker({
                content: shadowMarker,  // 自定义点标记覆盖物内容
                position:  _this.lnglats[i].latLon, // 基点位置
                // offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
                offset: new AMap.Pixel(1,18), // 设置点标记偏移量
                anchor:'center', // 设置锚点方位
                zIndex: 1
              });
              // var circleMarker = new AMap.CircleMarker({
              //   center:[113.920652, 22.499146],
              //   radius:20,//3D视图下，CircleMarker半径不要超过64px
              //   strokeColor:'#f56c6c',
              //   strokeWeight:5,
              //   strokeOpacity:1,
              //   fillColor:'rgba(0,0,255,0)',
              //   fillOpacity:0.5,
              //   zIndex:10,
              //   bubble:true,
              //   cursor:'pointer',
              //   clickable: true
              // })
              
              // 赋值，传值
              marker.id = _this.lnglats[i].regCode
              
              marker.diagnCode = _this.lnglats[i].diagnCode
              marker.position = _this.lnglats[i].latLon
              marker.date = _this.liftListParams.triggleTime
              

              //鼠标点击marker弹出自定义的信息窗体
              // marker.on('click', markerClick);
              AMap.event.addListener(marker, 'click', markerClick);

              _this.markers.push(marker);
              shadowMarkers.push(shadowMarker);
              _this.map.add(_this.markers);
              _this.map.add(shadowMarkers);
            }
          }
          
          // function clearMarker(index){
          //   this.markers[index].setMap(null);
          //   this.markers.splice(index, 1)
          // }
          function markerClick(e) {
            aaa()  // 重新绘制makers
            
            for (var i = 0, marker; i < _this.lnglats.length; i++) {
              // markers[i].setMap(null);
              var orContent = _this.markers[i].getContent()
              if(_this.markers[i].id === e.target.id){
                
                // console.log("aaa" + orContent)
                var markerContent = '' +
                '<div class="custom-content-marker">' +
                  orContent +
                '</div>';
                // console.log("aaa" + markerContent)
                _this.markers[i].setzIndex(3)
              } else {
                var markerContent = orContent
              }
              //  else if (markers[i].id === e.target.id && lnglats[i].diagn_code !== 1){
              //   var markerContent = '' +
              //   '<div class="custom-content-marker">' +
              //   '   <span class="huanPicPu bigger">' +
              //   '</div>';
              // }
              _this.markers[i].setContent(markerContent)
              
            }
            // console.log(e.target.id)
            
            infoWindow.close()
            infoWindowComponent.$data.id = e.target.id
            infoWindowComponent.$data.type = e.target.diagnCode
            infoWindowComponent.$data.date = e.target.date
            // infoWindowComponent.$data.type = e.target.diagn_code
            // if(e.target.getPosition){
            infoWindow.open(_this.map, e.target.position);
            // } else {
              // infoWindow.open(_this.map, e.target.getCenter());
            // }
          }


          // -----------------------分隔线--- 添加覆盖物群组---------------------------------
          // 已完成异常 小窗口
          // var markers1 = [];

          // for (var i = 0; i < _this.lnglats.length; i++) {
          //     // var lnglat = lnglats[i];
          //     // 创建点实例
          //     var marker = new AMap.Marker({
          //         // position: new AMap.LngLat(lnglat[0], lnglat[1]),
          //         position: _this.lnglats[i].lat_lon,
          //         icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
          //         extData: {
          //           id: i + 1
          //         }
          //     });

          //     markers1.push(marker);
          // }
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
      },
      // vvv(index){
      //   console.log("aaa=" + index)
      // },
      // 搜索
      // 监听子组件获取注册码，发送请求搜索并重新渲染列表
      searchLift(regCode) {
        console.log("reg_code==" + regCode)
        this.map.remove(this.searchMarker)
        
        api.lift.getLiftResult(regCode).then(res => {
          if (res.data.data) {

            this.lnglats.forEach(item =>{
              if(item.regCode === regCode){
                this.searchMarker = new AMap.Marker({
                    // position: new AMap.LngLat(lnglat[0], lnglat[1]),
                    position: res.data.data.latLon.split(','),
                    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + '.png',
                    
                });
                // this.map.add(this.searchMarker)
                this.map.setZoomAndCenter(18, res.data.data.latLon.split(',')); //同时设置地图层级与中心点
              }
            })
          }
        })
      },
      // 获取当前日(1-31)
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
        console.log("value:::"+ value)
        console.log('黑科技？', this.$refs['regionPicker'].currentLabels)
        var regionLabels = this.$refs['regionPicker'].currentLabels
        this.form.city = regionLabels[0]
        this.form.area = regionLabels[1]
        if (!this.form.area) {
          this.form.area = "深圳市";
        }
        this.liftListParams.areaCode = value[1]
        this.map.setCity(this.form.area.trim());
        this.getAllLiftPoint()

      },
      
      
    }
    
  }
</script>
<style lang="stylus">
@import '../../assets/stylus/utilities'
@import '../../assets/stylus/colors'
#regMap
  .ant-input
    border:none!important 
  #container 
    width: 100%;
    margin: 0px;
    height: 100%;
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
    position relative
    z-index 99
    border-radius: 10px 10px 0 0
    width 100%
    background white
    vertical-align middle
    -webkit-box-shadow: 0 1px 10px 0 rgba(66,114,255,0.15);
    box-shadow: 0 1px 10px 0 rgba(66,114,255,0.15);
    .regionPicker
      width 100px
      margin 10px 5px 10px 10px
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
    .circleType
      absolute top 22px left 20px
      z-index: 88;
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
        color: #7E8A95;
        &.active
          color: #34414C;
          font-weight 800
        &:nth-child(2).active
          color: #4272FF;
  
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
   
}
.bigger{
  transform scale(1.5)
}
.shadowMarker{
  size 22px 5px
  background: -webkit-radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* Firefox 3.6 - 15 */
  background: radial-gradient(rgba(181,190,199,0.95), rgba(181,190,199,0.85), rgba(181,190,199,0.25), rgba(0,0,0,0)); /* 标准的语法（必须放在最后） */
}
@keyframes myfirst03{
    0% {
        opacity: 1;
        transform scale(1)
    }
  
    100% {
        opacity: .4;
        transform scale(0.5)
    }
        
}

.huanPic{
  display inline-block
  size 40px 35px
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-name: myfirst03;
  -webkit-animation-duration: 500ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  &:hover {
    transform scale(1.2)
  }
}
.huanPic0{
  background url("../../assets/images/hs/mapIcon/0.png") no-repeat;
  background-size:100% auto; 
}
.huanPic01{
  background url("../../assets/images/hs/mapIcon/01.png") no-repeat;
  background-size:100% auto;
}
.huanPic0{
  background url("../../assets/images/hs/mapIcon/0.png") no-repeat;
  background-size:100% auto; 
}
.huanPic01{
  background url("../../assets/images/hs/mapIcon/01.png") no-repeat;
  background-size:100% auto;
}
.huanPic1{
  background url("../../assets/images/hs/mapIcon/1.png") no-repeat ;
  background-size:100% auto; 
}
.huanPic02{
  background url("../../assets/images/hs/mapIcon/02.png") no-repeat;
  background-size:100% auto;
}
.huanPic2{
  background url("../../assets/images/hs/mapIcon/2.png") no-repeat;
  background-size:100% auto; 
}
.huanPic03{
  background url("../../assets/images/hs/mapIcon/03.png") no-repeat;
  background-size:100% auto;
}
.huanPic3{
  background url("../../assets/images/hs/mapIcon/3.png") no-repeat; 
  background-size:100% auto; 
}
.huanPic012{
  background url("../../assets/images/hs/mapIcon/012.png") no-repeat;
  background-size:100% auto;
}
.huanPic12{
  background url("../../assets/images/hs/mapIcon/12.png") no-repeat; 
  background-size:100% auto;
}
.huanPic013{
  background url("../../assets/images/hs/mapIcon/013.png") no-repeat;
  background-size:100% auto;
}
.huanPic13{
  background url("../../assets/images/hs/mapIcon/13.png") no-repeat;
  background-size:100% auto; 
}
.huanPic023{
  background url("../../assets/images/hs/mapIcon/023.png") no-repeat;
  background-size:100% auto;
}
.huanPic23{
  background url("../../assets/images/hs/mapIcon/23.png") no-repeat;
  background-size:100% auto; 
}
.huanPic0123{
  background url("../../assets/images/hs/mapIcon/0123.png") no-repeat;
  background-size:100% auto;
}
.huanPic123{
  background url("../../assets/images/hs/mapIcon/123.png") no-repeat; 
  background-size:100% auto; 
}
.info_num
  font-size: 20px;
  color: #FFFFFF;
  margin-bottom:10px
.info_title
  font-size: 14px;
  color: #C2C7CC;
.info_content
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 8px;
.info_font12
  font-size: 12px;
.lift_split
  color: rgba(255,255,255,0.45);
.lift_time
  color: rgba(255,255,255,0.65);
.lift_row
  border-bottom: 1px rgba(255, 255, 255, .45) dashed;
  padding-bottom: 5px;
.lift_readMore
  text-indent 100px
  margin-top 10px
  background url("../../assets/images/hs/readMore.png") 165px no-repeat;
  cursor pointer
.noneAlarm
  height 100px
  line-height 100px
  text-align center
  color: rgba(255,255,255,0.65);
.accident_detail
  float right
  font-size: 12px;
  letter-spacing: 0.02px;
  cursor: pointer;
.lift_status
  margin-right 15px
.lift_font10
  font-size: 10px;
  color: #C2C7CC;
.lift_font20
  font-size: 20px;
.arrowImg
  width 20px
  height 20px
  display inline-block
  position absolute
  left -30px
  top: 22px;
.arrowImg4
  background url("../../assets/images/hs/mapIcon/arrow4.png") no-repeat;
.arrowImg3
  background url("../../assets/images/hs/mapIcon/arrow3.png") no-repeat;
.arrowImg2
  background url("../../assets/images/hs/mapIcon/arrow2.png") no-repeat;
.arrowImg1
  background url("../../assets/images/hs/mapIcon/arrow1.png") no-repeat;
.arrowImg0
  background url("../../assets/images/hs/mapIcon/arrow0.png") no-repeat;
.redDot:after
  content: ''
  width: 5px;
  height: 5px;
  border: 1px solid red;
  border-radius: 50%;
  background:red
  position absolute
  bottom: -5px;
  right: 8px;
  text-align center
.ant-calendar-date
  position relative

</style>





