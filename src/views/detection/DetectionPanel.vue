<template>
  <div id="DetectionPanel">
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

        <!-- 中间电梯实时运行状态 -->
        <div class="det-mid">
          <!-- 实时运行状态 -->
          <div class="det-mid-status">
            <div class="dms-title">
              <h4>实时运行状态</h4>
              <div class="dms-title-balance">平衡系数 ></div>
            </div>
            <div class="dms-lift clearfix">
              <div class="dms-lift-pic">
                <img src="../../assets/images/xym/lift.png" alt="">
              </div>
              <div class="dms-lift-derection">
                <div class="dmsl-dt dmsl-dt-up">
                  <div class="dmsl-dt-up-on"></div>
                </div>
                <div class="dmsl-dt-floor">
                  <h4><span>{{curRunData.floor}}</span>F</h4>
                  <p>当前楼层</p>
                </div>
                <div class="dmsl-dt dmsl-dt-down">
                  <div class="dmsl-dt-down-on"></div>
                </div>
              </div>
              <div class="dms-lift-data">
                <div class="dmsl-data">
                  <h4><span>{{curRunData.speed}}</span>m/s</h4>
                  <p>运行速度</p>
                </div>
                <div class="dmsl-data">
                  <h4><span>{{curRunData.prox}}</span></h4>
                  <p>轿门状态</p>
                </div>
                <div class="dmsl-data">
                  <h4><span>1600</span>kg</h4>
                  <p>当前荷载</p>
                </div>
              </div>
            </div>
            <div class="dms-lift-info clearfix">
              <div class="dmsl-data">
                <h4><span>7821</span>km</h4>
                <p>月累计运行里程</p>
              </div>
              <div class="dmsl-data">
                <h4><span>12</span>年<span>1</span>个月</h4>
                <p>电梯年限</p>
              </div>
              <div class="dmsl-data">
                <h4><span>234345</span>次</h4>
                <p>月启停次数</p>
              </div>
              <div class="dmsl-data">
                <h4><span>1582</span>小时</h4>
                <p>月运行时长</p>
              </div>
              <div class="dmsl-data">
                <h4><span>121</span>次</h4>
                <p>钢丝绳月折弯次数</p>
              </div>

            </div>

          </div>

          <!-- 作业记录 -->
          <div class="det-mid-log">
            <div class="det-warn-title">
              <div class="det-warn-title-h">作业记录</div>
              <span class="dm-go-detail" @click="$router.push(`/detection-work-log?regCode=${parentCode}`)">全部作业 ></span></div>
            <div class="dm-log-content">
              <div class="dm-log-list clearfix" v-for="(item, i) in logList" @click="goWorkLogDetail(item.taskId)" :key="i">
                <div class="dmll-td">{{item.taskType}}</div>
                <div class="dmll-td">{{item.taskPerson}}</div>
                <div class="dmll-td">{{item.completeTime}}</div>
              </div>
              <div class="list-no-data" v-show="logList.length == 0">暂无数据</div>
            </div>

          </div>

        </div>

        <!-- 右侧实时监测 -->
        <div class="det-right">
          <det-chart-comp></det-chart-comp>
        </div>
        
      </div>

    </div>


  </div>
</template>

<script>
import xymFun from '../../utils/xymFun'
import api from '../../api.js'
import Footer from '../common/fotter'
import SearchCode from '../../components/SearchCode'
import DetWarnListComp from './DetWarnListComp'
import DetChartComp from './DetChartComp'

export default {
  data() {
    return {
      parentCode: '',
      runDataTimer: null,
      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',
      liftPerson: '',

      // 实时运行状态
      curRunData: {
        "move": "",
        "floor": 0,
        "speed": 0,
        "height": 0,
        "prox": "关"
      },

      // 作业记录列表
      logList: [],
      detWorkLogParams: {
        elevCode: '',
        offset: 1, 
        limit: 2000,
        order: true, // 时间排序
        column: 'id',
      },

    }
  },
  created() {
    this.parentCode = this.$route.query.regCode
  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.runDataTimer)
    this.runDataTimer = null
  },
  
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()

    // 获取电梯详情
    this.getLiftDetail()

    // 开启定时器，获取电梯实时运行状态
    this.setRunDataTimer()

    // 获取作业记录
    this.getLogList()

  },
  methods: {
    // 开启获取电梯实时运行状态定时器
    setRunDataTimer() {
      const that = this
      this.getEleRunData()
      this.runDataTimer = setInterval(() => {
        that.getEleRunData()
      }, 2000)
    },

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
        console.log('res', res)
        let detail = res.data.data
        this.regCode = detail.regCode
        this.inNum = detail.inNum
        this.localArea = detail.localArea
        this.address = detail.address

        // 查询异常告警列表
        // this.getWarnList()
      })
    },

    // 获取电梯实时运行状态
    getEleRunData() {
      api.detection.getElevatorData(this.parentCode).then(res => {
        console.log('电梯实时运行状态数据', res.data.data[this.parentCode])
        let detail = res.data.data[this.parentCode]
        this.curRunData.move = detail.move
        this.curRunData.floor = detail.floor
        this.curRunData.height = detail.height
        this.curRunData.speed = parseFloat(detail.speed).toFixed(2)
        this.curRunData.prox = detail.prox == '"01"' ? '开' : '关'
      })
    },

    // 获取作业记录
    getLogList() {

      // 请求作业记录
      this.logList = []
      this.detWorkLogParams.elevCode = this.parentCode
      api.detection.getLogList(this.detWorkLogParams).then(res => {
        console.log('工作记录', res.data)
        let result = res.data.data.records

        result.forEach((item, i) => {
          let workLogObj = {
            taskId: item.taskId,
            taskType: item.taskType,
            taskPerson: '',
            completeTime: item.recordTime,
          }
          // 员工
          let staffArr = []
          item.mp.forEach(secItem => {
            staffArr.push(secItem.staffName)
          })
          workLogObj.taskPerson = staffArr.join('，') ? staffArr.join('，') : '无'
          this.logList.push(workLogObj)
          console.log('this', this.logList)
        })

      })

    },

    // 跳转到工单详情
    goWorkLogDetail(taskId) {
      this.$router.push({name: 'missionDetail', params: {'id': taskId}})
    }

  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    'det-warn-list-comp': DetWarnListComp,
    'det-chart-comp': DetChartComp


  }
}
</script>

<style lang="stylus" scoped>
#DetectionPanel{
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height: 1;
  }
  
}

</style>
