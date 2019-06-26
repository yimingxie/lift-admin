<template>
  <div id="ed">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">电梯检测</span>
      </div>

      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{in_num}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{reg_code}}</li>
            <li><span>电梯负责人：</span>{{lift_man}}</li>
            <li><span>电梯地址：</span>{{local_area}} {{address}}</li>
          </ul>
        </div>
        <div class="det-heading-search">
          <search-code :code="parentCode" @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="det-content clearfix">
        <div class="det-warn">
          <div class="det-warn-title">异常告警</div>
          <div class="det-warn-choose clearfix">
            <div class="dwc-box" style="width: 40%;">
              <div class="dwc-date-icon"></div>
              <div class="dwc-box-line"></div>
              <el-date-picker v-model="triggle_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" prefix-icon="test-icon" style="width: 100%;" @change="changeTriggleTime"></el-date-picker>
            </div>
            <div class="dwc-box" style="width: 30%">
              <div class="dwc-box-line"></div>
              <el-select v-model="diagn_type" placeholder="类型" @change="changeDiagnType">
                <el-option v-for="item in diagnTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="dwc-box" style="width: 30%;">
              <el-select v-model="processed" placeholder="进度" @change="changeProcessed">
                <el-option v-for="item in processedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>

          <div class="det-warn-list">
            <div class="dw-list">
             

              <div class="dw-list-box" v-for="(item, i) in warnList" :key="i">
                <div class="dwlb-p">
                  <h4>{{item.reason}}</h4>
                  <!-- 管道符 过滤器 -->
                  <p>{{item.diagn_type | changeDiagnType}} {{item.triggle_time}}</p>
                </div>
                <div class="dwlb-rate" :class="item.processed == 0 ? 'no-deal' : ''">{{item.processed | changeProcessed}}</div>
              </div>
            </div>
          </div>
          
        </div>



        <!-- TODO -->
        <div class="ed-new-left" style="display: none;">

          <div class="ed-old-list clearfix">
            <!-- 导航 -->
            <div class="ed-mid" id="ed-mid">
              <div class="ed-nav" id="ed-nav">
                <div class="ed-nav-box" :class="{on : navActive == '开关信号'}" @click="jump(3)">
                  <div class="edn-icon edn-icon4"></div>
                  <p>开关信号</p>
                </div>
                <div class="ed-nav-box" :class="{on : navActive == '电动机'}" @click="jump(2)">
                  <div class="edn-icon edn-icon3"></div>
                  <p>电动机</p>
                </div>
                <div class="ed-nav-box" :class="{on : navActive == '驱动辊'}" @click="jump(0)">
                  <!-- TODO 告警 -->
                  <!-- <div class="warning"></div> -->
                  <div class="edn-icon edn-icon1"></div>
                  <p>驱动辊</p>
                </div>
                <div class="ed-nav-box" :class="{on : navActive == '联轴器'}" @click="jump(5)">
                  <div class="edn-icon edn-icon6"></div>
                  <p>联轴器</p>
                </div>
                <div class="ed-nav-box" :class="{on : navActive == '从动辊'}" @click="jump(1)">
                  <div class="edn-icon edn-icon2"></div>
                  <p>从动辊</p>
                </div>
                <div class="ed-nav-box" :class="{on : navActive == '下料口微型拖辊铁架'}" @click="jump(4)">
                  <div class="edn-icon edn-icon5"></div>
                  <p>下料口微型拖辊铁架</p>
                </div>
              </div>
            </div>
            <div class="ed-right1" id="ed-right1" ref="ed-right1">
              <div class="ed-item-time-change-block"></div>
              <div class="ed-item-new-warn-p">本次测试目的为验证传感器数据采样能力，数据均为瞬时值，刷新时间为5~10秒</div>
              <div class="ed-item-time-change clearfix">
                <!-- timeOn以后可改为historyTime -->
                <span :class="{on : timeOn == 'now'}" @click="changeTime('now')">现在</span>
                <span :class="{on : timeOn == 'day'}" @click="changeTime('day')">今日</span>
                <span :class="{on : timeOn == 'month'}" @click="changeTime('month')">本月</span>
                <span :class="{on : timeOn == 'year'}" @click="changeTime('year')">本年</span>
              </div>
              <el-scrollbar style="height: 100%;" id="scrollbar1">

                <!-- 大类 -->
                <!-- 开关信号电流，替换梯门 -->
                <div id="EDDoor" class="edType">
                  <div class="ed-item">
                    <div class="ed-item-title">	开关信号电流</div>
                    <div class="ed-item-chart-box clearfix">
                      <!-- <div class="ed-item-warn">告警记录</div> -->
                      <div class="ed-item-chart-data clearfix">
                        <div class="edic-data-icon edic-data-icon25"></div>
                        <div class="edic-data-p">
                          <h4><em>{{boxBottomSafeValue}}</em><span>{{boxBottomSafeUnit}}</span></h4>
                          <p>	开关信号电流</p>
                        </div>
                      </div>
                      <div class="ed-item-chart">
                        <div class="item-chart" id="box-bottom-safe-chart" ref="box-bottom-safe-chart"></div>
                      </div>
                    </div>
                  </div>
            
                </div>

                <!-- 电动机电流，替换限速器 -->
                <div id="EDSpeed" class="edType">
                  <div class="ed-item">
                    <div class="ed-item-title">电动机电流</div>
                    <div class="ed-item-chart-box clearfix">
                      <!-- <div class="ed-item-warn">告警记录</div> -->
                      <div class="ed-item-chart-data clearfix">
                        <div class="edic-data-icon edic-data-icon24"></div>
                        <div class="edic-data-p">
                          <h4><em>{{floorDoorSafeValue}}</em><span>{{floorDoorSafeUnit}}</span></h4>
                          <p>电动机电流</p>
                        </div>
                      </div>
                      <div class="ed-item-chart">
                        <div class="item-chart" id="floor-door-safe-chart" ref="floor-door-safe-chart"></div>
                      </div>
                    </div>
                  </div>

                </div>


                <!-- 驱动辊，替换机房 -->
                <div id="EDMotorRoom" class="edType">
                  <div class="ed-item">
                    <div class="ed-item-title">驱动辊转速</div>
                    <div class="ed-item-chart-box clearfix">
                      <!-- <div class="ed-item-warn">告警记录</div> -->
                      <div class="ed-item-chart-data clearfix">
                        <div class="edic-data-icon edic-data-icon22"></div>
                        <div class="edic-data-p">
                          <h4>{{boxTopSafeValue}}<span>{{boxTopSafeUnit}}</span></h4>
                          <p>驱动辊转速</p>
                        </div>
                      </div>
                      <div class="ed-item-chart">
                        <div class="item-chart" id="box-top-safe-chart" ref="box-top-safe-chart"></div>
                      </div>
                    </div>
                  </div>

            

                </div>

                <!-- 联轴器振动，替换安全回路 -->
                <div id="EDSafeLoop" class="edType">
                  <div class="ed-item">
                    <div class="ed-item-title">联轴器振动</div>
                    <div class="ed-item-chart-box clearfix">
                      <!-- <div class="ed-item-warn">告警记录</div> -->
                      <div class="ed-item-chart-data clearfix">
                        <div class="edic-data-icon edic-data-icon27"></div>
                        <div class="edic-data-p">
                          <h4><em>{{boxLockValue}}</em><span>{{boxLockUnit}}</span></h4>
                          <p>联轴器振动</p>
                        </div>
                      </div>
                      <div class="ed-item-chart">
                        <div class="item-chart" id="box-lock-chart" ref="box-lock-chart"></div>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- 从动辊，替换曳引机 -->
                <div id="EDTractor" class="edType">
                  <div class="ed-item">
                    <div class="ed-item-title">从动辊转速</div>
                    <div class="ed-item-chart-box clearfix">
                      <!-- <div class="ed-item-warn">告警记录</div> -->
                      <div class="ed-item-chart-data clearfix">
                        <div class="edic-data-icon edic-data-icon23"></div>
                        <div class="edic-data-p">
                          <h4><em>{{boxDoorSafeValue}}</em><span>{{boxDoorSafeUnit}}</span></h4>
                          <p>从动辊转速</p>
                        </div>
                      </div>
                      <div class="ed-item-chart">
                        <div class="item-chart" id="box-door-safe-chart" ref="box-door-safe-chart"></div>
                      </div>
                    </div>
                  </div>
                  
                </div>


                <!-- 下料口微型拖辊铁架振动，替换轿厢 -->
                <div id="EDBox" class="edType">
                  <div class="ed-item">
                    <div class="ed-item-title">下料口微型拖辊铁架振动</div>
                    <div class="ed-item-chart-box clearfix">
                      <!-- <div class="ed-item-warn">告警记录</div> -->
                      <div class="ed-item-chart-data clearfix">
                        <div class="edic-data-icon edic-data-icon26"></div>
                        <div class="edic-data-p">
                          <h4><em>{{floorLockValue}}</em><span>{{floorLockUnit}}</span></h4>
                          <p>下料口微型拖辊铁架振动</p>
                        </div>
                      </div>
                      <div class="ed-item-chart">
                        <div class="item-chart" id="floor-lock-chart" ref="floor-lock-chart"></div>
                      </div>
                    </div>
                  </div>
                
                </div>

                

                <!-- 门锁回路 -->
                <div id="EDLockLoop" class="edType">


                </div>


              </el-scrollbar>
            </div>

          </div>
          

        </div>

      </div>


      
    



    </div>
  </div>
</template>

<script>

import api from '../../api.js'
import Footer from '../common/fotter'
import SearchCode from '../../components/SearchCode'

export default {
  data() {
    return {
      parentCode: '',
      dateNow: '',
      dtID: 'test001',
      historyTime: '',
      timeOn: 'now',
      direction: 'stop',
      flag: true, // 用于滚动节流
      dataX: ['60s', '55s', '50s', '45s', '40s', '35s', '30s', '25s', '20s', '15s', '10s', '5s', '0s'],
      dataValue: [],

      // 电梯详情
      reg_code: '',
      in_num: '',
      address: '',
      lift_man: '',
      local_area: '',

      // 告警列表筛选
      triggle_time: '',
      diagnTypeOptions: [
        {value: '-1', label: '全部'},
        {value: '0', label: '事件'},
        {value: '1', label: '故障'},
        {value: '2', label: '违规'},
        {value: '3', label: '预警'},
      ],
      diagn_type: '',
      processedOptions: [
        {value: '0', label: '未处理'},
        {value: '1', label: '处理中'},
        {value: '2', label: '已完成'},

       
      ],
      processed: '',
      warnList: [],
      warnParams: {
        "page": {offset : "1",limit : "100"},
        "query": {}
      },

      

      // 电梯概况
      edState: 'maintenance',
      selectValue:'001',
      selectArr: [{
          value: '001',
          label: 'DT1'
      }, {
          value: '002',
          label: 'DT2'
      }, {
          value: '003',
          label: 'DT3'
      }],
      currentView: "EDMotorRoom",
      navActive: '',

      // 电梯实时数据
      eleSpeed: '0',
      eleCurrentFloor: '0',
      eleCurrentDoor: '关',

      // 机房默认值
      tempValue: '0',
      tempUnit: '℃',
      westValue: '0',
      westUnit: '%',
      windValue: '0',
      windUnit: 'm/s',
      roomWaterValue: '正常',
      roomWaterValueNum: '1',
      airValue: '开',
      airValueNum: '1',

      // 曳引机默认值
      vControlValue: '0',
      vControlUnit: 'V',
      iControlValue: '0',
      iControlUnit: 'A',
      tractorTempValue: '0',
      tempUnit: '℃',
      roomVibrateValue: '0',
      roomVibrateUnit: 'mm/s',
      brakeTempValue: '0',
      brakeTempUnit: '℃',
      brakeSkrTempValue: '0',
      brakeSkrTempUnit: '℃',
      vBrakeValue: '0',
      vBrakeUnit: 'V',
      iBrakeValue: '0',
      iBrakeUnit: 'A',
      driveValue: '100',
      driveUnit: '',

      // 限速器默认值
      rpmValue: '0',
      rpmUnit: 'RPM',
      speed: '0',

      // 梯门默认值
      floorDoorValue: '关',
      floorDoorValueNum: '0',
      eleDoorValue: '关',
      eleDoorValueNum: '0',

      // 轿厢默认值
      boxVibrateValue: '0',
      boxVibrateUnit: 'mm/s',
      eleBottomValue: '0',
      eleBottomUnit: 'm',
      currentFloor: '1',
      direction: '停',
      boxWeightValue: '0',
      boxWeightUnit: 'kg',

      // 安全回路默认值
      roomSafeValue: '通',
      roomSafeValueNum: '1',
      boxTopSafeValue: '0',
      boxTopSafeValueNum: '1',
      boxTopSafeUnit: 'rpm',
      boxDoorSafeValue: '0',
      boxDoorSafeValueNum: '1',
      boxDoorSafeUnit: 'rpm',

      floorDoorSafeValue: '0',
      floorDoorSafeValueNum: '1',
      floorDoorSafeUnit: 'A',
      boxBottomSafeValue: '0',
      boxBottomSafeValueNum: '1',
      boxBottomSafeUnit: 'A',

      // 门锁回路默认值
      floorLockValue: '0',
      floorLockValueNum: '1',
      floorLockUnit: 'm/s²',
      boxLockValue: '0',
      boxLockValueNum: '1',
      boxLockUnit: 'm/s²',


      // 温湿度配置
      options: {
        tooltip: {
          trigger: "axis",
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          axisPointer: {
            lineStyle: {
              color: '#1D1B25',
            }
          },
     
        },
        xAxis: {
          type: 'value',
          // inverse: true,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}s',
            color: '#66667F',
            margin: 12
          },
          min: 0,
          max: 60,
          interval: 10,
          name: '(℃)',
          nameLocation: 'start',
          nameTextStyle: {
            color: '#66667F'
          },
          splitLine: {
            show: false,
          },
          // nameGap: 6,
          axisLine: {
            lineStyle: {
              color: '#303240'
            }
          },
          // data: []
        },
        yAxis: {
          axisLabel: {
            show: false,
            color: '#66667F'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#303240'
            }
          },
          splitLine: {
            show: false,
          },
        },
        grid: {
          top: '20px',  
          left: '50px',  
          right: '26px',  
          bottom: '24px'
        },  
        visualMap: { //区间内控制显示颜色
          show: false,
          dimension: 1,
          type: 'continuous',
          range: [0, 500],
          inRange: {
            color: ['#29DDB6']
          },
          outOfRange: {
            color: ['#E75561']
          }
        },
        series: [
          {
            name: "机房温度",
            type: "line",
            // symbolSize: 0,
            showSymbol: false,
            smooth: true,
            lineStyle: {
              width: 3
            },
            // markLine: {
            //   data: [{
            //       name: '',
            //       yAxis: 60
            //   }],
            //   animation: false,
            //   symbolSize: 0,
            //   label: {
            //     position: 'start'
            //   },
            //   lineStyle: {
            //     normal: {
            //       type: 'solid',
            //       color: '#DF4B4B',
            //     },
            //   }
            // },
            // data: dataArr
            data: [[9, 10], [12, 20], [18, 40], [31, 80], [50, 100], [58, 180]]
          },    
        ]
      },

      // 回路配置
      options2: {
        tooltip: {
          trigger: "axis",
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          axisPointer: {
            lineStyle: {
              color: '#1D1B25',
            }
          },
          formatter: '{a}: {c}℃<br /> '
        },
        xAxis: {
          type: 'value',
          // inverse: true,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}s',
            color: '#66667F',
            margin: 12
          },
          min: 0,
          max: 60,
          interval: 10,
          name: '(℃)',
          nameLocation: 'start',
          nameTextStyle: {
            color: '#66667F'
          },
          splitLine: {
            show: false,
          },
          // nameGap: 6,
          axisLine: {
            lineStyle: {
              color: '#303240'
            }
          },
          // data: []
        },
        yAxis: {
          interval: 1,
          splitNumber: 1,
          axisTick: {
            show: false
          },
          axisLabel: {
            // show: true,
            color: '#66667F',
            formatter: function (value, index) {
              if (value == 0) {
                return '异常'
              }
              if (value == 1) {
                return '正常'
              }
              // return '异常'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#303240'
            }
          },
          splitLine: {
            show: false,
          },
      
        },
        grid: {
          top: '20px',  
          left: '50px',  
          right: '26px',  
          bottom: '24px'
        }, 
        visualMap: { //区间内控制显示颜色
          show: false,
          dimension: 1,
          type: 'continuous',
          range: [0, 0.01],
          inRange: {
            color: ['#E75561']
          },
          outOfRange: {
            color: ['#29DDB6']
          }
        },
        series: [
          {
            name: "A类",
            type: "line",
            step: true,
            showSymbol: false,
            lineStyle: {
              width: 2
            },
            // markLine: {
            //   data: [
            //     {
            //       name: '异常',
            //       yAxis: 0
            //     },
            //   ],
            //   animation: false,
            //   symbolSize: 0,
            //   label: {
            //     position: 'start'
            //   },
            //   lineStyle: {
            //     normal: {
            //       type: 'solid',
            //       color: '#66667F',
            //     },
            //   }
            // },
            data: []
          },
          
        ]
      }

    };
  },
  created() {
    this.parentCode = this.$route.query.reg_code
  },
  mounted() {

    // 获取电梯详情
    this.getLiftDetail()

    // setTimeout(() => {
    //   // let room_temp_chart = this.$echarts.getInstanceByDom(document.getElementById("room-temp-chart"));
    //   // let west_chart = this.$echarts.getInstanceByDom(document.getElementById("west-chart"));
    //   // let room_wind_chart = this.$echarts.getInstanceByDom(document.getElementById("room-wind-chart"));
    //   // let room_water_chart = this.$echarts.getInstanceByDom(document.getElementById("room-water-chart"));
    //   // let air_chart = this.$echarts.getInstanceByDom(document.getElementById("air-chart"));

    //   // let motor_v_chart = this.$echarts.getInstanceByDom(document.getElementById("motor-v-chart"));
    //   // let motor_i_chart = this.$echarts.getInstanceByDom(document.getElementById("motor-i-chart"));
    //   // let motor_temp_chart = this.$echarts.getInstanceByDom(document.getElementById("motor-temp-chart"));
    //   // let motor_vibrate_chart = this.$echarts.getInstanceByDom(document.getElementById("motor-vibrate-chart"));
    //   // let brake_temp_chart = this.$echarts.getInstanceByDom(document.getElementById("brake-temp-chart"));
    //   // let brake_skr_chart = this.$echarts.getInstanceByDom(document.getElementById("brake-skr-chart"));
    //   // let v_brake_chart = this.$echarts.getInstanceByDom(document.getElementById("v-brake-chart"));
    //   // let i_brake_chart = this.$echarts.getInstanceByDom(document.getElementById("i-brake-chart"));
    //   // let drive_chart = this.$echarts.getInstanceByDom(document.getElementById("drive-chart"));

    //   // let rpm_chart = this.$echarts.getInstanceByDom(document.getElementById("rpm-chart"));

    //   // let floor_door_chart = this.$echarts.getInstanceByDom(document.getElementById("floor-door-chart"));
    //   // let ele_door_chart = this.$echarts.getInstanceByDom(document.getElementById("ele-door-chart"));

    //   // let box_vibrate_chart = this.$echarts.getInstanceByDom(document.getElementById("box-vibrate-chart"));
    //   // let box_position_chart = this.$echarts.getInstanceByDom(document.getElementById("box-position-chart"));
    //   // let box_weight_chart = this.$echarts.getInstanceByDom(document.getElementById("box-weight-chart"));

    //   // let room_safe_chart = this.$echarts.getInstanceByDom(document.getElementById("room-safe-chart"));


    //   let box_top_safe_chart = this.$echarts.getInstanceByDom(document.getElementById("box-top-safe-chart"));
    //   let box_door_safe_chart = this.$echarts.getInstanceByDom(document.getElementById("box-door-safe-chart"));
    //   let floor_door_safe_chart = this.$echarts.getInstanceByDom(document.getElementById("floor-door-safe-chart"));
    //   let box_bottom_safe_chart = this.$echarts.getInstanceByDom(document.getElementById("box-bottom-safe-chart"));

    //   let floor_lock_chart = this.$echarts.getInstanceByDom(document.getElementById("floor-lock-chart"));
    //   let box_lock_chart = this.$echarts.getInstanceByDom(document.getElementById("box-lock-chart"));

      
    //   window.addEventListener("resize", function() {
    //     // room_temp_chart.resize();
    //     // west_chart.resize();
    //     // room_wind_chart.resize();
    //     // room_water_chart.resize();
    //     // air_chart.resize();

    //     // motor_v_chart.resize();
    //     // motor_i_chart.resize();
    //     // motor_temp_chart.resize();
    //     // motor_vibrate_chart.resize();
    //     // brake_temp_chart.resize();
    //     // brake_skr_chart.resize();
    //     // v_brake_chart.resize();
    //     // i_brake_chart.resize();
    //     // drive_chart.resize();

    //     // rpm_chart.resize();

    //     // floor_door_chart.resize();
    //     // ele_door_chart.resize();

    //     // box_vibrate_chart.resize();
    //     // box_position_chart.resize();
    //     // box_weight_chart.resize();

    //     // room_safe_chart.resize();


    //     box_top_safe_chart.resize();
    //     box_door_safe_chart.resize();
    //     floor_door_safe_chart.resize();
    //     box_bottom_safe_chart.resize();

    //     floor_lock_chart.resize();
    //     box_lock_chart.resize();
      
    //   });

    // }, 300)

    // // 更新时间和实时数据
    // if (this.$route.params.id) {
    //   this.dtID = this.$route.params.id
    // }
    // console.log(this.dtID)
    // this.getCurrentData()
    // this.dateNow = this.formatDate()
    // this.getRealTime()
    // const intervalTimer = setInterval(() => {
    //   this.getRealTime()
    //   this.getCurrentData()
    //   this.dateNow = this.formatDate()
    // }, 2000)
    // // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    // this.$once('hook:beforeDestroy', () => {            
    //   clearInterval(intervalTimer);                                    
    // })

    // 滚动高亮
    // this.scrollNav()

    // 高度自适应
    // this.heightRespon()



  },
  methods: {
    // 高度自适应
    // heightRespon() {
    //   let W = document.body.clientWidth
    //   let H = document.documentElement.clientHeight
    //   let warnWrap = document.getElementById('ed-right2')
    //   let warnUl = document.getElementById('warn-list-ul')
    //   let edRight1 = document.getElementById('ed-right1')
    //   let edMid = document.getElementById('ed-mid')
    //   let edNav = document.getElementById('ed-nav')
    //   console.log(H + '====' + warnWrap)
    //   function changeHeight() {
    //     if (H > 970) {
    //       warnWrap.style.height = H - 130 + 'px'
    //       warnUl.style.height = warnWrap.offsetHeight - 160 + 'px'
    //       edRight1.style.height = H - 330 + 'px'
    //       edMid.style.height = edRight1.offsetHeight - 60 + 'px'
    //       // edNav.style.marginTop = edMid.offsetHeight - 650 + 'px'
    //     }
    //   }
    //   changeHeight()
    //   window.onresize = function () {
    //     changeHeight()
    //   }
    // },

    // 封装时间
    formatDate(){
        // date = new Date(date);
        var date = new Date(Date.now())
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var m1 = date.getMinutes();
        var s = date.getSeconds();
        m = m < 10 ? ("0" + m) : m;
        d = d < 10 ? ("0" + d) : d;
        // return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
        return y + "." + m + "." + d
    },

    // 切换导航
    switchNav(name) {
      this.navActive = name
      if (name == '驱动辊') {
        this.currentView = "EDMotorRoom";
      }
      if (name == '从动辊') {
        this.currentView = "EDTractor";
      }
      if (name == '电动机') {
        this.currentView = "EDSpeed";
      }
      if (name == '开关信号') {
        this.currentView = "EDDoor";
      }
      if (name == '下料口微型拖辊铁架') {
        this.currentView = "EDBox";
      }
      if (name == '联轴器') {
        this.currentView = "EDSafeLoop";
      }
      // if (name == '门锁回路') {
      //   this.currentView = "EDLockLoop";
      // }
    },

    // 锚点平滑跳转
    jump2(index) {
      let that = this
      // this.activeStep = index
      // 用 class="step-jump" 添加锚点
      let jumpArr = document.querySelectorAll('.edType')
      // let testContent = document.getElementById('testContent')
      let scrollbar1 = document.getElementById('scrollbar1')
      let scrollWrap = scrollbar1.firstChild

      if (this.flag) {
        that.flag = false

        let scrollWrapTop = scrollWrap.offsetTop

        let total = jumpArr[index].offsetTop - scrollWrapTop // 目标卷曲位置
        let currentDistance = scrollWrap.scrollTop // 当前卷曲位置
        let step = Math.floor(total / 20)

        // 若需要平滑滚动
        // if (total > currentDistance) {
        //   smoothDown()
        // } else {
        //   let newTotal = currentDistance - total
        //   step = Math.floor(newTotal / 20)
        //   smoothUp()
        // }

        // 若不需要平滑滚动
        scrollWrap.scrollTop = total
        that.flag = true



        // 向下
        function smoothDown() {
          if (currentDistance < total) {
            clearTimeout(timer)
            currentDistance += step
            scrollWrap.scrollTop = currentDistance
            let timer = setTimeout(smoothDown, 10)
          } else {
            scrollWrap.scrollTop = total
            that.flag = true
          }
        }

        // 向上
        function smoothUp () {
          if (currentDistance > total) {
            clearTimeout(timer)
            currentDistance -= step
            scrollWrap.scrollTop = currentDistance
            let timer = setTimeout(smoothUp, 10)
          } else {
            scrollWrap.scrollTop = total
            that.flag = true
          }
        }
      }
      

    },

    jump(index) {
      console.log(index)
    },



    // 滚动高亮
    scrollNav() {
      let that = this

      let scrollbar1 = document.getElementById('scrollbar1')
      let scrollWrap = scrollbar1.firstChild // 触发滚动的主体
      // 大类
      let EDMotorRoom = document.getElementById('EDMotorRoom')
      let EDTractor = document.getElementById('EDTractor')
      let EDSpeed = document.getElementById('EDSpeed')
      let EDDoor = document.getElementById('EDDoor')
      let EDBox = document.getElementById('EDBox')
      let EDSafeLoop = document.getElementById('EDSafeLoop')
      let EDLockLoop = document.getElementById('EDLockLoop')

      let d = 80 // 提前多少距离高亮
      let scrollWrapTop = scrollWrap.offsetTop + d 
      let boxATop = EDMotorRoom.offsetTop - scrollWrapTop // A盒子距离容器顶部的距离
      let boxBTop = EDTractor.offsetTop - scrollWrapTop
      let boxCTop = EDSpeed.offsetTop - scrollWrapTop
      let boxDTop = EDDoor.offsetTop - scrollWrapTop
      let boxETop = EDBox.offsetTop - scrollWrapTop
      let boxFTop = EDSafeLoop.offsetTop - scrollWrapTop
      // let boxGTop = EDLockLoop.offsetTop - scrollWrapTop
      let boxGTop = 3050 // 为最后一个，所以要做特殊处理，scroll为2700

      

      scrollWrap.addEventListener('scroll', () => {
        var current_offset_top = scrollWrap.scrollTop; // 卷曲的高度
        // console.log(current_offset_top)

        // console.log(boxATop)
        if (current_offset_top < boxBTop) {
          that.navActive = "驱动辊";
        } else if (current_offset_top >= boxBTop && current_offset_top < boxCTop) {
          that.navActive = "从动辊";
        } else if (current_offset_top >= boxCTop && current_offset_top < boxDTop) {
          that.navActive = "电动机";
        } else if (current_offset_top >= boxDTop && current_offset_top < boxETop) {
          that.navActive = "开关信号";
        } else if (current_offset_top >= boxETop && current_offset_top < boxFTop) {
          that.navActive = "下料口微型拖辊铁架";
        } else if (current_offset_top >= boxFTop) {
          that.navActive = "联轴器";
        }
        // else if (current_offset_top >= boxCTop) {
        //   this.currentView = "EDSpeed";
        // }

      })
    },

    // 更新电梯实时数据
    getCurrentData() {
      api.detection.getCurrent(this.dtID).then(res => {
        
        
  

        // 速度
        // if (res.data[15]) {
        //   this.eleSpeed = Math.abs((res.data[15].speed / 100).toFixed(2)) || 0
        // }

        // // 轿门状态（目前用的层门状态接口）
        // if (res.data[16]) {
        //   if (res.data[16].value) {
        //     this.eleCurrentDoor = '开'
        //   } else {
        //     this.eleCurrentDoor = '关'
        //   }
        // }
        
        // // 电梯当前楼层、速度、状态
        // if (res.data[19]) {
        //   // console.log(res.data[19])
        //   this.direction = res.data[19].direction
        //   this.eleCurrentFloor = res.data[19].louc
        // }
      })
    },


    // 获取实时数据和绘制历史数据（总）
    getRealTime() {
      api.detection.getCurrent(this.dtID).then(res => {

        console.log(res.data)
        let nowTimestamp = new Date().getTime()
        let arr = []
        let resObj = res.data
        let paramsObj = {}
        arr.push(parseInt(res.data[22].time.substring(0,13)), parseInt(res.data[23].time.substring(0,13)), parseInt(res.data[24].time.substring(0,13)), parseInt(res.data[25].time.substring(0,13)), parseInt(res.data[26].time.substring(0,13)), parseInt(res.data[27].time.substring(0,13)))
        let lastestTime = Math.max.apply(null, arr);
        let countdown = Math.floor((nowTimestamp - lastestTime) / 1000 ) === 0 ? Math.floor((nowTimestamp - lastestTime) / 1000 ) - 1 : 0

        paramsObj[22] = [countdown, resObj[22].value]
        paramsObj[23] = [countdown, resObj[23].value]
        paramsObj[24] = [countdown, resObj[24].value]
        paramsObj[25] = [countdown, resObj[25].value]
        paramsObj[26] = [countdown, resObj[26].value]
        paramsObj[27] = [countdown, resObj[27].value]
     
        // 驱动辊转速，替换轿顶安全回路
        if (res.data[22]) {
          this.boxTopSafeValue = res.data[22].value
          this.boxTopSafeUnit = res.data[22].unit
        }
        this.drawBoxTopSafe(paramsObj[22])

        // 从动辊转速，替换轿门安全回路
        if (res.data[23]) {
          this.boxDoorSafeValue = res.data[23].value
          this.boxDoorSafeUnit = res.data[23].unit
        }
        this.drawBoxDoorSafe(paramsObj[23])

        // 电动机电流，替换层门安全回路
        if (res.data[24]) {
          this.floorDoorSafeValue = res.data[24].value
          this.floorDoorSafeUnit = res.data[24].unit
        }
        this.drawFloorDoorSafe(paramsObj[24])

        // 开关信号电流，替换底坑安全回路
        if (res.data[25]) {
          this.boxBottomSafeValue = res.data[25].value
          this.boxBottomSafeUnit = res.data[25].unit
        }
        this.drawBoxBottomSafe(paramsObj[25])

        // 下料口微型拖辊铁架振动，替换层门门锁回路
        if (res.data[26]) {
          this.floorLockValue = res.data[26].value
          // this.floorLockUnit = res.data[26].unit
   
        }
        this.drawFloorLock(paramsObj[26])

        // 联轴器振动，替换轿门门锁回路
        if (res.data[27]) {
          this.boxLockValue = res.data[27].value
        }
        this.drawBoxLock(paramsObj[27])

      })




    },

    // 切换历史数据曲线
    changeTime(time) {
      console.log(time)
    },

    // 所有历史数据图表
    drawAllCharts() {

      // 轿顶安全回路
      this.drawBoxTopSafe()

      // 轿门安全回路
      this.drawBoxDoorSafe()

      // 层门安全回路
      this.drawFloorDoorSafe()

      // 底坑安全回路
      this.drawBoxBottomSafe()

      // 层门门锁回路
      this.drawFloorLock()

      // 轿门门锁回路
      this.drawBoxLock()
    },

    


    // 第一种情况
    // 机房温度
    drawTemp() {
      let that = this
      let dataValue = [] // 类似于[[x1, y1], [x2, y2], ...]

      api.detection.getD1(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('room-temp-chart'))
        // 当没数据，x轴转为类目轴
        // if (dataValue.length <= 0) {
        //   that.options.xAxis.type = 'category'
        //   that.options.xAxis.data = that.dataX
        // } else {
        //   that.options.xAxis.type = 'value'
        //   that.options.xAxis.data = []
        // }
        that.options.xAxis.type = 'value'
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(℃)'
        that.options.series[0].name = '机房温度'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          // var timestamp = date + value * 1000
          // var time = new Date(timestamp)
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s

          // var res = '时间：' + timeFormat + '<br>值：' + value;
          var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 机房湿度
    drawWest() {
      let that = this
      let dataValue = []

      api.detection.getD2(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('west-chart'))
        that.options.xAxis.type = 'value'
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(%)'
        that.options.series[0].name = '机房湿度'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 机房风速
    drawWind() {
      let that = this
      let dataValue = []

      api.detection.getD3(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('room-wind-chart'))
        that.options.series[0].data = dataValue

        that.options.xAxis.name = '(m/s)'
        that.options.series[0].name = '机房风速'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + timeFormat
          return res
          
        }

        chart.setOption(that.options)
      }
    },

    // 第二种情况
    // 机房水浸
    drawRoomWater() {
      let that = this
      let dataValue = []

      api.detection.getD4(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let value
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          if (item.unit == 'mV') {
            value = 0
          } else {
            value = 1
          }
          arr2 = [second, value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('room-water-chart'))
        that.options2.series[0].data = dataValue
        that.options2.xAxis.name = ''
        that.options2.series[0].name = '机房水浸'
        that.options2.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]
          if (value == 1) {
            value = '正常'
          } else {
            value = '异常'
          }

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options2)
      }
    },

    // 空调
    drawAir() {
      let that = this
      let dataValue = []

      api.detection.getD5(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let value
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          if (item.unit == 'mV') {
            value = 0
          } else {
            value = 1
          }
          arr2 = [second, value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue) {
        let chart = that.$echarts.init(document.getElementById('air-chart'))
        that.options2.xAxis.data = that.dataX
        that.options2.series[0].data = dataValue
        that.options2.xAxis.name = ''
        that.options2.series[0].name = '空调/排气扇'
        that.options2.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]
          if (value == 1) {
            value = '开'
          } else {
            value = '关'
          }

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options2)
      }
    },

    // 电动机电压
    drawMotorV() {
      let that = this
      let dataValue = []

      api.detection.getD6(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('motor-v-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(V)'
        that.options.series[0].name = '电动机电压'
         that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 电动机电流
    drawMotorI() {
      let that = this
      let dataValue = []

      api.detection.getD7(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('motor-i-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(A)'
        that.options.series[0].name = '电动机电流'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 电动机温度
    drawMotorTemp() {
      let that = this
      let dataValue = []

      api.detection.getD8(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('motor-temp-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(℃)'
        that.options.series[0].name = '电动机温度'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 电动机振动
    drawRoomVibrate() {
      let that = this
      let dataValue = []

      // http.get('/iotsqu/lift/dt001/historyData/9').then(res => {
      //   res.data.result.forEach((item, i) => {
      //     dataValue.unshift(item.value)
      //   })
      //   dataValue.push(currentVal)
      //   motorVChart(dataValue)
      // })

      api.detection.getD9(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })


      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('motor-vibrate-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(m/s²)'
        that.options.series[0].name = '电动机振动'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 制动器线圈温度
    drawBrakeTemp() {
      let that = this
      let dataValue = []

      api.detection.getD10(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })


      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('brake-temp-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(℃)'
        that.options.series[0].name = '制动器温度'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          // var timestamp = date + value * 1000
          // var time = new Date(timestamp)
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s

          // var res = '时间：' + timeFormat + '<br>值：' + value;
          var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 刹车片温度
    drawBrakeSkrTemp() {
      let that = this
      let dataValue = []

      api.detection.getD11(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('brake-skr-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(℃)'
        that.options.series[0].name = '制动器刹车片温度'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 制动器电压
    drawVBrake() {
      let that = this
      let dataValue = []

      api.detection.getD12(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('v-brake-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(V)'
        that.options.series[0].name = '制动器电压'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 制动器电流
    drawIBrake() {
      let that = this
      let dataValue = []

      api.detection.getD13(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('i-brake-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(A)'
        that.options.series[0].name = '制动器电流'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 曳引轮磨损
    drawDrive() {
      let that = this
      let dataValue = []

      api.detection.getD14(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('drive-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = ''
        that.options.series[0].name = '曳引轮磨损'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '<br>时间：' + timeFormat
          return res
          
        }
        // console.log(dataValue)
        chart.setOption(that.options)
      }
    },

    // 限速器转速
    drawRpm() {
      let that = this
      let dataValue = []

      api.detection.getD15(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('rpm-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(rpm)'
        that.options.series[0].name = '限速轮'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },


    // 层门
    drawFloorDoor() {
      let that = this
      let dataValue = []

      api.detection.getD16(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let value
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          if (item.unit == 'off') {
            value = 0
          } else {
            value = 1
          }
          arr2 = [second, value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue) {
        let chart = that.$echarts.init(document.getElementById('floor-door-chart'))
        that.options2.series[0].data = dataValue
        that.options2.xAxis.name = ''
        that.options2.series[0].name = '层门开关'
        that.options2.yAxis.axisLabel.formatter = function (value, index) {
          if (value == 0) {
            return '关'
          }
          if (value == 1) {
            return '开'
          }
        }
        that.options2.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]
          if (value == 1) {
            value = '开'
          } else {
            value = '关'
          }

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options2)
      }
    },

    // 轿门
    drawEleDoor() {
      let that = this
      let dataValue = []

      api.detection.getD16(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let value
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          if (item.unit == 'off') {
            value = 0
          } else {
            value = 1
          }
          arr2 = [second, value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue) {
        let chart = that.$echarts.init(document.getElementById('ele-door-chart'))
        that.options2.series[0].data = dataValue
        that.options2.xAxis.name = ''
        that.options2.series[0].name = '轿门开关'
        that.options2.yAxis.axisLabel.formatter = function (value, index) {
          if (value == 0) {
            return '关'
          }
          if (value == 1) {
            return '开'
          }
        }
        that.options2.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]
          if (value == 1) {
            value = '开'
          } else {
            value = '关'
          }

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options2)
      }
    },

    // 轿厢振动
    drawBoxVibrate() {
      let that = this
      let dataValue = []

      api.detection.getD18(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })


      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('box-vibrate-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(m/s²)'
        that.options.series[0].name = '轿厢振动'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 轿厢位置
    drawBoxPosition() {
      let that = this
      let dataValue = []

      api.detection.getD19(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('box-position-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(F)'
        that.options.series[0].name = '轿厢位置'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          var timeFormat = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()

          // var res = '时间：' + timeFormat + '<br>值：' + value;
          var res = params[0].seriesName + '：' + value + 'F' + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options)
      }
    },

    // 轿厢荷载
    drawBoxWeight() {
      let that = this
      let dataValue = []

      api.detection.getD20(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('box-weight-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(kg)'
        that.options.series[0].name = '轿厢荷载'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          var timeFormat = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()

          // var res = '时间：' + timeFormat + '<br>值：' + value;
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options)
      }
    },


    // 机房安全回路
    drawRoomSafe() {
      let that = this
      let dataValue = []

      api.detection.getD21(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
        res.data.result.forEach((item, i) => {
          let value
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          if (item.unit == 'mV') {
            value = 0
          } else {
            value = 1
          }
          arr2 = [second, value]
          dataValue.push(arr2)
        })
        motorVChart(dataValue, unit, nowTimestamp)
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('room-safe-chart'))
        that.options2.series[0].data = dataValue
        that.options2.xAxis.name = ''
        that.options2.series[0].name = '机房安全回路'
        that.options2.yAxis.axisLabel.formatter = function (value, index) {
          if (value == 0) {
            return '断'
          }
          if (value == 1) {
            return '通'
          }
        }
        that.options2.tooltip.formatter = function (params,ticket,callback) {
          var date = Date.now()
          var key = params[0].data[0]
          var value = params[0].data[1]
          if (value == 1) {
            value = '通'
          } else {
            value = '断'
          }

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + '<br>时间：' + timeFormat
          return res
        }
        chart.setOption(that.options2)
      }
    },

   
    // 驱动辊转速，替换轿顶安全回路
    drawBoxTopSafe(param) {
      let that = this
      let dataValue = []

      api.detection.getD22(this.dtID, this.historyTime).then(res => {
        console.log('get22', res)
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        dataValue.push(param)
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        // let chart = that.$echarts.init(document.getElementById('rpm-chart'))
        let chart = that.$echarts.init(document.getElementById('box-top-safe-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(rpm)'
        that.options.series[0].name = '驱动辊转速'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 从动辊转速，替换轿门安全回路
    drawBoxDoorSafe(param) {
      let that = this
      let dataValue = []

      api.detection.getD23(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        dataValue.push(param)
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('box-door-safe-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(rpm)'
        that.options.series[0].name = '从动辊转速'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 电动机电流，替换层门安全回路
    drawFloorDoorSafe(param) {
      let that = this
      let dataValue = []

      api.detection.getD24(this.dtID, this.historyTime).then(res => {
        console.log('24', res.data)
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        dataValue.push(param)
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('floor-door-safe-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(A)'
        that.options.series[0].name = '电动机电流'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 开关信号电流，替换底坑安全回路
    drawBoxBottomSafe(param) {
      let that = this
      let dataValue = []

      api.detection.getD25(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        dataValue.push(param)
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('box-bottom-safe-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = '(A)'
        that.options.series[0].name = '开关信号电流'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },



    // 下料口微型拖辊铁架振动，替换层门门锁回路
    drawFloorLock(param) {
      let that = this
      let dataValue = []

      api.detection.getD26(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        dataValue.push(param)
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('floor-lock-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = 'm/s²'
        that.options.series[0].name = '下料口微型拖辊铁架振动'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 联轴器振动，替换轿门门锁回路
    drawBoxLock(param) {
      let that = this
      let dataValue = []

      api.detection.getD27(this.dtID, this.historyTime).then(res => {
        // 组装xy数据
        let unit = res.data.result[0].unit
        let nowTimestamp = Date.now()
  
        res.data.result.forEach((item, i) => {
          let arr2 = []
          let second = Math.floor((nowTimestamp - new Date(item.time).getTime()) / 1000)
          arr2 = [second, item.value]
          dataValue.push(arr2)
        })
        dataValue.push(param)
        // console.log(dataArr)
        motorVChart(dataValue, unit, nowTimestamp) // 传当时时间戳防止时间错乱
      })
      .catch(err => {
        motorVChart(dataValue)
      })

      function motorVChart(dataValue, unit, nowTimestamp) {
        let chart = that.$echarts.init(document.getElementById('box-lock-chart'))
        that.options.series[0].data = dataValue
        that.options.xAxis.name = 'm/s²'
        that.options.series[0].name = '联轴器振动'
        that.options.tooltip.formatter = function (params,ticket,callback) {
          var date = nowTimestamp
          var key = params[0].data[0] 
          var value = params[0].data[1]

          var timestamp = date - key * 1000
          var time = new Date(timestamp)
          let min = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
          let s = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()
          var timeFormat = time.getHours() + ':' + min + ':' + s
          var res = params[0].seriesName + '：' + value + unit + '<br>时间：' + timeFormat
          return res
          
        }
        chart.setOption(that.options)
      }
    },

    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/detection',
        query: {
          reg_code: val
        }
      })
      console.log('pp', this.parentCode)
    },

    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
        console.log('res', res)
        let detail = res.data.data
        this.reg_code = detail.reg_code
        this.in_num = detail.in_num
        this.local_area = detail.local_area
        this.address = detail.address

        // 查询异常告警列表
        this.getWarnList()
      })
    },

    // 查询异常告警列表
    getWarnList() {
      api.detection.getWarnList(this.reg_code, JSON.stringify(this.warnParams)).then(res => {
        console.log('异常告警', res)
        this.warnList = res.data.data.records
      })

    },

    // 异常告警日期筛选
    changeTriggleTime(triggle_time) {
      this.warnParams.query.triggle_time = triggle_time
      this.getWarnList()
    },

    // 异常告警类型筛选
    changeDiagnType(diagn_type) {
      this.warnParams.query.diagn_type = diagn_type
      this.getWarnList()
    },

    // 异常告警进度筛选
    changeProcessed(processed) {
      console.log('processed', processed)
      this.warnParams.query.processed = processed
      this.getWarnList()
    },



    
  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    
  },
  filters: {
    // 转换故障类型
    changeDiagnType(value) {
      if (value == 1) {
        return '故障'
      } else if (value == 2) {
        return '违规'
      } else if (value == 3) {
        return '预警'
      } else {
        return '事故'
      }
    },

    // 转换处理进度
    changeProcessed(value) {
      if (value == 1) {
        return '处理中'
      } else if (value == 2) {
        return '已完成'
      } else {
        return '未处理'
      }
    },
  },
};
</script>


<style>
#ed .el-input__inner{
  background: none;
  border: none;
}
</style>


<style lang="stylus" scoped>
@import '../../assets/stylus/xymStyle.styl'

#ed {

  .container{
    line-height: 1;
  }
  .det-heading{
    padding: 0 20px 20px;
    background: #fff;
    
  }
  .det-heading-info{
    float: left;
    width: 60%;
  }
  .dhi-title{
    font-size: 20px;
    color: #34414C;
    line-height: 28px;
    font-weight: bold;
    padding-top: 14px;
  }
  .dhi-ul li{
    float: left;
    font-size: 14px;
    color: #34414C;
    line-height: 22px;
    margin-top: 10px;
    margin-right: 30px;
  }
  .dhi-ul li span{
    color: #7E8A95;
  }
  .det-heading-search{
    float: right;
    width: 320px;
    margin-top: 30px;
  }

  .ed-left {
    width: 472px;
    float: left;
  }
  .ed-profile{
    position: relative;
    box-sizing: border-box;
    height: 160px;
    background: #12151c;
    box-shadow: 0 21px 20px -14px rgba(10, 23, 63, 0.15);
    border-radius: 10px;
    padding: 20px;
  }
  .ed-profile-state em{
    display: inline-block;
    font-style: normal;
    font-size: 18px;
    color: #FFFFFF;
  }
  .ed-profile-state span{
    display: inline-block;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
    height: 20px;
    padding: 0 12px;
    border-radius: 4px;
    margin-left: 20px;
  }
  .ed-profile-state span.normal{
    background: #0DBA7F;
  }
  .ed-profile-state span.maintenance{
    background: #6B50D0;
  }
  .ed-profile-state span.fault{
    background: #FEC101;
  }
  .ed-profile-state span.help{
    background: #F56F6F;
  }
  .ed-profile-table{
    width: 100%;
    margin-top: 8px;
  }
  .ed-profile-table td{
    padding: 4px 0;
  }
  .ed-profile-table .edp-table-title{
    font-size: 12px;
    color: #66667F;
  }
  .ed-profile-table .edp-table-p{
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ed-elevator {
    position: relative;
    box-sizing: border-box;
    // height: 600px;
    height: 495px;
    background: #12151c url('../../assets/images/xym/ele-bg.png') no-repeat center -5px;
    box-shadow: 0 21px 20px -14px rgba(10, 23, 63, 0.15);
    border-radius: 10px;
    margin-top: 20px;
    border-top: 1px solid #12151c;
  }
  .ed-elevator-name {
    position: absolute;
    right: 30px;
    top: 40px;
    font-size: 24px;
    color: #ffffff;
  }
  .ed-ebox-title {
    padding-left: 30px;
    padding-top: 8px;
  }
  .ed-ebox-title h3 {
    font-weight: normal;
    font-size: 70px;
    line-height: 70px;
    color: #0DBA7F;
  }
  .ed-ebox-title h3 span{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    color: #66667F;
  }
  .ed-ebox-title p {
    font-size: 12px;
    color: #66667f;
  }
  .ed-ebox {
    width: 242px;
    height: 370px;
    background: url("../../assets/images/xym/evn.png") no-repeat center center;
    // background-size: 80% auto;
    margin-top: 26px;
    margin-left: 26px;
  }
  .ed-ebox-data {
    position: absolute;
    top: 32px;
    right: 20px;
    text-align: center;
    width: 120px;
  }
  .ed-ebox-data-floor {
    font-weight: normal;
    font-size: 58px;
    color: #FFFFFF;
    margin: 10px 0;
    line-height: 1 !important;
  }
  .ed-ebox-data-floor span {
    font-size: 14px;
  }
  .ed-ebox-udBtn{
    position: absolute;
    top: 150px;
    left: 278px;
  }
  .ed-ebox-data-btn {
    position: relative;
    width: 34px;
    height: 24px;
    // margin: 0 auto;
    margin-top: 16px;
  }
  .ed-ebox-data-up {
    width: 34px;
    height: 24px;
    background: url("../../assets/images/xym/up_normal.png") no-repeat center center;
  }
  .ed-ebox-data-up2 {
    position: absolute;
    top: -7px;
    left: 0;
    width: 34px;
    height: 24px;
    background: url("../../assets/images/xym/up_highlight.png") no-repeat center
      center;
    animation: btnMove1 1s ease infinite;
    display: none;
  }
  .ed-ebox-data-btn.on .ed-ebox-data-up2{
    display: block;
  }
  .ed-ebox-data-btn.on .ed-ebox-data-up {
    background: url("../../assets/images/xym/up_highlight.png") no-repeat center center;
  }
  .ed-ebox-data-down {
    width: 34px;
    height: 24px;
    background: url("../../assets/images/xym/down_normal.png") no-repeat center center;
  }
  .ed-ebox-data-btn.on .ed-ebox-data-down {
    background: url("../../assets/images/xym/down_highlight.png") no-repeat center center;
  }
  .ed-ebox-data-down2 {
    display: none;
    position: absolute;
    top: 7px;
    left: 0;
    width: 34px;
    height: 24px;
    z-index: 2;
    background: url("../../assets/images/xym/down_highlight.png") no-repeat center center;
    animation: btnMove2 1s ease infinite;
    display: none;

  }
  .ed-ebox-data-btn.on .ed-ebox-data-down2{
    display: block;
  }
  @keyframes btnMove1 {
    0%{transform: translateY(0);}
    60%{transform: translateY(-3px);}
    100%{transform: translateY(0);}
  }
  @keyframes btnMove2 {
    0%{transform: translateY(0);}
    60%{transform: translateY(3px);}
    100%{transform: translateY(0);}
  }
  .ed-ebox-data-speed {
    font-size: 24px;
    color: #ffffff;
    margin: 8px 0;
  }
  .ed-ebox-data-speed span {
    font-size: 14px;
  }
  .ed-ebox-sum {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 0;
    border-top: 2px solid #000;
  }
  .ede-sum-box {
    box-sizing: border-box;
    float: left;
    width: 25%;
    padding-left: 4%;
    line-height: 1;
  }
  .ede-sum-box h4 {
    font-weight: normal;
    font-size: 24px;
    color: #ffffff;
  }
  .ede-sum-box h4 span {
    font-size: 14px;
  }
  .ede-sum-box p {
    font-size: 12px;
    color: #66667f;
    line-height: 20px;
    margin-top: 6px;
  }
  .ed-elist {
    position: relative;
    box-sizing: border-box;
    height: 250px;
    background: #12151c;
    box-shadow: 0 21px 20px -14px rgba(10, 23, 63, 0.15);
    border-radius: 10px;
    margin-top: 20px;
    /* padding: 0 25px; */
    padding: 0 0 0 25px;
  }
  .ed-elist-title {
    font-size: 18px;
    color: #ffffff;
    padding-top: 15px;
  }
  .ed-elist-table-container {
    height: 172px;
    margin-top: 10px;
  }
  .ed-elist-table {
    box-sizing: border-box;
    width: 96%;
  }
  .ed-elist-table th {
    font-size: 12px;
    line-height: 20px;
    color: #66667f;
    font-weight: normal;
    padding: 6px 0;
    text-align: left;
  }
  .ed-elist-table td {
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    padding: 6px 0;
    /* border-top: 1px solid #303240; */
  }
  .ed-elist-table .elist-fail{
    color: #FEC101;
  }
  .elist-video {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    width: 16px;
    margin-right: 10px;
    margin-top: -2px;
    background: url("../../assets/images/xym/play.png") no-repeat center center;
  }
  .elist-standard {
    margin-left: 30px;
    display: inline-block;
  }
  .elist-standard.elist-standard-non {
    color: #f56f6f;
  }

  .ed-mid {
    padding-top: 1px;
    float: left;
    width: 7%;
    // margin-left: 30px;
    margin-top: 30px;
    position: relative;
    box-sizing: border-box;
    height: 542px;
    background: #24242f;
    box-shadow: 0 21px 20px -14px rgba(10, 23, 63, 0.15);
    /* border-radius: 10px; */
    background-image: linear-gradient(
      90deg,
      rgba(18, 21, 28, 0.22) 0%,
      #12151c 42%
    );
    border-radius: 10px 0 0 10px;
  }
  .ed-nav {
    // padding-top: 1px;
    // margin-top: 20px;
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    height: 500px;
    transform: translateY(-50%)
  }
  .ed-nav-box {
    position: relative;
    box-sizing: border-box;
    height: 80px;
    padding-top: 12px;
    border-left: 4px solid #23232e;
    padding-right: 4px;
    cursor: pointer;
    margin-top: 3px;
  }
  .ed-nav-box.on {
    border-left: 4px solid #27DBB2;
    /* background-image: linear-gradient(90deg, rgba(13,186,127,0.08) 0%, rgba(13,186,127,0.91) 100%); */
    background-image: linear-gradient(90deg, rgba(13,186,127,0.91) 0%, rgba(13,186,127,0.08) 100%);
  }
  .warning {
    position: absolute;
    top: 10px;
    right: 30px;
    width: 15px;
    height: 13px;
    background: url("../../assets/images/xym/warning.png") no-repeat center center;
  }
  .edn-icon {
    width: 32px;
    height: 32px;
    margin: 0 auto;
  }
  .edn-icon1 {
    // background: url("../../assets/images/xym/motor_room_normal.png") no-repeat
    //   center center;
    background: url("../../assets/images/xym/ednn1.png") no-repeat
    center center;
  }
  .ed-nav-box.on .edn-icon1 {
    background: url("../../assets/images/xym/motor_room_highlight.png") no-repeat
      center center;
  }
  .edn-icon2 {
    // background: url("../../assets/images/xym/tractor_normal.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/ednn2.png") no-repeat center center;
  }
  .ed-nav-box.on .edn-icon2 {
    background: url("../../assets/images/xym/tractor_highlight.png") no-repeat
      center center;
  }
  .ed-nav-box.on .edn-icon2 {
    background: url("../../assets/images/xym/tractor_highlight.png") no-repeat
      center center;
  }
  .edn-icon3 {
    // background: url("../../assets/images/xym/governor_normal.png") no-repeat
    //   center center;
    background: url("../../assets/images/xym/ednn3.png") no-repeat
    center center;
  }
  .ed-nav-box.on .edn-icon3 {
    background: url("../../assets/images/xym/governor_highlight.png") no-repeat
      center center;
  }
  .edn-icon4 {
    // background: url("../../assets/images/xym/door_normal.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/ednn4.png") no-repeat center center;
  }
  .ed-nav-box.on .edn-icon4 {
    background: url("../../assets/images/xym/door_highlight.png") no-repeat center center;
  }
  .edn-icon5 {
    // background: url("../../assets/images/xym/landing_normal.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/ednn5.png") no-repeat center center;
  }
  .ed-nav-box.on .edn-icon5 {
    background: url("../../assets/images/xym/landing_highlight.png") no-repeat
      center center;
  }
  .edn-icon6 {
    // background: url("../../assets/images/xym/loop_normal.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/ednn6.png") no-repeat center center;
  }
  .ed-nav-box.on .edn-icon6 {
    background: url("../../assets/images/xym/loop_highlight.png") no-repeat center center;
  }
  .edn-icon7 {
    background: url("../../assets/images/xym/loop_normal.png") no-repeat center center;
  }
  .ed-nav-box.on .edn-icon7 {
    background: url("../../assets/images/xym/loop_highlight.png") no-repeat center center;
  }

  .ed-nav-box p {
    font-size: 14px;
    color: #66667f;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .ed-nav-box.on p {
    color: #fff;
  }
  .ed-right1 {
    box-sizing: border-box;
    float: left;
    // width: 900px;
    width: 93%;
    position: relative;
    box-sizing: border-box;
    height: 605px;
    // height: 930px;
    background: #12151c;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 50px 0 20px 30px !important;
    z-index: 10;
    overflow: hidden;
  }
  .ed-item {
    padding-right: 20px;
    padding-bottom: 10px;
    margin-top: 3px;
  }
  .ed-item-title {
    font-size: 20px;
    color: #ffffff;
  }
  // .ed-item-time-change-block{
  //   height: 52px;
  // }
  .ed-item-time-change{
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: right;
    z-index: 60;
    // height: 40px;
    padding: 15px 20px;
    background: #12151C;
  }
  .ed-item-time-change span{
    display: inline-block;
    cursor: pointer;
    line-height: 22px;
    text-align: center;
    padding: 0 15px;
    margin-left: 10px;
    font-size: 14px;
    color: #656886;
    border-radius: 5px;
  }
  .ed-item-time-change span.on{
    color: #FFFFFF;
    background-color: #0DBA7F;
  }
  .ed-item-chart-box {
    position: relative;
    /* padding: 20px 0 20px; */
    /* border-bottom: 1px solid #303240; */
    margin-top: -8px;
  }
  .ed-item-chart-data {
    float: left;
    width: 180px;
    margin-top: 14px;
  }
  .edic-data-icon {
    float: left;
    width: 48px;
    height: 48px;
    margin-top: 8px;
  }
  .edic-data-icon1 {
    background: url("../../assets/images/xym/temp_normal.png") no-repeat center center;
  }
  .edic-data-icon2 {
    background: url("../../assets/images/xym/humidity_normal.png") no-repeat center center;
  }
  .edic-data-icon3 {
    background: url("../../assets/images/xym/wind_normal.png") no-repeat center center;
  }
  .edic-data-icon4 {
    background: url("../../assets/images/xym/water_normal.png") no-repeat center center;
  }
  .edic-data-icon5 {
    background: url("../../assets/images/xym/air_normal.png") no-repeat center center;
  }
  .edic-data-icon6 {
    background: url("../../assets/images/xym/v_normal.png") no-repeat center center;
  }
  .edic-data-icon7 {
    background: url("../../assets/images/xym/a_normal.png") no-repeat center center;
  }
  .edic-data-icon8 {
    background: url("../../assets/images/xym/temp_normal.png") no-repeat center center;
  }
  .edic-data-icon9 {
    background: url("../../assets/images/xym/vibrate_normal.png") no-repeat center center;
  }
  .edic-data-icon10 {
    background: url("../../assets/images/xym/temp_normal.png") no-repeat center center;
  }
  .edic-data-icon11 {
    background: url("../../assets/images/xym/temp_normal.png") no-repeat center center;
  }
  .edic-data-icon12 {
    background: url("../../assets/images/xym/v_normal.png") no-repeat center center;
  }
  .edic-data-icon13 {
    background: url("../../assets/images/xym/a_normal.png") no-repeat center center;
  }
  .edic-data-icon14 {
    background: url("../../assets/images/xym/drive_normal.png") no-repeat center center;
  }
  .edic-data-icon15 {
    background: url("../../assets/images/xym/speed_normal.png") no-repeat center center;
  }
  .edic-data-icon16 {
    background: url("../../assets/images/xym/floor_door_normal.png") no-repeat center center;
  }
  .edic-data-icon18 {
    background: url("../../assets/images/xym/vibrate_normal.png") no-repeat center center;
  }
  .edic-data-icon19 {
    background: url("../../assets/images/xym/position_normal.png") no-repeat center center;
  }
  .edic-data-icon20 {
    background: url("../../assets/images/xym/room_weight_normal.png") no-repeat center center;
  }
  .edic-data-icon21 {
    background: url("../../assets/images/xym/loop.png") no-repeat center center;
  }
  .edic-data-icon22 {
    // background: url("../../assets/images/xym/loop.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/rpm.png") no-repeat center center;
  }
  .edic-data-icon23 {
    // background: url("../../assets/images/xym/loop.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/rpm.png") no-repeat center center;
  }
  .edic-data-icon24 {
    // background: url("../../assets/images/xym/loop.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/a_normal.png") no-repeat center center;
  }
  .edic-data-icon25 {
    // background: url("../../assets/images/xym/loop.png") no-repeat center
    //   center;
    background: url("../../assets/images/xym/a_normal.png") no-repeat center center;
  }
  .edic-data-icon26 {
    background: url("../../assets/images/xym/vibrate.png") no-repeat center center;
  }
  .edic-data-icon27 {
    background: url("../../assets/images/xym/vibrate.png") no-repeat center center;
  }
  .edic-data-p {
    float: left;
    width: 60%;
    margin-left: 14px;
    margin-top: 10px;
    line-height: 1;
  }
  .edic-data-p h4 {
    font-weight: normal;
    font-size: 26px;
    color: #ffffff;
  }
  .edic-data-p h4 em {
    font-style: normal;
    font-size: 24px;
  }
  .edic-data-p h4 span {
    font-size: 14px;
    margin-left: 5px;
  }
  .edic-data-p p {
    font-size: 14px;
    color: #66667f;
    margin-top: 8px;
  }
  .ed-item-chart {
    float: left;
    // width: 650px;
    width: 82%;
    height: 100px;
    /* margin-left: 10px; */
  }
  .item-chart {
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .ed-item-warn {
    position: absolute;
    top: 20px;
    right: 0;
    display: inline-block;
    background: url("../../assets/images/xym/warning.png") no-repeat left center;
    background-size: cover;
    font-size: 14px;
    color: #656886;
    line-height: 20px;
    padding-left: 20px;
    cursor: pointer;
  }
  
  .ed-ebox-sc{
    text-align: center;
    margin-top: 24px;
  }
  .ed-ebox-sc h4{
    font-weight: normal;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 1;
  }
  .ed-ebox-sc h4 span {
    font-size: 14px;
    color: #fff;
  }
  .ed-ebox-sc p{
    font-size: 12px;
    color: #66667F;
    margin-top: 10px;
    line-height: 1;
  }
  .ed-new-left{
    float: left;
    width: 82%;
  }



  .ed-item-new-warn-p{
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 30px;
    width: 80%;
    z-index: 66;
    font-size: 14px;
    color: #66667F;
    padding: 15px 20px;
    background: url('../../assets/images/xym/warn-test.png') no-repeat left center;
  }
  .new-warn-list-p{
    font-size: 14px;
    line-height: 24px;
    color: #66667F;
    padding-left: 20px;
    margin-top: 6px;
    background: url('../../assets/images/xym/warn-test.png') no-repeat left center;

  }
  .ed-old-list{
    padding-top: 20px;
  }
  .det-content{
    margin: 20px;
  }
  .det-warn{
    float: left;
    background: #FFFFFF;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    border-radius: 8px;
    height: 783px;
    width: 28%;
  }
  .det-warn-title{
    font-size: 16px;
    color: #34414C;
    line-height: 60px;
    padding: 0 20px;
  }
  .dwc-box{
    position: relative;
    float: left;
    width: 33.3%;
  }
  .det-warn-choose{
    background: #F5F6F7;
  }
  .dwc-date-icon{
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 40px;
    background: url('../../assets/images/xym/date.png') no-repeat center center;
  }
  .dwc-box-line{
    position: absolute;
    top: 13px;
    right: -3px;
    height: 14px;
    width: 1px;
    background: #D8DDDF;
  }
  .dw-list{
    padding: 0 20px;
    height: 660px;
    overflow: auto;
  }
  .dw-list-box{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px dashed #D8DDDF;
    cursor: pointer;
  }
  .dwlb-p {
    padding-right: 64px;
  }
  .dwlb-p h4{
    font-size: 14px;
    color: #34414C;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dwlb-p p{
    font-size: 14px;
    color: #7E8A95;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dwlb-rate{
    position: absolute;
    top: 27px;
    right: 0px;
    font-size: 14px;
    color: #34414C;
  }
  .dwlb-rate.no-deal{
    color: #FA4F43;
  }



}



</style>
