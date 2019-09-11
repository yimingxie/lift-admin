<template>
  <div id="DetectionPanelDetail">
    <div class="container">
      <div class="bread-nav">
        <span @click="$router.push('/lift-list')">数字电梯</span>
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
                  <div class="didt-deal-btn" @click="openDialogDispatch" v-if="processed === 0">处理</div>
                  <div class="didt-deal-btn" @click="openDialogResult" v-else>处理结果</div>
                  <div class="didt-h3">{{reason}}</div>
                  <div class="didt-date">{{triggleTime}}</div>
                </div>
                <div class="diagnose-item-detail-p">
                  {{exReason}}
                </div>
              </div>

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


    <!-- 诊断处理弹窗 -->
    <el-dialog :visible.sync="dialogDispatch" title="诊断描述" :show-close="false" width="900px" @closed="dialogClosed">
      <div>
        <div class="dia-content">
          <el-form :model="ruleForm" :rules="rules" ref="diaForm">
            <div class="dia-con-head">诊断描述</div>
            <div>
              <el-form-item prop="diagInfo">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.diagInfo"></el-input>
              </el-form-item>
            </div>
            <div style="margin-top: -6px">
              <el-checkbox v-model="send">派单</el-checkbox>
            </div>
            <!-- 工单信息 -->
            <div class="dispatch-content" v-show="send">
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
                      <el-form-item prop="beginTime">
                        <el-date-picker v-model="ruleForm.beginTime" @change="changeBeginTime" type="datetime" size="small" prefix-icon="test-icon" placeholder="选择作业时间"  value-format="timestamp" style="width: 100%" :picker-options="pickerOptions"></el-date-picker>
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

                <div class="dispatch-item clearfix" style="margin-top: 20px;">
                  <div class="dispatch-item-li" style="width: 100%;">
                    <div class="dispatch-item-li-label">员工：</div>
                    <div class="dispatch-item-li-elevDetail clearfix">
                      <div class="dispatch-staff-box clearfix" v-for="(item, i) in dispatchStaffList" :key="i">
                        <div class="dstaff-delete" @click="deleteStaff(i)"></div>
                        <div class="dispatch-staff-box-img">
                          <div v-if="!item.imgUrl" class="dispatch-staff-box-imgBg"></div>
                          <div v-else class="dispatch-staff-box-imgPic" :style="`background: url(${item.imgUrl}) no-repeat center center / cover`"></div>
                        </div>
                        <div class="dispatch-staff-box-info">
                          <div class="dstaff-box-name">{{item.name}}</div>
                          <!-- <div class="dstaff-box-input">
                            <el-form-item prop="assembId">
                              <el-cascader ref="assembIdCascader" placeholder="--" :options="assembIdOptions" v-model="selectedAssembIdOptions" filterable clearable @change="assembIdChange" :show-all-levels="false" size="small" style="width: 100%;"></el-cascader>
                            </el-form-item>
                          </div> -->
                          <div class="dstaff-box-department">{{item.departmentName}}</div>
                          <div class="dstaff-box-phone">{{item.account}}</div>
                        </div>
                      </div>


                      <!-- 空模板 -->
                      <div class="dispatch-staff-box clearfix">
                        <!-- <div class="dstaff-delete"></div> -->
                        <div class="dispatch-staff-box-img"></div>
                        <div class="dispatch-staff-box-info">
                          <div class="dstaff-box-input">
                            <el-form-item prop="departmentOp">
                              <el-cascader ref="departmentCascader" placeholder="--" :options="departmentOptions" v-model="selectedDepartmentOptions" filterable clearable @change="departmentChange" :show-all-levels="false" size="small" style="width: 100%;"></el-cascader>
                            </el-form-item>
                          </div>
                          <div class="dstaff-box-department">--</div>
                          <div class="dstaff-box-phone">--</div>
                        </div>
                      </div>

                    </div>


                  </div>
                </div>


              </div>


            </div>
            
          </el-form>

        </div>
        <div class="dia-btn-con" style="margin-top: 30px;">
          <input class="dia-btn dia-btn-cancel" type="button" value="取消" @click="dialogClosed">
          <input class="dia-btn dia-btn-submit" @click="submit" type="button" value="确认">
        </div>

      </div>

  
    </el-dialog>

    <!-- 处理结果弹窗 -->
    <el-dialog :visible.sync="dialogResult" title="处理结果" :show-close="false" width="900px">
      <div>
        <div class="dia-content">
          <div class="dealResult-c">
            <div class="dealResult-name">
              {{operName}} {{completeTime}}
            </div>
            <div class="dispatch-item clearfix">
              <div class="dispatch-item-li clearfix" style="width: 100%;">
                <div class="dispatch-item-li-label">诊断描述：</div>
                <div class="dealResult-descript dealResult-p">
                  {{operContent}}
                </div>
              </div>
              <div class="dispatch-item-li clearfix" style="width: 100%;">
                <div class="dispatch-item-li-label">是否派单：</div>
                <div class="dealResult-descript dealResult-p">
                  {{processedResult}}
                  <span v-if="taskId" class="dealResult-link" @click="gotoDetail(taskId)">查看工单详情 &gt;</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        <div class="dia-btn-con" style="margin-top: 30px;">
          <input class="dia-btn dia-btn-submit" @click="dialogResult=false" type="button" value="确认">
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
    // 自定义表单作业时间验证规则
    var validBeginTime = (rule, value, callback) => {
      if (this.send) {
        if (!value) {
          return callback(new Error('作业时间不能为空'));
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      pickerOptions: { // 工单时间不让选择今天以前的
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      parentCode: '',
      parentDiagnId: '',
      liftPerson: '',
      liftPersonIdArr: [],
      dialogDispatch: false,
      dispatchStaffList: [], // 员工详情数组
      send: false,
      dialogResult: false,

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
        diagInfo: '',
        diagnType: '',
        beginTime: '',
      },
      rules: {
        diagInfo: [{ required: true, message: '必填', trigger: 'blur' }],
        // beginTime: [{ validator: validBeginTime, trigger: 'change' }],
      },
      diagnTypeOptions: [
        {value: '事故救援', label: '事故救援'},
        {value: '故障处理', label: '故障处理'}
      ],
      departmentOptions: [],
      selectedDepartmentOptions: [],

      // 处理结果
      processed: 0,
      operContent: '',
      taskId: '',
      operName: '',
      completeTime: '',
      processedResult: '',


  
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
    // this.ruleForm.diagnType = parseInt(this.$route.query.diagnTypeSingle)
    
  },
  
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()
    
    // 获取电梯详情
    this.getLiftDetail()

    // 获取中间异常详情
    this.getDiagnInfo()

    // 获取安装人员下拉
    this.getDepStaffOptions()


  },
  methods: {
    // 搜索
    goToResult(val) {
      console.log('传值并跳转页面', val)
      this.parentCode = val
      this.$router.push({
        path: '/detection-panel',
        query: {
          regCode: val
        }
      })
      console.log('pp', this.parentCode)
    },

    // 获取电梯负责人
    getLiftPerson() {
      this.liftPerson = ''
      this.liftPersonIdArr = []
      let personArr = []
      api.lift.getLiftPerson(this.parentCode).then(res => {
        if (res.data.data.personOne) {
          personArr.push(res.data.data.personOne)
          this.liftPersonIdArr.push(res.data.data.oneId)
        }
        if (res.data.data.personTwo) {
          personArr.push(res.data.data.personTwo)
          this.liftPersonIdArr.push(res.data.data.twoId)
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
      })
    },

    // 打开诊断处理弹窗
    openDialogDispatch() {
      const that = this
      this.dialogDispatch = true
      this.dispatchStaffList = []
      // this.dispatchStaffList = [{
      //   id: '',  
      //   imgUrl : '',
      //   name: '',
      //   department: '',
      //   account: '',
      // }]

      // 循环查询，通过id查询员工信息
      this.liftPersonIdArr.forEach((id, i) => {
        api.accountApi.getStaffDetails(id).then(staffRes => {
          // console.log('staffRes', staffRes.data)
          let staffDetail = staffRes.data.data
          this.dispatchStaffList.push({
            id: staffDetail.staffInfo.id,
            imgUrl: api.accountApi.viewPic(staffDetail.staffInfo.avatarUrl),
            name: staffDetail.staffInfo.name,
            departmentName: staffDetail.departmentName,
            account: staffDetail.staffInfo.account,
          })
          console.log('this.dispatchStaffList', this.dispatchStaffList)
        })
      })
    },

    // 删除员工
    deleteStaff(i) {
      this.dispatchStaffList.splice(i, 1)
    },

    // 获取部门下拉
    getDepStaffOptions() {
      const that = this
  
      api.accountApi.getCorpDepartments(window.localStorage.getItem('corpId')).then(res => {
        // console.log('部门人员', res.data)
        this.departmentOptions = []
        let departmentList = res.data.data
        // 加载一级部门
        departmentList.forEach((item, i) => {
          let obj = {}
          obj.value = item.id
          obj.label = item.depName
          obj.children = []

          // 通过部门名字获取员工，并添加到相应的children
          // api.accountApi.getDepStaffs(item.id).then(staffRes => {
          //   // console.log('staffRes', staffRes.data)
          //   let staffDetail = staffRes.data.data
          //   staffDetail.forEach(secItem => {
          //     let objSec = {}
          //     objSec.label = secItem.name
          //     objSec.value = secItem.id
          //     obj.children.push(objSec)
          //   })
            
          // })
          
          this.departmentOptions.push(obj)

        })

        // 加载部门里的员工
        this.departmentOptions.forEach((item, i) => {
          api.accountApi.getDepStaffs(item.value).then(staffRes => {
            let staffDetail = staffRes.data.data
            staffDetail.forEach(secItem => {
              item.children.push({
                label: secItem.name,
                value: secItem.id
              })
            })
          })
        })

      })

    },

    // 下拉人员选中值
    departmentChange(arr) {
      const that = this
      let flag = true
      // this.ruleForm.assembId = arr[arr.length-1] // 取数组最后一个值赋值
      let checkedId = arr[arr.length-1]
      this.selectedDepartmentOptions = []
      console.log('this.dispatchStaffList', this.dispatchStaffList)
      this.dispatchStaffList.forEach(item => {
        if (item.id == checkedId) {
          this.$message.error('员工已存在')
          flag = false
          return false // 跳出循环，不能跳出方法
        }
      })

      if (!flag) return // 控制函数执行
      api.accountApi.getStaffDetails(checkedId).then(res => {
        // console.log('resId', res.data)
        let staffDetail = res.data.data
        // console.log('staffDetail', staffDetail)
        this.dispatchStaffList.push({
          id: staffDetail.staffInfo.id,
          imgUrl: api.accountApi.viewPic(staffDetail.staffInfo.avatarUrl),
          name: staffDetail.staffInfo.name,
          departmentName: staffDetail.departmentName,
          account: staffDetail.staffInfo.account,
        })
      })

    },

    // 获取中间异常详情
    getDiagnInfo() {
      const that = this
      api.detection.getDiagnInfo(this.parentDiagnId).then(res => {
        console.log('异常详情', res.data)
        let detail = res.data.data
        this.reason = detail.reason
        this.triggleTime = detail.triggleTime
        this.operContent = detail.operContent
        this.taskId = detail.taskId
        this.processed = detail.processed
        // this.completeTime = detail.completeTime
        // this.operName = detail.operName
        let extensions = JSON.parse(detail.extensions)
        // console.log('extensions', extensions.elevator)
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
        // console.log('this.diagnDevices', this.diagnDevices)

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
        }
        if (extensions.elevator.payload !== undefined) {
          this.exElevator.payload = extensions.elevator.payload.replace(/\"/g, "");
        }

        
      })
    },
    

    // 改变作业时间
    changeBeginTime(datetime) {
      // console.log('time', datetime)
      this.ruleForm.beginTime = datetime + ""
    },

    // 提交表单
    submit() {
      const that = this
      this.$refs.diaForm.validate(valid => {
        if (valid) {
          let params = {
            diagId: this.parentDiagnId,
            diagInfo: this.ruleForm.diagInfo,
            send: this.send,
          }

          // 如果是派单
          if (this.send) {
            let staffIdArr = []
            this.dispatchStaffList.forEach(item => {
              staffIdArr.push(item.id)
            })
            params.elevCode = this.parentCode
            params.staffIds = staffIdArr
            params.type = this.ruleForm.diagnType
            params.beginTime = this.ruleForm.beginTime
          }

          console.log('params', params)

          api.detection.createTask(params).then(res => {
            console.log('派单', res)
            if (res.data.code == 200) {
              this.$router.go(0)
            } else {
              this.$message.error(res.data.message)
            }
          })



        }
      })

    },

    // 打开处理结果弹窗
    openDialogResult() {
      this.dialogResult = true

      // 请求处理结果
      // operName completeTime operContent processed taskId
      if (!this.taskId) {
        this.processedResult = '未派单'

      } else {
        api.detection.getTaskResult(this.taskId).then(res => {
          console.log('处理结果', res.data)
          this.operName = res.data.data.name
          this.processedResult = res.data.data.status
          this.completeTime = res.data.data.time
        })
      }
      

    },

    // 跳转到工单详情
    gotoDetail(id){
      this.$router.push({name: 'missionDetail', params: {'id': id}})
    },

    // 关闭弹窗
    dialogClosed() {
      this.ruleForm.diagInfo = ''
      this.send = false
      this.ruleForm.beginTime = ''
      this.$refs.diaForm.resetFields();
      this.dialogDispatch = false
    },

  },
  components: {
    'search-code': SearchCode,
    'det-warn-list-comp': DetWarnListComp,
    'det-chart-comp': DetChartComp,
    'det-detail-chart-comp': DetDetailChartComp,
  }
}
</script>

<style>
#DetectionPanelDetail .dstaff-box-input .el-input__inner{
  border: none !important;
}
#DetectionPanelDetail .el-cascader__label{
  font-size: 20px !important;
}
</style>

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
