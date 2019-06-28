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
          <div class="dhi-title">内部编号：{{inNum}}</div>
          <ul class="dhi-ul clearfix">
            <li><span>注册代码：</span>{{regCode}}</li>
            <li><span>电梯负责人：</span>{{lift_man}}</li>
            <li><span>电梯地址：</span>{{localArea}} {{address}}</li>
          </ul>
        </div>
        <div class="det-heading-search">
          <search-code :code="parentCode" @childCode="goToResult"></search-code>
        </div>
      </div>

      <div class="det-content clearfix">

        <!-- 左侧 -->
        <!-- 异常告警列表 -->
        <div class="det-warn">
          <div class="det-warn-title">
            <div class="det-warn-title-h">异常告警</div>
          </div>
          <div class="det-warn-choose clearfix">
            <div class="dwc-box" style="width: 40%;">
              <div class="dwc-date-icon"></div>
              <div class="dwc-box-line"></div>
              <el-date-picker v-model="triggleTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" prefix-icon="test-icon" style="width: 100%;" @change="changeTriggleTime"></el-date-picker>
            </div>
            <div class="dwc-box" style="width: 30%">
              <div class="dwc-box-line"></div>
              <el-select v-model="diagnType" placeholder="类型" @change="changeDiagnType">
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
                  <p>{{item.diagnType | changeDiagnType}} {{item.triggleTime}}</p>
                </div>
                <div class="dwlb-rate" :class="item.processed == 0 ? 'no-deal' : ''">{{item.processed | changeProcessed}}</div>
              </div>
            </div>
          </div>
          
        </div>

        <!-- 中间 -->
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
                  <h4><span>21</span>F</h4>
                  <p>当前楼层</p>
                </div>
                <div class="dmsl-dt dmsl-dt-down">
                  <div class="dmsl-dt-down-on"></div>
                </div>
              </div>
              <div class="dms-lift-data">
                <div class="dmsl-data">
                  <h4><span>2.9</span>m/s</h4>
                  <p>运行速度</p>
                </div>
                <div class="dmsl-data">
                  <h4><span>关</span></h4>
                  <p>轿门状态</p>
                </div>
                <div class="dmsl-data">
                  <h4><span>1600</span>kg</h4>
                  <p>轿门状态</p>
                </div>
              </div>
            </div>
            <div class="dms-lift-info clearfix">
              <div class="dmsl-data">
                <h4><span>7821</span>km</h4>
                <p>420天累计运行里程</p>
              </div>
              <div class="dmsl-data">
                <h4><span>12</span>年<span>1</span>个月</h4>
                <p>420天累计运行里程</p>
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
              <span class="dm-go-detail">全部作业 ></span></div>
            <div class="dm-log-content">
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>
              <div class="dm-log-list clearfix">
                <div class="dmll-td">例行维保</div>
                <div class="dmll-td">周莘羽</div>
                <div class="dmll-td">04-24  14:47:12</div>
              </div>


            </div>


          </div>


        </div>

        <!-- 右侧 -->
        <div class="det-right">
          <!-- TODO切换时间待做 -->
          <div class="det-warn-title">
            <div class="det-warn-title-h">实时监测数据</div> 
            <div class="det-cTime-con clearfix">
              <div class="dcc-btn dcc-btn-left"></div>
              <div class="dcc-btn-current useless">实时</div> 
              <div class="dcc-btn dcc-btn-right useless"></div>
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
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

      // 告警列表筛选
      triggleTime: '',
      diagnTypeOptions: [
        {value: '-1', label: '全部'},
        {value: '0', label: '事件'},
        {value: '1', label: '故障'},
        {value: '2', label: '违规'},
        {value: '3', label: '预警'},
      ],
      diagnType: '',
      processedOptions: [
        {value: '0', label: '未处理'},
        {value: '1', label: '处理中'},
        {value: '2', label: '已完成'},

       
      ],
      processed: '',
      warnList: [],
      warnParams: {
        offset : "1",
        limit : "100",
        regCode: "",
        triggleTime: "",
        diagnType: -1,
        processed: -1,
      },

      


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
    this.parentCode = this.$route.query.regCode
  },
  mounted() {

    // 获取电梯详情
    this.getLiftDetail()


  },
  methods: {

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
        this.getWarnList()
      })
    },

    // 查询异常告警列表
    getWarnList() {
      this.warnParams.regCode = this.parentCode
      api.detection.getWarnList(this.warnParams).then(res => {
        console.log('异常告警', res)
        this.warnList = res.data.data.records
      })

    },

    // 异常告警日期筛选
    changeTriggleTime(triggleTime) {
      this.warnParams.triggleTime = triggleTime
      this.getWarnList()
    },

    // 异常告警类型筛选
    changeDiagnType(diagnType) {
      this.warnParams.diagnType = diagnType
      this.getWarnList()
    },

    // 异常告警进度筛选
    changeProcessed(processed) {
      console.log('processed', processed)
      this.warnParams.processed = processed
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
        return '事件'
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

#ed {
  @import '../../assets/stylus/xymStyle.styl'

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



  // ggggggggggg
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
    position: relative;
  }
  .det-warn-title-h{
    font-size: 16px;
    font-weight: bold;
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
