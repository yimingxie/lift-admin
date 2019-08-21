<template>
  <div id="mainMap" class="main-wrap" style="height:101%">
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
         
          <span style="color: #D8DDDF;margin-right:17px">|</span>
         
          <radio-group :items="periods" :value.sync="period" >
            <span slot="label">处理进度：</span>
          </radio-group>
          <span style="color: #D8DDDF;margin-right:9px">|</span>
         
          <radio-group :items="periods2" :value.sync="period2" >
            <span slot="label">维保类型：</span>
          </radio-group>
          
          <span class="today">
           
            <!-- <search-input v-model="searchKey" style="margin:15px 0 0 0">
              <span slot="btn" class="search_btn"></span>
            </search-input> -->
            <div style="width:256px">
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
            <i class="circle"></i><span @click="selectExceptionType('正常')" :class="{'active': '正常' === exceptionType}">正常运行&nbsp;&nbsp;({{totalData.normalTotal}})&nbsp;</span>
            <i class="circle" style="background:#FFC60B;" ></i><span @click="selectExceptionType('当天维保')" :class="{'active': '当天维保' === exceptionType}">当天维保&nbsp;&nbsp;({{totalData.dtCount}})&nbsp;</span>
            <i class="circle" style="background:#9D55FF;"></i><span @click="selectExceptionType('3天内维保')" :class="{'active': '3天内维保' === exceptionType}">3天内维保&nbsp;&nbsp;({{totalData.trCount}})&nbsp;</span>
            <i class="circle" style="background:#FA4F43;"></i><span @click="selectExceptionType('超时任务')" :class="{'active': '超时任务' === exceptionType}">超时任务&nbsp;&nbsp;({{totalData.overCount}})&nbsp;</span>
          </div>
          

        </div>
     
      </div>
    </div>
    <div style="padding:0 10px 24px;height: calc(100% - 87px);min-height: 408px">
      <div id="containerMap" ></div>
    </div>
  
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import api from 'api'
  import globalMixins from '../../utils/mixins'
  import { mapState, mapGetters, mapActions  } from 'vuex'
  import RadioGroup from "../../components/RadioGroup";
  import SearchInput from "../../components/SearchInput";
  // 查询电梯注册码
  import SearchCode from '../../components/SearchCode'
  // import tab from "../../components/tab";
  let pcas = require("../../utils/citySelector/pcas-code.json")
  let $this
  // 生成html 和 时间
  var MyComponent = Vue.extend({
      template: `
      <div class="map3InfoWindow">
        <i :class="arrowImg" class="arrowImg"></i>

          <div v-if="elevatorInfo.inNum !== '0'" style="width:288px;background: rgba(52,65,76,0.90);border-radius: 4px;padding: 17px 17px 12px;">
            <div class="info_num">
              {{elevatorInfo.inNum}}
            </div>
            <div class="lift_row">
              <el-row class="">
                <el-col :span="7"><div class="info_title">注册代码</div></el-col>
                <el-col :span="17"><div class="info_content">{{elevatorInfo.elevCode}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="7"><div class="info_title">详细地址</div></el-col>
                <el-col :span="17"><div class="info_content">{{elevatorInfo.localArea}}{{elevatorInfo.address}}</div></el-col>
              </el-row>
              <el-row v-if="stat !=='无计划'">
                <el-col :span="7"><div class="info_title" >上次维保</div></el-col>
                <el-col :span="17"><div class="info_content">{{elevatorInfo.beforeTime ? elevatorInfo.beforeTime: '--'}}</div></el-col>
              </el-row>
              <el-row v-if="stat !=='无计划'">
                <el-col :span="7"><div class="info_title">下次维保</div></el-col>
                <el-col :span="17"><div class="info_content">{{elevatorInfo.nextTime ? elevatorInfo.nextTime: '--'}}</div></el-col>
              </el-row>
            </div>
            <div class="lift_readMore" @click="goLiftResult(elevatorInfo.elevCode)">查看详情</div>
          </div>
          <div style="display:none;">// 未派单、可派单、已派单、已接单、无计划等工单列表</div>
          <div v-if="elevatorInfo.regCode !== ''&& stat !=='已超时'" style="position: absolute;left: 300px;top: 8px;width:288px;background: rgba(52,65,76,0.90);
            border-radius: 4px;padding: 17px 17px 12px;">
            <div class="info_num">
              <span v-if="stat=='无计划'">暂无维保计划</span>
              <span v-else>{{elevatorInfo.type}}</span>
              <span class="infoTitle" :style="{'color': infoTitleColor,'border-color':infoTitleColor}">{{infoTitle}}</span>
            </div>
            <div class="lift_row">
              <el-row class="">
                <el-col :span="7"><div class="info_title">工单编号</div></el-col>
                <el-col :span="17"><div v-if="stat !=='无计划'" class="info_content" v-text="record.length > 0 ? record[0].taskId:'- -'"></div></el-col>
                <el-col :span="17"><div v-if="stat =='无计划'" class="info_content">- -</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="7"><div class="info_title">作业时间</div></el-col>
                <el-col :span="17" v-if="stat == '可派单'"><div class="info_content">{{getStaffJson.beginTime}}</div></el-col>
                <el-col :span="17" v-else-if="stat !=='无计划'"><div class="info_content" v-text="workTime ? workTime:'- -'"></div></el-col>
                <el-col :span="17"><div v-if="stat =='无计划'" class="info_content">- -</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="7"><div class="info_title" >作业人员</div></el-col>
                <el-col :span="17">
                  <div style="display:none;">// 可派单的作业人员 为默认负责人</div>
                  <div class="info_content" v-if="stat == '可派单'">

                    <el-row class="tabActiveSpan" >
                    
                      <el-col :span="12" class="stf_info">
                        <div class="stf_name">{{getStaffJson.majorName}}
                        </div>
                      </el-col>
                      <el-col :span="12" class="stf_info">
                        <div class="stf_name">{{getStaffJson.minorName}}
                        </div>
                      </el-col>
                      
                    </el-row>

                  </div>
                  
                  <div class="info_content" v-else>
                    <div style="display:none;">// 已派单、已接单、已完成 为派单员工</div>
                    <el-row v-if="getStaffJson.length > 0 && getStaffJson" v-for="(staff,index) in getStaffJson" :key="index" class="tabActiveSpan" >
                      
                      <el-col :span="6" class="stf_pic">
                        <img :src="staff.url" style="background:#ccc;border-radius:50%" alt="" width="32" height="32"/>
                        <div v-if="status == '已派单'" class="mask" @click="deleteStaff(index)"></div>
                      </el-col>
                      <el-col :span="18" class="stf_info">
                        <div class="stf_name">{{staff.staffName}}
                        </div>
                        <div class="stf_pGray">
                          <span>{{staff.depName}}</span>
                          <span>{{staff.phone}}</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div style="display:none;">// 无计划 无作业人员</div>
                    <el-row v-if="stat == '无计划'">
                      <div class="stf_name">- -</div>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row  v-if="stat !== '可派单' && stat !== '无计划' && stat !== '已超时'">
                <el-col :span="7"><div class="info_title">处理进度</div></el-col>
                <el-col :span="17">
                  <div class="info_content progressPanel">
                    <el-steps :active="record.length - 1" direction="vertical" >
                      <!-- class="chaoshiLine" -->

                      <el-step :title="item.taskStatus" v-for="(item,index) in record" :key="index" :class="item.taskStatus == '已超时'?chaoshiLine:''">
                        <i slot="icon" class="progressIcon paidan" v-if="item.taskStatus == '已派单'"></i>
                        <i slot="icon" class="progressIcon jiedan" v-if="item.taskStatus == '已接单'"></i>
                        <i slot="icon" class="progressIcon wancheng" v-if="item.taskStatus == '已完成' || item.taskStatus == '已关闭'"></i>
                        <i slot="icon" class="progressIcon chaoshi" v-if="item.taskStatus == '已超时'"></i>
                        
                        <div slot="description">
                          <p>{{item.recordTime}}</p>
                        </div>
                      </el-step>
                    </el-steps>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="lift_readMore" v-if="stat !== '可派单' && stat !== '无计划'" @click="goToDetail(record[0].taskId)">查看详情</div>
          </div>
          <div style="display:none;">// 已超时 工单列表</div>
          <div v-if="stat =='已超时' && procList.length > 0" style="position: absolute;left: 300px;top: 8px;width:288px;background: rgba(52,65,76,0.90);
            border-radius: 4px;padding: 17px 17px 12px;max-height:470px;overflow: auto;">
            <div v-for="(list,index) in procList" :key="index" style="padding-bottom: 10px;border-bottom: 10px solid #626b73;margin-bottom:20px">
              <div class="info_num" >
                {{list.type}}
              
                <span class="infoTitle" :style="{'color': infoTitleColor,'border-color':infoTitleColor}">{{infoTitle}}</span>
              </div>
              <div class="lift_row">
                <el-row class="">
                  <el-col :span="7"><div class="info_title">工单编号</div></el-col>
                  <el-col :span="17"><div class="info_content"> {{list.id}} </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="7"><div class="info_title">作业时间</div></el-col>
                  <el-col :span="17"><div class="info_content" v-text="list.beginTime ? list.beginTime : '--'"></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="7"><div class="info_title" >作业人员</div></el-col>
                  <el-col :span="17">
                    
                    <div class="info_content">

                      <span v-if="list.mp.length > 0" v-for="(person) in list.mp" :key="person.id" class="tabActiveSpan" >
                        
                        {{person.staffName ? person.staffName : person.name}}
                      </span>
                      
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="lift_readMore" @click="goToDetail(list.id)">查看详情</div>
            </div>
          </div>


       </div>
        `,
      // router: router,
      data() {
        return {
          // activeIndex: 0,

          id: 0, //数据传入
          regCode:'',//数据传入
          stat:'',//数据传入

          // type:"",
          taskRecords:[],
          // taskNo:'',
          elevatorInfo:[],
          status:'',
          // lastStep: '',
          // taskType:'',
          getStaffJson:[],
          infoTitleColor:'',
          arrowImg:'arrowImg4',
          infoTitle:'', //数据传入
          record:[],
          procList:[],
          workTime:''
          // authorURL:'/detection'
        }
      },
      watch:{
        regCode(val){
          
          // if(val !== 0){
          //   this.regCode = val
          // }
          
         
          if(val !== ''){
            // if(this.infoTitle == '超时任务'){
            var params = {
              "id": this.id, //数据传入
              "elevCode": val, //数据传入
              "stat": this.stat, //数据传入
              "begin": Date.parse(new Date()),
              "end": Date.parse(new Date()),
              "limit": 10,
              "offset": 0,
              "type": $this.period2
            }
            
            if(this.infoTitle == '3天内维保'){
              params.begin = Date.parse(new Date())+24*60*60*1000, // 明天
              params.end= Date.parse(new Date())+24*60*60*1000*2 // 后天
            }
            // 获取电梯详情
            api.mapApi.getMap3Details(params).then((res) => {

              // this.taskRecords = res.data.data.taskRecords || []
              
              if(this.stat == '无计划'){
                this.elevatorInfo = res.data.data[0]
                
              } else if(this.stat == '已超时'){
                this.procList = res.data.data.proc.records || []
                this.elevatorInfo = res.data.data || []
              } else {
                this.elevatorInfo = res.data.data || []
                this.record = res.data.data.record || []
                this.workTime = res.data.data.workTime || ''
              }
              // this.status = res.data.data.status
              // this.taskNo = res.data.data.taskNo
              // this.taskType = res.data.data.taskType

              this.getStaffJson = res.data.data.mp || []
              console.log("this.getStaffJson::" + this.getStaffJson)
              if(this.getStaffJson.length>0){
                this.getStaffJson.forEach(item => {
                  if(item.avatarUrl) {
                    var url = api.accountApi.viewPic(item.avatarUrl)
                    Vue.set(item, 'url', url)
                  }
                })
              }
              

            }).catch((res) => {
              
            })

          }
          // 每次请求数据完成后将id重置，重新点开弹窗时再次请求数据
          this.regCode = ''
        },
        // 根据分类不同设置不同颜色
        infoTitle(type){
          console.log("type：：：：" + type)
          if(type == '正常'){
            this.infoTitleColor = '#4BCC8F'
          } else if(type == '当天维保') {
            this.infoTitleColor = '#FFC60B'
          } else if(type == '3天内维保') {
            this.infoTitleColor = '#9D55FF'
          } else if(type == '超时任务') {
            this.infoTitleColor = '#FA4F43'
          }
        }
      },
      
      mounted:function(){
      },
      
      methods: {
        // 跳转到电梯详情
        goLiftResult(regCode) {
          $this.$router.push({
            path: '/lift-detail',
            query: {
              regCode: regCode,
              submitState: 'get'
            }
          })
        },
        // 跳转到工单详情
        goToDetail(id){
          $this.$router.push({name: 'missionDetail', params: {'id': id}})
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
        exceptionType:"当天维保",
        periods: [
          { label: '全部', value: '全部' },
          { label: "已完成", value: "'已完成'" },
          { label: "未完成", value: "'未完成'" },
        ],
        period: '全部',
        periods2: [
          { label: '全部', value: '全部' },
          { label: "例行维保", value: "'例行维保'" },
          { label: "季度维保", value: "'季度维保'" },
          { label: "半年维保", value: "'半年维保'" },
          { label: "年度维保", value: "'年度维保'" },
        ],
        period2: '全部',
        options: [],
        form: {
          city : '',
          area : '',
          minarea : '',
          selectedOptions: ["44","4403"],//地区筛选数组
        },
        map:'',
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
          corp: window.localStorage.getItem('corpId'),
          status:'全部',
          type:'全部',
          begin: Date.parse(new Date()),
          end: Date.parse(new Date())
        },
        totalData:[],
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
        this.liftListParams.status = val
        // // 只针对当天维保筛选
        if(val !== '全部'){
          this.exceptionType = "当天维保"
        } 
        this.getTotalData()
        this.getAllLiftPoint()
        // this.selectExceptionType(this.exceptionType)
      },
      // 筛选类型
      period2(val) {
        this.liftListParams.type = val
        this.getTotalData()
        this.getAllLiftPoint()
        // this.selectExceptionType(this.exceptionType)
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
      this.getTotalData()
      $this = this // 将this赋值给全局$this

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

      this.map = new AMap.Map('containerMap', {
        // resizeEnable: true,
        center: [113.93181,22.497398],
        // mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
        mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
        zoom: 20, //设置地图的缩放级别
        features: ['bg', 'road', 'building', 'point'],
        // showLabel: false //不显示地图文字标记
      });
      this.map.setCity('深圳市');
      this.map.on('click', function(e) {
        _this.map.clearInfoWindow( )
      });
      

      // 将查询电梯列表数据的时间参数改为 今天
      // this.liftListParams.triggleTime = this.timeDefault

      // 获取所有电梯点数据
      this.getAllLiftPoint()
      
    },
    methods: {
      // 获取地图统计数据
      getTotalData(){
        api.mapApi.getMap3TotalData({'corp':window.localStorage.getItem('corpId'),'type':this.period2,'stat':this.period}).then((res) => {
          this.totalData = res.data.data
        })
      },
      // 选择特定异常状态 筛选
      selectExceptionType(type){

        this.exceptionType = type
        // console.log("this.exceptionType" + this.exceptionType)
        // if(this.exceptionType !== '当天维保'){
        //   this.period = "全部"
        // }
        this.getAllLiftPoint()
      },
      // 获取地图上所有圆环点的 数据
      getAllLiftPoint(){
        // console.log("this.exceptionType" + this.exceptionType)
        if( this.exceptionType == '正常'){
          
          this.liftListParams = {
            status: this.period,
            type: this.period2,
            normal: '正常',
            corp: window.localStorage.getItem('corpId'),
            begin: Date.parse(new Date()),
            end: Date.parse(new Date())
          }
          
        } else if( this.exceptionType == '当天维保') {
        
          this.liftListParams = {
            status: this.period,
            type: this.period2,
            corp: window.localStorage.getItem('corpId'),
            begin: Date.parse(new Date()),
            end: Date.parse(new Date())
          }
        } else if( this.exceptionType == '3天内维保') {
       
          this.liftListParams = {
            status: this.period,
            type: this.period2,
            corp: window.localStorage.getItem('corpId'),
            begin: Date.parse(new Date())+24*60*60*1000, // 明天
            end: Date.parse(new Date())+24*60*60*1000*2 // 后天
          }
        } else {
          this.liftListParams = {
            status: "'已超时'",
            type: this.period2, 
            corp: window.localStorage.getItem('corpId'),
            begin: Date.parse(new Date()),
            end: Date.parse(new Date())
          }
        }

        api.mapApi.getMap3AllDots(this.liftListParams).then((res) => {
          
          if (res.data.code === 200 ){

            this.lnglats = []

            //当有电梯注册代码时（有异常电梯），渲染地图上的圆环点
            // if(res.data.data == undefined){
              this.lnglats = res.data.data || []
              // this.lnglats = [{
              //   elevCode: "31104403002009001047"
              //   id: "1164058492633657346"
              //   latLon: "113.920659,22.4988"
              //   status: "已派单"
              // },{

              // }]
              for( var i = 0 ;i< this.lnglats.length ; i++ ){
                this.lnglats[i].latLon = this.lnglats[i].latLon.split(',');
              }
            // }
            
          }
          this.drawMap()
          
          // console.log("res.data.code" + res.data.data.records[0])s
        }).catch((res) => {
          
        })
      },
      // 绘制地图
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
        var infoWindow = new AMap.InfoWindow({
          isCustom: true,  // 使用自定义窗体
          autoMove: true, // 是否自动调整窗体到视野内
          content: infoWindowComponent.$el,
          offset: new AMap.Pixel(70, -25),
          anchor: 'top-left', // 设置锚点方位
          // closeWhenClickMap:true //点击地图关闭
        });
        
        funcreateMakers()
        //创建地图图标方法
        function funcreateMakers() {
          //添加makers

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
            
            // infoWindow.close()
            // console.log("detailOnAMAP----" + JSON.stringify(_this.map.getAllOverlays()))
            _this.markers = []
            // console.log("markers=================" + _this.markers)
            // console.log("1111===" + _this.lnglats)
            // console.log("_this.lnglats.length=====================" + _this.lnglats.length)
            for (var i = 0, marker; i < _this.lnglats.length; i++) { // 故障检修
              // var type = _this.lnglats[i].type
              if(_this.exceptionType == "正常") {
                var markerContent = '<span class="mapDotMaker dotMakerGreen"></span>' 
              } else if(_this.exceptionType == "当天维保") {
                var markerContent = '<span class="mapDotMaker dotMakerYellow"></span>' 
              } else if(_this.exceptionType == "3天内维保") {
                var markerContent = '<span class="mapDotMaker dotMakerPurple"></span>' 
              } else if(_this.exceptionType == "超时任务") {
                var markerContent = '<span class="mapDotMaker dotMakerRed"></span>' 
              }
              // console.log("1111111111111" + "[" + markerContent +"]")
              var marker = new AMap.Marker({
                content: markerContent,  // 自定义点标记覆盖物内容
                position:  _this.lnglats[i].latLon, // 基点位置
                offset: new AMap.Pixel(0,0), // 相对于基点的偏移位置
                anchor:'center', // 设置锚点方位
                zIndex: 2,
                topWhenClick: true
              });
              
              // 赋值，传值
              marker.regCode = _this.lnglats[i].elevCode
              marker.id = _this.lnglats[i].id
              marker.stat = _this.lnglats[i].status
              marker.infoTitle = _this.exceptionType
              marker.position = _this.lnglats[i].latLon
              // marker.date = _this.liftListParams.triggleTime
              

              //鼠标点击marker弹出自定义的信息窗体
              // marker.on('click', markerClick);
              AMap.event.addListener(marker, 'click', markerClick);

              _this.markers.push(marker);
              _this.map.add(_this.markers);
            }
          }
          
          // 点击maker
          function markerClick(e) {
            aaa()  // 重新绘制makers
            
            for (var i = 0, marker; i < _this.lnglats.length; i++) {
              // markers[i].setMap(null);
              var orContent = _this.markers[i].getContent()
              if(_this.markers[i].regCode == e.target.regCode){
                
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
              
              _this.markers[i].setContent(markerContent)
              
            }
            // console.log(e.target.id)
            
            infoWindow.close()
            infoWindowComponent.$data.regCode = e.target.regCode
            infoWindowComponent.$data.infoTitle = e.target.infoTitle
            infoWindowComponent.$data.id = e.target.id
            infoWindowComponent.$data.stat = e.target.stat
            // infoWindowComponent.$data.date = e.target.date
            // infoWindowComponent.$data.type = e.target.diagn_code
            // if(e.target.getPosition){
            infoWindow.open(_this.map, e.target.position);
            // } else {
              // infoWindow.open(_this.map, e.target.getCenter());
            // }
          }
          // -----------------------分隔线--- 添加覆盖物群组---------------------------------
          // 已完成异常 小窗口
          var markers1 = [];
          var marker = []
          for (var i = 0; i < _this.lnglats.length; i++) {
            // var lnglat = lnglats[i];
            // 创建点实例
            marker = new AMap.Marker({
              // position: new AMap.LngLat(lnglat[0], lnglat[1]),
              position: _this.lnglats[i].latLon,
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
              extData: {
                id: i + 1
              }
            });
            // console.log("_this.lnglats[i].lat_lon----" + _this.lnglats[i].latLon)
            markers1.push(marker);
          }
          // 创建覆盖物群组，并将 marker 传给 OverlayGroup
          var overlayGroups = new AMap.OverlayGroup(markers1);
          _this.map.add(overlayGroups);
        }
      },
     
      // 搜索
      // 监听子组件获取注册码，发送请求搜索并重新渲染列表
      searchLift(regCode) {
        console.log("reg_code==" + regCode)
        this.map.remove(this.searchMarker)
        
        api.lift.getLiftResult(regCode).then(res => {
          if (res.data.data) {

            this.lnglats.forEach(item =>{
              if(item.elevCode === regCode){
                this.searchMarker = new AMap.Marker({
                    // position: new AMap.LngLat(lnglat[0], lnglat[1]),
                    position: res.data.data.latLon.split(','),
                    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + '.png',
                });
                // alert(res.data.data.latLon.split(','))
                // this.map.add(this.searchMarker)
                this.map.setZoomAndCenter(18, res.data.data.latLon.split(',')); //同时设置地图层级与中心点
              }
            })
          }
        })
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
#mainMap
  .ant-input
    border:none!important 
  #containerMap
    width: 100%;
    margin: 0px;
    height: 100%
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
        background: #4BCC8F;
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
  background url("../../assets/images/hs/mapIcon/1.png") no-repeat;
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
  color:#fff
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



@keyframes ripple2 {
  0% {
    left: 0px;
    top: 0px;
    opcity:75;
    width:0;
    height:0;
  }
  100% {
    left: -32px;
    top: -32px;
    opacity: 0;
    width:64px;
    height:64px;
  }
}
@keyframes ripple3 {
  0% {
    transform scale(0.5);
    // left: -4px;
    // top: -4px;
    // width:10px;
    // height:10px;
    opacity: 0.3;
  }
  50% {
    transform scale(1);
    // left: -10px;
    // top: -10px;
    // width: 20px;
    // height: 20px;
    opacity: 1;
  }
  100% {
    transform scale(0.5);
    // left: -5px;
    // top: -5px;
    // width: 10px;
    // height: 10px;
    opacity: 0.3;
  }
}
.mapDotMaker
  size 20px
  position relative
.mapDotMaker:before
  content:' ';
  position: absolute;
  z-index: 2;
  left: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  background-color: #FFC60B;
  border-radius: 50%;
  -webkit-animation-name:'ripple3';/*动画属性名，也就是我们前面keyframes定义的动画名*/
  -webkit-animation-duration: 1.2s;/*动画持续时间*/
  -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
  -webkit-animation-delay: 0s; /*动画延迟时间*/
  -webkit-animation-iteration-count: infinite;/*定义循环资料，infinite为无限次*/
  -webkit-animation-direction: normal;/*定义动画方式*/
.mapDotMaker:after
  content:' ';
  position: absolute;
  z-index: 1;
  width: 20px;
  height: 20px;
  background-color: #FFC60B;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,.3) inset;
  -webkit-animation-name:'ripple2';/*动画属性名，也就是我们前面keyframes定义的动画名*/
  -webkit-animation-duration: 1.2s;/*动画持续时间*/
  -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
  -webkit-animation-delay: 0s; /*动画延迟时间*/
  -webkit-animation-iteration-count: infinite;/*定义循环资料，infinite为无限次*/
  -webkit-animation-direction: normal;/*定义动画方式*/
.custom-content-marker {
  .mapDotMaker:before{
    background-color: #4272FF;
    transform scale(1.5);
    // &:hover {
    //   transform scale(1)
    // }
  }
  .mapDotMaker:after{
    background-color: #4272FF;
    transform scale(1.5);
  }
}
.dotMakerGreen:before
  background-color: #4BCC8F
.dotMakerGreen:after
  background-color: #4BCC8F
.dotMakerPurple:before
  background-color: #9D55FF
.dotMakerPurple:after
  background-color: #9D55FF
.dotMakerRed:before
  background-color: #FA4F43
.dotMakerRed:after
  background-color: #FA4F43
.infoTitle
  border: 1px solid #4BCC8F;
  border-radius: 4px;
  // size:36px 16px
  font-size: 10px;
  padding: 2px 5px;
  float: right;

//地图信息弹窗
.map3InfoWindow
  width: 600px;
  height: 250px;
  .lift_row
    border-bottom:none;
  .lift_readMore
    border-top: 1px rgba(255,255,255,0.45) dashed;
    padding-top:10px
    background url("../../assets/images/hs/readMore.png") 165px 13px no-repeat;
  .progressPanel
    // 初始状态
    .progressIcon
      display inline-block
      width:8px;
      height:8px;
      border-radius:50%;
    .paidan
      background: #C2C7CC;
    .jiedan
      background: #C2C7CC;
      opacity .3
    .wancheng
      background: #C2C7CC;
      opacity .3
    .el-step__icon
      background: rgba(77, 83, 88, 0.9) !important
    // 正在进行中
    .el-step__head.is-process
      .progressIcon
        box-shadow: 0 8px 12px -4px rgba(26,65,178,0.40);
        width 16px;
        height 16px;
        border-radius: 50%
        // margin 0 5px
      .paidan
        background url('../../assets/images/hs/paidanLight.png') no-repeat center #4272FF;
        background-size: 100% 100%;
      .jiedan
        background url('../../assets/images/hs/jiedanLight.png') no-repeat center #4272FF;
        opacity 1
        background-size: 100% 100%;
      .wancheng
        background url('../../assets/images/hs/wanchengLight.png') no-repeat center #4272FF;
        opacity 1
        /* 以父元素的百分比来设置背景图像的宽度和高度。*/
        background-size: 100% 100%;
      .chaoshi
        background url('../../assets/images/hs/chaoshi.png') no-repeat center #FA4F43
        box-shadow: 0 8px 12px -4px rgba(178,26,26,0.40);
    // 已完成
    .el-step__head.is-finish
      .jiedan
        opacity 1
    .el-step__title.is-finish
      font-size: 14px!important;
      color: #C2C7CC!important;
    .el-step__description.is-process, .el-step__description.is-finish
      font-size: 12px!important;
      color: rgba(255,255,255,0.65)!important;
    .el-step__description.is-process
      color: #FFFFFF!important;
    .el-step__title.is-process
      font-size: 14px!important;
      color: #FFFFFF!important;
    .el-step.is-vertical .el-step__title
      margin: 0!important;
    .el-step.is-vertical .el-step__head
      text-align: center;
    .el-step__description p
      margin: 0px 0 14px 0!important;
    
  .stf_pGray
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    letter-spacing: 0.02px;
    margin: 5px 0 10px;
</style>





