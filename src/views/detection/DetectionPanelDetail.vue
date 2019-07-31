<template>
  <div id="DetectionPanelDetail">
    <div class="container">
      <div class="bread-nav">
        <span>数字电梯</span>
        <em>/</em>
        <span class="on">电梯检测</span>
      </div>

      <div class="det-heading clearfix">
        <div class="det-heading-info">
          <div class="dhi-title">内部编号：{{inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{regCode}}</li>
            <li><span>电梯负责人：</span>{{liftPerson ? liftPerson : '无'}}</li>
            <li><span>电梯地址：</span>{{localArea}} {{address}}</li>
          </ul>
        </div>
        <div class="det-heading-search">
          <search-code :code="parentCode" @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="det-content clearfix">
        <!-- 告警列表组件 -->
        <div class="det-warn">
          <det-warn-list-comp></det-warn-list-comp>
        </div>

        <!-- 中间异常详情 -->
        <div class="det-mid">
          <div class="det-mid-diagnose">
            <div class="diagnose-item">
              <div class="diagnose-item-detail">
                <div class="diagnose-item-detail-title">
                  <div class="didt-deal-btn" @click="dialogDispatch=true">处理</div>
                  <div class="didt-h3">{{reason}}</div>
                  <div class="didt-date">{{triggleTime}}</div>
                </div>
                <div class="diagnose-item-detail-p">
                  {{exReason}}
                </div>
              </div>

              <!-- TODO 图表 所有图表和判断待完成 -->
              <!-- 用遍历、判断进行渲染，命名用后缀-pro区分 -->
              <div>
                <det-detail-chart-comp :codelist="diagnDevices"></det-detail-chart-comp>
              </div>





            </div>
            <div class="dcc-type-block"></div>
            <div class="diagnose-item">
              <div class="diagnose-item-subTitle">
                <div class="diagnose-item-subTitle-p">电梯运行状态</div>
                <div class="diagnose-item-subTitle-span">当前</div>
              </div>
              <div class="diagnose-item-running clearfix">
                <div class="dnRunning-box">
                  <img v-if="exElevator.move=='up'" src="../../assets/images/xym/running-up.png" alt="">
                  <img v-else-if="exElevator.move=='down'" src="../../assets/images/xym/running-down.png" alt="">
                  <img v-else-if="exElevator.move=='stop'" src="../../assets/images/xym/running-stop.png" alt="">
                  <div class="dnRunning-box-p">{{exElevator.floor}}<span>F</span></div>
                </div>
                <div class="dnRunning-box">
                  <img src="../../assets/images/xym/running-speed.png" alt="">
                  <div class="dnRunning-box-p">{{exElevator.speed}}<span>m/s</span></div>
                </div>
                <div class="dnRunning-box">
                  <img src="../../assets/images/xym/running-door.png" alt="">
                  <div class="dnRunning-box-p">{{exElevator.prox}}</div>
                </div>
                <div class="dnRunning-box">
                  <img src="../../assets/images/xym/running-weight.png" alt="">
                  <div class="dnRunning-box-p">{{exElevator.payload}}<span>kg</span></div>
                </div>

              </div>
            </div>
            <div class="dcc-type-block"></div>
            <div class="diagnose-item">
              <div class="diagnose-item-subTitle">
                <div class="diagnose-item-subTitle-p">数据统计</div>
                <div class="diagnose-item-subTitle-span">本月</div>
              </div>
              <div class="dnStat-top clearfix">
                <div class="dnStat-top-li clearfix">
                  <div class="dnStat-top-li-title">平层停梯准确度</div>
                  <div class="dnStat-top-li-p">98%</div>
                </div>
                <div class="dnStat-top-li clearfix">
                  <div class="dnStat-top-li-title">轿门开合准确度</div>
                  <div class="dnStat-top-li-p">80%</div>
                </div>
                <div class="dnStat-top-li clearfix">
                  <div class="dnStat-top-li-title">平均运行速度</div>
                  <div class="dnStat-top-li-p">2.5m/s</div>
                </div>
                <div class="dnStat-top-li clearfix">
                  <div class="dnStat-top-li-title">平均载荷重量</div>
                  <div class="dnStat-top-li-p">1600kg</div>
                </div>

              </div>
              <div class="dnStat-bot clearfix">
                <div class="dnStat-bot-box">
                  <div class="dnStat-bot-box-title">累计运行里程</div>
                  <div class="dnStat-bot-box-data">23456<span>km</span></div>
                  <div class="dnStat-bot-box-per">月同比 11% <i class="percent-down"></i></div>
                </div>
                <div class="dnStat-bot-box">
                  <div class="dnStat-bot-box-title">电梯启停</div>
                  <div class="dnStat-bot-box-data">3290<span>次</span></div>
                  <div class="dnStat-bot-box-per">月同比 9% <i class="percent-up"></i></div>
                </div>
                <div class="dnStat-bot-box">
                  <div class="dnStat-bot-box-title">轿门开合</div>
                  <div class="dnStat-bot-box-data">1345<span>次</span></div>
                  <div class="dnStat-bot-box-per">月同比 11% <i class="percent-up"></i></div>
                </div>

              </div>

            </div>


          </div>
          

          
        </div>

        <!-- 右侧实时监测 -->
        <div class="det-right">
          <det-chart-comp></det-chart-comp>
        </div>

        
      </div>

    </div>


    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogDispatch" title="诊断描述" :show-close="false" width="900px" @closed="dialogClosed">
      <div>
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head">诊断描述</div>
            <div>
              <el-form-item prop="textarea">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.textarea"></el-input>
              </el-form-item>
            </div>
            <div style="margin-top: -10px">
              <el-checkbox v-model="dispatchBtn">派单</el-checkbox>
            </div>
            <!-- 工单信息 -->
            <div class="dispatch-content" v-show="dispatchBtn">
              <div class="dia-con-head">工单信息</div>
              <div class="dispatch-ib">
                <div class="dispatch-item clearfix">
                  <div class="dispatch-item-li" style="padding-right: 20px;">
                    <div class="dispatch-item-li-label">工单类型：</div>
                    <div class="dispatch-item-li-input">
                      <el-form-item prop="diagnType">
                        <el-select v-model="ruleForm.diagnType" placeholder="请选择异常类型" size="small" style="width: 100%">
                          <el-option v-for="item in diagnTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="dispatch-item-li">
                    <div class="dispatch-item-li-label">作业时间：</div>
                    <div class="dispatch-item-li-input">
                      <el-form-item prop="dateTime">
                        <el-date-picker v-model="ruleForm.dateTime" @change="changeDateTime" type="datetime" size="small" prefix-icon="test-icon" placeholder="选择作业时间" style="width: 100%"></el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>

                <div class="dispatch-item clearfix">
                  <div class="dispatch-item-li" style="width: 100%;">
                    <div class="dispatch-item-li-label">电梯信息：</div>
                    <div class="dispatch-item-li-elevDetail">
                      <div class="dispatchIL-elevDetail-title">{{inNum}}</div>
                      <div class="dispatchIL-elevDetail-content clearfix">
                        <div class="dispatchIL-elevDetail-box">
                          <div class="dispatchIL-elevDetail-box-h">注册代码</div>
                          <div class="dispatchIL-elevDetail-box-p">{{regCode}}</div>
                        </div>
                        <div class="dispatchIL-elevDetail-box">
                          <div class="dispatchIL-elevDetail-box-h">使用单位</div>
                          <div class="dispatchIL-elevDetail-box-p">{{userDepartment}}</div>
                        </div>
                        <div class="dispatchIL-elevDetail-box">
                          <div class="dispatchIL-elevDetail-box-h">物业单位</div>
                          <div class="dispatchIL-elevDetail-box-p">{{propertyName}}</div>
                        </div>
                        <div class="dispatchIL-elevDetail-box">
                          <div class="dispatchIL-elevDetail-box-h">区域/片区</div>
                          <div class="dispatchIL-elevDetail-box-p">{{localArea}}</div>
                        </div>
                        <div class="dispatchIL-elevDetail-box">
                          <div class="dispatchIL-elevDetail-box-h">使用地址</div>
                          <div class="dispatchIL-elevDetail-box-p">{{address}}</div>
                        </div>
                        <div class="dispatchIL-elevDetail-box">
                          <div class="dispatchIL-elevDetail-box-h">制造单位</div>
                          <div class="dispatchIL-elevDetail-box-p">{{manufactName}}</div>
                        </div>

                      </div>

                    </div>


                  </div>

                </div>
              </div>


            </div>
            
          </el-form>

        </div>
        <div class="dia-btn-con">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消" @click="dialogClosed">
          <input class="dia-btn dia-btn-submit" @click="submit" type="button" value="确认">
        </div>

      </div>

  
    </el-dialog>

  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
import SearchCode from '../../components/SearchCode'
import DetWarnListComp from './DetWarnListComp'
import DetChartComp from './DetChartComp'
import DetDetailChartComp from './DetDetailChartComp'




export default {
  data() {
    return {
      parentCode: '',
      parentDiagnId: '',
      liftPerson: '',
      dialogDispatch: false,
      dispatchBtn: false,
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',
      userDepartment: '',
      propertyName: '',
      manufactName: '',

      // 中间异常详情
      reason: '',
      triggleTime: '',
      exReason: '',
      exElevator: {
        "floor": 0, // 楼层
        "speed": 0, // 运行速度 xx m/s
        "move": "stop", // 运行方向: stop - 停，up - 上， down - 下
        "prox": "关", // 轿门状态: 0 - 关闭，1 - 开启
        "payload": 0, // 当前载荷: xx kg
      },
      diagnDevices: [],


      // 派单表单
      ruleForm: {
        textarea: '',
        diagnType: '',
        dateTime: ''
      },
      rules: {
        // regCode: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      diagnTypeOptions: [
        {value: 0, label: '事件'},
        {value: 1, label: '故障'},
        {value: 2, label: '违规'},
        {value: 3, label: '预警'},
      ],


  

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
    this.parentDiagnId = this.$route.query.diagnId
    this.ruleForm.diagnType = parseInt(this.$route.query.diagnTypeSingle)
    
  },
  
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()
    
    // 获取电梯详情
    this.getLiftDetail()

    // 获取中间异常详情
    this.getDiagnInfo()

    // 获取所有实时图表监测数据
    this.getChartDataSum()

  },
  methods: {
    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/detection',
        query: {
          regCode: val
        }
      })
      console.log('pp', this.parentCode)
    },

    // 获取电梯负责人
    getLiftPerson() {
      this.liftPerson = ''
      let personArr = []
      api.lift.getLiftPerson(this.parentCode).then(res => {
        if (res.data.data.personOne) {
          personArr.push(res.data.data.personOne)
        }
        if (res.data.data.personTwo) {
          personArr.push(res.data.data.personTwo)
        }
        this.liftPerson = personArr.join('、')
      })
    },

    // 查询电梯详情
    getLiftDetail() {
      api.lift.getLiftResult(this.parentCode).then(res => {
        console.log('电梯详情', res.data)
        let detail = res.data.data
        this.regCode = detail.regCode
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address

        // 给派单表单赋值
        this.userDepartment = detail.userDepartment
        this.propertyName = detail.propertyName
        this.manufactName = detail.manufactName


        // 查询异常告警列表
        // this.getWarnList()
      })
    },

    // 获取中间异常详情
    getDiagnInfo() {
      const that = this
      api.detection.getDiagnInfo(this.parentDiagnId).then(res => {
        let detail = res.data.data
        this.reason = detail.reason
        this.triggleTime = detail.triggleTime
        let extensions = JSON.parse(detail.extensions)
        console.log('extensions', extensions.elevator)
        this.exReason = ''
        // 拼接
        let separation = extensions.reason.diagnLogical
        this.exReason = extensions.reason.diagnContent.join(`${separation}`) // 数组组合成字符串
        // 异常设备数组，传数组给中间组件
        this.diagnDevices = []
        extensions.reason.diagnDevices.forEach((item, i) => {
          this.diagnDevices.push(item.code)
        })
        // this.diagnDevices = ["0:2:2:5", '0:4:1:1']
        console.log('this.diagnDevices', this.diagnDevices)

        // 电梯故障时运行状态
        if (extensions.elevator.floor !== undefined) {
          this.exElevator.floor = extensions.elevator.floor
        }
        if (extensions.elevator.move !== undefined) {
          this.exElevator.move = extensions.elevator.move.replace(/\"/g, "");
        }
        if (extensions.elevator.speed !== undefined) {
          this.exElevator.speed = extensions.elevator.speed.replace(/\"/g, "");
        }
        if (extensions.elevator.prox !== undefined) {
          let prox = extensions.elevator.prox.replace(/\"/g, "");
          this.exElevator.prox = prox == 1 ? '开' : '关'
          // if (prox == 1) {
          //   this.exElevator.prox = '开'
          // } else {
          //   this.exElevator.prox = '关'
          // }
        }
        if (extensions.elevator.payload !== undefined) {
          this.exElevator.payload = extensions.elevator.payload.replace(/\"/g, "");
        }

        
      })
    },
    

     // 转换tooltip时间戳
    tooltipFormatDate(timestamp) {
      var date = new Date(timestamp)
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var m1 = date.getMinutes();
      var s = date.getSeconds();
      m = m < 10 ? ("0" + m) : m;
      d = d < 10 ? ("0" + d) : d;
      h = h < 10 ? ("0" + h) : h;
      m1 = m1 < 10 ? ("0" + m1) : m1;
      s = s < 10 ? ("0" + s) : s;
      return m + '-' + d + ' ' + h + ':' + m1 + ':' + s
    },

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
   
      let params = [
        {monitorObject: "0:0:0", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:0:0", monitorVal: "2", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:0:0", monitorVal: "3", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:0:0", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:0:0", monitorVal: "2", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:1:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:1:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:1", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:1", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:2", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:3", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:4", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:5", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:6", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:2:8", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:1", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:2", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:3:2", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:0", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:0", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:1", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:4:2", monitorVal: "1", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:5:0", monitorVal: "7", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "0:5:0", monitorVal: "8", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:3", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:1", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:2", monitorVal: "5", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:0:2", monitorVal: "4", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:2:0", monitorVal: "9", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "1:2:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:1:1", monitorVal: "6", regCode: regCode, stime: stime, etime: etime},
        {monitorObject: "2:1:0", monitorVal: "10", regCode: regCode, stime: stime, etime: etime},

      ]

      api.detection.getMonitorData(params).then(res => {
        let resList = res.data.data || {}
        // that.drawJFWD(etime, resList['0:0:0:1'])

        this.drawChart1({container: 'real-chart-jfwd-pro',unit: '℃',name: '机房温度',max: etime,dataType: 'real_data',data: resList['0:0:0:1']})
        this.drawChart1({container: 'real-chart-jfsd-pro',unit: '%',name: '机房湿度',max: etime,dataType: 'real_data',data: resList['0:0:0:2']})
        this.drawChart1({container: 'real-chart-jffs-pro',unit: 'm/s',name: '机房风速',max: etime,dataType: 'real_data',data: resList['0:0:0:3']})
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

    // 改变作业时间
    changeDateTime(val) {
      console.log(val)
    },

    // 提交表单
    submit() {
      console.log('提交')
    },

    // 关闭弹窗
    dialogClosed() {
      console.log('关闭弹窗')
    }



  },
  components: {
    'search-code': SearchCode,
    'det-warn-list-comp': DetWarnListComp,
    'det-chart-comp': DetChartComp,
    'det-detail-chart-comp': DetDetailChartComp


  }
}
</script>

<style lang="stylus" scoped>
#DetectionPanelDetail{
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height: 1;
  }

  .det-mid-diagnose{
    height 783px;
    overflow auto;
    background #fff;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    border-radius: 8px;
  }
  .diagnose-item{
    background #fff;
    padding: 0 20px 20px;
  }
  .diagnose-item-detail{
    border-bottom: 1px dashed #D8DDDF;
    padding-bottom 16px;
  }
  .diagnose-item-detail-title{
    position relative
    padding-top 20px;
  }
  .didt-deal-btn{
    position absolute;
    right 20px;
    top: 24px;
    font-size: 14px;
    color: #4272FF;
    cursor pointer
  }
  .didt-h3{
    font-size: 20px;
    color: #34414C;
    font-weight bold
  }
  .didt-date{
    font-size: 14px;
    color: #7E8A95;
    margin-top 15px;
  }
  .diagnose-item-detail-p{
    font-size: 14px;
    color: #7E8A95;
    line-height 20px;
    margin-top 14px;
  }




  
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
