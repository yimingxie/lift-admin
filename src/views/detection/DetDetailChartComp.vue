<template>
  <div id="DetDetailChartComp">
    <h2>detail</h2>
    <div style="width: 1000px; margin: 0 auto;">
      
      <!-- TODO 图表 所有图表和判断待完成 -->
      <!-- 用遍历、判断进行渲染，命名用后缀-pro区分 -->
      <div class="diagnose-problem-chart" v-for="(item, i) in deviceList" :key="i">
        <!-- 一级目录：运行环境 -->
        <!-- monitorObject: "0:0:0" "2:0:0" -->
        <!-- v-if="item.code.slice(0,5) == '0:0:0' ||" -->
        <div class="dnProblem-first">
          <div class="dnProblem-first-title">运行环境</div>
          <div class="dnProblem-second">
            <div class="dnProblem-second-title">机房</div>
            <!-- v-if="item.code == '0:0:0:1'" -->
            <!-- chart id要记得加后缀-pro -->
            <div class="dcc-box" v-if="item == '0:0:0:1'">
              <div class="dcc-box-data clearfix">
                <div class="dccb-data-icon">
                  <img src="../../assets/images/xym/wendu.png" alt="">
                </div>
                <div class="dccb-data-p">
                  <div class="dccb-data-p1"><span>{{jfwdVal}}</span>℃</div>
                  <div class="dccb-data-p2">机房温度</div>
                </div>
              </div>
              <div class="dcc-box-chart">
                <div class="real-chart" id="real-chart-jfwd-pro"></div>
              </div>
            </div>
            <div class="dcc-box" v-if="item == '0:0:0:2'">
              <div class="dcc-box-data clearfix">
                <div class="dccb-data-icon">
                  <img src="../../assets/images/xym/shidu.png" alt="">
                </div>
                <div class="dccb-data-p">
                  <div class="dccb-data-p1"><span>{{jfsdVal}}</span>℃</div>
                  <div class="dccb-data-p2">机房湿度</div>
                </div>
              </div>
              <div class="dcc-box-chart">
                <div class="real-chart" id="real-chart-jfsd-pro"></div>
              </div>
            </div>
            <div class="dcc-box" v-if="item == '0:0:0:3'">
              <div class="dcc-box-data clearfix">
                <div class="dccb-data-icon">
                  <img src="../../assets/images/xym/fengsu.png" alt="">
                </div>
                <div class="dccb-data-p">
                  <div class="dccb-data-p1"><span>{{jffsVal}}</span>m/s</div>
                  <div class="dccb-data-p2">机房风速</div>
                </div>
              </div>
              <div class="dcc-box-chart">
                <div class="real-chart" id="real-chart-jffs-pro"></div>
              </div>
            </div>


          </div>
          <div class="dnProblem-second">
            <div class="dnProblem-second-title">井道</div>
            <div class="dcc-box" v-if="item == '2:0:0:1'">
              <div class="dcc-box-data clearfix">
                <div class="dccb-data-icon">
                  <img src="../../assets/images/xym/wendu.png" alt="">
                </div>
                <div class="dccb-data-p">
                  <div class="dccb-data-p1"><span>{{jdwdVal}}</span>℃</div>
                  <div class="dccb-data-p2">井道温度</div>
                </div>
              </div>
              <div class="dcc-box-chart">
                <div class="real-chart" id="real-chart-jdwd"></div>
              </div>
            </div>
            <div class="dcc-box" v-if="item == '2:0:0:2'">
              <div class="dcc-box-data clearfix">
                <div class="dccb-data-icon">
                  <img src="../../assets/images/xym/shidu.png" alt="">
                </div>
                <div class="dccb-data-p">
                  <div class="dccb-data-p1"><span>{{jdsdVal}}</span>%</div>
                  <div class="dccb-data-p2">井道湿度</div>
                </div>
              </div>
              <div class="dcc-box-chart">
                <div class="real-chart" id="real-chart-jdsd"></div>
              </div>
            </div>


          </div>
          



        </div>



      </div>


    </div>

  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'


export default {
  props: ['codelist'],
  data() {
    return {
      parentCode: '',
      deviceList: this.codelist, // 数组，存放出现问题的设备的code "0:0:0:1"

      changeTimeNum: 0,

      // 实时值
      jfwdVal: 0,
      jfsdVal: 0,
      jffsVal: 0,
      jdwdVal: 0,
      jdsdVal: 0,
      jfdydyVal: 0,
      jfdydlVal: 0,
      msaqhldyVal: 0,
      msaqhldlVal: 0,
      aqkgmldyVal: 0,
      jxkgdyVal: 0,
      jskgdysVal: 0,
      jskgdyxVal: 0,
      qpjskgdysVal: 0,
      pcgyqdyVal: 0,
      ddjdydyVal: 0,
      ddjdydlVal: 0,
      ddjwkwdVal: 0,
      ddjwkzdVal: 0,
      ddjzcwdVal: 0,
      ddjzczdVal: 0,
      zdqdydyVal: 0,
      zdqdydlVal: 0,
      zdqxqwdVal: 0,
      zdqzwwdVal: 0,
      xsqsdVal: 0,
      xsqqsVal: 0,
      jdzhkzqdyVal: 0,
      jdjxkgdyVal: 0,
      jdmjmddyVal: 0,
      jdmjmddlVal: 0,
      jxwzVal: 0,
      jxxtzdVal: 0,
      jddgzdVal: 0,
      jdcmkhVal: 0,


      // 温湿度配置
      options: {
        tooltip: {
          trigger: "axis",
          confine: true,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          axisPointer: {
            lineStyle: {
              color: '#1D1B25',
            }
          },
          // formatter: function (params,ticket,callback) {
          //   var key = params[0].data[0] 
          //   var value = params[0].data[1]
          //   key = this.tooltipFormatDate(key)
          //   // var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + key
          //   var res = key + '<br>' + params[0].seriesName + '：' + value + '℃'
          //   return res
            
          // },
     
        },
        xAxis: {
          type: 'time',
          // inverse: true,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            // formatter: '{value}s',
            color: '#C2C7CC',
            margin: 12
          },
          min: 1561969680000,
          max: 1561970280000,
          interval: 300000,
          // splitNumber: 3,
          // name: '0',
          nameLocation: 'start',
          nameTextStyle: {
            color: '#C2C7CC'
          },
          splitLine: {
            show: false,
          },
          // nameGap: 6,
          axisLine: {
            lineStyle: {
              color: '#C2C7CC'
            }
          },
          // data: []
        },
        yAxis: {
          axisLabel: {
            // show: false,
            color: '#C2C7CC'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#C2C7CC'
            }
          },
          splitLine: {
            show: false,
          },
          splitNumber: 1,
        },
        grid: {
          top: '8px',  
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
            color: ['#4272FF']
          },
          outOfRange: {
            color: ['#FA4F43']
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
            //       color: '#FA4F43',
            //     },
            //   }
            // },
            data: [[1561969701319, 10], [1561969732203, 20], [1561969748970, 40], [1561969759235, 80]]
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

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
    

  },
  mounted() {
    console.log('deviceList', this.deviceList)
    this.getChartDataSum()

  },
  methods: {

    // 请求所有实时图表监测数据
    getChartDataSum(stime, etime) {
      const that = this
      let regCode = this.parentCode
      let nowTime = Date.now()
      var step = 10 * 60 * 1000 // 十分钟
      var etime = etime || nowTime + this.changeTimeNum * step
      // if (etime >= nowTime) {
      //   this.nextTimeBtn = 'disable'
      //   this.currentTimeBtn = 'disable'
      //   etime = nowTime
      //   this.setTimer() // 开启定时器
      // } else {
      //   this.nextTimeBtn = 'able'
      //   this.currentTimeBtn = 'able'
      // }

      var stime = stime || etime - step

      var params = []
      this.deviceList.forEach((item, i) => {
        let arrTemp = item.split(':')
        let monitorObjectTemp = arrTemp[0] + ':' + arrTemp[1] + ':' + arrTemp[2]
        let monitorValTemp = arrTemp[3]
        params.push({
          monitorObject: monitorObjectTemp, 
          monitorVal: monitorValTemp, 
          regCode: regCode, 
          stime: stime, 
          etime: etime
        })
      })
      console.log('params', params)
      
      
   
      // let params = [
      //   {monitorObject: "0:0:0", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:0:0", monitorVal: "2", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:0:0", monitorVal: "3", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "2:0:0", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "2:0:0", monitorVal: "2", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:1:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:1:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:1", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:1", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:2", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:3", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:4", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:5", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:6", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:2:8", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:3:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:3:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:3:1", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:3:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:3:2", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:3:2", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:4:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:4:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:4:1", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:4:2", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:5:0", monitorVal: "7", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "0:5:0", monitorVal: "8", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "1:0:3", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "1:0:1", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "1:0:2", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "1:0:2", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "1:2:0", monitorVal: "9", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "1:2:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "2:1:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
      //   {monitorObject: "2:1:0", monitorVal: "10", regCode: regCode, stime: stime, etime: etime},

      // ]

      api.detection.getMonitorData(params).then(res => {
        let resList = res.data.data || {}
        
        // that.drawJFWD(etime, resList['0:0:0:1'])

        // 按需绘制图表
        // 判断对象的属性是否存在
        if (resList['0:0:0:1'] !== undefined) {
          this.drawChart1({container: 'real-chart-jfwd-pro',unit: '℃',name: '机房温度',max: etime,dataType: 'real_data',data: resList['0:0:0:1']})
        }
        if (resList['0:0:0:2'] !== undefined) {
          this.drawChart1({container: 'real-chart-jfsd-pro',unit: '%',name: '机房湿度',max: etime,dataType: 'real_data',data: resList['0:0:0:2']})
        }
        if (resList['0:0:0:3'] !== undefined) {
          this.drawChart1({container: 'real-chart-jffs-pro',unit: 'm/s',name: '机房风速',max: etime,dataType: 'real_data',data: resList['0:0:0:3']})
        }

   
        this.drawChart1({container: 'real-chart-jdwd',unit: '℃',name: '井道温度',max: etime,dataType: 'real_data',data: resList['2:0:0:1']})
        this.drawChart1({container: 'real-chart-jdsd',unit: '%',name: '井道湿度',max: etime,dataType: 'real_data',data: resList['2:0:0:2']})
        this.drawChart1({container: 'real-chart-jfdydy',unit: 'V',name: '机房电源电压',max: etime,dataType: 'real_data',data: resList['0:1:0:5']})
        this.drawChart1({container: 'real-chart-jfdydl',unit: 'A',name: '机房电源电流',max: etime,dataType: 'real_data',data: resList['0:1:0:4']})
        this.drawChart1({container: 'real-chart-msaqhldy',unit: 'V',name: '门锁安全回路电压',max: etime,dataType: 'real_data',data: resList['0:2:1:5']})
        this.drawChart1({container: 'real-chart-msaqhldl',unit: 'A',name: '门锁安全回路电流',max: etime,dataType: 'real_data',data: resList['0:2:1:4']})
        this.drawChart1({container: 'real-chart-aqkghldy',unit: 'V',name: '安全开关回路电压',max: etime,dataType: 'real_data',data: resList['0:2:2:5']})
        this.drawChart1({container: 'real-chart-jxkgdy',unit: 'V',name: '检修开关电压',max: etime,dataType: 'real_data',data: resList['0:2:3:5']})
        this.drawChart1({container: 'real-chart-jskgdys',unit: 'V',name: '（上）减速开关电压',max: etime,dataType: 'real_data',data: resList['0:2:4:5']})
        this.drawChart1({container: 'real-chart-jskgdyx',unit: 'V',name: '（下）减速开关电压',max: etime,dataType: 'real_data',data: resList['0:2:5:5']})
        this.drawChart1({container: 'real-chart-qpjskgdys',unit: 'V',name: '（上）强迫减速开关电压',max: etime,dataType: 'real_data',data: resList['0:2:6:5']})
        this.drawChart1({container: 'real-chart-pcgyqdy',unit: 'V',name: '平层感应器电压',max: etime,dataType: 'real_data',data: resList['0:2:8:5']})
        this.drawChart1({container: 'real-chart-ddjdydy',unit: 'V',name: '电动机电源电压',max: etime,dataType: 'real_data',data: resList['0:3:0:5']})
        this.drawChart1({container: 'real-chart-ddjdydl',unit: 'A',name: '电动机电源电流',max: etime,dataType: 'real_data',data: resList['0:3:0:4']})
        this.drawChart1({container: 'real-chart-ddjwkwd',unit: '℃',name: '电动机外壳温度',max: etime,dataType: 'real_data',data: resList['0:3:1:1']})
        this.drawChart1({container: 'real-chart-ddjwkzd',unit: 'μm',name: '电动机外壳振动',max: etime,dataType: 'real_data',data: resList['0:3:1:6']})
        this.drawChart1({container: 'real-chart-ddjzcwd',unit: '℃',name: '电动机轴承温度',max: etime,dataType: 'real_data',data: resList['0:3:2:1']})
        this.drawChart1({container: 'real-chart-ddjzczd',unit: 'μm',name: '电动机轴承振动',max: etime,dataType: 'real_data',data: resList['0:3:2:6']})
        this.drawChart1({container: 'real-chart-zdqdydy',unit: 'V',name: '制动器电源电压',max: etime,dataType: 'real_data',data: resList['0:4:0:5']})
        this.drawChart1({container: 'real-chart-zdqdydl',unit: 'A',name: '制动器电源电流',max: etime,dataType: 'real_data',data: resList['0:4:0:4']})
        this.drawChart1({container: 'real-chart-zdqxqwd',unit: '℃',name: '制动器线圈温度',max: etime,dataType: 'real_data',data: resList['0:4:1:1']})
        this.drawChart1({container: 'real-chart-zdqzwwd',unit: '℃',name: '制动器闸瓦温度',max: etime,dataType: 'real_data',data: resList['0:4:2:1']})
        this.drawChart1({container: 'real-chart-xsqsd',unit: 'm/s',name: '限速器速度',max: etime,dataType: 'real_data',data: resList['0:5:0:7']})
        this.drawChart1({container: 'real-chart-xsqqs',unit: 'rpm',name: '限速器圈数',max: etime,dataType: 'real_data',data: resList['0:5:0:8']})
        this.drawChart1({container: 'real-chart-jdzhkzqdy',unit: 'V',name: '轿顶载荷控制器电压',max: etime,dataType: 'real_data',data: resList['1:0:3:5']})
        this.drawChart1({container: 'real-chart-jdjxkgdy',unit: 'V',name: '轿顶检修开关电压',max: etime,dataType: 'real_data',data: resList['1:0:1:5']})
        this.drawChart1({container: 'real-chart-jdmjmddy',unit: 'V',name: '轿顶门机马达电压',max: etime,dataType: 'real_data',data: resList['1:0:2:5']})
        this.drawChart1({container: 'real-chart-jdmjmddl',unit: 'A',name: '轿顶门机马达电流',max: etime,dataType: 'real_data',data: resList['1:0:2:4']})
        this.drawChart1({container: 'real-chart-jxwz',unit: 'F',name: '轿厢位置',max: etime,dataType: 'floor',data: resList['1:2:0:9']})
        this.drawChart1({container: 'real-chart-jxxtzd',unit: 'μm',name: '轿厢箱体振动',max: etime,dataType: 'real_data',data: resList['1:2:1:6']})
        this.drawChart1({container: 'real-chart-jddgzd',unit: 'μm',name: '井道导轨振动',max: etime,dataType: 'real_data',data: resList['2:1:1:6']})
        this.drawChart1({container: 'real-chart-jdcmkh',unit: '',name: '井道层门开合',max: etime,dataType: 'real_data',data: resList['2:1:0:10']})

        // 给实时数据赋值
        this.jfwdVal = resList['0:0:0:1'] ? resList['0:0:0:1'][0].real_data : this.jfwdVal
        this.jfsdVal = resList['0:0:0:2'] ? resList['0:0:0:2'][0].real_data : this.jfsdVal
        this.jffsVal = resList['0:0:0:3'] ? resList['0:0:0:3'][0].real_data : this.jffsVal
        this.jdwdVal = resList['2:0:0:1'] ? resList['2:0:0:1'][0].real_data : this.jdwdVal
        this.jdsdVal = resList['2:0:0:2'] ? resList['2:0:0:2'][0].real_data : this.jdsdVal
        this.jfdydyVal = resList['0:1:0:5'] ? resList['0:1:0:5'][0].real_data : this.jfdydyVal
        this.jfdydlVal = resList['0:1:0:4'] ? resList['0:1:0:4'][0].real_data : this.jfdydlVal
        this.msaqhldyVal = resList['0:2:1:5'] ? resList['0:2:1:5'][0].real_data : this.msaqhldyVal
        this.msaqhldlVal = resList['0:2:1:4'] ? resList['0:2:1:4'][0].real_data : this.msaqhldlVal
        this.aqkgmldyVal = resList['0:2:2:5'] ? resList['0:2:2:5'][0].real_data : this.aqkgmldyVal
        this.jxkgdyVal = resList['0:2:3:5'] ? resList['0:2:3:5'][0].real_data : this.jxkgdyVal
        this.jskgdysVal = resList['0:2:4:5'] ? resList['0:2:4:5'][0].real_data : this.jskgdysVal
        this.jskgdyxVal = resList['0:2:5:5'] ? resList['0:2:5:5'][0].real_data : this.jskgdyxVal
        this.qpjskgdysVal = resList['0:2:6:5'] ? resList['0:2:6:5'][0].real_data : this.qpjskgdysVal
        this.pcgyqdyVal = resList['0:2:8:5'] ? resList['0:2:8:5'][0].real_data : this.pcgyqdyVal
        this.ddjdydyVal = resList['0:3:0:5'] ? resList['0:3:0:5'][0].real_data : this.ddjdydyVal
        this.ddjdydlVal = resList['0:3:0:4'] ? resList['0:3:0:4'][0].real_data : this.ddjdydlVal
        this.ddjwkwdVal = resList['0:3:1:1'] ? resList['0:3:1:1'][0].real_data : this.ddjwkwdVal
        this.ddjwkzdVal = resList['0:3:1:6'] ? resList['0:3:1:6'][0].real_data : this.ddjwkzdVal
        this.ddjzcwdVal = resList['0:3:2:1'] ? resList['0:3:2:1'][0].real_data : this.ddjzcwdVal
        this.ddjzczdVal = resList['0:3:2:6'] ? resList['0:3:2:6'][0].real_data : this.ddjzczdVal
        this.zdqdydyVal = resList['0:4:0:5'] ? resList['0:4:0:5'][0].real_data : this.zdqdydyVal
        this.zdqdydlVal = resList['0:4:0:4'] ? resList['0:4:0:4'][0].real_data : this.zdqdydlVal
        this.zdqxqwdVal = resList['0:4:1:1'] ? resList['0:4:1:1'][0].real_data : this.zdqxqwdVal
        this.zdqzwwdVal = resList['0:4:2:1'] ? resList['0:4:2:1'][0].real_data : this.zdqzwwdVal
        this.xsqsdVal = resList['0:5:0:7'] ? resList['0:5:0:7'][0].real_data : this.xsqsdVal
        this.xsqqsVal = resList['0:5:0:8'] ? resList['0:5:0:8'][0].real_data : this.xsqqsVal
        this.jdzhkzqdyVal = resList['1:0:3:5'] ? resList['1:0:3:5'][0].real_data : this.jdzhkzqdyVal
        this.jdjxkgdyVal = resList['1:0:1:5'] ? resList['1:0:1:5'][0].real_data : this.jdjxkgdyVal
        this.jdmjmddyVal = resList['1:0:2:5'] ? resList['1:0:2:5'][0].real_data : this.jdmjmddyVal
        this.jdmjmddlVal = resList['1:0:2:4'] ? resList['1:0:2:4'][0].real_data : this.jdmjmddlVal
        this.jxwzVal = resList['1:2:0:9'] ? resList['1:2:0:9'][0].real_data : this.jxwzVal
        this.jxxtzdVal = resList['1:2:1:6'] ? resList['1:2:1:6'][0].real_data : this.jxxtzdVal
        this.jddgzdVal = resList['2:1:1:6'] ? resList['2:1:1:6'][0].real_data : this.jddgzdVal
        this.jdcmkhVal = resList['2:1:0:10'] ? resList['2:1:0:10'][0].real_data : this.jdcmkhVal
        


      })
    },

    // 封装图表1
    drawChart1(obj) {
      const that = this
      let extendObj = {
        container: obj.container, // 容器id
        unit: obj.unit ? obj.unit : '', // 单位
        name: obj.name ? obj.name : '', // 名字
        max: obj.max ? obj.max : '', // 相当于eTime时间戳
        threshold: obj.threshold ? obj.threshold : '', // 报警阈值
        dataType: obj.dataType ? obj.dataType : '', // 不同的数据类型使用不同字段 "real_data":温度  "real_data":湿度  "floor":楼层  "real_data":其他
        data: obj.data && obj.data.length ? obj.data : [] // 数据，需要经过处理
      }

      // 重新处理数据并赋值给extendObj
      let dataArr = []
      // let dataArr = [[1563868712000, 50], [1563868832000, 90], [1563868892000, 100]]
      if (extendObj.data.length) {
        // 重组数据
        extendObj.data.forEach((item, i) => {
          let arr = []
          let value = item[extendObj.dataType]
          arr.push(new Date(item.time).getTime(), value)
          dataArr.push(arr)
        })
      }
      extendObj.data = dataArr

      let chart = this.$echarts.init(document.getElementById(`${extendObj.container}`))
      let options = xymFun.deepClone(that.options)
      options.series[0].data = extendObj.data
      options.series[0].name = extendObj.name
      options.xAxis.max = extendObj.max
      options.xAxis.min = extendObj.max - 10*60*1000
      options.tooltip.formatter = (params,ticket,callback) => {
        var key = params[0].data[0] 
        var value = params[0].data[1]
        key = that.tooltipFormatDate(key)
        // var res = params[0].seriesName + '：' + value + '℃' + '<br>时间：' + key
        var res = key + '<br>' + params[0].seriesName + '：' + value + extendObj.unit
        return res
      }
      // 如果有阈值，则设置标志线和范围
      if (extendObj.threshold) {
        // 标志线
        options.series[0].markLine = {
          data: [{
              name: '',
              yAxis: parseInt(extendObj.threshold)
          }],
          animation: false,
          symbolSize: 0,
          label: {
            position: 'start'
          },
          lineStyle: {
            normal: {
              type: 'solid',
              color: '#FA4F43',
            },
          }
        }
        // 范围
        options.visualMap.range = []
        options.visualMap.range.push(0, parseInt(extendObj.threshold))
      }
      
      chart.setOption(options)
    },

  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
#DetDetailChartComp{
  @import '../../assets/stylus/xymStyle.styl'



  .dnProblem-first-title{
    font-size: 16px;
    color: #34414C;
    font-weight bold;
    margin-top 20px;
  }
  .dnProblem-second-title{
    font-size: 16px;
    color: #34414C;
    margin-top 16px;
  }
  .diagnose-item-subTitle{
    position relative;
    margin-top 20px;
  }
  .diagnose-item-subTitle-p{
    font-size: 16px;
    color: #34414C;
    font-weight: bold
  }
  .diagnose-item-subTitle-span{
    position absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    color: #7E8A95;
    background: #F5F6F7;
    border-radius: 4px;
    text-align: center;
    width 36px;
    line-height 16px;
  }
  .dnRunning-box{
    box-sizing border-box
    float: left;
    width: 25%;
    text-align center;
    margin-top 20px;
    padding 0 10px;
  }
  .dnRunning-box-p{
    font-size: 24px;
    color: #34414C;
    margin-top 10px;
  }
  .dnRunning-box-p span{
    font-size: 14px;
  }
  .dnStat-top{
    border-bottom: 1px dashed #D8DDDF;
    padding-bottom 20px;
    padding-top 6px;
  }
  .dnStat-top-li{
    float: left;
    width: 50%;
    margin-top 10px;
  }
  .dnStat-top-li-title{
    float: left;
    width: 110px;
    font-size: 14px;
    line-height 20px;
    color: #7E8A95;
  }
  .dnStat-top-li-p{
    float: left;
    font-size: 14px;
    line-height 20px;
    color: #34414C;
  }
  .dnStat-bot-box{
    box-sizing border-box;
    float left
    width: 33%;
    padding: 0 15px;
    margin-top 20px;
  }
  .dnStat-bot-box-title{
    font-size: 14px;
    color: #7E8A95;
  }
  .dnStat-bot-box-data{
    font-size: 24px;
    color: #34414C;
    margin-top 10px;
  }
  .dnStat-bot-box-data span{
    font-size 14px;
  }
  .dnStat-bot-box-per{
    display inline-block
    position relative
    font-size: 12px;
    color: #34414C;
    margin-top 15px;
  }



}

</style>
