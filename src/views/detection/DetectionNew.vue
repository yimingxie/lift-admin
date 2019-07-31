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
            <li><span>电梯负责人：</span>{{liftPerson ? liftPerson : '无'}}</li>
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
            <div class="back-realtime" @click="backRealtime" v-show="this.currentComponent == 'DetectionDiagnoseC'">实时</div>
          </div>
          <div class="det-warn-choose clearfix">
            <div class="dwc-box" style="width: 56%;">
              <!-- <div class="dwc-date-icon" :class="triggleTime ? 'hideIcon' : ''"></div> -->
              <div class="dwc-box-line"></div>
              <!-- <el-date-picker v-model="triggleTime" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd" prefix-icon="test-icon" style="width: 100%;" @change="changeTriggleTime"></el-date-picker> -->
              <el-date-picker
                v-model="triggleTime"
                type="daterange"
                value-format="yyyy-MM-dd" 
                style="width: 100%;" 
                @change="changeTriggleTime"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

            </div>
            <div class="dwc-box" style="width: 22%">
              <div class="dwc-box-line"></div>
              <el-select v-model="diagnType" placeholder="类型" @change="changeDiagnType">
                <el-option v-for="item in diagnTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="dwc-box" style="width: 22%;">
              <el-select v-model="processed" placeholder="进度" @change="changeProcessed">
                <el-option v-for="item in processedOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>

          <div class="det-warn-list" id="det-warn-list">
            <div class="dw-list" id="dw-list">
              <div class="dw-list-box" :class="addDiffClass(item.diagnType, item.id)" v-for="(item, i) in warnList" :key="i" @click="goDiagnose(item.id)">
                <div class="dw-list-box-wrap">
                  <div class="dwlb-p">
                    <h4>{{item.reason}}</h4>
                    <!-- 管道符 过滤器 -->
                    <p>{{item.diagnType | changeDiagnType}} {{item.triggleTime}}</p>
                  </div>
                  <div class="dwlb-rate" :class="item.processed == 0 ? 'no-deal' : ''">{{item.processed | changeProcessed}}</div>
                </div>
              </div>
              <div v-show="isLoading" style="text-align: center;padding: 10px;">
                <img src="../../assets/images/xym/loading.gif" alt="">
              </div>
            </div>
          </div>
          
        </div>

        <div class="data-layout">
          <component :is="currentComponent"></component>
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
import DetectionRealtimeC from './DetectionRealtimeC'
import DetectionDiagnoseC from './DetectionDiagnoseC'

export default {
  data() {
    return {
      parentCode: '',
      liftPerson: '',
      dateNow: '',
      currentComponent: 'DetectionRealtimeC',
      
      dtID: 'test001',
      

      // 电梯详情
      regCode: '',
      inNum: '',
      address: '',
      lift_man: '',
      localArea: '',

      // 告警列表
      boxOnIndex: '',
      isLoading: false,
      isScroll: true, // 滚动加载节流阀
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
        offset : 1,
        limit : 20,
        regCode: "",
        diagnType: -1,
        processed: -1,
        startDate: '2019-1-1',
        endDate: '2019-7-24',
      },

      
      
    };
  },
  created() {
    this.parentCode = this.$route.query.regCode
    // this.currentComponent = 'DetectionRealtimeC'


    // 通过localStorage的diagnId控制页面切换和刷新持久化
    if (localStorage.getItem('diagnId')) {
      this.boxOnIndex = localStorage.getItem('diagnId')
      this.currentComponent = 'DetectionDiagnoseC'
    } else {
      this.currentComponent = 'DetectionRealtimeC'
    }
  },
  mounted() {
    // 获取电梯负责人
    this.getLiftPerson()

    // 获取电梯详情
    this.getLiftDetail()

    // 异常列表滚动加载
    this.warnScroll() 

    // 开启告警定时器或者不开启
    if (this.currentComponent == 'DetectionDiagnoseC') {
      clearInterval(this.warnListTimer)
      this.warnListTimer = null
      this.getWarnList()
    } else {
      // this.setWarnListTimer()
    }

  },
  beforeDestroy() {
    // 页面关闭清除定时器
    clearInterval(this.warnListTimer)
    this.warnListTimer = null
    localStorage.setItem('diagnId', '')
  },
  methods: {
    // 异常告警定时器
    setWarnListTimer() {
      const that = this
      if (that.warnListTimer) clearInterval(that.warnListTimer)
      // if (that.warnList.length === 0) return
      this.warnListTimer = setInterval(() => {
        that.getNewestWarn()
        console.log('that.warnList', that.warnList)
      }, 2000) 
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

    // 获取最新异常告警
    getNewestWarn() {
      const that = this
      // if (!this.warnList.length) return
      let warnParamsCopy = xymFun.deepClone(that.warnParams)
      warnParamsCopy.offset = 1
      api.detection.getWarnList(warnParamsCopy).then(res => {
        let totalList = res.data.data.records
        totalList.forEach((item, i) => {
          // 如果第一条数据的时间戳不相等，则push
          let firstTS = that.warnList[0].ts
          if (totalList[0].ts == firstTS) return false
          let newestList = []

          totalList.forEach((secondItem, secondI) => {
            if (secondItem.ts !== firstTS) {
              newestList.push(secondItem)
            }
          })
          that.warnList = newestList.concat(that.warnList)
        })

      })

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

    // 异常告警列表滚动加载
    warnScroll() {
      const that = this
      var divscroll = document.getElementById('dw-list');

      divscroll.addEventListener('scroll', () => {
        var wholeHeight = divscroll.scrollHeight; // div总高度
        var scrollTop = divscroll.scrollTop; // 卷曲高度
        var divHeight = divscroll.clientHeight; // div可见高度

        // 已滚到底部
        if(scrollTop + divHeight >= wholeHeight && that.isScroll){
          clearInterval(that.warnListTimer) // 关闭定时器
          that.isScroll = false // 防止多次请求
          that.isLoading = true
          that.warnParams.offset += 1
          api.detection.getWarnList(that.warnParams).then(res => {
            setTimeout(() => {
              that.isLoading = false
              // 如果为空数组，则不允许往下滚动加载
              if (res.data.data.records.length > 0) {
                that.isScroll = true
                let warnListMore = res.data.data.records
                that.warnList = that.warnList.concat(warnListMore)
                if (this.currentComponent == 'DetectionDiagnoseC') return
                // that.setWarnListTimer() // 如果为诊断页面，则不开启定时器，否则要开启
              }
            }, 1000)
          })
          .catch(err => {
            console.log('下拉请求失败，请重试', err)
            that.isLoading = false
            that.isScroll = true
          })
        }
        // if(scrollTop == 0){
        //     alert('滚动到头部了！');
        // }

      })

    },

    // 异常告警日期筛选
    changeTriggleTime(triggleTime) {
      this.isScroll = true
      this.warnParams.startDate = triggleTime[0]
      this.warnParams.endDate = triggleTime[1]
      this.getWarnList()
    },

    // 异常告警类型筛选
    changeDiagnType(diagnType) {
      this.isScroll = true
      this.warnParams.diagnType = diagnType
      this.getWarnList()
    },

    // 异常告警进度筛选
    changeProcessed(processed) {
      this.isScroll = true
      this.warnParams.processed = processed
      this.getWarnList()
    },

    // 渲染不同类
    addDiffClass(diagnType, diagnId) {
      let onClass = this.boxOnIndex == diagnId ? 'on' : ''
      if (diagnType == 1) {
        return 'faultBg' + ' ' + onClass
      } else if (diagnType == 2) {
        return 'violationBg' + ' ' + onClass
      } else if (diagnType == 3) {
        return 'warningBg' + ' ' + onClass
      } else {
        return 'accidentBg' + ' ' + onClass
      }

    },

    // 跳转到诊断
    goDiagnose(diagnId) {
      this.boxOnIndex = diagnId
      localStorage.setItem('diagnId', diagnId)
      clearInterval(this.warnListTimer)
      this.warnListTimer = null
      this.currentComponent = 'DetectionDiagnoseC'
    },

    // 跳回实时监测
    backRealtime() {
      this.boxOnIndex = ''
      localStorage.setItem('diagnId', '')
      this.currentComponent = 'DetectionRealtimeC'
      // this.setWarnListTimer()
    },

    
  },
  components: {
    'footer-temp': Footer,
    'search-code': SearchCode,
    DetectionRealtimeC,
    DetectionDiagnoseC,
  },
  watch: {

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
#ed .el-range-input{
  background: none;
  margin-top: -2px;
}
#ed .el-date-editor .el-range-separator{
  width: auto;
}
</style>


<style lang="stylus" scoped>

#ed {
  @import '../../assets/stylus/xymStyle.styl'

  .container{
    line-height: 1;
  }
  

  
}



</style>
